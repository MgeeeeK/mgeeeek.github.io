// ========================================
// TAMAGOTCHI GAME CONTROLLER
// State machine, game loop, localStorage
// ========================================

class TamagotchiGame {
    constructor() {
        this.state = 'loading'; // loading, intro, tamagotchi, dead
        this.subState = 'idle'; // idle, feeding, stats, playing, sleeping, discipline
        this.pet = null;
        this.canvas = null;
        this.ctx = null;
        this.saveKey = 'tamagotchi-valentine-save';
        this.saveInterval = null;
        this.lastTick = Date.now();
        this.animLoop = null;
    }

    async init() {
        // Load or create pet
        const saved = localStorage.getItem(this.saveKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.pet = Pet.deserialize(data);
            } catch (e) {
                this.pet = null;
            }
        }

        if (!this.pet) {
            this.pet = new Pet();
        }

        // Apply time decay for time spent away
        const now = Date.now();
        const elapsed = now - this.pet.timestamps.lastSave;
        if (elapsed > 0) {
            this.pet.applyTimeDecay(elapsed);
            this.pet.checkEvolution();
        }

        // Init audio on first interaction
        document.addEventListener('click', () => audioManager.init(), { once: true });
        document.addEventListener('touchstart', () => audioManager.init(), { once: true });

        // Setup canvas — higher res for crisp rendering
        this.canvas = document.getElementById('pet-canvas');
        if (this.canvas) {
            this.canvas.width = 320;
            this.canvas.height = 288;
            this.ctx = this.canvas.getContext('2d');
        }

        // Bind buttons
        this.bindButtons();

        // Check if intro has been seen
        if (this.pet.progress.hasSeenIntro) {
            this.showTamagotchi();
        } else {
            this.showIntro();
        }

        // Start game loop
        this.startGameLoop();

