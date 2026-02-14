// ========================================
// VISUAL NOVEL INTRO
// Dialogue data + scene management
// ========================================

// Character data for shared SpriteSystem
window.gameCharacters = {
    mragank: {
        name: 'MRAGANK',
        colors: { hair: '#222222', skin: '#ffdbac', shirt: '#ff4785', pants: '#2c3e50', shoes: '#111111' }
    },
    abhinandhini: {
        name: 'ABHINANDHINI',
        colors: { hair: '#1a1a1a', skin: '#c68642', shirt: '#e84393', pants: '#d63031', shoes: '#ffffff' }
    }
};

const introDialogues = [
    // Scene 1: In bed watching Dexter
    {
        speaker: '',
        text: "It was valentine's Day eve. Mragank and Abhi were cuddling and watching their fav show at that time...",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'bedroom'
    },
    {
        speaker: 'MRAGANK',
        text: "Dexter is like u sometimes bb, he can get upset vv easily and then proceed to wrap up dead bodies with plastic wrap like a burrito.",
        position: 'left',
        emotion: 'happy',
        scene: 'bedroom'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "Ayeee! You are like dexters sister... hoee assss!",
        position: 'right',
        emotion: 'happy',
        scene: 'bedroom'
    },
    {
        speaker: 'MRAGANK',
        text: "You know what, u are both dexter and his sister honestly, ughhhh getting upset, just got reminded of your 7 exes...",
        position: 'left',
        emotion: 'neutral',
        scene: 'bedroom'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "No bbbbb nooo, lets watch this guy is about to show all his emotions.",
        position: 'right',
        emotion: 'happy',
        scene: 'bedroom'
    },
    {
        speaker: 'MRAGANK',
        text: "Alright alright... one more episode and then sleep?",
        position: 'left',
        emotion: 'neutral',
        scene: 'bedroom'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "Oki. Less sleep after this one.",
        position: 'right',
        emotion: 'happy',
        scene: 'bedroom'
    },
    // Scene 2: Middle of the night - strange noise
    {
        speaker: '',
        text: "* THUD *",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'bedroom-dark'
    },
    {
        speaker: 'MRAGANK',
        text: "What the... did you hear that?!",
        position: 'left',
        emotion: 'nervous',
        scene: 'bedroom-dark'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "It came from the front door! Go check!",
        position: 'right',
        emotion: 'nervous',
        scene: 'bedroom-dark'
    },
    {
        speaker: 'MRAGANK',
        text: "Why me?! U go check Dexter does not kill female!",
        position: 'left',
        emotion: 'nervous',
        scene: 'bedroom-dark'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "...",
        position: 'right',
        emotion: 'angry',
        scene: 'bedroom-dark'
    },
    {
        speaker: 'MRAGANK',
        text: "Fine fine, I'll go...",
        position: 'left',
        emotion: 'sad',
        scene: 'bedroom-dark'
    },
    // Scene 3: At the doorstep
    {
        speaker: '',
        text: "* opens door *",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "There's... an egg?? A dark red egg on our doorstep?? And... a note?",
        position: 'left',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "Let me see! Oh wow... the egg is warm! And it's... pulsing?",
        position: 'right',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "Forget the egg for a second, read this note...",
        position: 'left',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    // Scene 4: The alien letter
    {
        speaker: '',
        text: "* unfolds a strange glowing letter *",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    {
        speaker: 'ALIEN NOTE',
        text: "Dear Earthlings, we are aliens from another world.",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    {
        speaker: 'ALIEN NOTE',
        text: "After carefully reviewing your profiles, we have selected YOU as the candidates to raise this little alien.",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    {
        speaker: 'ALIEN NOTE',
        text: "Please tell us you were watching something sweet like Friends...",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    {
        speaker: 'ALIEN NOTE',
        text: "...because this alien will grow up to become the character of the LAST SHOW you were watching.",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    {
        speaker: 'ALIEN NOTE',
        text: "Good luck! - The Intergalactic Adoption Agency",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'letter'
    },
    // Scene 5: The horrible realization
    {
        speaker: 'MRAGANK',
        text: "...",
        position: 'left',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "Mragank...",
        position: 'right',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "Yep.",
        position: 'left',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "We were watching DEXTER right.",
        position: 'right',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "So this alien is going to grow up to be... a blood-thirsty killer??",
        position: 'left',
        emotion: 'nervous',
        scene: 'doorstep'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "No way thats bullshit?!",
        position: 'right',
        emotion: 'angry',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "I TOLD you we should watch Doraemon on Valentine's eve!!",
        position: 'left',
        emotion: 'angry',
        scene: 'doorstep'
    },
    {
        speaker: 'ABHINANDHINI',
        text: "...aye shut up. We can't change it now. We just have to raise it right. Maybe with enough love it won't become a serial killer?",
        position: 'right',
        emotion: 'sad',
        scene: 'doorstep'
    },
    {
        speaker: 'MRAGANK',
        text: "Happy Valentine's Day to us... we're raising baby Dexter.",
        position: 'left',
        emotion: 'sad',
        scene: 'doorstep'
    },
    {
        speaker: '',
        text: "And so begins the journey... raising an alien that's destined to become Dexter Morgan. Good luck.",
        position: 'narrator',
        emotion: 'neutral',
        scene: 'doorstep'
    }
];

class VisualNovel {
    constructor() {
        this.currentScene = null;
        this.sceneCanvas = null;
        this.sceneCtx = null;
    }

    init() {
        this.sceneCanvas = document.getElementById('scene-canvas');
        if (this.sceneCanvas) {
            this.sceneCtx = this.sceneCanvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
    }

    resizeCanvas() {
        if (!this.sceneCanvas) return;
        const container = this.sceneCanvas.parentElement;
        const w = container.clientWidth;
        const h = container.clientHeight;
        // Use higher resolution for crisp rendering
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.sceneCanvas.width = w * dpr;
        this.sceneCanvas.height = h * dpr;
        this.sceneCtx.scale(dpr, dpr);
        this.drawW = w;
        this.drawH = h;
        // Redraw current scene after resize
        if (this.currentScene) {
            this.drawScene(this.currentScene);
        }
    }

    start(onComplete) {
        this.init();
        this.drawScene('bedroom');

        dialogueSystem.startDialogue(introDialogues, () => {
            onComplete();
        });
    }

    updateScene(sceneName) {
        if (sceneName && sceneName !== this.currentScene) {
            this.currentScene = sceneName;
            this.drawScene(sceneName);
        }
    }

    drawScene(scene) {
        if (!this.sceneCtx) return;
        this.currentScene = scene;
        const ctx = this.sceneCtx;
        const w = this.drawW || 500;
        const h = this.drawH || 800;

        ctx.save();
        switch (scene) {
            case 'bedroom':
                this.drawBedroom(ctx, w, h, false);
                break;
            case 'bedroom-dark':
                this.drawBedroom(ctx, w, h, true);
                break;
            case 'doorstep':
                this.drawDoorstep(ctx, w, h);
                break;
            case 'letter':
                this.drawLetter(ctx, w, h);
                break;
        }
        ctx.restore();
    }

    drawBedroom(ctx, w, h, dark) {
        // Wall — gradient
        const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
        if (dark) {
            wallGrad.addColorStop(0, '#0a0a15');
            wallGrad.addColorStop(1, '#151520');
        } else {
            wallGrad.addColorStop(0, '#1e1e35');
            wallGrad.addColorStop(1, '#2a2a42');
        }
        ctx.fillStyle = wallGrad;
        ctx.fillRect(0, 0, w, h);

        // Floor
        const floorGrad = ctx.createLinearGradient(0, h * 0.65, 0, h);
        floorGrad.addColorStop(0, dark ? '#1a1210' : '#3a2a1a');
        floorGrad.addColorStop(1, dark ? '#0f0a08' : '#2a1a10');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Baseboard
        ctx.fillStyle = dark ? '#1a1510' : '#4a3a2a';
        ctx.fillRect(0, h * 0.64, w, h * 0.02);

        // Window — larger, centered right
        const winX = w * 0.58, winY = h * 0.06, winW = w * 0.3, winH = h * 0.28;
        ctx.fillStyle = dark ? '#060610' : '#101025';
        ctx.fillRect(winX, winY, winW, winH);
        // Window frame
        ctx.strokeStyle = dark ? '#3a3a4e' : '#5a5a6e';
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);
        // Cross bars
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2);
        ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();

        // Night sky through window — stars
        ctx.fillStyle = '#ffffff';
        const starSeeds = [0.2, 0.5, 0.8, 0.35, 0.65, 0.15, 0.9, 0.45];
        for (let i = 0; i < starSeeds.length; i++) {
            const sx = winX + 8 + starSeeds[i] * (winW - 16);
            const sy = winY + 8 + starSeeds[(i + 3) % starSeeds.length] * (winH * 0.6);
            const sz = (i % 3 === 0) ? 2.5 : 1.5;
            ctx.beginPath();
            ctx.arc(sx, sy, sz, 0, Math.PI * 2);
            ctx.fill();
        }

        // Moon through window
        const moonX = winX + winW * 0.65, moonY = winY + winH * 0.3;
        if (dark) {
            ctx.fillStyle = '#445566';
            ctx.beginPath();
            ctx.arc(moonX, moonY, 14, 0, Math.PI * 2);
            ctx.fill();
            // Crescent shadow
            ctx.fillStyle = '#060610';
            ctx.beginPath();
            ctx.arc(moonX + 5, moonY - 2, 12, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Warm glow
            ctx.fillStyle = 'rgba(249, 202, 36, 0.1)';
            ctx.beginPath();
            ctx.arc(moonX, moonY, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f9ca24';
            ctx.beginPath();
            ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
            ctx.fill();
        }

        // Curtains
        ctx.fillStyle = dark ? '#1a1020' : '#3a2040';
        ctx.fillRect(winX - 10, winY - 5, 14, winH + 15);
        ctx.fillRect(winX + winW - 4, winY - 5, 14, winH + 15);

        // Bed — wider, more detailed
        const bedX = w * 0.03, bedY = h * 0.46, bedW = w * 0.52, bedH = h * 0.22;
        // Bed frame
        ctx.fillStyle = dark ? '#201018' : '#4a2540';
        ctx.fillRect(bedX, bedY - 5, bedW, bedH + 10);
        // Headboard
        ctx.fillStyle = dark ? '#281520' : '#5a2f50';
        ctx.fillRect(bedX, bedY - h * 0.06, bedW * 0.15, h * 0.06 + bedH + 10);
        // Mattress
        ctx.fillStyle = dark ? '#1a0f15' : '#352030';
        ctx.fillRect(bedX + 4, bedY, bedW - 8, bedH);
        // Pillows
        ctx.fillStyle = dark ? '#2a1828' : '#6a4565';
        this.drawRoundRect(ctx, bedX + 10, bedY + 5, bedW * 0.22, bedH * 0.3, 4);
        ctx.fill();
        this.drawRoundRect(ctx, bedX + bedW * 0.32, bedY + 5, bedW * 0.22, bedH * 0.3, 4);
        ctx.fill();
        // Blanket
        const blanketGrad = ctx.createLinearGradient(0, bedY + bedH * 0.35, 0, bedY + bedH);
        blanketGrad.addColorStop(0, dark ? '#1a0f18' : '#3a1f38');
        blanketGrad.addColorStop(1, dark ? '#120a12' : '#2a1528');
        ctx.fillStyle = blanketGrad;
        ctx.fillRect(bedX + 4, bedY + bedH * 0.35, bedW - 8, bedH * 0.65);
        // Blanket fold line
        ctx.strokeStyle = dark ? '#221520' : '#4a2840';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bedX + 10, bedY + bedH * 0.38);
        ctx.lineTo(bedX + bedW - 10, bedY + bedH * 0.38);
        ctx.stroke();

        // Nightstand
        ctx.fillStyle = dark ? '#181210' : '#3a2a1a';
        ctx.fillRect(w * 0.57, h * 0.52, w * 0.1, h * 0.15);
        // Lamp on nightstand
        ctx.fillStyle = dark ? '#222' : '#444';
        ctx.fillRect(w * 0.595, h * 0.48, w * 0.03, h * 0.05);
        // Lamp shade
        ctx.fillStyle = dark ? '#2a1828' : '#c4a565';
        ctx.beginPath();
        ctx.moveTo(w * 0.58, h * 0.48);
        ctx.lineTo(w * 0.64, h * 0.48);
        ctx.lineTo(w * 0.63, h * 0.45);
        ctx.lineTo(w * 0.59, h * 0.45);
        ctx.closePath();
        ctx.fill();
        // Lamp glow
        if (!dark) {
            ctx.fillStyle = 'rgba(249, 202, 36, 0.06)';
            ctx.beginPath();
            ctx.arc(w * 0.61, h * 0.46, 40, 0, Math.PI * 2);
            ctx.fill();
        }

        // Wall art / photo frame
        ctx.fillStyle = dark ? '#181520' : '#2a2535';
        ctx.fillRect(w * 0.25, h * 0.1, w * 0.15, h * 0.12);
        ctx.strokeStyle = dark ? '#2a2535' : '#4a4555';
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.25, h * 0.1, w * 0.15, h * 0.12);
        // Heart in frame
        ctx.fillStyle = dark ? '#2a1828' : '#ff6b9d';
        ctx.font = `${Math.max(12, w * 0.04)}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText('\u2665', w * 0.325, h * 0.175);
        ctx.textAlign = 'start';

        // Rug on floor
        ctx.fillStyle = dark ? '#1a1215' : '#4a2535';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.78, w * 0.2, h * 0.04, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Laptop/TV on bed showing Dexter (only in non-dark scene)
        if (!dark) {
            // Laptop body
            const lpX = w * 0.3, lpY = h * 0.38, lpW = w * 0.22, lpH = h * 0.12;
            ctx.fillStyle = '#222';
            ctx.fillRect(lpX, lpY, lpW, lpH);
            // Screen glow
            ctx.fillStyle = 'rgba(180, 0, 0, 0.06)';
            ctx.beginPath();
            ctx.ellipse(lpX + lpW / 2, lpY + lpH / 2, lpW * 0.8, lpH * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Screen
            const scrGrad = ctx.createLinearGradient(lpX + 2, lpY + 2, lpX + lpW - 2, lpY + lpH - 4);
            scrGrad.addColorStop(0, '#1a0505');
            scrGrad.addColorStop(0.5, '#2a0808');
            scrGrad.addColorStop(1, '#1a0505');
            ctx.fillStyle = scrGrad;
            ctx.fillRect(lpX + 2, lpY + 2, lpW - 4, lpH - 4);
            // Blood drop icon on screen
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.moveTo(lpX + lpW / 2, lpY + 6);
            ctx.quadraticCurveTo(lpX + lpW / 2 + 6, lpY + lpH / 2, lpX + lpW / 2, lpY + lpH - 6);
            ctx.quadraticCurveTo(lpX + lpW / 2 - 6, lpY + lpH / 2, lpX + lpW / 2, lpY + 6);
            ctx.fill();
            // "DEXTER" text on screen
            ctx.fillStyle = '#cc2222';
            ctx.font = `bold ${Math.max(6, w * 0.02)}px "Press Start 2P", monospace`;
            ctx.textAlign = 'center';
            ctx.fillText('DEXTER', lpX + lpW / 2, lpY + lpH - 8);
            ctx.textAlign = 'start';
            // Laptop base
            ctx.fillStyle = '#333';
            ctx.fillRect(lpX - 4, lpY + lpH, lpW + 8, 4);
        }
    }

    drawDoorstep(ctx, w, h) {
        // Night sky — gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
        skyGrad.addColorStop(0, '#050510');
        skyGrad.addColorStop(0.5, '#0a0a1e');
        skyGrad.addColorStop(1, '#101828');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Stars
        ctx.fillStyle = '#ffffff';
        const starCount = 30;
        for (let i = 0; i < starCount; i++) {
            const sx = (Math.sin(i * 7.3 + 1.2) * 0.5 + 0.5) * w;
            const sy = (Math.cos(i * 4.1 + 0.8) * 0.5 + 0.5) * h * 0.35;
            const sz = (i % 5 === 0) ? 2.5 : (i % 3 === 0) ? 2 : 1;
            ctx.globalAlpha = 0.4 + (i % 3) * 0.2;
            ctx.beginPath();
            ctx.arc(sx, sy, sz, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Moon — larger with glow
        const moonX = w * 0.78, moonY = h * 0.1;
        // Glow
        ctx.fillStyle = 'rgba(249, 202, 36, 0.06)';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(249, 202, 36, 0.12)';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f9ca24';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Ground
        const groundGrad = ctx.createLinearGradient(0, h * 0.68, 0, h);
        groundGrad.addColorStop(0, '#1a2a1a');
        groundGrad.addColorStop(1, '#0a150a');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, h * 0.68, w, h * 0.32);

        // House wall (behind door)
        ctx.fillStyle = '#1a1520';
        ctx.fillRect(w * 0.1, h * 0.15, w * 0.8, h * 0.55);

        // Door frame
        const doorX = w * 0.28, doorY = h * 0.2, doorW = w * 0.44, doorH = h * 0.5;
        ctx.fillStyle = '#3a2a1a';
        ctx.fillRect(doorX - 8, doorY - 8, doorW + 16, doorH + 12);

        // Door — wooden texture
        const doorGrad = ctx.createLinearGradient(doorX, 0, doorX + doorW, 0);
        doorGrad.addColorStop(0, '#5a3a2a');
        doorGrad.addColorStop(0.3, '#6a4a32');
        doorGrad.addColorStop(0.7, '#5a3a2a');
        doorGrad.addColorStop(1, '#4a2a1a');
        ctx.fillStyle = doorGrad;
        ctx.fillRect(doorX, doorY, doorW, doorH);

        // Door panels
        ctx.strokeStyle = '#4a2a1a';
        ctx.lineWidth = 2;
        const panelInset = 12;
        ctx.strokeRect(doorX + panelInset, doorY + panelInset, doorW - panelInset * 2, doorH * 0.35);
        ctx.strokeRect(doorX + panelInset, doorY + doorH * 0.45, doorW - panelInset * 2, doorH * 0.45);

        // Door knob
        ctx.fillStyle = '#d4b030';
        ctx.beginPath();
        ctx.arc(doorX + doorW * 0.82, doorY + doorH * 0.5, 6, 0, Math.PI * 2);
        ctx.fill();
        // Knob shine
        ctx.fillStyle = '#f4d050';
        ctx.beginPath();
        ctx.arc(doorX + doorW * 0.8, doorY + doorH * 0.48, 2, 0, Math.PI * 2);
        ctx.fill();

        // Doorstep
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(w * 0.18, h * 0.7, w * 0.64, h * 0.04);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(w * 0.18, h * 0.72, w * 0.64, h * 0.02);

        // The mysterious egg! — centered on doorstep, prominent
        const eggX = w * 0.5, eggY = h * 0.66;
        // Outer glow — pulsing
        ctx.fillStyle = 'rgba(139, 0, 0, 0.12)';
        ctx.beginPath();
        ctx.ellipse(eggX, eggY, 36, 42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(139, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(eggX, eggY, 26, 32, 0, 0, Math.PI * 2);
        ctx.fill();
        // Egg body
        ctx.fillStyle = '#4a0e0e';
        ctx.beginPath();
        ctx.ellipse(eggX, eggY, 18, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        // Egg highlight
        ctx.fillStyle = '#6a1a1a';
        ctx.beginPath();
        ctx.ellipse(eggX - 4, eggY - 8, 5, 8, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // Vein lines
        ctx.strokeStyle = '#3a0808';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(eggX + 4, eggY - 10);
        ctx.quadraticCurveTo(eggX + 8, eggY, eggX + 3, eggY + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(eggX - 6, eggY - 4);
        ctx.quadraticCurveTo(eggX - 10, eggY + 4, eggX - 5, eggY + 12);
        ctx.stroke();

        // Porch light — warm cone from above
        ctx.fillStyle = 'rgba(249, 202, 36, 0.04)';
        ctx.beginPath();
        ctx.moveTo(w * 0.45, h * 0.16);
        ctx.lineTo(w * 0.2, h * 0.72);
        ctx.lineTo(w * 0.8, h * 0.72);
        ctx.closePath();
        ctx.fill();

        // Porch light fixture
        ctx.fillStyle = '#444';
        ctx.fillRect(w * 0.47, h * 0.15, w * 0.06, h * 0.03);
        ctx.fillStyle = '#f9ca24';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.19, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Welcome mat
        ctx.fillStyle = '#3a2820';
        ctx.fillRect(w * 0.35, h * 0.715, w * 0.3, h * 0.015);
    }

    drawLetter(ctx, w, h) {
        // Dark space background
        const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, h * 0.6);
        bg.addColorStop(0, '#0a0a20');
        bg.addColorStop(1, '#020208');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Subtle stars in background
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 40; i++) {
            const sx = (Math.sin(i * 5.7 + 2.1) * 0.5 + 0.5) * w;
            const sy = (Math.cos(i * 3.3 + 1.5) * 0.5 + 0.5) * h;
            ctx.globalAlpha = 0.15 + (i % 4) * 0.08;
            ctx.beginPath();
            ctx.arc(sx, sy, i % 5 === 0 ? 2 : 1, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Alien letter/parchment — centered
        const lx = w * 0.1, ly = h * 0.08, lw = w * 0.8, lh = h * 0.6;

        // Outer glow
        ctx.shadowColor = '#4a00ff';
        ctx.shadowBlur = 30;
        ctx.fillStyle = '#1a1428';
        this.drawRoundRect(ctx, lx, ly, lw, lh, 12);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Parchment body — dark alien paper
        const paperGrad = ctx.createLinearGradient(lx, ly, lx, ly + lh);
        paperGrad.addColorStop(0, '#1e1832');
        paperGrad.addColorStop(0.5, '#16122a');
        paperGrad.addColorStop(1, '#0e0a1e');
        ctx.fillStyle = paperGrad;
        this.drawRoundRect(ctx, lx + 2, ly + 2, lw - 4, lh - 4, 10);
        ctx.fill();

        // Glowing border
        ctx.strokeStyle = '#6a3aff';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        this.drawRoundRect(ctx, lx + 2, ly + 2, lw - 4, lh - 4, 10);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Alien symbols at top (decorative header)
        ctx.fillStyle = '#6a3aff';
        ctx.globalAlpha = 0.4;
        ctx.font = `${Math.max(10, w * 0.035)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('\u2734 \u2736 \u2737 \u2734 \u2736 \u2737 \u2734', w / 2, ly + 24);
        ctx.globalAlpha = 1;

        // "INTERGALACTIC ADOPTION AGENCY" header
        ctx.fillStyle = '#8a5aff';
        ctx.font = `bold ${Math.max(8, w * 0.028)}px "Press Start 2P", monospace`;
        ctx.fillText('INTERGALACTIC', w / 2, ly + 50);
        ctx.fillText('ADOPTION AGENCY', w / 2, ly + 68);

        // Divider line
        ctx.strokeStyle = '#6a3aff';
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx + 30, ly + 80);
        ctx.lineTo(lx + lw - 30, ly + 80);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Alien seal/stamp in corner
        ctx.fillStyle = '#4a00ff';
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(lx + lw - 40, ly + lh - 40, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.4;
        ctx.font = `${Math.max(16, w * 0.06)}px serif`;
        ctx.fillText('\u{1F47E}', lx + lw - 52, ly + lh - 30);
        ctx.globalAlpha = 1;

        // Decorative corner symbols
        ctx.fillStyle = '#6a3aff';
        ctx.globalAlpha = 0.2;
        ctx.font = `${Math.max(14, w * 0.04)}px serif`;
        ctx.textAlign = 'left';
        ctx.fillText('\u2726', lx + 10, ly + 20);
        ctx.textAlign = 'right';
        ctx.fillText('\u2726', lx + lw - 10, ly + 20);
        ctx.textAlign = 'left';
        ctx.fillText('\u2726', lx + 10, ly + lh - 8);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'start';
    }

    drawRoundRect(ctx, x, y, w, h, r) {
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
        ctx.closePath();
    }
}

const visualNovel = new VisualNovel();
