// ========================================
// SPRITE SYSTEM (REVAMPED)
// High-Fidelity Pixel Art & Juiced Animation
// ========================================

class SpriteSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.scale = 3;
        // Cache for color manipulation
        this.colorCache = {};
    }

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: false }); // Optimize
        this.ctx.imageSmoothingEnabled = false;
        this.resize();
    }

    resize() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        if (this.ctx) {
            this.ctx.imageSmoothingEnabled = false;
        }
    }

    // Helper: Lighten/Darken hex color for shading
    adjustColor(hex, lum) {
        const key = hex + lum;
        if (this.colorCache[key]) return this.colorCache[key];

        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        lum = lum || 0;

        let rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        this.colorCache[key] = rgb;
        return rgb;
    }

    getCharacterData(type) {
        // Kept original data structure for compatibility, tweaked hex codes for vibrancy
        const characters = {
            mragank: {
                name: 'MRAGANK',
                colors: { hair: '#222222', skin: '#ffdbac', shirt: '#ff4785', pants: '#2c3e50', shoes: '#111111', sword: '#e0e0e0', swordHandle: '#5d4037', swordGlow: '#fff176' }
            },
            R: {
                name: 'R', title: 'The DM Slider',
                colors: { hair: '#3e2723', skin: '#ffdbac', shirt: '#2980b9', pants: '#34495e', shoes: '#1a1a2e', accessory: '#ecf0f1' }
            },
            A: {
                name: 'A', title: 'The Situationship',
                colors: { hair: '#1a1a1a', skin: '#eec0a0', shirt: '#8e44ad', pants: '#2c3e50', shoes: '#000000' }
            },
            K: {
                name: 'K', title: 'The Emo Guitarist',
                colors: { hair: '#000000', skin: '#f5e0d0', shirt: '#111111', pants: '#050505', shoes: '#000000', accessory: '#5d4037' }
            },
            Vi: {
                name: 'Vi', title: 'The Gym Bro',
                colors: { hair: '#3e2723', skin: '#cd853f', shirt: '#c0392b', pants: '#34495e', shoes: '#1a1a2e', accessory: '#2ecc71' }
            },
            V: {
                name: 'V', title: 'The Comedian',
                colors: { hair: '#222222', skin: '#ffdbac', shirt: '#f39c12', pants: '#2c3e50', shoes: '#1a1a2e', accessory: '#7f8c8d' }
            },
            P: {
                name: 'P', title: 'The Pondicherry Guy',
                colors: { hair: '#222222', skin: '#ffdbac', shirt: '#ff0066', pants: '#f0f0f0', shoes: '#8d6e63', accessory: '#111111' }
            },
            S: {
                name: 'S', title: 'The 31-Year-Old Weirdo',
                colors: { hair: '#555555', skin: '#e0e0e0', shirt: '#6c5ce7', pants: '#1a1a2e', shoes: '#000000', accessory: '#ff0000' }
            },
            abhinandhini: {
                name: 'Abhinandhini', title: 'The One',
                colors: { hair: '#222222', skin: '#ffdbac', shirt: '#e84393', pants: '#d63031', shoes: '#ffffff', accessory: '#d35400' }
            }
        };
        return characters[type] || characters.mragank;
    }

    generateSpriteDataUrl(type, emotion = 'neutral', mouthOpen = false, view = 'portrait') {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        const originalCtx = this.ctx;
        const originalScale = this.scale;

        this.ctx = ctx;

        // Default emotion for Mragank is sad/determined unless specified
        if (type === 'mragank' && emotion === 'neutral') {
            emotion = 'sad';
        }

        if (view === 'fullbody') {
            tempCanvas.width = 240;
            tempCanvas.height = 300;
            this.scale = 4.5;
            
            // Draw full body, feet near bottom
            if (type === 'mragank') {
                this.drawMragank(120, 270, 'idle', 0, emotion, mouthOpen);
            } else {
                this.drawEnemy(120, 270, type, 'idle', 0, emotion, mouthOpen);
            }
        } else {
            // Portrait Mode (Zoomed in on face)
            tempCanvas.width = 160;
            tempCanvas.height = 200;
            this.scale = 5; 

            if (type === 'mragank') {
                this.drawMragank(80, 180, 'victory', 0, emotion, mouthOpen);
            } else {
                this.drawEnemy(80, 180, type, 'idle', 0, emotion, mouthOpen);
            }
        }

        this.ctx = originalCtx;
        this.scale = originalScale;
        return tempCanvas.toDataURL();
    }

    // Core Rendering: Draws a rectangle with shading to create volume (pseudo-3D)
    drawShadedRect(x, y, w, h, color, skipTop = false) {
        const s = this.scale;
        const rx = Math.round(x * s);
        const ry = Math.round(y * s);
        const rw = Math.round(w * s);
        const rh = Math.round(h * s);

        // Base
        this.ctx.fillStyle = color;
        this.ctx.fillRect(rx, ry, rw, rh);

        // Highlight (Left/Top) - "Rim Light"
        this.ctx.fillStyle = this.adjustColor(color, 0.2);
        this.ctx.fillRect(rx, ry, s, rh); // Left edge
        if (!skipTop) this.ctx.fillRect(rx, ry, rw, s); // Top edge

        // Shadow (Right/Bottom)
        this.ctx.fillStyle = this.adjustColor(color, -0.2);
        this.ctx.fillRect(rx + rw - s, ry, s, rh); // Right edge
        this.ctx.fillRect(rx, ry + rh - s, rw, s); // Bottom edge
    }

    drawEyes(x, y, emotion) {
        const s = this.scale;
        this.ctx.save();
        this.ctx.translate(x * s, y * s);

        this.ctx.fillStyle = '#fff';
        
        // Left Eye Base
        if (emotion !== 'sad' && emotion !== 'pain') {
             this.ctx.fillRect(-5 * s, 0, 4 * s, 3 * s);
        }
        
        // Right Eye Base
        if (emotion !== 'pain') {
            this.ctx.fillRect(2 * s, 0, 4 * s, 3 * s);
        }

        this.ctx.fillStyle = '#000'; // Pupil

        // Pupils & Eyelids
        switch (emotion) {
            case 'angry':
                // Angled eyebrows (simulated by cutting top)
                this.ctx.fillRect(-3 * s, 0, 2 * s, 2 * s);
                this.ctx.fillRect(4 * s, 0, 2 * s, 2 * s);
                // Brows
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(-5 * s, -1 * s, 5 * s, 1 * s); // L
                this.ctx.fillRect(2 * s, -1 * s, 5 * s, 1 * s);  // R
                break;
            case 'sad':
                // Droopy
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(-5 * s, 1 * s, 4 * s, 2 * s);
                this.ctx.fillRect(2 * s, 1 * s, 4 * s, 2 * s);
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(-3 * s, 2 * s, 2 * s, 1 * s);
                this.ctx.fillRect(4 * s, 2 * s, 2 * s, 1 * s);
                break;
            case 'happy':
                // ^ ^ eyes
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 1 * s;
                this.ctx.beginPath();
                this.ctx.moveTo(-5 * s, 2 * s);
                this.ctx.lineTo(-3 * s, 0);
                this.ctx.lineTo(-1 * s, 2 * s);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(2 * s, 2 * s);
                this.ctx.lineTo(4 * s, 0);
                this.ctx.lineTo(6 * s, 2 * s);
                this.ctx.stroke();
                break;
            case 'bored':
                // Half-lidded / Looking away
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(-5 * s, 0, 4 * s, 3 * s);
                this.ctx.fillRect(2 * s, 0, 4 * s, 3 * s);
                // Eyelids
                this.ctx.fillStyle = '#eec0a0'; // Skin color roughly
                this.ctx.fillRect(-5 * s, 0, 4 * s, 1.5 * s);
                this.ctx.fillRect(2 * s, 0, 4 * s, 1.5 * s);
                // Pupils (Side eye)
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(-2 * s, 1 * s, 2 * s, 2 * s);
                this.ctx.fillRect(5 * s, 1 * s, 2 * s, 2 * s);
                break;
            case 'nervous':
                // Small pupils
                this.ctx.fillRect(-4 * s, 1 * s, 2 * s, 2 * s);
                this.ctx.fillRect(3 * s, 1 * s, 2 * s, 2 * s);
                break;
            default: // Neutral
                this.ctx.fillRect(-3 * s, 0, 2 * s, 2 * s);
                this.ctx.fillRect(4 * s, 0, 2 * s, 2 * s);
                break;
        }
        this.ctx.restore();
    }

    drawMouth(x, y, emotion, isOpen) {
        const s = this.scale;
        this.ctx.save();
        this.ctx.translate(x * s, y * s);
        this.ctx.fillStyle = '#000'; // Mouth interior usually dark or line

        if (isOpen) {
             // Speaking/Open
             this.ctx.fillRect(-2 * s, 0, 5 * s, 2 * s);
        } else {
            // Closed
            switch (emotion) {
                case 'happy':
                    this.ctx.fillRect(-2 * s, 1 * s, 5 * s, 1 * s); // Smile
                    this.ctx.fillStyle = '#d35400'; // Lip/Corner
                    this.ctx.fillRect(-3 * s, 0, 1 * s, 1 * s);
                    this.ctx.fillRect(3 * s, 0, 1 * s, 1 * s);
                    break;
                case 'angry':
                    this.ctx.fillRect(-2 * s, 1 * s, 5 * s, 1 * s); // Frown/Straight
                    break;
                case 'sad':
                     this.ctx.beginPath();
                     this.ctx.strokeStyle = '#000';
                     this.ctx.lineWidth = 1 * s;
                     this.ctx.arc(0.5 * s, 3 * s, 3 * s, Math.PI, 0);
                     this.ctx.stroke();
                    break;
                case 'bored':
                    this.ctx.fillRect(-1 * s, 1 * s, 3 * s, 1 * s); // Small flat line
                    break;
                case 'nervous':
                     // Wavy mouth
                     this.ctx.beginPath();
                     this.ctx.strokeStyle = '#000';
                     this.ctx.lineWidth = 1 * s;
                     this.ctx.moveTo(-2 * s, 1 * s);
                     this.ctx.lineTo(0, 2 * s);
                     this.ctx.lineTo(2 * s, 1 * s);
                     this.ctx.stroke();
                    break;
                default:
                    this.ctx.fillRect(-1 * s, 1 * s, 3 * s, 1 * s);
                    break;
            }
        }
        this.ctx.restore();
    }

    // Helper: Rounded Rect
    drawRoundedRect(x, y, w, h, r, color) {
        const ctx = this.ctx;
        const s = this.scale;
        x *= s; y *= s; w *= s; h *= s; r *= s;
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
        
        // Simple shading
        ctx.fillStyle = this.adjustColor(color, -0.1);
        ctx.beginPath();
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI/2);
        ctx.lineTo(x + w, y + h - r);
        ctx.lineTo(x + w - r, y + h);
        ctx.fill();
    }

    drawCircle(x, y, r, color) {
        const ctx = this.ctx;
        const s = this.scale;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x * s, y * s, r * s, 0, Math.PI * 2);
        ctx.fill();
        
        // Shine
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(x * s - r * s * 0.3, y * s - r * s * 0.3, r * s * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawMragank(x, y, state = 'idle', frame = 0, emotion = 'sad', mouthOpen = false) {
        const char = this.getCharacterData('mragank');
        const c = char.colors;

        this.ctx.save();
        this.ctx.translate(x, y);

        // Breathe animation
        const breathe = Math.sin(frame * 0.1);
        const scaleY = 1 + (breathe * 0.02);
        this.ctx.scale(1, scaleY);

        let bodyY = 0;
        let armAngle = 0;
        let swordAngle = -45; 
        let swordX = -8;
        let swordY = 0;

        switch (state) {
            case 'idle': bodyY = breathe * 2; armAngle = breathe * 5; break;
            case 'attack_windup': bodyY = 4; swordAngle = -130; armAngle = -45; swordX = -15; if (emotion === 'sad') emotion = 'angry'; break;
            case 'attack_swing': swordAngle = 60; swordX = 25; swordY = 10; bodyY = 2; if (emotion === 'sad') emotion = 'angry'; break;
            case 'hit': this.ctx.translate((Math.random() - 0.5) * 5, 0); armAngle = -90; emotion = 'pain'; break;
            case 'victory': swordAngle = -90; swordY = -25; emotion = 'happy'; break;
            case 'block': swordAngle = 0; swordX = 12; break;
        }

        const s = this.scale;

        // Legs (Rounded)
        this.drawRoundedRect(-7, 12 + bodyY, 6, 14, 2, c.pants); // L
        this.drawRoundedRect(1, 12 + bodyY, 6, 14, 2, c.pants);  // R

        // Shoes
        this.drawRoundedRect(-8, 24 + bodyY, 8, 5, 2, c.shoes);
        this.drawRoundedRect(2, 24 + bodyY, 8, 5, 2, c.shoes);

        // Torso (Rounded)
        this.drawRoundedRect(-10, -4 + bodyY, 20, 18, 4, c.shirt);
        
        // Head Group
        const headY = bodyY - 1;
        // Head (Circle)
        this.drawCircle(0, -12 + headY, 10, c.skin);
        
        // Face Features
        this.drawEyes(0, -12 + headY, emotion);
        this.drawMouth(0, -8 + headY, emotion, mouthOpen);
        
        // Hair (More organic)
        this.ctx.fillStyle = c.hair;
        this.ctx.beginPath();
        this.ctx.arc(0 * s, (-14 + headY) * s, 11 * s, Math.PI, 0); // Top dome
        this.ctx.lineTo(10 * s, (-10 + headY) * s);
        this.ctx.lineTo(10 * s, (-5 + headY) * s); // Sideburn R
        this.ctx.lineTo(8 * s, (-5 + headY) * s);
        this.ctx.lineTo(8 * s, (-12 + headY) * s);
        this.ctx.lineTo(-8 * s, (-12 + headY) * s);
        this.ctx.lineTo(-8 * s, (-5 + headY) * s); // Sideburn L
        this.ctx.lineTo(-10 * s, (-5 + headY) * s);
        this.ctx.lineTo(-10 * s, (-10 + headY) * s);
        this.ctx.fill();

        // Hands (Circles)
        this.drawCircle(-12, 4 + bodyY, 3, c.skin); // Back hand
        
        // Front Arm/Hand with Sword
        this.ctx.save();
        this.ctx.translate(10 * s, (4 + bodyY) * s);
        this.ctx.rotate(armAngle * Math.PI / 180);
        this.drawCircle(0, 0, 3, c.skin); 
        this.ctx.restore();

        // Sword
        this.drawSword(swordX, swordY + bodyY, swordAngle, c, state === 'attack_swing');

        this.ctx.restore();
    }

    drawSword(offsetX, offsetY, angle, colors, isSwinging) {
        const s = this.scale;
        this.ctx.save();
        this.ctx.translate((10 + offsetX) * s, (5 + offsetY) * s);
        this.ctx.rotate(angle * Math.PI / 180);

        if (isSwinging) {
            this.ctx.shadowColor = colors.swordGlow;
            this.ctx.shadowBlur = 20;
        }

        // Handle
        this.drawShadedRect(-2, 0, 4, 10, colors.swordHandle);
        // Pommel
        this.drawShadedRect(-3, 10, 6, 2, '#444');
        // Guard (Crossguard)
        this.drawShadedRect(-6, -2, 12, 4, '#ffd700'); // Gold guard
        // Blade (Main)
        this.drawShadedRect(-3, -32, 6, 30, '#bdc3c7');
        // Blade (Shine/Center)
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(-1 * s, -30 * s, 2 * s, 26 * s);
        
        // Tip
        this.ctx.beginPath();
        this.ctx.moveTo(-3 * s, -32 * s);
        this.ctx.lineTo(0, -38 * s); // Sharp tip
        this.ctx.lineTo(3 * s, -32 * s);
        this.ctx.fillStyle = '#bdc3c7';
        this.ctx.fill();

        this.ctx.restore();
    }

    drawEnemy(x, y, type, state = 'idle', frame = 0, emotion = 'neutral', mouthOpen = false) {
        if (state === 'exploded') return;

        const char = this.getCharacterData(type);
        const c = char.colors;
        const isWide = type === 'Vi';

        this.ctx.save();
        this.ctx.translate(x, y);

        let bounce = Math.sin(frame * 0.12) * 2;
        let tilt = 0;
        
        switch (state) {
            case 'idle': if(type === 'Vi') bounce = Math.abs(Math.sin(frame * 0.05)) * 3; break;
            case 'attack': this.ctx.translate(-15 * (frame % 3), 0); tilt = -15; break;
            case 'hit': bounce = 0; tilt = 20; this.ctx.filter = 'brightness(200%)'; break;
            case 'knocked_down': this.ctx.rotate(90 * Math.PI / 180); this.ctx.translate(0, -30); break;
        }

        this.ctx.rotate(tilt * Math.PI / 180);

        const s = this.scale;
        const bodyY = bounce;
        const torsoWidth = isWide ? 26 : 18;
        const torsoX = isWide ? -13 : -9;

        // Legs
        this.drawRoundedRect(-8, 12 + bodyY, 6, 14, 2, c.pants);
        this.drawRoundedRect(2, 12 + bodyY, 6, 14, 2, c.pants);

        // Shoes
        this.drawRoundedRect(-9, 24 + bodyY, 8, 5, 2, c.shoes);
        this.drawRoundedRect(3, 24 + bodyY, 8, 5, 2, c.shoes);

        // Torso
        this.drawRoundedRect(torsoX, -4 + bodyY, torsoWidth, 18, 4, c.shirt);
        
        // Arms (Circles)
        this.drawCircle(torsoX - 2, 4 + bodyY, 3, c.skin); // L
        this.drawCircle(torsoX + torsoWidth + 2, 4 + bodyY, 3, c.skin); // R

        // Head
        this.drawCircle(0, -12 + bodyY, 10, c.skin);

        // Face Details
        this.drawEnemyFace(type, c, bodyY, emotion, mouthOpen);

        // Hair
        this.drawEnemyHair(type, c, bodyY);

        // Accessory
        if (state !== 'knocked_down') {
            this.drawAccessory(type, c, bodyY);
        }

        // Weapon
        if (type !== 'R' && type !== 'abhinandhini') {
            this.drawEnemyWeapon(state, bodyY, type);
        }

        this.ctx.restore();
    }

    drawEnemyFace(type, c, bodyY, emotion, mouthOpen) {
        const s = this.scale;
        this.ctx.fillStyle = '#000';
        
        // Special Faces
        if (type === 'K') { // Emo - one eye
            this.ctx.fillRect(3 * s, (-11 + bodyY) * s, 3 * s, 3 * s);
            this.drawMouth(0, -6 + bodyY, emotion, mouthOpen);
        } else if (type === 'S') { // Weirdo - glowing red eyes
            this.ctx.fillStyle = '#ff0000';
            this.ctx.shadowColor = '#f00';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(-5 * s, (-12 + bodyY) * s, 4 * s, 4 * s);
            this.ctx.fillRect(2 * s, (-12 + bodyY) * s, 4 * s, 4 * s);
            this.ctx.shadowBlur = 0;
            this.drawMouth(0, -6 + bodyY, emotion, mouthOpen);
        } else if (type === 'A') { // Situationship - confused
             this.ctx.fillRect(-5 * s, (-13 + bodyY) * s, 3 * s, 2 * s);
             this.ctx.fillRect(3 * s, (-11 + bodyY) * s, 3 * s, 4 * s); // One eye wider
             this.drawMouth(0, -6 + bodyY, emotion, mouthOpen);
        } else {
             // Standard
             this.drawEyes(0, -11 + bodyY, emotion);
             this.drawMouth(0, -6 + bodyY, emotion, mouthOpen);
        }
    }

    drawEnemyHair(type, c, bodyY) {
        if (type === 'K') { // Emo swoosh
            this.drawShadedRect(-12, -24 + bodyY, 24, 10, c.hair);
            this.drawShadedRect(-12, -14 + bodyY, 14, 12, c.hair); // Covers left eye
        } else if (type === 'Vi') { // Fade
            this.drawShadedRect(-8, -22 + bodyY, 16, 6, c.hair);
        } else if (type === 'S') { // Balding
            this.drawShadedRect(-10, -20 + bodyY, 4, 6, c.hair);
            this.drawShadedRect(6, -20 + bodyY, 4, 6, c.hair);
        } else { // Standard
            this.drawShadedRect(-10, -24 + bodyY, 20, 8, c.hair);
            this.drawShadedRect(-11, -16 + bodyY, 4, 6, c.hair);
            this.drawShadedRect(7, -16 + bodyY, 4, 6, c.hair);
        }
    }

    drawAccessory(type, c, bodyY) {
        const s = this.scale;
        if (type === 'R') { // Phone
            this.drawShadedRect(14, 4 + bodyY, 5, 8, '#333');
            this.ctx.fillStyle = '#81d4fa'; // Screen on
            this.ctx.fillRect(15 * s, (5 + bodyY) * s, 3 * s, 6 * s);
        }
        else if (type === 'Vi') { // Shaker
            this.drawShadedRect(-18, 2 + bodyY, 6, 10, c.accessory);
            this.drawShadedRect(-17, 0 + bodyY, 4, 2, '#fff');
        }
        else if (type === 'P') { // Shades
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(-6 * s, (-12 + bodyY) * s, 13 * s, 3 * s);
        }
        else if (type === 'abhinandhini') { // Cookie
            this.ctx.fillStyle = c.accessory || '#d35400';
            this.ctx.beginPath();
            this.ctx.arc(14 * s, (6 + bodyY) * s, 3.5 * s, 0, Math.PI * 2);
            this.ctx.fill();
            // Choco chips
            this.ctx.fillStyle = '#2d1a0e';
            this.ctx.fillRect(13 * s, (5 + bodyY) * s, 1 * s, 1 * s);
            this.ctx.fillRect(15 * s, (7 + bodyY) * s, 1 * s, 1 * s);
        }
    }

    drawEnemyWeapon(state, bodyY, type) {
        const s = this.scale;
        let angle = 20;
        let ox = -15;
        
        if (state === 'attack') {
            angle = -45;
            ox = -25;
        }

        this.ctx.save();
        this.ctx.translate((ox) * s, (8 + bodyY) * s);
        this.ctx.rotate(angle * Math.PI / 180);

        // Simple weapon for enemies
        this.drawShadedRect(-2, -20, 4, 20, '#95a5a6'); // Blade
        this.drawShadedRect(-3, 0, 6, 2, '#7f8c8d');   // Guard
        this.drawShadedRect(-2, 2, 4, 6, '#5d4037');   // Handle

        this.ctx.restore();
    }

    // Modern Slash Effect using curves instead of lines
    drawSlashEffect(x, y, progress) {
        const s = this.scale;
        this.ctx.save();
        this.ctx.translate(x, y);

        const alpha = 1 - Math.pow(progress, 3); // Fade out cubic
        const size = 100 * s;
        
        this.ctx.beginPath();
        // Crescent moon shape
        this.ctx.arc(0, 0, size * progress, -Math.PI/3, Math.PI/1.5);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.lineWidth = 4 * s;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        // Inner Yellow Core
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size * progress * 0.8, -Math.PI/3, Math.PI/1.5);
        this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        this.ctx.lineWidth = 2 * s;
        this.ctx.stroke();

        this.ctx.restore();
    }

    // Physics-based particles
    drawImpactParticles(particles) {
        const s = this.scale;
        particles.forEach(p => {
            this.ctx.save();
            this.ctx.translate((p.baseX + p.x) * s, (p.baseY + p.y) * s);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color || `rgb(${p.r}, ${p.g}, ${p.b})`;
            // Draw diamond shape instead of square
            this.ctx.beginPath();
            this.ctx.moveTo(0, -p.size * s);
            this.ctx.lineTo(p.size * s, 0);
            this.ctx.lineTo(0, p.size * s);
            this.ctx.lineTo(-p.size * s, 0);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawDamageNumber(x, y, damage, progress) {
        const s = this.scale;
        // Parabolic arc for movement
        const lift = Math.sin(progress * Math.PI) * 50; 
        
        this.ctx.save();
        const text = String(damage);
        const fontSize = text.length > 3 ? 8 : 12; // Smaller font for long insults
        this.ctx.font = `900 ${fontSize * s}px "Courier New", monospace`; 
        this.ctx.textAlign = 'center';
        
        // Text Shadow/Outline
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 4;
        this.ctx.strokeText(text, x, y - lift);
        
        // Gradient Text
        const gradient = this.ctx.createLinearGradient(0, y-lift-10, 0, y-lift);
        gradient.addColorStop(0, '#ffeb3b');
        gradient.addColorStop(1, '#ff5252');
        this.ctx.fillStyle = gradient;
        this.ctx.fillText(text, x, y - lift);
        
        this.ctx.restore();
    }

    clear() {
        if (this.ctx) {
            // Using fillRect with color is faster than clearRect for games usually
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// ========================================
// SPRITE ANIMATOR
// Controls the loop and "Juice"
// ========================================

class SpriteAnimator {
    constructor(spriteSystem) {
        this.sprites = spriteSystem;
        this.playerState = 'idle';
        this.enemyState = 'idle';
        this.enemyType = 'R';
        this.frame = 0;
        this.slashEffects = [];
        this.impactParticles = [];
        this.damageNumbers = [];
        this.bloodPools = []; // Pools on the floor
        this.isAnimating = false;
        this.animationId = null;
        this.location = null; // Current location for background
        
        // Juice properties
        this.screenShake = 0;
        this.hitFlash = 0;
    }

    reinit(spriteSystem) {
        this.sprites = spriteSystem;
    }

    setEnemyType(type) {
        this.enemyType = type;
        this.reset();
    }
    
    setLocation(loc) {
        this.location = loc;
    }

    setPlayerState(state) {
        this.playerState = state;
        if(state === 'attack_swing') this.triggerShake(5);
    }

    setEnemyState(state) {
        this.enemyState = state;
    }

    triggerShake(amount) {
        this.screenShake = amount;
    }

    addSlash(x, y) {
        this.slashEffects.push({ x, y, progress: 0, speed: 0.1 });
    }

    addImpact(x, y, color = {r: 255, g: 255, b: 255}) {
        this.hitFlash = 5; // White flash frames
        this.triggerShake(10);
        
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            const speed = Math.random() * 5 + 2;
            this.impactParticles.push({
                x: 0, y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                size: 2 + Math.random() * 2,
                alpha: 1,
                r: color.r, g: color.g, b: color.b,
                baseX: x, baseY: y
            });
        }
    }

    addBloodSplash(x, y) {
        this.triggerShake(15);
        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;
            this.impactParticles.push({
                x: 0, y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2, // Upward bias
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 4 + 2,
                alpha: 1,
                color: '#8a0303', // BLOOD RED
                baseX: x, baseY: y
            });
        }
    }

    explodeEnemy(x, y, type) {
        this.triggerShake(30); // More shake
        const char = this.sprites.getCharacterData(type);
        const c = char.colors;
        const debrisColors = [c.skin, c.shirt, c.pants, c.shoes, c.hair, '#8a0303', '#ff0000', '#600000']; 
        
        // SLOW MOTION EXPLOSION
        
        // 1. Body Parts (Chunks)
        for (let i = 0; i < 120; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 2;
            const color = debrisColors[Math.floor(Math.random() * debrisColors.length)];
            
            this.impactParticles.push({
                x: 0, y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 6, // Higher upward arc
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 8 + 3,
                alpha: 1,
                color: color, 
                baseX: x, baseY: y,
                gravity: 0.15, // Low gravity for "floaty" feel
                drag: 0.96, // Low drag
                fade: 0.005 // Very slow fade
            });
        }
        
        // 2. Blood Mist (Fine spray)
         for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;
            this.impactParticles.push({
                x: 0, y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rotation: 0,
                rotSpeed: 0,
                size: Math.random() * 3 + 1, 
                alpha: 1,
                color: '#ff0000',
                baseX: x, baseY: y,
                gravity: 0.05,
                drag: 0.95,
                fade: 0.002 // Lingers in air
            });
        }

        // 3. Blood Pools (Spilling on floor)
        // Ensure they spawn at the feet level (y is center, so add some offset)
        const feetY = y + 30 * this.sprites.scale; 
        
        for (let i = 0; i < 5; i++) {
            this.bloodPools.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y + 35, // Near feet
                width: 1,
                height: 0.5,
                targetWidth: 40 + Math.random() * 60,
                targetHeight: 15 + Math.random() * 20,
                growthSpeed: 0.5 + Math.random() * 1,
                color: '#8a0303',
                alpha: 0.9
            });
        }
    }

    addDamage(x, y, damage) {
        this.damageNumbers.push({ x, y, damage, progress: 0, speed: 0.01 });
    }

    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.lastTime = performance.now();
        this.animate(this.lastTime);
    }

    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate(timestamp) {
        if (!this.isAnimating) return;
        
        // Frame limiting logic could go here, but smooth 60fps is better for pixel art
        this.frame++;
        const w = this.sprites.canvas.width;
        const h = this.sprites.canvas.height;

        // Apply Screen Shake
        const shakeX = (Math.random() - 0.5) * this.screenShake;
        const shakeY = (Math.random() - 0.5) * this.screenShake;
        if (this.screenShake > 0) this.screenShake *= 0.9; // Decay shake

        this.sprites.ctx.save();
        this.sprites.ctx.translate(shakeX, shakeY);

        // Draw Background
        this.drawAtmosphere(w, h, this.frame);

        // Character Positioning
        const playerX = w * 0.3;
        const playerY = h * 0.75;
        const enemyX = w * 0.7;
        const enemyY = h * 0.75;

        // Draw Blood Pools (Before characters, so they stand on it if alive, or under debris)
        this.drawBloodPools();

        // Draw Characters
        // Draw shadow ellipses under feet
        this.sprites.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.sprites.ctx.beginPath();
        this.sprites.ctx.ellipse(playerX, playerY + 30 * this.sprites.scale, 40, 10, 0, 0, Math.PI*2);
        this.sprites.ctx.ellipse(enemyX, enemyY + 30 * this.sprites.scale, 40, 10, 0, 0, Math.PI*2);
        this.sprites.ctx.fill();

        this.sprites.drawMragank(playerX, playerY, this.playerState, this.frame);
        this.sprites.drawEnemy(enemyX, enemyY, this.enemyType, this.enemyState, this.frame);

        // Effects Layers
        this.updateAndDrawEffects();

        // Hit Flash Overlay
        if (this.hitFlash > 0) {
            this.sprites.ctx.fillStyle = `rgba(255, 255, 255, ${this.hitFlash * 0.1})`;
            this.sprites.ctx.fillRect(0, 0, w, h);
            this.hitFlash--;
        }

        this.sprites.ctx.restore();

        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    drawBloodPools() {
        const s = this.sprites.scale;
        this.bloodPools.forEach(pool => {
            this.sprites.ctx.save();
            this.sprites.ctx.translate(pool.x, pool.y);
            this.sprites.ctx.scale(s, s);
            this.sprites.ctx.fillStyle = pool.color;
            this.sprites.ctx.globalAlpha = pool.alpha;
            this.sprites.ctx.beginPath();
            this.sprites.ctx.ellipse(0, 0, pool.width, pool.height, 0, 0, Math.PI * 2);
            this.sprites.ctx.fill();
            this.sprites.ctx.restore();
        });
    }

    updateAndDrawEffects() {
        // Update
        this.slashEffects = this.slashEffects.filter(s => { s.progress += s.speed; return s.progress < 1; });
        
        // Update Particles (Physics)
        this.impactParticles = this.impactParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += (p.gravity || 0.5); // Custom gravity
            p.vx *= (p.drag || 0.95);   // Custom drag
            p.rotation += p.rotSpeed;
            p.alpha -= (p.fade || 0.03); // Custom fade
            return p.alpha > 0;
        });
        
        // Update Blood Pools (Growth)
        this.bloodPools.forEach(pool => {
            if (pool.width < pool.targetWidth) pool.width += pool.growthSpeed;
            if (pool.height < pool.targetHeight) pool.height += pool.growthSpeed * 0.5;
        });

        this.damageNumbers = this.damageNumbers.filter(d => { d.progress += d.speed; return d.progress < 1; });

        // Draw
        this.slashEffects.forEach(s => this.sprites.drawSlashEffect(s.x, s.y, s.progress));
        this.sprites.drawImpactParticles(this.impactParticles);
        this.damageNumbers.forEach(d => this.sprites.drawDamageNumber(d.x, d.y, d.damage, d.progress));
    }

    drawAtmosphere(w, h, frame) {
        const ctx = this.sprites.ctx;
        
        // --- CONSISTENT NIGHT CITY THEME ---

        // 1. Sky Gradient (Deep Night)
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#0f0c29'); // Deep Purple/Black
        gradient.addColorStop(0.6, '#302b63'); // Rich Purple
        gradient.addColorStop(1, '#24243e'); // Dark Blue
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // 2. Stars (Static to avoid distracting flickering)
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 80; i++) {
            // Deterministic positions based on index
            const x = (Math.sin(i * 12.9898) * 43758.5453 % 1 * w + w) % w;
            const y = (Math.cos(i * 78.233) * 43758.5453 % 1 * h * 0.6);
            const size = (i % 3 === 0) ? 2 : 1;
            // Subtle twinkle
            const twinkle = Math.abs(Math.sin(frame * 0.02 + i));
            ctx.globalAlpha = 0.3 + twinkle * 0.7;
            ctx.fillRect(x, y, size, size);
        }
        ctx.globalAlpha = 1.0;

        // 3. Moon
        ctx.fillStyle = '#fdfbf7';
        ctx.shadowColor = '#fdfbf7';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(w * 0.85, h * 0.15, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 4. City Skyline (Layered)
        
        // Layer 1: Distant Buildings (Dark silhouette, no lights)
        ctx.fillStyle = '#1a1a2e';
        this.drawBuildings(ctx, w, h, 0.4, 5, 12345, false);

        // Layer 2: Mid-distance (Slightly lighter, no lights)
        ctx.fillStyle = '#202035';
        this.drawBuildings(ctx, w, h, 0.5, 7, 67890, false);

        // Layer 3: Foreground Buildings (Detailed with lights)
        ctx.fillStyle = '#0f0f1a';
        this.drawBuildings(ctx, w, h, 0.7, 10, 54321, true);
    }

    drawBuildings(ctx, w, h, heightScale, widthFactor, seed, lights) {
        let currentX = -50; // Start off-screen
        let index = 0;
        
        while (currentX < w) {
            // Deterministic random generation
            const r1 = Math.abs(Math.sin(index * 123.45 + seed)); 
            const r2 = Math.abs(Math.cos(index * 678.90 + seed));
            
            const bWidth = 60 + r1 * 80;
            const bHeight = h * 0.1 + r2 * (h * heightScale); 
            
            // Draw building body
            ctx.fillRect(currentX, h - bHeight, bWidth, bHeight);
            
            // Draw Lights (Windows)
            if (lights && r1 > 0.4) { // Not all buildings are lit
                ctx.fillStyle = (r2 > 0.5) ? '#f9ca24' : '#f1c40f'; // Varied yellow
                const winSize = 4;
                const winGapX = 12;
                const winGapY = 16;
                
                // Grid of windows
                for (let wy = h - bHeight + 20; wy < h - 20; wy += winGapY) {
                    for (let wx = currentX + 10; wx < currentX + bWidth - 10; wx += winGapX) {
                        // Randomly toggle windows
                        if (Math.abs(Math.sin(wx * wy + seed)) > 0.3) {
                            ctx.fillRect(wx, wy, winSize, winSize + 2);
                        }
                    }
                }
                ctx.fillStyle = '#0f0f1a'; // Restore building color for next rect (optimization)
            }
            
            currentX += bWidth - 5; // Slight overlap
            index++;
        }
    }

    reset() {
        this.slashEffects = [];
        this.impactParticles = [];
        this.damageNumbers = [];
        this.bloodPools = [];
        this.playerState = 'idle';
        this.enemyState = 'idle';
        this.frame = 0;
        this.screenShake = 0;
    }
}

// Global instances
const spriteSystem = new SpriteSystem();
const spriteAnimator = new SpriteAnimator(spriteSystem);

window.spriteSystem = spriteSystem;
