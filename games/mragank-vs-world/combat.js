// ========================================
// SWORD COMBAT SYSTEM
// Rhythm-based Sword Fighting
// ========================================

class SwordCombat {
    constructor() {
        this.combatCanvas = null;
        this.timingMeter = null;
        this.attackButton = null;
        this.playerHealthBar = null;
        this.enemyHealthBar = null;
        this.hitFeedback = null;
        this.comboDisplay = null;
        this.combatScreen = null;

        this.playerHP = 100;
        this.playerMaxHP = 100;
        this.enemyHP = 100;
        this.enemyMaxHP = 100;

        this.combo = 0;
        this.maxCombo = 0;
        this.isActive = false;
        this.isPaused = false;

        this.currentBoss = null;
        this.difficulty = 'easy'; // 'easy' or 'hard'
        this.onBattleEnd = null;

        // Timing system
        this.timingValue = 0;
        this.timingDirection = 1;
        this.timingSpeed = 0.02; // Speed of meter movement
        this.perfectZoneStart = 0.4;
        this.perfectZoneEnd = 0.6;
        this.goodZoneStart = 0.25;
        this.goodZoneEnd = 0.75;

        // Combat state machine
        this.combatState = 'waiting'; // waiting, player_attack, enemy_attack, clash
        this.stateTimer = 0;
        this.attackCooldown = 0;

        // Animation timings
        this.windupTime = 300;
        this.swingTime = 150;
        this.recoveryTime = 200;
        this.enemyAttackTime = 800;

        // Hard fight specific
        this.enemyAttackChance = 0.3;
        this.clashChance = 0.2;

        this.lastUpdateTime = 0;
        this.animationId = null;
    }

