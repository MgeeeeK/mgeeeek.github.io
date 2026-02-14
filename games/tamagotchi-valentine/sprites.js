// ========================================
// DEXTER ALIEN PET SPRITES
// Canvas-based pixel art for all 5 evolution stages
// ========================================

class PetSprites {
    constructor() {
        this.animFrame = 0;
        this.animTimer = 0;
        this.bounceOffset = 0;
        this.currentAnim = 'idle'; // idle, eating, sleeping, happy, dead
    }

    update(dt) {
        this.animTimer += dt;
        if (this.animTimer > 150) {
            this.animFrame = (this.animFrame + 1) % 8;
            this.animTimer = 0;
        }
        // Idle bounce
        this.bounceOffset = Math.sin(this.animFrame * Math.PI / 4) * 2;
    }

    draw(ctx, stage, x, y, careQuality) {
        ctx.save();
        const yOff = this.currentAnim === 'dead' ? 0 : this.bounceOffset;
        ctx.translate(x, y + yOff);

        switch (stage) {
            case 'egg': this.drawEgg(ctx); break;
            case 'baby': this.drawBaby(ctx); break;
            case 'child': this.drawChild(ctx); break;
            case 'teen': this.drawTeen(ctx); break;
            case 'adult': this.drawAdult(ctx, careQuality); break;
        }

        // Overlay animations
        if (this.currentAnim === 'sleeping') {
            this.drawZZZ(ctx);
        } else if (this.currentAnim === 'eating') {
            this.drawEatingEffect(ctx);
        } else if (this.currentAnim === 'happy') {
            this.drawHappyEffect(ctx);
        } else if (this.currentAnim === 'dead') {
            this.drawDeathEffect(ctx);
        }

        ctx.restore();
    }

