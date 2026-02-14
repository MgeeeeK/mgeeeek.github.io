// ========================================
// PET SYSTEM
// Stats, decay, evolution, persistence
// ========================================

class Pet {
    constructor() {
        this.hunger = 4;       // 0-4 (0 = starving)
        this.happiness = 4;    // 0-4 (0 = miserable)
        this.discipline = 5;   // 0-10
        this.age = 0;          // in days (fractional)
        this.weight = 5;       // lbs
        this.health = 100;     // 0-100
        this.isSleeping = false;
        this.stage = 'egg';    // egg, baby, child, teen, adult

        this.timestamps = {
            lastFed: Date.now(),
            lastPlayed: Date.now(),
            birthDate: Date.now(),
            sleepStart: null,
            lastSave: Date.now(),
            healthZeroSince: null
        };

        this.progress = {
            hasSeenIntro: false,
            gamesPlayed: 0
        };

        // Internal tracking for care quality
        this._hungerHistory = [];
        this._happinessHistory = [];
    }

    applyTimeDecay(elapsedMs) {
        if (elapsedMs <= 0) return;

        const hours = elapsedMs / (1000 * 60 * 60);

        // Update age
        this.age = (Date.now() - this.timestamps.birthDate) / (1000 * 60 * 60 * 24);

        if (this.stage === 'egg') return; // Egg doesn't decay

        if (!this.isSleeping) {
            // Hunger: -1 per 2 hours
            const hungerLoss = Math.floor(hours / 2);
            this.hunger = Math.max(0, this.hunger - hungerLoss);

            // Happiness: -1 per 3 hours
            const happyLoss = Math.floor(hours / 3);
            this.happiness = Math.max(0, this.happiness - happyLoss);
        }

        // Health damage when starving
        if (this.hunger === 0) {
            const healthLoss = Math.floor(hours) * 5;
            this.health = Math.max(0, this.health - healthLoss);

            if (this.health === 0 && !this.timestamps.healthZeroSince) {
                this.timestamps.healthZeroSince = Date.now();
            }
        } else {
            // Slowly recover health when fed
            if (this.health < 100 && this.hunger >= 2) {
                this.health = Math.min(100, this.health + Math.floor(hours) * 2);
            }
            this.timestamps.healthZeroSince = null;
        }

        // Track history for care quality
        this._hungerHistory.push(this.hunger);
        this._happinessHistory.push(this.happiness);
        if (this._hungerHistory.length > 20) this._hungerHistory.shift();
        if (this._happinessHistory.length > 20) this._happinessHistory.shift();
    }

    checkEvolution() {
        const prevStage = this.stage;
        if (this.age < 0.003) {  // ~4 minutes as egg (for demo)
            this.stage = 'egg';
        } else if (this.age < 1) {
            this.stage = 'baby';
        } else if (this.age < 3) {
            this.stage = 'child';
        } else if (this.age < 7) {
            this.stage = 'teen';
        } else {
            this.stage = 'adult';
        }
        return this.stage !== prevStage;
    }

    getCareQuality() {
        if (this._hungerHistory.length === 0) return 1;
        const avgHunger = this._hungerHistory.reduce((a, b) => a + b, 0) / this._hungerHistory.length;
        const avgHappy = this._happinessHistory.reduce((a, b) => a + b, 0) / this._happinessHistory.length;
        const disciplineScore = this.discipline / 10;
        return (avgHunger / 4 + avgHappy / 4 + disciplineScore) / 3;
    }

    feed(type) {
        if (this.isSleeping || this.stage === 'egg') return false;
        if (type === 'meal') {
            this.hunger = Math.min(4, this.hunger + 1);
            this.weight += 1;
        } else if (type === 'snack') {
            this.happiness = Math.min(4, this.happiness + 1);
            this.weight += 2;
        }
        this.timestamps.lastFed = Date.now();
        return true;
    }

    play() {
        if (this.isSleeping || this.stage === 'egg') return false;
        this.happiness = Math.min(4, this.happiness + 1);
        this.weight = Math.max(1, this.weight - 1);
        this.timestamps.lastPlayed = Date.now();
        this.progress.gamesPlayed++;
        return true;
    }

    applyDiscipline(type) {
        if (this.isSleeping || this.stage === 'egg') return false;
        if (type === 'praise') {
            this.discipline = Math.min(10, this.discipline + 1);
            this.happiness = Math.min(4, this.happiness + 1);
        } else if (type === 'scold') {
            this.discipline = Math.min(10, this.discipline + 1);
            this.happiness = Math.max(0, this.happiness - 1);
        }
        return true;
    }

    sleep() {
        if (this.stage === 'egg') return false;
        this.isSleeping = true;
        this.timestamps.sleepStart = Date.now();
        return true;
    }

    wake() {
        this.isSleeping = false;
        this.timestamps.sleepStart = null;
        return true;
    }

    isDead() {
        if (!this.timestamps.healthZeroSince) return false;
        const deadDuration = Date.now() - this.timestamps.healthZeroSince;
        return deadDuration > 24 * 60 * 60 * 1000; // 24 hours at 0 health
    }

    getStageEmoji() {
        const emojis = { egg: '\uD83E\uDD5A', baby: '\uD83D\uDC7E', child: '\uD83D\uDC76', teen: '\uD83E\uDDD1', adult: '\uD83E\uDD35' };
        return emojis[this.stage] || '\uD83E\uDD5A';
    }

    serialize() {
        return {
            version: '1.0',
            pet: {
                hunger: this.hunger,
                happiness: this.happiness,
                discipline: this.discipline,
                age: this.age,
                weight: this.weight,
                health: this.health,
                isSleeping: this.isSleeping,
                stage: this.stage
            },
            timestamps: { ...this.timestamps },
            progress: { ...this.progress }
        };
    }

    static deserialize(data) {
        if (!data || data.version !== '1.0') return null;
        const pet = new Pet();
        Object.assign(pet, data.pet);
        pet.timestamps = { ...data.timestamps };
        pet.progress = { ...data.progress };
        return pet;
    }
}
