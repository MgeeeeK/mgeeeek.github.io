// ========================================
// SCENE MANAGER
// Controls game flow and scene transitions
// ========================================

class SceneManager {
    constructor() {
        this.screens = {
            loading: document.getElementById('loading-screen'),
            title: document.getElementById('title-screen'),
            dialogue: document.getElementById('dialogue-screen'),
            bossSplash: document.getElementById('boss-splash'),
            combat: document.getElementById('combat-screen'),
            victory: document.getElementById('victory-screen'),
            proposal: document.getElementById('proposal-screen'),
            ending: document.getElementById('ending-screen')
        };

        this.currentScreen = 'loading';
        this.sceneCanvas = document.getElementById('scene-canvas');
        this.sceneCtx = this.sceneCanvas ? this.sceneCanvas.getContext('2d') : null;
        
        // Location Marker
        this.locationSign = document.getElementById('location-sign');
        this.locationText = document.getElementById('location-text');
    }

    showScreen(screenName, transition = true) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });

        // Show target screen
        const targetScreen = this.screens[screenName];
        if (targetScreen) {
            if (transition) {
                targetScreen.classList.add('fade-in');
                setTimeout(() => targetScreen.classList.remove('fade-in'), 500);
            }
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
        
        // Default: hide location sign. Explicitly shown via setLocation
        if (this.locationSign) this.locationSign.classList.add('hidden');
    }

    setLocation(name) {
        if (this.locationSign && this.locationText) {
            this.locationText.textContent = name;
            this.locationSign.classList.remove('hidden');
        }
    }

    // Draw background based on location name
    drawDialogueBackground(type = 'city') {
        if (!this.sceneCanvas || !this.sceneCtx) return;

        this.resizeCanvas(this.sceneCanvas);
        const ctx = this.sceneCtx;
        const w = this.sceneCanvas.width;
        const h = this.sceneCanvas.height;

        this.drawBackgroundByType(ctx, w, h, type);
    }

    // Helper to draw background on ANY context (reusable by Combat)
    drawBackgroundByType(ctx, w, h, type) {
        // Clear
        ctx.clearRect(0, 0, w, h);

        switch (type) {
            case 'Koramangala':
            case 'KORAMANGALA':
                this.drawKoramangala(ctx, w, h);
                break;
            case 'HSR':
            case 'HSR Layout':
                this.drawHSR(ctx, w, h);
                break;
            case 'Indiranagar':
            case 'INDIRANAGAR':
                this.drawIndiranagar(ctx, w, h);
                break;
            case 'Bellandur':
            case 'BELLANDUR':
                this.drawBellandur(ctx, w, h);
                break;
            case 'JP Nagar':
            case 'JP NAGAR':
                this.drawJPNagar(ctx, w, h);
                break;
            case 'Ejipura':
            case 'EJIPURA':
                this.drawEjipura(ctx, w, h);
                break;
            case 'Whitefield':
            case 'WHITEFIELD':
                this.drawWhitefield(ctx, w, h);
                break;
            case 'Airport':
            case 'KEMPEGOWDA AIRPORT':
                this.drawAirport(ctx, w, h);
                break;
            case 'Naveen Terraces':
            case 'NAVEEN TERRACES':
                this.drawNaveenTerraces(ctx, w, h);
                break;
            default:
                this.drawCityBackground(ctx, w, h); // Fallback
        }
    }

    // --- LOCATION DRAWING METHODS ---

    drawKoramangala(ctx, w, h) {
        // Pubs and nightlife
        this.drawSky(ctx, w, h, '#2d1b4e', '#1a0b2e'); // Dark purple night
        
        // Silhouette of trees (Koramangala is leafy)
        ctx.fillStyle = '#0f2027';
        this.drawTrees(ctx, w, h, 0.6);

        // Pub lights/Neon
        for(let i=0; i<15; i++) {
            const x = Math.random() * w;
            const y = h * 0.6 + Math.random() * h * 0.2;
            const color = Math.random() > 0.5 ? '#ff00cc' : '#33ccff';
            ctx.fillStyle = color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.fillRect(x, y, 4, 30); // Neon strips
            ctx.shadowBlur = 0;
        }
    }

    drawHSR(ctx, w, h) {
        // Startups & Wide Roads
        this.drawSky(ctx, w, h, '#2c3e50', '#3498db');
        
        // Glass Buildings
        ctx.fillStyle = '#bdc3c7';
        for(let i=0; i<5; i++) {
            const bx = i * (w/5) + 20;
            const bh = h * 0.4 + Math.random() * 50;
            ctx.fillRect(bx, h - bh, w/6, bh);
            
            // Windows
            ctx.fillStyle = '#ecf0f1';
            for(let j=0; j<10; j++) {
                ctx.fillRect(bx + 10, h - bh + j*30 + 10, w/6 - 20, 20);
            }
            ctx.fillStyle = '#bdc3c7';
        }
    }

    drawIndiranagar(ctx, w, h) {
        // Metro Line
        this.drawSky(ctx, w, h, '#8e44ad', '#2c3e50');

        // Metro Pillars
        ctx.fillStyle = '#7f8c8d';
        const trackY = h * 0.4;
        ctx.fillRect(0, trackY, w, 30); // Track

        for(let i=0; i<4; i++) {
            ctx.fillRect(i * (w/3) + 40, trackY + 30, 40, h - trackY);
        }

        // Posh Houses below
        ctx.fillStyle = '#d35400';
        ctx.fillRect(0, h * 0.7, w, h * 0.3);
        
        // Trees
        ctx.fillStyle = '#2d3436';
        this.drawTrees(ctx, w, h, 0.65);
    }

    drawBellandur(ctx, w, h) {
        // Smoggy & Lake
        this.drawSky(ctx, w, h, '#7f8c8d', '#bdc3c7'); // Grey smog
        
        // Foamy Lake
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(0, h * 0.7, w, h * 0.3);
        
        // Bubbles/Foam
        ctx.fillStyle = '#bdc3c7';
        for(let i=0; i<30; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * w, h * 0.7 + Math.random() * h * 0.3, Math.random() * 20, 0, Math.PI*2);
            ctx.fill();
        }
        
        // Traffic lights in distance
        for(let i=0; i<20; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#ff0000' : '#ffff00';
            ctx.fillRect(Math.random() * w, h * 0.65, 4, 4);
        }
    }

    drawJPNagar(ctx, w, h) {
        // Quiet, Green, Residential
        this.drawSky(ctx, w, h, '#11998e', '#38ef7d');
        
        // Lots of trees
        ctx.fillStyle = '#05445E';
        this.drawTrees(ctx, w, h, 0.5);
        ctx.fillStyle = '#022e40';
        this.drawTrees(ctx, w, h, 0.7);
    }

    drawEjipura(ctx, w, h) {
        // The Stonehenge (Unfinished Flyover)
        this.drawSky(ctx, w, h, '#3a1c71', '#d76d77');
        
        ctx.fillStyle = '#95a5a6';
        // Pillars standing alone
        for(let i=0; i<3; i++) {
            const x = i * (w/3) + w/6;
            ctx.fillRect(x - 30, h * 0.4, 60, h * 0.6);
            // Rebar sticking out
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 20, h * 0.4);
            ctx.lineTo(x - 25, h * 0.4 - 20);
            ctx.moveTo(x + 20, h * 0.4);
            ctx.lineTo(x + 25, h * 0.4 - 20);
            ctx.stroke();
        }
    }

    drawWhitefield(ctx, w, h) {
        // Tech Parks
        this.drawSky(ctx, w, h, '#000428', '#004e92');
        
        // Futuristic buildings
        ctx.fillStyle = '#2c3e50';
        for(let i=0; i<6; i++) {
            const hg = Math.random() * h * 0.5 + h * 0.3;
            ctx.fillRect(i * (w/6), h - hg, w/6 + 2, hg);
            
            // Blue lights
            ctx.fillStyle = '#00d2ff';
            if (i % 2 === 0) {
                ctx.fillRect(i * (w/6) + 10, h - hg + 10, 5, hg - 20);
            }
            ctx.fillStyle = '#2c3e50';
        }
    }

    drawAirport(ctx, w, h) {
        // Runway and Tower
        this.drawSky(ctx, w, h, '#ff512f', '#dd2476'); // Sunrise
        
        // Tarmac
        ctx.fillStyle = '#34495e';
        ctx.fillRect(0, h * 0.7, w, h * 0.3);
        
        // Runway lights
        ctx.fillStyle = '#f1c40f';
        for(let i=0; i<w; i+=60) {
            ctx.fillRect(i, h * 0.8, 30, 4);
        }

        // Control Tower
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(w * 0.8, h * 0.4, 40, h * 0.3); // Stem
        ctx.fillRect(w * 0.75, h * 0.35, 60, 40); // Top
    }

    drawNaveenTerraces(ctx, w, h) {
        // Romantic Night Terrace
        this.drawSky(ctx, w, h, '#0f0c29', '#302b63'); // Starry Night
        
        // Stars
        ctx.fillStyle = '#fff';
        for(let i=0; i<100; i++) {
            ctx.fillRect(Math.random()*w, Math.random()*h*0.6, 1, 1);
        }

        // Railing
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, h * 0.8, w, 10); // Top rail
        for(let i=0; i<w; i+=30) {
            ctx.fillRect(i, h * 0.8, 5, h * 0.2); // Bars
        }
        
        // City lights below (Bokeh)
        for(let i=0; i<30; i++) {
            ctx.fillStyle = `rgba(255, 255, 0, ${Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.arc(Math.random() * w, h * 0.85 + Math.random() * 50, Math.random() * 5 + 2, 0, Math.PI*2);
            ctx.fill();
        }
    }

    // Helpers
    drawSky(ctx, w, h, col1, col2) {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, col1);
        g.addColorStop(1, col2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
    }

    drawTrees(ctx, w, h, horizon) {
        const y = h * horizon;
        for(let i=0; i<w; i+=30) {
            const th = Math.random() * 40 + 20;
            ctx.beginPath();
            ctx.moveTo(i, y);
            ctx.lineTo(i + 15, y - th);
            ctx.lineTo(i + 30, y);
            ctx.fill();
        }
        ctx.fillRect(0, y, w, h - y);
    }

    drawCityBackground(ctx, w, h) {
        this.drawKoramangala(ctx, w, h); // Default to Kora-style
    }

    resizeCanvas(canvas) {
        if (!canvas) return;
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
}

// Canvas animation helpers
class CanvasEffects {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas ? canvas.getContext('2d') : null;
        this.particles = [];
        this.animationId = null;
    }

    resize() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    // Confetti effect for ending
    startConfetti() {
        this.resize();
        this.particles = [];

        const colors = ['#ff6b9d', '#f9ca24', '#6ab04c', '#4834d4', '#eb4d4b', '#9b59b6'];

        // Create confetti particles
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }

        this.animateConfetti();
    }

    animateConfetti() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
            this.ctx.restore();

            // Update position
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            // Reset if off screen
            if (p.y > this.canvas.height) {
                p.y = -p.size;
                p.x = Math.random() * this.canvas.width;
            }
        });

        this.animationId = requestAnimationFrame(() => this.animateConfetti());
    }

    // Hearts floating for proposal
    startHearts() {
        this.resize();
        this.particles = [];

        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height + Math.random() * 100,
                size: Math.random() * 20 + 10,
                speedY: Math.random() * 2 + 1,
                speedX: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        this.animateHearts();
    }

    animateHearts() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.ctx.fillStyle = `rgba(255, 107, 157, ${p.opacity})`;
            this.drawHeart(p.x, p.y, p.size);

            p.y -= p.speedY;
            p.x += p.speedX;

            if (p.y < -p.size) {
                p.y = this.canvas.height + p.size;
                p.x = Math.random() * this.canvas.width;
            }
        });

        this.animationId = requestAnimationFrame(() => this.animateHearts());
    }

    drawHeart(x, y, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.moveTo(0, size / 4);
        this.ctx.bezierCurveTo(-size / 2, -size / 4, -size / 2, -size / 2, 0, -size / 4);
        this.ctx.bezierCurveTo(size / 2, -size / 2, size / 2, -size / 4, 0, size / 4);
        this.ctx.fill();
        this.ctx.restore();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.particles = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Global instances
const sceneManager = new SceneManager();
const proposalEffects = new CanvasEffects(document.getElementById('proposal-canvas'));
const confettiEffects = new CanvasEffects(document.getElementById('confetti-canvas'));