    // Pixel helper — draws a filled rectangle at pixel-art scale
    px(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w || 4, h || 4);
    }

    // ========================
    // STAGE: EGG
    // Dark red/maroon egg with pulsing glow
    // ========================
    drawEgg(ctx) {
        const pulse = Math.sin(this.animFrame * Math.PI / 4) * 0.15 + 0.85;

        // Glow
        ctx.globalAlpha = 0.3 * pulse;
        ctx.fillStyle = '#8b0000';
        this.drawOval(ctx, -20, -28, 40, 56, '#8b0000');
        ctx.globalAlpha = 1;

        // Egg body
        this.drawOval(ctx, -14, -22, 28, 44, '#4a0e0e');

        // Highlight
        this.px(ctx, -6, -16, 4, 8, '#6b1a1a');
        this.px(ctx, -4, -18, 4, 4, '#7a2020');

        // Dark vein pattern
        this.px(ctx, 2, -10, 4, 12, '#3a0808');
        this.px(ctx, -8, 0, 4, 8, '#3a0808');
        this.px(ctx, 6, 4, 4, 8, '#3a0808');

        // Crack lines (appears during animation)
        if (this.animFrame > 5) {
            ctx.strokeStyle = '#9bbc0f';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-2, -8);
            ctx.lineTo(2, -2);
            ctx.lineTo(-1, 4);
            ctx.stroke();
        }
    }

    // ========================
    // STAGE: BABY
    // Tiny blob with big dark eyes, antenna nubs
    // ========================
    drawBaby(ctx) {
        // Body — small round blob
        this.drawOval(ctx, -10, -8, 20, 20, '#5a3e3e');

        // Darker belly
        this.drawOval(ctx, -6, -2, 12, 12, '#4a2e2e');

        // Eyes — big and dark
        this.px(ctx, -6, -6, 4, 6, '#111111');
        this.px(ctx, 2, -6, 4, 6, '#111111');
        // Eye shine
        this.px(ctx, -6, -6, 2, 2, '#ffffff');
        this.px(ctx, 2, -6, 2, 2, '#ffffff');

        // Antenna nubs
        this.px(ctx, -4, -12, 3, 4, '#5a3e3e');
        this.px(ctx, 3, -12, 3, 4, '#5a3e3e');
        // Antenna tips
        this.px(ctx, -4, -14, 3, 2, '#8b0000');
        this.px(ctx, 3, -14, 3, 2, '#8b0000');

        // Tiny mouth
        if (this.currentAnim === 'eating') {
            this.px(ctx, -2, 4, 4, 3, '#111111');
        } else {
            this.px(ctx, -1, 4, 2, 1, '#111111');
        }

        // Tiny feet
        this.px(ctx, -8, 10, 4, 3, '#4a2e2e');
        this.px(ctx, 4, 10, 4, 3, '#4a2e2e');
    }

    // ========================
    // STAGE: CHILD
    // Dark hair appears, green clothing starts
    // ========================
    drawChild(ctx) {
        // Hair — dark brown/black, messy
        this.px(ctx, -10, -20, 20, 6, '#1a1a1a');
        this.px(ctx, -12, -16, 24, 4, '#222222');
        this.px(ctx, -8, -22, 4, 4, '#1a1a1a');
        this.px(ctx, 6, -22, 4, 4, '#1a1a1a');

        // Head
        this.drawOval(ctx, -10, -16, 20, 18, '#c4a882');

        // Eyes
        this.px(ctx, -6, -10, 4, 5, '#2d1f00');
        this.px(ctx, 4, -10, 4, 5, '#2d1f00');
        this.px(ctx, -6, -10, 2, 2, '#ffffff');
        this.px(ctx, 4, -10, 2, 2, '#ffffff');

        // Small smile
        this.px(ctx, -3, -2, 6, 1, '#8b4513');

        // Green shirt (Dexter's henley starting)
        this.px(ctx, -10, 2, 20, 14, '#4a7a4a');
        // Collar
        this.px(ctx, -4, 2, 8, 3, '#3a6a3a');

        // Arms
        this.px(ctx, -14, 4, 4, 10, '#4a7a4a');
        this.px(ctx, 10, 4, 4, 10, '#4a7a4a');
        // Hands
        this.px(ctx, -14, 12, 4, 3, '#c4a882');
        this.px(ctx, 10, 12, 4, 3, '#c4a882');

        // Khaki pants
        this.px(ctx, -8, 16, 7, 10, '#b8a878');
        this.px(ctx, 1, 16, 7, 10, '#b8a878');

        // Shoes
        this.px(ctx, -8, 26, 7, 3, '#333333');
        this.px(ctx, 1, 26, 7, 3, '#333333');

        // Antennae (alien feature, smaller now)
        this.px(ctx, -6, -24, 2, 4, '#5a3e3e');
        this.px(ctx, 6, -24, 2, 4, '#5a3e3e');
        this.px(ctx, -6, -26, 2, 2, '#8b0000');
        this.px(ctx, 6, -26, 2, 2, '#8b0000');
    }

    // ========================
    // STAGE: TEEN
    // Taller, green henley visible, knife roll accessory
    // ========================
    drawTeen(ctx) {
        // Hair — neat dark brown
        this.px(ctx, -10, -28, 20, 6, '#1a1a1a');
        this.px(ctx, -12, -24, 24, 4, '#222222');
        this.px(ctx, -12, -20, 2, 4, '#222222');
        this.px(ctx, 10, -20, 2, 4, '#222222');

        // Head
        this.drawOval(ctx, -10, -22, 20, 20, '#c4a882');

        // Eyes — more intense
        this.px(ctx, -6, -16, 4, 5, '#1a0f00');
        this.px(ctx, 4, -16, 4, 5, '#1a0f00');
        this.px(ctx, -6, -16, 2, 2, '#ffffff');
        this.px(ctx, 4, -16, 2, 2, '#ffffff');

        // Slight smirk
        this.px(ctx, -2, -6, 6, 1, '#8b4513');
        this.px(ctx, 4, -7, 2, 1, '#8b4513');

        // Green henley shirt
        this.px(ctx, -12, -2, 24, 18, '#4a7a4a');
        // Henley buttons
        this.px(ctx, -1, 0, 2, 2, '#3a5a3a');
        this.px(ctx, -1, 4, 2, 2, '#3a5a3a');
        this.px(ctx, -1, 8, 2, 2, '#3a5a3a');
        // Collar
        this.px(ctx, -4, -2, 8, 3, '#3a6a3a');

        // Arms
        this.px(ctx, -16, 0, 4, 14, '#4a7a4a');
        this.px(ctx, 12, 0, 4, 14, '#4a7a4a');
        // Hands
        this.px(ctx, -16, 12, 4, 3, '#c4a882');
        this.px(ctx, 12, 12, 4, 3, '#c4a882');

        // Khaki pants
        this.px(ctx, -10, 16, 9, 14, '#b8a878');
        this.px(ctx, 1, 16, 9, 14, '#b8a878');

        // Shoes
        this.px(ctx, -10, 30, 9, 3, '#333333');
        this.px(ctx, 1, 30, 9, 3, '#333333');

        // Knife roll accessory (held under arm)
        this.px(ctx, 14, 6, 6, 12, '#5a3a2a');
        this.px(ctx, 15, 7, 4, 10, '#4a2a1a');

        // Antennae (barely visible, hidden under hair)
        this.px(ctx, -6, -30, 2, 3, '#3a2828');
        this.px(ctx, 6, -30, 2, 3, '#3a2828');
    }

    // ========================
    // STAGE: ADULT
    // Full Dexter — dark hair, green henley, khakis
    // careQuality affects appearance
    // ========================
    drawAdult(ctx, careQuality) {
        const good = careQuality >= 0.5;

        // Hair
        const hairColor = good ? '#1a1a1a' : '#2a2a2a';
        this.px(ctx, -12, -32, 24, 6, hairColor);
        this.px(ctx, -14, -28, 28, 5, hairColor);
        this.px(ctx, -14, -24, 2, 6, hairColor);
        this.px(ctx, 12, -24, 2, 6, hairColor);
        // Parted hair (good care = neat, poor = messy)
        if (good) {
            this.px(ctx, -2, -34, 2, 4, '#333333');
        } else {
            this.px(ctx, -8, -34, 3, 3, hairColor);
            this.px(ctx, 4, -35, 4, 3, hairColor);
            this.px(ctx, -12, -34, 3, 3, hairColor);
        }

        // Head
        this.drawOval(ctx, -12, -26, 24, 24, '#c4a882');

        // Eyes
        if (good) {
            // Calm, focused eyes
            this.px(ctx, -8, -18, 5, 5, '#1a0f00');
            this.px(ctx, 5, -18, 5, 5, '#1a0f00');
            this.px(ctx, -7, -18, 2, 2, '#ffffff');
            this.px(ctx, 6, -18, 2, 2, '#ffffff');
        } else {
            // Wild, intense eyes
            this.px(ctx, -8, -18, 6, 6, '#1a0f00');
            this.px(ctx, 5, -18, 6, 6, '#1a0f00');
            this.px(ctx, -7, -17, 2, 2, '#ff3333');
            this.px(ctx, 6, -17, 2, 2, '#ff3333');
            // Eye bags
            this.px(ctx, -8, -12, 5, 2, '#9a8872');
            this.px(ctx, 5, -12, 5, 2, '#9a8872');
        }

        // Mouth
        if (good) {
            this.px(ctx, -3, -8, 8, 1, '#8b4513');
        } else {
            // Grimace
            this.px(ctx, -4, -8, 10, 2, '#6b2513');
        }

        // Green henley shirt
        this.px(ctx, -14, -2, 28, 22, good ? '#4a7a4a' : '#3a5a3a');
        // Henley buttons
        this.px(ctx, -1, 0, 2, 2, '#3a5a3a');
        this.px(ctx, -1, 5, 2, 2, '#3a5a3a');
        this.px(ctx, -1, 10, 2, 2, '#3a5a3a');
        // Collar
        this.px(ctx, -4, -2, 8, 4, '#3a6a3a');
        // Sleeves rolled up
        this.px(ctx, -18, 0, 4, 4, '#5a8a5a');
        this.px(ctx, 14, 0, 4, 4, '#5a8a5a');

        // Arms
        this.px(ctx, -18, 4, 4, 14, '#c4a882');
        this.px(ctx, 14, 4, 4, 14, '#c4a882');
        // Gloves (good care = latex gloves)
        if (good) {
            this.px(ctx, -18, 14, 4, 4, '#e8e8d0');
            this.px(ctx, 14, 14, 4, 4, '#e8e8d0');
        } else {
            this.px(ctx, -18, 14, 4, 4, '#c4a882');
            this.px(ctx, 14, 14, 4, 4, '#c4a882');
        }

        // Khaki pants
        this.px(ctx, -12, 20, 11, 16, '#b8a878');
        this.px(ctx, 1, 20, 11, 16, '#b8a878');
        // Belt
        this.px(ctx, -12, 20, 24, 3, '#5a4a3a');

        // Shoes
        this.px(ctx, -12, 36, 11, 4, '#333333');
        this.px(ctx, 1, 36, 11, 4, '#333333');

        // Blood slide box (good care accessory)
        if (good) {
            this.px(ctx, 16, 8, 8, 6, '#8b5a2a');
            this.px(ctx, 17, 9, 6, 4, '#6b3a1a');
            // Tiny red slides
            this.px(ctx, 18, 10, 1, 2, '#cc0000');
            this.px(ctx, 20, 10, 1, 2, '#cc0000');
        }

        // Antennae (hidden, just tiny bumps)
        this.px(ctx, -6, -34, 2, 2, '#2a2020');
        this.px(ctx, 6, -34, 2, 2, '#2a2020');
    }

    // ========================
    // ANIMATION EFFECTS
    // ========================
    drawZZZ(ctx) {
        const off = this.animFrame % 4;
        ctx.fillStyle = '#9bbc0f';
        ctx.font = '8px Press Start 2P';
        ctx.fillText('z', 14 + off, -20 - off * 4);
        ctx.font = '10px Press Start 2P';
        ctx.fillText('Z', 22 + off * 2, -28 - off * 4);
        ctx.font = '12px Press Start 2P';
        ctx.fillText('Z', 28 + off * 3, -38 - off * 4);
    }

    drawEatingEffect(ctx) {
        if (this.animFrame % 2 === 0) {
            // Food particles
            ctx.fillStyle = '#f9ca24';
            ctx.fillRect(-12, -4, 3, 3);
            ctx.fillRect(10, -2, 2, 2);
            ctx.fillRect(-8, 2, 2, 2);
        }
    }

    drawHappyEffect(ctx) {
        // Music notes / hearts
        const f = this.animFrame;
        ctx.fillStyle = '#ff6b9d';
        ctx.font = '10px Press Start 2P';
        ctx.fillText('\u2665', -20 + (f % 3) * 4, -30 - (f % 4) * 3);
        ctx.fillText('\u2665', 16 - (f % 2) * 3, -26 - (f % 3) * 4);
    }

    drawDeathEffect(ctx) {
        // Ghost floating up
        ctx.globalAlpha = 0.4 + Math.sin(this.animFrame * 0.5) * 0.2;
        ctx.fillStyle = '#888888';
        this.drawOval(ctx, -8, -20 - this.animFrame * 2, 16, 20, '#aaaaaa');
        // X eyes
        ctx.fillStyle = '#444444';
        ctx.font = '6px Press Start 2P';
        ctx.fillText('X', -6, -14 - this.animFrame * 2);
        ctx.fillText('X', 2, -14 - this.animFrame * 2);
        ctx.globalAlpha = 1;
    }

    // ========================
    // HELPERS
    // ========================
    drawOval(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    setAnimation(anim) {
        if (this.currentAnim !== anim) {
            this.currentAnim = anim;
            this.animFrame = 0;
            this.animTimer = 0;
        }
    }
}

// Global instance
const petSprites = new PetSprites();
