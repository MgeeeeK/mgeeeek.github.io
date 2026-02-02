// ========================================
// AUDIO MANAGER
// 8-bit Sound Effects & Music
// ========================================

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.isMuted = false;
        this.isInitialized = false;
        this.bgmOscillator = null;
        this.bgmGain = null;
        this.currentBGM = null;
    }

    init() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.3;
            this.isInitialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.isMuted ? 0 : 0.3;
        }
        return this.isMuted;
    }

    // Play a simple 8-bit beep
    playTone(frequency, duration, type = 'square') {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Sound effects
    playSelect() {
        this.playTone(440, 0.1);
        setTimeout(() => this.playTone(660, 0.1), 50);
    }

    playConfirm() {
        this.playTone(523, 0.1);
        setTimeout(() => this.playTone(659, 0.1), 100);
        setTimeout(() => this.playTone(784, 0.15), 200);
    }

    playHit() {
        this.playTone(150, 0.1, 'sawtooth');
        this.playTone(100, 0.15, 'square');
    }

    playPerfect() {
        this.playTone(880, 0.1);
        setTimeout(() => this.playTone(1100, 0.1), 50);
        setTimeout(() => this.playTone(1320, 0.15), 100);
    }

    playGood() {
        this.playTone(660, 0.1);
        setTimeout(() => this.playTone(880, 0.1), 80);
    }

    playMiss() {
        this.playTone(200, 0.2, 'sawtooth');
        setTimeout(() => this.playTone(150, 0.2, 'sawtooth'), 100);
    }

    playVictory() {
        const melody = [523, 659, 784, 1047];
        melody.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2), i * 150);
        });
    }

    playDefeat() {
        const melody = [400, 350, 300, 250];
        melody.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'sawtooth'), i * 200);
        });
    }

    playExplosion() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playTone(100 + Math.random() * 100, 0.1, 'sawtooth');
            }, i * 50);
        }
    }

    playSlash() {
        this.playTone(800, 0.05, 'sawtooth');
        setTimeout(() => this.playTone(400, 0.1, 'square'), 30);
        setTimeout(() => this.playTone(200, 0.15, 'sawtooth'), 60);
    }

    // Sword combat sounds
    playSwordSwing() {
        // Whoosh sound for sword swing
        this.playTone(300, 0.08, 'sawtooth');
        setTimeout(() => this.playTone(600, 0.05, 'sawtooth'), 20);
        setTimeout(() => this.playTone(400, 0.1, 'sawtooth'), 50);
    }

    playSwordHit() {
        // Impactful hit sound
        this.playTone(150, 0.08, 'square');
        this.playTone(100, 0.12, 'sawtooth');
        setTimeout(() => this.playTone(80, 0.15, 'square'), 30);
    }

    playSwordClash() {
        // Metal clashing sound
        this.playTone(800, 0.05, 'square');
        this.playTone(1200, 0.04, 'sawtooth');
        setTimeout(() => this.playTone(600, 0.08, 'square'), 20);
        setTimeout(() => this.playTone(900, 0.06, 'sawtooth'), 40);
        setTimeout(() => this.playTone(400, 0.1, 'square'), 60);
    }

    playBlock() {
        // Shield/block sound
        this.playTone(200, 0.1, 'square');
        this.playTone(300, 0.08, 'sawtooth');
    }

    playCounterAttack() {
        // Quick counter sound
        this.playTone(500, 0.05, 'sawtooth');
        setTimeout(() => this.playTone(700, 0.05, 'square'), 30);
        setTimeout(() => this.playTone(400, 0.1, 'sawtooth'), 60);
    }

    playHeartbeat() {
        this.playTone(80, 0.15, 'sine');
        setTimeout(() => this.playTone(80, 0.1, 'sine'), 150);
    }

    playTypewriter() {
        this.playTone(800 + Math.random() * 200, 0.02, 'square');
    }

    // Background music - simple 8-bit loop
    startBGM(type = 'title') {
        if (!this.isInitialized || this.isMuted) return;
        this.stopBGM();
        this.resume();

        this.currentBGM = type;
        this.bgmInterval = this.createBGMLoop(type);
    }

    createBGMLoop(type) {
        const patterns = {
            title: {
                notes: [262, 330, 392, 330, 262, 330, 392, 523],
                tempo: 300
            },
            battle: {
                notes: [196, 220, 262, 294, 330, 294, 262, 220],
                tempo: 150
            },
            boss: {
                notes: [147, 165, 196, 220, 196, 165, 147, 131],
                tempo: 180
            },
            victory: {
                notes: [523, 659, 784, 880, 784, 659, 523, 659],
                tempo: 200
            },
            romance: {
                notes: [392, 440, 523, 587, 659, 587, 523, 440],
                tempo: 400
            },
            ending: {
                notes: [523, 587, 659, 784, 880, 784, 659, 587],
                tempo: 350
            }
        };

        const pattern = patterns[type] || patterns.title;
        let noteIndex = 0;

        return setInterval(() => {
            if (this.isMuted) return;

            const note = pattern.notes[noteIndex];
            this.playTone(note, 0.15, 'square');

            // Add bass note on every other beat
            if (noteIndex % 2 === 0) {
                this.playTone(note / 2, 0.2, 'triangle');
            }

            noteIndex = (noteIndex + 1) % pattern.notes.length;
        }, pattern.tempo);
    }

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
        this.currentBGM = null;
    }

    // Celebration sounds
    playConfetti() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.playTone(400 + Math.random() * 800, 0.1, 'square');
            }, i * 100);
        }
    }

    playLoveTheme() {
        const melody = [523, 587, 659, 698, 784, 880, 988, 1047];
        melody.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.3, 'sine');
                this.playTone(freq / 2, 0.35, 'triangle');
            }, i * 300);
        });
    }
}

// Global audio manager instance
const audioManager = new AudioManager();
