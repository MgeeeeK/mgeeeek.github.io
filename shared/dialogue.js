// ========================================
// DIALOGUE SYSTEM
// Visual Novel Style Text Display
// ========================================

class DialogueSystem {
    constructor() {
        this.dialogueBox = document.getElementById('dialogue-box');
        this.speakerName = document.getElementById('speaker-name');
        this.dialogueText = document.getElementById('dialogue-text');
        this.continueIndicator = document.getElementById('dialogue-continue');
        this.leftCharacter = document.getElementById('left-character');
        this.rightCharacter = document.getElementById('right-character');

        this.currentDialogue = [];
        this.currentIndex = 0;
        this.isTyping = false;
        this.typeSpeed = 30; // ms per character
        this.currentText = '';
        this.displayedText = '';
        this.typeInterval = null;
        this.onComplete = null;
        
        // Emotion & Animation State
        this.currentEmotion = 'neutral';
        this.mouthOpen = false;
        this.speakingCharacter = null; // 'left' or 'right'
        this.lastRightSpeakerType = null; // Track right character across dialogue lines
    }

    // Start a dialogue sequence
    startDialogue(dialogues, onComplete = null) {
        this.currentDialogue = dialogues;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.lastRightSpeakerType = null; // Reset so stale characters don't leak between scenes
        this.showNext();
    }

    showNext() {
        if (this.currentIndex >= this.currentDialogue.length) {
            this.endDialogue();
            return;
        }

        const dialogue = this.currentDialogue[this.currentIndex];
        this.displayDialogue(dialogue);
        this.currentIndex++;
    }

    displayDialogue(dialogue) {
        // Set speaker name
        this.speakerName.textContent = dialogue.speaker || '';
        
        // Set emotion
        this.currentEmotion = dialogue.emotion || 'neutral';
        this.speakingCharacter = dialogue.position; // left, right, or center

        // Update character states
        this.updateCharacters(dialogue);

        // Type out text
        this.typeText(dialogue.text);

        // Hide continue indicator while typing
        this.continueIndicator.style.visibility = 'hidden';
    }

    updateCharacters(dialogue) {
        // Reset animation states
        this.leftCharacter.classList.remove('speaking', 'inactive');
        this.rightCharacter.classList.remove('speaking', 'inactive');
        
        // Default visibility
        this.leftCharacter.style.opacity = '1';
        this.rightCharacter.style.opacity = '1';

        if (!window.spriteSystem) return; // Guard clause

        // LEFT CHAR (Always Mragank)
        // Only open mouth if Mragank is speaking
        const leftMouth = (this.speakingCharacter === 'left' && this.mouthOpen);
        // Only apply emotion if Mragank is the focus or reacting
        const leftEmotion = (dialogue.speaker === 'MRAGANK') ? this.currentEmotion : 'neutral';
        
        const leftUrl = window.spriteSystem.generateSpriteDataUrl('mragank', leftEmotion, leftMouth, 'fullbody');
        this.applyPortrait(this.leftCharacter, leftUrl);

        // RIGHT CHAR (Boss or Abhinandhini)
        let rightSpeakerType = null;
        if (dialogue.speaker === 'ABHINANDHINI' || dialogue.speaker === 'Abhinandhini') {
            rightSpeakerType = 'abhinandhini';
        } else if (dialogue.speaker && dialogue.speaker !== 'MRAGANK' && dialogue.position !== 'narrator') {
            rightSpeakerType = dialogue.speaker; // Boss name matches type
        }

        // Remember right character; fall back to last known when Mragank speaks
        if (rightSpeakerType) {
            this.lastRightSpeakerType = rightSpeakerType;
        } else if (this.lastRightSpeakerType && dialogue.speaker === 'MRAGANK') {
            rightSpeakerType = this.lastRightSpeakerType;
        }

        if (rightSpeakerType) {
            // Only open mouth if Right Char is speaking
            const rightMouth = (this.speakingCharacter === 'right' && this.mouthOpen);
            // Only apply emotion if Right Char is speaking
            const rightEmotion = (this.speakingCharacter === 'right') ? this.currentEmotion : 'neutral';

            const rightUrl = window.spriteSystem.generateSpriteDataUrl(rightSpeakerType, rightEmotion, rightMouth, 'fullbody');
            this.applyPortrait(this.rightCharacter, rightUrl);
        } else {
            // Clear right character if no speaker or narrator
            this.rightCharacter.style.backgroundImage = 'none';
        }

        // Highlight active speaker and Hide inactive
        if (dialogue.position === 'left') {
            this.leftCharacter.classList.add('speaking');
            this.rightCharacter.style.opacity = '0.4'; // Dim Ex when Mragank speaks
        } else if (dialogue.position === 'right') {
            this.rightCharacter.classList.add('speaking');
            this.leftCharacter.classList.add('inactive'); // Dim Mragank when Ex speaks
        } else if (dialogue.position === 'center' || dialogue.position === 'narrator') {
            this.leftCharacter.classList.add('inactive');
            this.rightCharacter.classList.add('inactive');
        }
    }

