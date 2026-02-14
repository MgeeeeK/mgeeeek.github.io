// ========================================
// BLOOD SLIDE COLLECTION MINI-GAME
// Timing/reaction game on the tamagotchi canvas
// ========================================

class MiniGame {
    constructor() {
        this.active = false;
        this.round = 0;
        this.maxRounds = 5;
        this.catches = 0;
        this.state = 'waiting'; // waiting, sliding, result, done
        this.slideX = 0;
        this.slideSpeed = 0;
        this.targetZoneX = 0;
        this.targetZoneW = 80;
        this.timer = 0;
        this.resultTimer = 0;
        this.resultText = '';
        this.canvasW = 320;
        this.canvasH = 288;
        this.onComplete = null;
    }

    start(onComplete) {
        this.active = true;
        this.round = 0;
        this.catches = 0;
        this.onComplete = onComplete;
        this.nextRound();
    }

    nextRound() {
        if (this.round >= this.maxRounds) {
            this.state = 'done';
            this.resultTimer = 120; // 2 seconds at 60fps
            return;
        }
        this.round++;
        this.state = 'sliding';
        this.slideX = -20;
        this.slideSpeed = 3 + this.round * 0.6; // Gets faster each round
        this.targetZoneX = 80 + Math.random() * 140; // Random target zone
        this.timer = 0;
    }

    tap() {
        if (this.state !== 'sliding') return;

        const slideCenter = this.slideX + 10;
        const targetCenter = this.targetZoneX + this.targetZoneW / 2;
        const dist = Math.abs(slideCenter - targetCenter);

        if (dist < this.targetZoneW / 2 + 5) {
            this.catches++;
            this.resultText = dist < 10 ? 'PERFECT!' : 'CAUGHT!';
            audioManager.playPerfect();
        } else {
            this.resultText = 'MISS!';
            audioManager.playMiss();
        }

        this.state = 'result';
        this.resultTimer = 40;
    }

    update() {
        if (!this.active) return;

        if (this.state === 'sliding') {
            this.slideX += this.slideSpeed;
            this.timer++;
            // Miss if slide goes off screen
            if (this.slideX > this.canvasW + 20) {
                this.resultText = 'MISS!';
                audioManager.playMiss();
                this.state = 'result';
                this.resultTimer = 40;
            }
        } else if (this.state === 'result') {
            this.resultTimer--;
            if (this.resultTimer <= 0) {
                this.nextRound();
            }
        } else if (this.state === 'done') {
            this.resultTimer--;
            if (this.resultTimer <= 0) {
                this.active = false;
                if (this.onComplete) {
                    this.onComplete(this.catches, this.maxRounds);
                }
            }
        }
    }

    draw(ctx) {
        if (!this.active) return;

        // Background
        ctx.fillStyle = '#0f380f';
        ctx.fillRect(0, 0, this.canvasW, this.canvasH);

        // Title
        ctx.fillStyle = '#9bbc0f';
        ctx.font = '14px Press Start 2P';
        ctx.fillText('BLOOD SLIDES', 40, 30);

        // Round indicator
        ctx.font = '12px Press Start 2P';
        ctx.fillText(`${this.round}/${this.maxRounds}`, 130, 52);

        // Score
        ctx.fillText(`\u2665 ${this.catches}`, 10, 52);

        if (this.state === 'sliding' || this.state === 'result') {
            // Collection tray (target zone)
            ctx.fillStyle = '#306230';
            ctx.fillRect(this.targetZoneX, 150, this.targetZoneW, 60);
            ctx.strokeStyle = '#9bbc0f';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.targetZoneX, 150, this.targetZoneW, 60);

            // Tray label
            ctx.fillStyle = '#9bbc0f';
            ctx.font = '10px Press Start 2P';
            ctx.fillText('BOX', this.targetZoneX + 20, 186);

            // Slide (moving)
            if (this.state === 'sliding') {
                this.drawSlide(ctx, this.slideX, 158);
            }

            // TAP instruction
            if (this.state === 'sliding') {
                const blink = Math.floor(Date.now() / 300) % 2;
                if (blink) {
                    ctx.fillStyle = '#9bbc0f';
                    ctx.font = '14px Press Start 2P';
                    ctx.fillText('TAP!', 120, 260);
                }
            }
        }

        // Result text
        if (this.state === 'result') {
            ctx.fillStyle = this.resultText === 'MISS!' ? '#306230' : '#9bbc0f';
            ctx.font = '20px Press Start 2P';
            const tw = ctx.measureText(this.resultText).width;
            ctx.fillText(this.resultText, (this.canvasW - tw) / 2, 120);
        }

        // Final score
        if (this.state === 'done') {
            ctx.fillStyle = '#9bbc0f';
            ctx.font = '16px Press Start 2P';
            ctx.fillText('COMPLETE!', 56, 110);
            ctx.font = '14px Press Start 2P';
            ctx.fillText(`${this.catches}/${this.maxRounds}`, 104, 150);
            ctx.fillText('slides', 96, 180);

            if (this.catches === this.maxRounds) {
                ctx.fillText('PERFECT!', 80, 220);
            }
        }
    }

    drawSlide(ctx, x, y) {
        // Glass slide
        ctx.fillStyle = '#8bac0f';
        ctx.fillRect(x, y, 40, 16);
        // Blood drop
        ctx.fillStyle = '#9b0000';
        ctx.fillRect(x + 14, y + 4, 12, 8);
        // Glass shine
        ctx.fillStyle = '#9bbc0f';
        ctx.fillRect(x + 4, y + 2, 6, 2);
    }
}

const miniGame = new MiniGame();