        // Auto-save every 30 seconds
        this.saveInterval = setInterval(() => this.save(), 30000);
    }

    // ========================
    // SCREENS
    // ========================
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(id);
        if (screen) screen.classList.add('active');
    }

    showIntro() {
        this.state = 'intro';
        this.showScreen('intro-screen');

        // spriteSystem is initialized globally by shared/sprites.js

        // Start visual novel
        visualNovel.start(() => {
            this.pet.progress.hasSeenIntro = true;
            this.save();
            this.showTamagotchi();
        });

        // Handle advancing dialogue on click
        const introScreen = document.getElementById('intro-screen');
        const advanceHandler = () => {
            if (this.state !== 'intro') {
                introScreen.removeEventListener('click', advanceHandler);
                return;
            }
            // Update scene background based on current dialogue
            const idx = dialogueSystem.currentIndex - 1;
            if (idx >= 0 && idx < introDialogues.length) {
                visualNovel.updateScene(introDialogues[idx].scene);
            }
            dialogueSystem.advance();
        };
        introScreen.addEventListener('click', advanceHandler);
    }

    showTamagotchi() {
        this.state = 'tamagotchi';
        this.subState = 'idle';
        this.showScreen('tamagotchi-screen');

        // Check auto-sleep
        this.checkAutoSleep();

        // Set sprite animation
        if (this.pet.isSleeping) {
            petSprites.setAnimation('sleeping');
        } else {
            petSprites.setAnimation('idle');
        }

        audioManager.startBGM('romance');
    }

    showDeath() {
        this.state = 'dead';
        this.showScreen('death-screen');
        audioManager.stopBGM();
        audioManager.playDefeat();

        const daysLived = Math.floor(this.pet.age);
        const msg = document.getElementById('death-message');
        if (msg) {
            msg.textContent = `Your pet lived for ${daysLived} day${daysLived !== 1 ? 's' : ''}. Rest in peace, little Dexter.`;
        }
    }

    // ========================
    // GAME LOOP
    // ========================
    startGameLoop() {
        const loop = () => {
            const now = Date.now();
            const dt = now - this.lastTick;
            this.lastTick = now;

            this.update(dt);
            this.render();

            this.animLoop = requestAnimationFrame(loop);
        };
        this.animLoop = requestAnimationFrame(loop);
    }

    update(dt) {
        if (this.state === 'tamagotchi') {
            // Update pet stats periodically (every minute real-time)
            this.pet.applyTimeDecay(dt);

            // Check evolution
            if (this.pet.checkEvolution()) {
                audioManager.playConfirm();
            }

            // Check death
            if (this.pet.isDead()) {
                this.showDeath();
                return;
            }

            // Check auto-sleep/wake
            this.checkAutoSleep();

            // Update sprite animation
            petSprites.update(dt);

            // Update mini-game if active
            if (this.subState === 'playing' && miniGame.active) {
                miniGame.update();
            }
        }
    }

    render() {
        if (!this.ctx) return;

        if (this.state === 'tamagotchi') {
            if (this.subState === 'playing' && miniGame.active) {
                miniGame.draw(this.ctx);
            } else {
                this.renderPet();
            }
        }
    }

    renderPet() {
        const ctx = this.ctx;
        const w = 320;
        const h = 288;

        // LCD green background — gradient
        const bg = ctx.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, '#9bbc0f');
        bg.addColorStop(0.85, '#8bac0f');
        bg.addColorStop(1, '#7a9c00');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Ground with grass details
        ctx.fillStyle = '#7a9c00';
        ctx.fillRect(0, h - 34, w, 34);
        // Grass tufts
        ctx.fillStyle = '#8bac0f';
        for (let i = 0; i < 16; i++) {
            const gx = i * 21 + 4;
            ctx.fillRect(gx, h - 40, 3, 8);
            ctx.fillRect(gx + 8, h - 38, 3, 6);
            ctx.fillRect(gx + 14, h - 36, 2, 4);
        }

        // Draw pet centered — at native 2x size
        const cx = w / 2;
        const cy = h / 2 + 8;
        ctx.save();
        ctx.translate(cx, cy);
        const petScale = this.pet.stage === 'egg' ? 3.2 : this.pet.stage === 'baby' ? 3.6 : 2.6;
        ctx.scale(petScale, petScale);
        ctx.translate(-cx, -cy);
        petSprites.draw(ctx, this.pet.stage, cx, cy, this.pet.getCareQuality());
        ctx.restore();

        // Shadow under pet
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.beginPath();
        const shadowW = this.pet.stage === 'egg' ? 50 : 60;
        ctx.ellipse(cx, h - 36, shadowW, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Status icons at top
        this.drawStatusIcons(ctx);

        // Stage name at bottom
        ctx.fillStyle = '#306230';
        ctx.font = '11px Press Start 2P';
        const stageName = this.pet.stage.toUpperCase();
        const tw = ctx.measureText(stageName).width;
        ctx.fillText(stageName, (w - tw) / 2, h - 10);

        // Update age display
        const ageEl = document.getElementById('pet-age-display');
        if (ageEl) ageEl.textContent = `Day ${Math.floor(this.pet.age)}`;
    }

    drawStatusIcons(ctx) {
        const w = 320;
        const x = 8;
        const y = 18;

        ctx.font = '12px Press Start 2P';

        // Hunger — hearts
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = i < this.pet.hunger ? '#306230' : '#8bac0f';
            ctx.fillText('\u2665', x + i * 18, y);
        }

        // Happy — stars
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = i < this.pet.happiness ? '#306230' : '#8bac0f';
            ctx.fillText('\u2605', x + i * 18, y + 18);
        }

        // Sleep indicator
        if (this.pet.isSleeping) {
            ctx.fillStyle = '#306230';
            ctx.font = '14px Press Start 2P';
            ctx.fillText('ZZZ', w - 60, y);
        }

        // Health warning — flashing
        if (this.pet.health < 50) {
            const blink = Math.floor(Date.now() / 500) % 2;
            if (blink) {
                ctx.fillStyle = '#306230';
                ctx.font = '16px Press Start 2P';
                ctx.fillText('!', w / 2 - 4, y);
            }
        }
    }

    // ========================
    // BUTTON HANDLERS
    // ========================
    bindButtons() {
        document.getElementById('btn-feed')?.addEventListener('click', () => this.onFeed());
        document.getElementById('btn-stats')?.addEventListener('click', () => this.onStats());
        document.getElementById('btn-play')?.addEventListener('click', () => this.onPlay());
        document.getElementById('btn-sleep')?.addEventListener('click', () => this.onSleep());
        document.getElementById('btn-discipline')?.addEventListener('click', () => this.onDiscipline());

        // Feed choices
        document.getElementById('feed-meal')?.addEventListener('click', () => this.doFeed('meal'));
        document.getElementById('feed-snack')?.addEventListener('click', () => this.doFeed('snack'));
        document.getElementById('feed-cancel')?.addEventListener('click', () => this.closeOverlay('feed-overlay'));

        // Discipline choices
        document.getElementById('disc-praise')?.addEventListener('click', () => this.doDiscipline('praise'));
        document.getElementById('disc-scold')?.addEventListener('click', () => this.doDiscipline('scold'));
        document.getElementById('disc-cancel')?.addEventListener('click', () => this.closeOverlay('discipline-overlay'));

        // Stats close
        document.getElementById('stats-close')?.addEventListener('click', () => this.closeOverlay('stats-overlay'));

        // Death restart
        document.getElementById('restart-btn')?.addEventListener('click', () => this.restart());

        // Mini-game tap
        this.canvas?.addEventListener('click', () => {
            if (this.subState === 'playing' && miniGame.active) {
                miniGame.tap();
            }
        });

        // Audio toggle
        document.getElementById('audio-toggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const muted = audioManager.toggleMute();
            document.getElementById('audio-toggle')?.classList.toggle('muted', muted);
        });
    }

    onFeed() {
        if (this.state !== 'tamagotchi' || this.pet.isSleeping || this.pet.stage === 'egg') return;
        audioManager.playSelect();
        this.showOverlay('feed-overlay');
    }

    doFeed(type) {
        this.pet.feed(type);
        this.closeOverlay('feed-overlay');
        audioManager.playConfirm();

        // Eating animation
        petSprites.setAnimation('eating');
        setTimeout(() => petSprites.setAnimation('idle'), 2000);

        this.save();
    }

    onStats() {
        if (this.state !== 'tamagotchi') return;
        audioManager.playSelect();
        this.updateStatsDisplay();
        this.showOverlay('stats-overlay');
    }

    updateStatsDisplay() {
        // Hunger pips
        this.updatePips('hunger-pips', this.pet.hunger, 4);
        // Happiness pips
        this.updatePips('happy-pips', this.pet.happiness, 4);
        // Discipline pips
        this.updatePips('disc-pips', Math.round(this.pet.discipline / 2), 5);
        // Values
        document.getElementById('stat-age').textContent = `${Math.floor(this.pet.age)}d`;
        document.getElementById('stat-weight').textContent = `${this.pet.weight}lb`;
        document.getElementById('stat-health').textContent = `${this.pet.health}%`;
        document.getElementById('stat-stage').textContent = this.pet.stage;
    }

    updatePips(containerId, filled, total) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const pips = container.querySelectorAll('.stat-pip');
        pips.forEach((pip, i) => {
            pip.classList.remove('filled', 'low');
            if (i < filled) {
                pip.classList.add(filled <= 1 ? 'low' : 'filled');
            }
        });
    }

    onPlay() {
        if (this.state !== 'tamagotchi' || this.pet.isSleeping || this.pet.stage === 'egg') return;
        audioManager.playSelect();
        this.subState = 'playing';

        miniGame.start((catches, total) => {
            this.pet.play();
            // Bonus: extra happiness for catches
            for (let i = 1; i < catches; i++) {
                this.pet.happiness = Math.min(4, this.pet.happiness + 1);
            }
            // Perfect bonus
            if (catches === total) {
                this.pet.applyDiscipline('praise');
            }

            petSprites.setAnimation('happy');
            setTimeout(() => {
                petSprites.setAnimation('idle');
                this.subState = 'idle';
            }, 1500);

            this.save();
        });
    }

    onSleep() {
        if (this.state !== 'tamagotchi' || this.pet.stage === 'egg') return;
        audioManager.playSelect();

        if (this.pet.isSleeping) {
            this.pet.wake();
            petSprites.setAnimation('idle');
        } else {
            this.pet.sleep();
            petSprites.setAnimation('sleeping');
        }
        this.save();
    }

    onDiscipline() {
        if (this.state !== 'tamagotchi' || this.pet.isSleeping || this.pet.stage === 'egg') return;
        audioManager.playSelect();
        this.showOverlay('discipline-overlay');
    }

    doDiscipline(type) {
        this.pet.applyDiscipline(type);
        this.closeOverlay('discipline-overlay');
        audioManager.playConfirm();
        this.save();
    }

    // ========================
    // OVERLAYS
    // ========================
    showOverlay(id) {
        document.getElementById(id)?.classList.add('active');
    }

    closeOverlay(id) {
        document.getElementById(id)?.classList.remove('active');
    }

    // ========================
    // AUTO SLEEP / WAKE
    // ========================
    checkAutoSleep() {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 8) {
            if (!this.pet.isSleeping && this.pet.stage !== 'egg') {
                this.pet.sleep();
                petSprites.setAnimation('sleeping');
            }
        } else {
            if (this.pet.isSleeping) {
                this.pet.wake();
                petSprites.setAnimation('idle');
            }
        }
    }

    // ========================
    // PERSISTENCE
    // ========================
    save() {
        this.pet.timestamps.lastSave = Date.now();
        localStorage.setItem(this.saveKey, JSON.stringify(this.pet.serialize()));
    }

    restart() {
        localStorage.removeItem(this.saveKey);
        this.pet = new Pet();
        this.pet.progress.hasSeenIntro = true;
        this.showTamagotchi();
    }
}

// Boot
window.addEventListener('DOMContentLoaded', () => {
    const game = new TamagotchiGame();
    game.init();
});
