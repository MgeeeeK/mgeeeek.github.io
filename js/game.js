// ========================================
// MAIN GAME CONTROLLER
// Mragank vs. The World
// ========================================

class Game {
    constructor() {
        this.state = 'loading';
        this.currentBoss = 0;
        this.totalBosses = 7;

        // Boss data with initials only
        // Difficulty: easy (R, A, Vi, Ka) vs hard (K, V, S)
        this.bosses = [
            {
                name: 'V',
                type: 'V',
                title: '"The Comedian"',
                color: '#f39c12',
                difficulty: 'easy',
                location: 'JP Nagar',
                dialogue: [
                    { speaker: 'V', text: "Oh look, this guy came to see my stand-up. Aye macha, do you even know how funny I am?", position: 'right' },
                    { speaker: 'MRAGANK', text: "Shut up. I've seen your reels, dude. 'So funny'... yet you barely get 100 likes.", position: 'left', emotion: 'angry' },
                    { speaker: 'V', text: "You think you are better than me, macha? Did she ever tell you how autistically funny I am?", position: 'right' },
                    { speaker: 'MRAGANK', text: "Oh no, you just made this Delhi guy super mad.", position: 'left', emotion: 'angry' }
                ]
            },
            {
                name: 'R',
                type: 'R',
                title: '"The DM Slider"',
                color: '#3498db',
                difficulty: 'easy',
                location: 'Koramangala',
                dialogue: [
                    { speaker: 'R', text: "Hey bro, I slid into her DMs first. That counts for something.", position: 'right' },
                    { speaker: 'MRAGANK', text: "Did you ever actually meet her?", position: 'left', emotion: 'angry' },
                    { speaker: 'R', text: "Well... we almost did. Once...", position: 'right' },
                    { speaker: 'MRAGANK', text: "Pathetic. Just for that you have to die.", position: 'left', emotion: 'angry' }
                ]
            },
            {
                name: 'A',
                type: 'A',
                title: '"The Situationship"',
                color: '#9b59b6',
                difficulty: 'easy',
                location: 'HSR',
                dialogue: [
                    { speaker: 'A', text: "We weren't even officially dating! So technically, I'm not really an ex...", position: 'right' },
                    { speaker: 'MRAGANK', text: "Then why are you blocking my path?", position: 'left', emotion: 'angry' },
                    { speaker: 'A', text: "Because... we had SOMETHING! She just didn't want to label it!", position: 'right' },
                    { speaker: 'MRAGANK', text: "Sounds like she just didn't want YOU. But thats enough for me to kill you", position: 'left', emotion: 'happy' }
                ]
            },
            {
                name: 'K',
                type: 'K',
                title: '"The Emo Guitarist"',
                color: '#2c3e50',
                difficulty: 'hard',
                location: 'Indiranagar',
                dialogue: [
                    { speaker: 'K', text: "*plays sad chord* She was the love of my life at Sunny ASS Up. I wrote 47 songs about her eyes.", position: 'right' },
                    { speaker: 'MRAGANK', text: "She never listened to any of them. Honestly? She hated you.", position: 'left', emotion: 'sad' },
                    { speaker: 'K', text: "Hah! I played those in front of her! While she was playing with my cat Sug.", position: 'right' },
                    { speaker: 'MRAGANK', text: "Fuck your emo ass. I'm gonna kill that fucker cat too.", position: 'left', emotion: 'angry' }
                ]
            },
            {
                name: 'Vi',
                type: 'Vi',
                title: '"The Gym Bro"',
                color: '#e74c3c',
                difficulty: 'easy',
                location: 'Bellandur',
                dialogue: [
                    { speaker: 'Vi', text: "Bro, do you even lift? She matched with me 'cause of my chest.", position: 'right' },
                    { speaker: 'MRAGANK', text: "Huh, she doesn't even like gym bros. What did you two actually talk about?", position: 'left', emotion: 'bored' },
                    { speaker: 'Vi', text: "We didn't waste time like you... there was more important stuff!", position: 'right' },
                    { speaker: 'MRAGANK', text: "Argh! I'm getting rage-baited by this idiot. I doubt she came close to you, but just for that? You're gonna die.", position: 'left', emotion: 'angry' }
                ]
            },
            {
                name: 'P',
                type: 'P',
                title: '"The Pondicherry Guy"',
                color: '#ff0055',
                difficulty: 'hard',
                location: 'Ejipura',
                dialogue: [
                    { speaker: 'P', text: "Pondi... that night was magic. The party, the drinks...", position: 'right' },
                    { speaker: 'MRAGANK', text: "Shut up. Don't you dare finish that sentence.", position: 'left', emotion: 'angry' },
                    { speaker: 'P', text: "We drove all night. Pulled over by the beach. That car was cramped, but we made it work.", position: 'right' },
                    { speaker: 'MRAGANK', text: "OI! I'm a Jat from Delhi, bro. Keep talking and I'll bury you right here.", position: 'left', emotion: 'angry' }
                ]
            },
            {
                name: 'S',
                type: 'S',
                title: '"The 31-Year-Old Weirdo"',
                color: '#8e44ad',
                difficulty: 'hard',
                location: 'Whitefield',
                dialogue: [
                    { speaker: 'S', text: "So you're the new one. You seem... young.", position: 'right' },
                    { speaker: 'MRAGANK', text: "So what, bitch? You gonna diddle me too?", position: 'left', emotion: 'angry' },
                    { speaker: 'S', text: "I have no interest in you. I can't cheat on my girlfriend... fuck, what am I doing here?", position: 'right' },
                    { speaker: 'MRAGANK', text: "Bitch, it's too late. You're gonna die here. Good luck diddling demons in hell.", position: 'left', emotion: 'angry' },
                    { speaker: '', text: "FINAL BATTLE!", position: 'center' }
                ]
            }
        ];

        // Intro dialogue - updated with specific story
        this.introDialogue = [
            { speaker: '', text: "2022. A match changed everything.", position: 'narrator' },
            { speaker: '', text: "Mragank came to Bangalore and found Abhinandhini on Hinge.", position: 'narrator' },
            { speaker: '', text: "Two cute dates, but zero game. Rizzless, tbh.", position: 'narrator' },
            { speaker: 'MRAGANK', text: "Hey! She could have initiated things too, okay? And hand-holding doesn't count.", position: 'left', emotion: 'angry' },
            { speaker: '', text: "But he refused to give up. She has been in his head ever since.", position: 'narrator' },
            { speaker: '', text: "He realized now is the perfect opportunity...", position: 'narrator' },
            { speaker: '', text: "But first, he needs to defeat the ghosts of her past.", position: 'narrator' },
            { speaker: '', text: "Her history. Her 7 EVIL EXES. They stand in his way.", position: 'narrator' }
        ];

        // Wordle/Cute Scene Dialogue
        this.wordleDialogue = [
            { speaker: 'MRAGANK', text: "Phew... that was the last of them.", position: 'left', emotion: 'happy' },
            { speaker: 'ABHINANDHINI', text: "You actually did it? I'm impressed.", position: 'right', emotion: 'happy' },
            { speaker: 'MRAGANK', text: "I'd do anything for you. Even fight seven evil exes.", position: 'left', emotion: 'nervous' },
            { speaker: 'ABHINANDHINI', text: "You're crazy.", position: 'right', emotion: 'happy' },
            { speaker: 'MRAGANK', text: "Do you remember our daily ritual?", position: 'left', emotion: 'happy' },
            { speaker: 'ABHINANDHINI', text: "Wait... don't tell me it's...", position: 'right', emotion: 'bored' },
            { speaker: 'MRAGANK', text: "Wordle. I still kept the streak alive.", position: 'left', emotion: 'victory' },
            { speaker: 'ABHINANDHINI', text: "You got lucky!", position: 'right', emotion: 'nervous' },
            { speaker: 'MRAGANK', text: "Classic Kitty Brain behavior.", position: 'left', emotion: 'happy' },
            { speaker: 'ABHINANDHINI', text: "Ugh, I'm getting upset.", position: 'right', emotion: 'angry' },
            { speaker: 'MRAGANK', text: "No bb, wait!", position: 'left', emotion: 'happy' }
        ];

        // Proposal dialogue (Final text lines)
        this.proposalLines = [
            "After beating all seven of your exes.",
            "There's only one question left..."
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDevTools();
        this.simulateLoading();
    }

    setupDevTools() {
        // Create Dev Menu
        const devMenu = document.createElement('div');
        devMenu.id = 'dev-menu';
        devMenu.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #0f0;
            padding: 10px;
            z-index: 9999;
            color: #0f0;
            font-family: monospace;
            display: none;
            flex-direction: column;
            gap: 5px;
        `;
        
        const title = document.createElement('div');
        title.textContent = "DEV TOOLS (Shift+D)";
        title.style.marginBottom = "5px";
        devMenu.appendChild(title);

        const addBtn = (text, onClick) => {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.style.cssText = "background:#333; color:#fff; border:1px solid #666; cursor:pointer; padding:2px 5px;";
            btn.addEventListener('click', onClick);
            devMenu.appendChild(btn);
        };

        addBtn("Boss 1 (R)", () => this.jumpToBoss(0));
        addBtn("Boss 2 (A)", () => this.jumpToBoss(1));
        addBtn("Boss 3 (K)", () => this.jumpToBoss(2));
        addBtn("Boss 4 (Vi)", () => this.jumpToBoss(3));
        addBtn("Boss 5 (V)", () => this.jumpToBoss(4));
        addBtn("Boss 6 (P)", () => this.jumpToBoss(5));
        addBtn("Boss 7 (S)", () => this.jumpToBoss(6));
        addBtn("Wordle Scene", () => this.startWordleScene());
        addBtn("Proposal", () => this.startProposal());
        addBtn("Ending", () => this.showEnding());

        document.body.appendChild(devMenu);

        // Toggle Listener
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'D') {
                devMenu.style.display = devMenu.style.display === 'none' ? 'flex' : 'none';
            }
        });
    }

    jumpToBoss(index) {
        this.currentBoss = index;
        // Stop current audio/state
        audioManager.stopBGM();
        // Go straight to splash
        this.showBossSplash(index);
        // Hide dev menu
        document.getElementById('dev-menu').style.display = 'none';
    }
    
    setTheme(theme) {
        const container = document.getElementById('game-container');
        // Remove old themes
        container.classList.remove('theme-default', 'theme-battle', 'theme-romance');
        // Add new
        container.classList.add(`theme-${theme}`);
    }

    setupEventListeners() {
        // Title screen tap to start
        const titleScreen = document.getElementById('title-screen');
        titleScreen.addEventListener('click', () => this.startGame());
        titleScreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startGame();
        }, { passive: false });

        // Dialogue advancement
        const dialogueScreen = document.getElementById('dialogue-screen');
        dialogueScreen.addEventListener('click', () => dialogueSystem.advance());
        dialogueScreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            dialogueSystem.advance();
        }, { passive: false });

        // Boss splash tap to continue
        const bossSplash = document.getElementById('boss-splash');
        bossSplash.addEventListener('click', () => this.startBattle());
        bossSplash.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startBattle();
        }, { passive: false });

        // Victory screen tap to continue
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.addEventListener('click', () => this.afterVictory());
        victoryScreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.afterVictory();
        }, { passive: false });

        // Proposal buttons
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');

        yesBtn.addEventListener('click', () => this.handleYes());
        noBtn.addEventListener('click', () => this.handleNo());
        noBtn.addEventListener('mouseenter', () => this.handleNoHover());
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleNo();
        }, { passive: false });

        // Audio toggle
        const audioToggle = document.getElementById('audio-toggle');
        audioToggle.addEventListener('click', () => {
            const muted = audioManager.toggleMute();
            audioToggle.classList.toggle('muted', muted);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            sceneManager.resizeCanvas(document.getElementById('scene-canvas'));
            if (spriteSystem && spriteSystem.canvas) {
                spriteSystem.resize();
            }
        });
    }

    simulateLoading() {
        console.log('Starting loading simulation...');
        const progressBar = document.querySelector('.loading-progress');
        let progress = 0;

        const loadInterval = setInterval(() => {
            progress += Math.random() * 15;
            console.log('Loading progress:', progress);
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);
                console.log('Loading complete, showing title screen.');
                setTimeout(() => this.showTitleScreen(), 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    showTitleScreen() {
        this.setTheme('default');
        sceneManager.showScreen('title');
        this.state = 'title';

        // Initialize audio on first interaction
        document.addEventListener('click', () => audioManager.init(), { once: true });
        document.addEventListener('touchstart', () => audioManager.init(), { once: true });
        
        // Draw Title Characters
        if (window.spriteSystem) {
            const mragankUrl = window.spriteSystem.generateSpriteDataUrl('mragank', 'nervous', false, 'fullbody');
            const abhiUrl = window.spriteSystem.generateSpriteDataUrl('abhinandhini', 'bored', false, 'fullbody');
            
            const mragankEl = document.getElementById('title-mragank');
            const abhiEl = document.getElementById('title-abhi');
            
            if (mragankEl) mragankEl.style.backgroundImage = `url('${mragankUrl}')`;
            if (abhiEl) abhiEl.style.backgroundImage = `url('${abhiUrl}')`;
        }
    }

    startGame() {
        if (this.state !== 'title') return;
        this.state = 'intro';

        audioManager.init();
        audioManager.playConfirm();
        audioManager.startBGM('title');

        // Show intro dialogue
        sceneManager.showScreen('dialogue');
        sceneManager.drawDialogueBackground('city');
        sceneManager.setLocation("KEMPEGOWDA AIRPORT");
        if (window.spriteAnimator) spriteAnimator.setLocation('Airport');

        dialogueSystem.startDialogue(this.introDialogue, () => {
            this.showBossSplash(0);
        });
    }

    showBossSplash(bossIndex) {
        this.currentBoss = bossIndex;
        const boss = this.bosses[bossIndex];

        this.state = 'bossSplash';
        audioManager.stopBGM();
        audioManager.playExplosion();

        // Update boss splash screen
        document.getElementById('boss-num').textContent = bossIndex + 1;
        document.getElementById('boss-name-display').textContent = boss.name;
        document.getElementById('boss-title-display').textContent = boss.title;

        // Set boss color
        const bossSprite = document.getElementById('boss-sprite-preview');
        bossSprite.style.setProperty('--boss-gradient', this.getBossGradient(boss.color));

        sceneManager.showScreen('bossSplash');
        
        // Hide location sign on splash
        const sign = document.getElementById('location-sign');
        if (sign) sign.classList.add('hidden');

        // Auto-advance after delay or tap
        setTimeout(() => {
            if (this.state === 'bossSplash') {
                this.startBossDialogue();
            }
        }, 3000);
    }

    getBossGradient(color) {
        return `linear-gradient(180deg,
            #2c3e50 0%,
            #2c3e50 15%,
            #ffd5b4 15%,
            #ffd5b4 35%,
            ${color} 35%,
            ${color} 65%,
            #1a1a2e 65%,
            #1a1a2e 90%,
            #0f0f1a 90%
        )`;
    }

    startBattle() {
        if (this.state !== 'bossSplash') return;
        this.startBossDialogue();
    }

    startBossDialogue() {
        this.state = 'bossDialogue';
        const boss = this.bosses[this.currentBoss];
        
        this.setTheme('battle');

        audioManager.startBGM('boss');

        sceneManager.showScreen('dialogue');
        sceneManager.drawDialogueBackground('battle');
        sceneManager.setLocation(boss.location.toUpperCase());
        if (window.spriteAnimator) spriteAnimator.setLocation(boss.location);

        // Set character appearances
        const bossGradient = this.getBossGradient(boss.color);
        
        // Mragank on left (default), Boss on right
        dialogueSystem.setCharacters(null, bossGradient);

        dialogueSystem.startDialogue(boss.dialogue, () => {
            this.startSwordBattle();
        });
    }

    startSwordBattle() {
        this.state = 'combat';
        const boss = this.bosses[this.currentBoss];
        
        this.setTheme('battle');

        sceneManager.showScreen('combat');
        
        // Hide location sign in combat
        const sign = document.getElementById('location-sign');
        if (sign) sign.classList.add('hidden');

        // Start sword combat with boss type
        swordCombat.startBattle(boss.name, boss.type, (playerWon, maxCombo) => {
            this.handleBattleEnd(playerWon, maxCombo);
        });
    }

    handleBattleEnd(playerWon, maxCombo) {
        if (playerWon) {
            this.showVictoryScreen();
        } else {
            // Retry battle
            setTimeout(() => {
                this.startSwordBattle();
            }, 2000);
        }
    }

    showVictoryScreen() {
        this.state = 'victory';
        const boss = this.bosses[this.currentBoss];
        
        this.setTheme('battle');

        audioManager.stopBGM();
        audioManager.playExplosion();

        document.getElementById('victory-message').textContent = `${boss.name} DEFEATED!`;

        sceneManager.showScreen('victory');

        // Auto-advance after celebration
        setTimeout(() => {
            if (this.state === 'victory') {
                this.afterVictory();
            }
        }, 3000);
    }

    afterVictory() {
        if (this.state !== 'victory') return;

        this.currentBoss++;

        if (this.currentBoss >= this.totalBosses) {
            // All bosses defeated - start Wordle Scene
            this.startWordleScene();
        } else {
            // Next boss
            this.showBossSplash(this.currentBoss);
        }
    }

    startWordleScene() {
        this.state = 'wordleScene';
        this.setTheme('romance');
        audioManager.stopBGM();
        audioManager.startBGM('romance');

        sceneManager.showScreen('dialogue');
        sceneManager.drawDialogueBackground('Naveen Terraces');
        sceneManager.setLocation("NAVEEN TERRACES");
        if (window.spriteAnimator) spriteAnimator.setLocation('Naveen Terraces');

        dialogueSystem.startDialogue(this.wordleDialogue, () => {
            this.startProposal();
        });
    }

    async startProposal() {
        this.state = 'proposal';
        // Theme/Music/BG already set by startWordleScene, but safe to set again or just ensure screen transition
        
        this.setTheme('romance');
        // audioManager.startBGM('romance'); // Already playing

        sceneManager.showScreen('proposal');
        sceneManager.drawDialogueBackground('romantic'); // Keep same BG or romantic pink one? User wanted 'Naveen Terraces' for end. 
        // Let's keep Naveen Terraces visually consistent or switch to generic hearts?
        // Game.js before said: sceneManager.drawDialogueBackground('romantic'); sceneManager.setLocation("NAVEEN TERRACES");
        // I will keep the romantic BG for the text proposal part as it might have text overlay readability
        sceneManager.drawDialogueBackground('romantic'); 
        sceneManager.setLocation("NAVEEN TERRACES");
        
        proposalEffects.startHearts();

        // Set Abhinandhini's portrait (Generated Pixel Art)
        const proposalChar = document.getElementById('proposal-character');
        if (window.spriteSystem) {
            const imageUrl = window.spriteSystem.generateSpriteDataUrl('abhinandhini');
            proposalChar.classList.add('has-portrait');
            proposalChar.style.setProperty('--char-portrait', `url('${imageUrl}')`);
        }

        // Show proposal dialogue sequence
        await proposalDialogue.showSequence(this.proposalLines, 2000);

        // Show the question
        await proposalDialogue.wait(1000);
        document.getElementById('proposal-question').classList.remove('hidden');
        audioManager.playHeartbeat();
    }

    handleNoHover() {
        // Play warning sound on hover
        audioManager.playMiss();
    }

    handleNo() {
        if (this.noDestroyed) return;

        this.noDestroyed = true;

        // Dramatic slash animation
        const slashOverlay = document.getElementById('slash-overlay');
        slashOverlay.classList.remove('hidden');

        audioManager.playSlash();

        setTimeout(() => {
            slashOverlay.classList.add('hidden');

            // Destroy the NO button
            const noBtn = document.getElementById('no-btn');
            noBtn.classList.add('destroyed');
            audioManager.playExplosion();

            // Show "That's not an option" message
            proposalDialogue.showText('"That\'s not an option."');

            setTimeout(() => {
                noBtn.style.visibility = 'hidden';
            }, 500);
        }, 300);
    }

    handleYes() {
        if (this.state !== 'proposal') return;
        this.state = 'ending';

        audioManager.playConfirm();
        audioManager.playLoveTheme();

        this.showEnding();
    }

    showEnding() {
        proposalEffects.stop();
        sceneManager.showScreen('ending');

        // Start confetti
        confettiEffects.startConfetti();
        audioManager.playConfetti();

        // Start ending music
        setTimeout(() => {
            audioManager.startBGM('ending');
        }, 2000);
    }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});