    init() {
        this.combatCanvas = document.getElementById('combat-canvas');
        this.timingMeter = document.getElementById('timing-meter');
        this.timingFill = document.getElementById('timing-fill');
        this.timingZone = document.getElementById('timing-zone');
        this.attackButton = document.getElementById('attack-button');
        this.playerHealthBar = document.getElementById('player-health');
        this.enemyHealthBar = document.getElementById('enemy-health');
        this.hitFeedback = document.getElementById('hit-feedback');
        this.comboDisplay = document.getElementById('combo-display');
        this.combatScreen = document.getElementById('combat-screen');

        // Initialize sprite system
        if (this.combatCanvas && spriteSystem) {
            spriteSystem.init(this.combatCanvas);
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Attack button
        if (this.attackButton) {
            this.attackButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAttack();
            });
            this.attackButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleAttack();
            }, { passive: false });
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;

            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                this.handleAttack();
            }

            // Secret Kill Key (Testing)
            if (e.key === 'k' || e.key === 'K') {
                this.forceWin();
            }
        });
    }

    // Boss difficulty configuration
    getBossDifficulty(bossName) {
        const hardBosses = ['K', 'V', 'S'];
        return hardBosses.includes(bossName) ? 'hard' : 'easy';
    }

    startBattle(bossName, bossType, onEnd = null) {
        this.onBattleEnd = onEnd;
        this.currentBoss = bossType;
        this.difficulty = this.getBossDifficulty(bossType);

        // Reset state
        this.playerHP = 100;
        this.playerMaxHP = 100;
        this.enemyHP = 100;
        this.enemyMaxHP = 100;
        this.combo = 0;
        this.maxCombo = 0;
        this.isActive = true;
        this.isPaused = false;
        this.combatState = 'waiting';
        this.timingValue = 0;
        this.timingDirection = 1;
        this.attackCooldown = 0;

        // Adjust difficulty parameters
        if (this.difficulty === 'easy') {
            this.timingSpeed = 0.012;      // Slower (was 0.015)
            this.perfectZoneStart = 0.32;  // Wider (was 0.35)
            this.perfectZoneEnd = 0.68;    // Wider (was 0.65)
            this.goodZoneStart = 0.15;     // Wider (was 0.2)
            this.goodZoneEnd = 0.85;       // Wider (was 0.8)
            this.enemyAttackChance = 0.05; // Less frequent (was 0.1)
            this.clashChance = 0.02;       // Less frequent (was 0.05)
        } else {
            this.timingSpeed = 0.02;       // Slower (was 0.025)
            this.perfectZoneStart = 0.38;  // Wider (was 0.42)
            this.perfectZoneEnd = 0.62;    // Wider (was 0.58)
            this.goodZoneStart = 0.25;     // Wider (was 0.3)
            this.goodZoneEnd = 0.75;       // Wider (was 0.7)
            this.enemyAttackChance = 0.25; // Less frequent (was 0.4)
            this.clashChance = 0.15;       // Less frequent (was 0.25)
        }

        // Update UI
        document.getElementById('enemy-name-hud').textContent = bossName;
        this.updateHealthBars();
        this.updateTimingMeterZones();

        // Initialize sprites - ensure canvas is sized first
        if (this.combatCanvas) {
            // Force canvas resize
            const container = this.combatCanvas.parentElement;
            this.combatCanvas.width = container.clientWidth;
            this.combatCanvas.height = container.clientHeight;

            // Initialize sprite system with canvas
            spriteSystem.init(this.combatCanvas);
            spriteAnimator.reinit(spriteSystem);

            // Start animation
            spriteAnimator.setEnemyType(bossType);
            spriteAnimator.reset();
            spriteAnimator.start();

            console.log('Combat canvas initialized:', this.combatCanvas.width, 'x', this.combatCanvas.height);
        }

        // Start combat loop
        audioManager.startBGM('battle');
        this.lastUpdateTime = performance.now();
        this.gameLoop();
    }

    updateTimingMeterZones() {
        if (!this.timingZone) return;

        const perfectWidth = (this.perfectZoneEnd - this.perfectZoneStart) * 100;
        const perfectLeft = this.perfectZoneStart * 100;

        this.timingZone.style.width = `${perfectWidth}%`;
        this.timingZone.style.left = `${perfectLeft}%`;
    }

    gameLoop() {
        if (!this.isActive) return;

        const now = performance.now();
        const deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now;

        this.update(deltaTime);

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        if (this.isPaused) return;

        // Update timing meter
        this.timingValue += this.timingDirection * this.timingSpeed;
        if (this.timingValue >= 1) {
            this.timingValue = 1;
            this.timingDirection = -1;
        } else if (this.timingValue <= 0) {
            this.timingValue = 0;
            this.timingDirection = 1;
        }

        // Update timing meter visual
        const timingIndicator = document.getElementById('timing-indicator');
        if (timingIndicator) {
            timingIndicator.style.left = `${this.timingValue * 100}%`;
        }

        // Update cooldown
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        // Update state timer
        if (this.stateTimer > 0) {
            this.stateTimer -= deltaTime;
            if (this.stateTimer <= 0) {
                this.handleStateComplete();
            }
        }

        // Enemy attack logic for hard fights
        if (this.difficulty === 'hard' &&
            this.combatState === 'waiting' &&
            this.attackCooldown <= 0) {
            if (Math.random() < this.enemyAttackChance * (deltaTime / 1000)) {
                this.startEnemyAttack();
            }
        }
    }

    handleAttack() {
        if (!this.isActive || this.isPaused) return;
        if (this.attackCooldown > 0) return;
        if (this.combatState !== 'waiting') return;

        // Determine hit quality based on timing
        let hitType = 'miss';
        let damage = 0;

        if (this.timingValue >= this.perfectZoneStart &&
            this.timingValue <= this.perfectZoneEnd) {
            hitType = 'perfect';
            damage = 25 + (this.combo * 3);
        } else if (this.timingValue >= this.goodZoneStart &&
                   this.timingValue <= this.goodZoneEnd) {
            hitType = 'good';
            damage = 15 + (this.combo * 2);
        } else {
            hitType = 'miss';
            damage = 0;
        }

        // Easy mode: even misses do some damage
        if (this.difficulty === 'easy' && hitType === 'miss') {
            hitType = 'weak';
            damage = 10;
        }

        // Hard mode: chance for enemy to block
        if (this.difficulty === 'hard' && hitType !== 'miss') {
            if (Math.random() < this.clashChance) {
                this.startClash(hitType, damage);
                return;
            }
        }

        this.executePlayerAttack(hitType, damage);
    }

    executePlayerAttack(hitType, damage) {
        this.combatState = 'player_attack';
        this.attackCooldown = 800;

        // Start attack animation
        if (spriteAnimator) {
            spriteAnimator.setPlayerState('attack_windup');
        }
        audioManager.playSwordSwing();

        // Windup phase
        setTimeout(() => {
            if (!this.isActive) return;

            if (spriteAnimator) {
                spriteAnimator.setPlayerState('attack_swing');
            }

            // Hit effects based on type
            if (hitType === 'perfect') {
                this.handlePerfectHit(damage);
            } else if (hitType === 'good') {
                this.handleGoodHit(damage);
            } else if (hitType === 'weak') {
                this.handleWeakHit(damage);
            } else {
                this.handleMiss();
            }
        }, this.windupTime);

        // Recovery
        setTimeout(() => {
            if (!this.isActive) return;
            if (spriteAnimator) {
                spriteAnimator.setPlayerState('idle');
            }
        }, this.windupTime + this.swingTime);

        setTimeout(() => {
            if (!this.isActive) return;
            if (spriteAnimator) {
                spriteAnimator.setPlayerState('idle');
            }
            this.combatState = 'waiting';
            this.checkBattleEnd();
        }, this.windupTime + this.swingTime + this.recoveryTime);
    }

    getInsult(bossType) {
        const insults = {
            'R': ["BLOCKED!", "SEEN ZONED", "UNFOLLOWED", "NO REPLY"],
            'A': ["NO LABEL?", "CONFUSED", "JUST FRIENDS", "SITUATIONSHIP"],
            'K': ["BAD TUNING", "WHINY", "C R I N G E", "NO ONE LISTENS"],
            'Vi': ["SKIP LEG DAY", "ALL JUICE", "PROTEIN FART", "SMALL CALVES"],
            'V': ["NOT FUNNY", "SILENCE", "HECKLED", "BOOO!"],
            'P': ["F*** UR CAR", "BEACH PLS", "TRAFFIC JAM", "DRUNK DRIVER"],
            'S': ["CREEP!", "TOO OLD", "STRANGER DANGER", "OK BOOMER"]
        };
        const list = insults[bossType] || ["HIT!", "OUCH!", "TAKE THAT", "BAM!"];
        return list[Math.floor(Math.random() * list.length)];
    }

    handlePerfectHit(damage) {
        this.showFeedback('PERFECT!', 'perfect');
        audioManager.playPerfect();
        audioManager.playSwordHit();

        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.showCombo();

        this.damageEnemy(damage);

        // Visual effects
        this.screenFlash('#ffeb3b');
        this.screenShake(8);

        if (spriteAnimator) {
            spriteAnimator.setEnemyState('hit');
            const w = spriteSystem.canvas.width;
            const h = spriteSystem.canvas.height;
            spriteAnimator.addSlash(w * 0.75, h * 0.5);
            spriteAnimator.addImpact(w * 0.75, h * 0.5, {r: 255, g: 200, b: 50});
            
            const insult = this.getInsult(this.currentBoss);
            spriteAnimator.addDamage(w * 0.75, h * 0.4, insult);

            setTimeout(() => {
                if (spriteAnimator) spriteAnimator.setEnemyState('idle');
            }, 300);
        }
    }

    handleGoodHit(damage) {
        this.showFeedback('GOOD!', 'good');
        audioManager.playGood();
        audioManager.playSwordHit();

        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.showCombo();

        this.damageEnemy(damage);

        this.screenShake(4);

        if (spriteAnimator) {
            spriteAnimator.setEnemyState('hit');
            const w = spriteSystem.canvas.width;
            const h = spriteSystem.canvas.height;
            spriteAnimator.addImpact(w * 0.75, h * 0.5, {r: 255, g: 150, b: 50});
            
            const insult = this.getInsult(this.currentBoss);
            spriteAnimator.addDamage(w * 0.75, h * 0.4, insult);

            setTimeout(() => {
                if (spriteAnimator) spriteAnimator.setEnemyState('idle');
            }, 300);
        }
    }

    handleWeakHit(damage) {
        this.showFeedback('HIT', 'weak');
        audioManager.playHit();

        // No combo for weak hits
        this.combo = 0;
        this.hideCombo();

        this.damageEnemy(damage);

        if (spriteAnimator) {
            spriteAnimator.setEnemyState('hit');
            const w = spriteSystem.canvas.width;
            const h = spriteSystem.canvas.height;
            
            const insult = this.getInsult(this.currentBoss);
            spriteAnimator.addDamage(w * 0.75, h * 0.4, insult);

            setTimeout(() => {
                if (spriteAnimator) spriteAnimator.setEnemyState('idle');
            }, 200);
        }
    }

    handleMiss() {
        this.showFeedback('MISS!', 'miss');
        audioManager.playMiss();

        this.combo = 0;
        this.hideCombo();

        // Hard mode: enemy counterattacks on miss
        if (this.difficulty === 'hard') {
            setTimeout(() => {
                if (this.isActive && this.combatState === 'waiting') {
                    this.startEnemyAttack();
                }
            }, 300);
        }
    }

    startClash(originalHitType, originalDamage) {
        this.combatState = 'clash';
        this.showFeedback('CLASH!', 'clash');
        audioManager.playSwordClash();

        if (spriteAnimator) {
            spriteAnimator.setPlayerState('attack_swing');
            spriteAnimator.setEnemyState('block');
        }

        this.screenShake(6);

        // After clash, reduced damage or counter
        setTimeout(() => {
            if (!this.isActive) return;

            // 50% chance to break through, 50% chance enemy counters
            if (Math.random() < 0.5) {
                // Break through
                const reducedDamage = Math.floor(originalDamage * 0.5);
                this.damageEnemy(reducedDamage);
                this.showFeedback('BREAK!', 'good');

                if (spriteAnimator) {
                    spriteAnimator.setEnemyState('hit');
                    const w = spriteSystem.canvas.width;
                    const insult = this.getInsult(this.currentBoss);
                    spriteAnimator.addDamage(w * 0.75, spriteSystem.canvas.height * 0.4, insult);
                }
            } else {
                // Enemy counter
                this.damagePlayer(12);
                this.showFeedback('COUNTER!', 'miss');

                if (spriteAnimator) {
                    spriteAnimator.setPlayerState('hit');
                    const w = spriteSystem.canvas.width;
                    spriteAnimator.addDamage(w * 0.25, spriteSystem.canvas.height * 0.4, "OUCH!");
                }
            }

            setTimeout(() => {
                if (spriteAnimator) {
                    spriteAnimator.setPlayerState('idle');
                    spriteAnimator.setEnemyState('idle');
                }
                this.combatState = 'waiting';
                this.checkBattleEnd();
            }, 300);
        }, 400);
    }

    startEnemyAttack() {
        if (this.combatState !== 'waiting') return;

        this.combatState = 'enemy_attack';

        if (spriteAnimator) {
            spriteAnimator.setEnemyState('attack');
        }

        // Telegraph the attack
        this.showFeedback('!', 'warning');
        audioManager.playSwordSwing();

        setTimeout(() => {
            if (!this.isActive) return;

            // Enemy attack lands
            const damage = this.difficulty === 'hard' ? 12 : 6;
            this.damagePlayer(damage);

            this.screenShake(6);

            if (spriteAnimator) {
                spriteAnimator.setPlayerState('hit');
                const w = spriteSystem.canvas.width;
                spriteAnimator.addImpact(w * 0.25, spriteSystem.canvas.height * 0.5, {r: 255, g: 50, b: 50});
                spriteAnimator.addDamage(w * 0.25, spriteSystem.canvas.height * 0.4, "OUCH!");
            }

            // Reset combo on getting hit
            this.combo = 0;
            this.hideCombo();

            setTimeout(() => {
                if (spriteAnimator) {
                    spriteAnimator.setPlayerState('idle');
                    spriteAnimator.setEnemyState('idle');
                }
                this.combatState = 'waiting';
                this.attackCooldown = 500;
                this.checkBattleEnd();
            }, 300);
        }, this.enemyAttackTime);
    }

    handleStateComplete() {
        // State machine completion handler
        this.combatState = 'waiting';
    }

    damageEnemy(amount) {
        this.enemyHP = Math.max(0, this.enemyHP - amount);
        this.updateHealthBars();
        this.animateHealthBar('enemy');
    }

    damagePlayer(amount) {
        this.playerHP = Math.max(0, this.playerHP - amount);
        this.updateHealthBars();
        this.animateHealthBar('player');
        audioManager.playHit();
    }

    updateHealthBars() {
        if (this.playerHealthBar) {
            this.playerHealthBar.style.width = `${(this.playerHP / this.playerMaxHP) * 100}%`;
        }
        if (this.enemyHealthBar) {
            this.enemyHealthBar.style.width = `${(this.enemyHP / this.enemyMaxHP) * 100}%`;
        }
    }

    animateHealthBar(who) {
        const bar = who === 'player' ?
            this.playerHealthBar?.parentElement :
            this.enemyHealthBar?.parentElement;

        if (bar) {
            bar.classList.add('damage-flash');
            setTimeout(() => bar.classList.remove('damage-flash'), 200);
        }
    }

    showFeedback(text, type) {
        if (!this.hitFeedback) return;

        this.hitFeedback.textContent = text;
        this.hitFeedback.className = `feedback-${type}`;

        setTimeout(() => {
            this.hitFeedback.className = '';
            this.hitFeedback.textContent = '';
        }, 500);
    }

    showCombo() {
        if (!this.comboDisplay) return;

        if (this.combo >= 2) {
            this.comboDisplay.textContent = `${this.combo}x COMBO!`;
            this.comboDisplay.classList.add('show');
        }
    }

    hideCombo() {
        if (this.comboDisplay) {
            this.comboDisplay.classList.remove('show');
        }
    }

    screenShake(intensity) {
        if (!this.combatScreen) return;

        this.combatScreen.style.animation = 'none';
        this.combatScreen.offsetHeight; // Trigger reflow
        this.combatScreen.style.setProperty('--shake-intensity', `${intensity}px`);
        this.combatScreen.classList.add('shake');

        setTimeout(() => {
            this.combatScreen.classList.remove('shake');
        }, 300);
    }

    screenFlash(color) {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.backgroundColor = color;
        this.combatScreen.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 150);
    }

    checkBattleEnd() {
        if (this.enemyHP <= 0) {
            this.endBattle(true);
        } else if (this.playerHP <= 0) {
            this.endBattle(false);
        }
    }

    endBattle(playerWon) {
        this.isActive = false;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        audioManager.stopBGM();

        if (playerWon) {
            // Victory animation
            if (spriteAnimator) {
                spriteAnimator.setPlayerState('victory');
                spriteAnimator.setEnemyState('exploded');
                // BODY EXPLOSION!
                const w = spriteSystem.canvas.width;
                const h = spriteSystem.canvas.height;
                spriteAnimator.explodeEnemy(w * 0.7, h * 0.75, this.currentBoss);
            }
            audioManager.playVictory();

            // Final slash effect
            if (spriteAnimator && spriteSystem.canvas) {
                const w = spriteSystem.canvas.width;
                const h = spriteSystem.canvas.height;
                spriteAnimator.addSlash(w * 0.5, h * 0.5);
            }
        } else {
            audioManager.playDefeat();
            if (spriteAnimator) {
                spriteAnimator.setPlayerState('hit');
            }
        }

        // Callback after delay
        setTimeout(() => {
            if (spriteAnimator) {
                spriteAnimator.stop();
            }
            if (this.onBattleEnd) {
                this.onBattleEnd(playerWon, this.maxCombo);
            }
        }, 1500);
    }

    // Force win (for testing)
    forceWin() {
        this.enemyHP = 0;
        this.updateHealthBars();
        this.endBattle(true);
    }

    cleanup() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (spriteAnimator) {
            spriteAnimator.stop();
            spriteAnimator.reset();
        }
        audioManager.stopBGM();
        this.hideCombo();
    }
}

// Global combat instance
const swordCombat = new SwordCombat();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    swordCombat.init();
});