    applyPortrait(element, url) {
        element.classList.add('has-portrait');
        // Set background image directly to override any previous 'none'
        element.style.backgroundImage = `url('${url}')`;
    }

    typeText(text) {
        this.isTyping = true;
        this.currentText = text;
        this.displayedText = '';
        this.dialogueText.textContent = '';
        this.mouthOpen = false;

        let charIndex = 0;
        let frameCount = 0;

        if (this.typeInterval) {
            clearInterval(this.typeInterval);
        }

        this.typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                this.displayedText += text[charIndex];
                this.dialogueText.textContent = this.displayedText;

                // Play typewriter sound occasionally
                if (charIndex % 3 === 0) {
                    audioManager.playTypewriter();
                }

                // Animate Mouth: Toggle every 3 frames (approx 90ms)
                if (frameCount % 3 === 0) {
                    this.mouthOpen = !this.mouthOpen;
                    // Re-render portraits with new mouth state
                    // Use last known dialogue config (stored implicitly in currentEmotion/speakingCharacter)
                    // We need the full dialogue object to do this correctly, or just re-call a simplified update
                    // Ideally we should have stored 'currentDialogueObj'
                    this.updateMouthAnimation(); 
                }
                
                frameCount++;
                charIndex++;
            } else {
                this.finishTyping();
            }
        }, this.typeSpeed);
    }
    
    updateMouthAnimation() {
        // Simplified update that just regenerates sprites based on stored state
        // We need to reconstruct the context for updateCharacters. 
        // Better to just call updateCharacters with the current dialogue object.
        const dialogue = this.currentDialogue[this.currentIndex - 1]; // currentIndex was incremented
        if (dialogue) {
            this.updateCharacters(dialogue);
        }
    }

    finishTyping() {
        if (this.typeInterval) {
            clearInterval(this.typeInterval);
            this.typeInterval = null;
        }

        this.isTyping = false;
        this.mouthOpen = false; // Close mouth
        this.updateMouthAnimation(); // Final render
        
        this.dialogueText.textContent = this.currentText;
        this.continueIndicator.style.visibility = 'visible';
    }

    // Skip to end of current text or advance to next
    advance() {
        if (this.isTyping) {
            // Skip typing animation
            this.finishTyping();
        } else {
            // Advance to next dialogue
            audioManager.playSelect();
            this.showNext();
        }
    }

    endDialogue() {
        if (this.onComplete) {
            this.onComplete();
        }
    }

    // Set character sprites
    setCharacters(leftSprite = null, rightSprite = null) {
        if (leftSprite) {
            this.leftCharacter.style.setProperty('--char-gradient', leftSprite);
        }
        if (rightSprite) {
            this.rightCharacter.style.setProperty('--char-gradient', rightSprite);
        }
    }

    // Clear dialogue
    clear() {
        this.speakerName.textContent = '';
        this.dialogueText.textContent = '';
        this.continueIndicator.style.visibility = 'hidden';
        this.leftCharacter.classList.remove('speaking', 'inactive');
        this.rightCharacter.classList.remove('speaking', 'inactive');
    }
}

// Proposal dialogue system (separate element)
class ProposalDialogue {
    constructor() {
        this.dialogueBox = document.getElementById('proposal-dialogue');
        this.isTyping = false;
        this.typeSpeed = 40;
    }

    async showText(text) {
        return new Promise((resolve) => {
            this.isTyping = true;
            this.dialogueBox.textContent = '';

            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    this.dialogueBox.textContent += text[charIndex];
                    if (charIndex % 3 === 0) {
                        audioManager.playTypewriter();
                    }
                    charIndex++;
                } else {
                    clearInterval(interval);
                    this.isTyping = false;
                    resolve();
                }
            }, this.typeSpeed);
        });
    }

    async showSequence(texts, delay = 1500) {
        for (const text of texts) {
            await this.showText(text);
            await this.wait(delay);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    clear() {
        this.dialogueBox.textContent = '';
    }
}

// Global instances
const dialogueSystem = new DialogueSystem();
const proposalDialogue = new ProposalDialogue();
