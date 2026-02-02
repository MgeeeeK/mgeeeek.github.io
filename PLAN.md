# Valentine's Quest: Scott Pilgrim Edition

## The Concept
A romantic visual novel meets quick-time-event game where Mragank battles 7 of Abhinandhini's exes to ask her to be his Valentine. Inspired by *Scott Pilgrim vs. The World*.

**Target Experience:** Beautiful, simple, interactive, creative, pragmatic. Works perfectly on phone AND laptop.

---

## Gameplay Flow

### 1. Title Screen
- Pixel art title: **"MRAGANK vs. THE WORLD"**
- Subtitle: *"Press any key to begin"* / *"Tap to start"*
- 8-bit background music starts

### 2. Opening Cutscene
Quick visual novel intro:
> *"Mragank Shekhar has fallen for Abhinandhini, a Tamil girl from Bangalore."*
> *"But she has a complicated past..."*
> *"To win her heart, he must defeat her 7 EVIL EXES."*

### 3. The 7 Battles (Visual Novel + QTE Combat)

Each battle follows this pattern:
1. **Boss Splash Screen** - Enemy appears with dramatic title
2. **Trash Talk** - Quick dialogue exchange (2-3 lines each)
3. **QTE Combat** - Timed button/tap sequences to attack
4. **Victory** - Enemy explodes into coins (classic Scott Pilgrim)

#### The Exes (in order):

| # | Name | Title | Personality/Joke |
|---|------|-------|------------------|
| 1 | ??? | "The DM Slider" | Generic: slid into DMs, never met IRL |
| 2 | ??? | "The Situationship" | Generic: "we weren't even dating" |
| 3 | **K** | "The Emo Guitarist" | Ex-colleague, plays sad guitar, probably has a SoundCloud |
| 4 | ??? | "The Gym Bro" | Generic: only talked about protein and PRs |
| 5 | **V** | "The Comedian" | Standup comic, FWB history. Mragank's line: *"You're funny, but not THAT funny."* |
| 6 | ??? | "The Rebound" | Generic: existed only to fill a void |
| 7 | **S** | "The 31-Year-Old Weirdo" | Final boss vibes. Ex-colleague. Creepy energy. |

### 4. QTE Combat System (Simple & Mobile-Friendly)

**How it works:**
- Circular "hit zones" appear on screen with countdown timers
- Player taps/clicks them at the right moment
- Perfect timing = "PERFECT!" + big damage
- Good timing = "GOOD!" + normal damage
- Miss = enemy counterattacks

**Visual style:**
- Think *Guitar Hero* meets *Scott Pilgrim*
- Each successful hit shows pixel slash animation
- Screen shake on impacts
- Health bars for both characters

**Controls:**
- **Desktop:** Click the zones OR press spacebar when indicator aligns
- **Mobile:** Tap the zones (touch-native design)

### 5. The Proposal Scene

After defeating the 7th ex:

1. **Scene Change** - Romantic pixel art background (sunset, hearts)
2. **Mragank walks to center screen**
3. **Dialogue box appears:**
   > *"Abhinandhini..."*
   > *"I may not speak perfect English..."*
   > *"But I beat you at Wordle every single day."*
   > *"And I've defeated all your exes."*
   > *"So there's only one question left..."*

4. **THE QUESTION:**
   ```
   ╔═══════════════════════════════════════╗
   ║     WILL YOU BE MY VALENTINE?         ║
   ║                                       ║
   ║      [ YES ]         [ NO ]           ║
   ╚═══════════════════════════════════════╝
   ```

5. **THE TWIST (if she hovers/taps NO):**
   - Mragank draws his sword
   - DRAMATIC SLASH animation
   - The "NO" button shatters/explodes
   - *"That's not an option."*
   - Only YES remains

6. **Victory Ending:**
   - Confetti explosion
   - Hearts everywhere
   - Final message: *"Happy Valentine's Day, Abhinandhini"*
   - Maybe a cute pixel art of you two together

---

## Inside Jokes to Weave In

| Reference | Where to Use |
|-----------|--------------|
| Tamil from Bangalore | Opening: "Tamil girl from Bangalore" |
| Wordle rivalry | Proposal dialogue |
| Her cooking/baking | Victory screen: "Now let's celebrate with your famous [dish]" |
| "Hot and sexy" | Keep subtle - pixel art can be flattering |
| BPD | Skip or very light touch - keep the vibe romantic not clinical |

---

## Technical Architecture

### Stack
- **HTML5** - Structure
- **CSS3** - Styling, animations, responsive design
- **Vanilla JavaScript** - Game logic, QTE system
- **HTML5 Canvas** - Combat animations and effects
- **Web Audio API** - 8-bit music and SFX

### Responsive Design Strategy
```
┌─────────────────────────────────────┐
│  DESKTOP (>768px)                   │
│  - Centered game container          │
│  - Keyboard shortcuts shown         │
│  - Click OR keyboard for QTE        │
└─────────────────────────────────────┘

┌─────────────────────┐
│  MOBILE (<768px)    │
│  - Full screen      │
│  - Touch optimized  │
│  - Larger hit zones │
│  - No keyboard tips │
└─────────────────────┘
```

### File Structure
```
/
├── index.html          # Main entry point
├── style.css           # All styling
├── js/
│   ├── game.js         # Main game loop & state management
│   ├── scenes.js       # Scene transitions (title, battle, proposal)
│   ├── qte.js          # Quick-time event system
│   ├── dialogue.js     # Visual novel dialogue system
│   └── audio.js        # Sound management
├── assets/
│   ├── sprites/        # Character & UI pixel art
│   ├── backgrounds/    # Scene backgrounds
│   └── audio/
│       ├── bgm/        # Background music
│       └── sfx/        # Sound effects
└── PLAN.md
```

---

## Audio Plan

### Background Music (8-bit style)
1. **Title/Menu** - Upbeat chiptune
2. **Battle Theme** - Intense, fast-paced
3. **Boss Intro** - Dramatic sting
4. **Victory Jingle** - Short celebratory tune
5. **Proposal Scene** - Romantic, softer melody
6. **Ending** - Triumphant love theme

### Sound Effects
- Slash/hit sounds
- Perfect/Good/Miss indicators
- Button clicks
- Enemy defeat explosion
- NO button destruction
- Confetti pop

**Source options:**
- Generate with jsfxr/ChipTone (free tools)
- Use royalty-free 8-bit packs
- Keep files small for fast loading

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Set up HTML structure with responsive container
- [ ] Create CSS styling system (pixel art aesthetic)
- [ ] Build scene management system (title → battle → proposal)
- [ ] Implement basic state machine

### Phase 2: Visual Novel System
- [ ] Dialogue box component
- [ ] Character sprite display
- [ ] Text typewriter effect
- [ ] Scene transition animations

### Phase 3: QTE Combat
- [ ] Hit zone spawning system
- [ ] Timing detection (perfect/good/miss)
- [ ] Health bar system
- [ ] Combat animations (slash, shake, damage numbers)

### Phase 4: Content
- [ ] Create/source all 7 enemy sprites
- [ ] Create Mragank sprite
- [ ] Write all dialogue for each battle
- [ ] Design backgrounds (battle arena, romantic finale)

### Phase 5: The Finale
- [ ] Proposal scene layout
- [ ] YES/NO button interaction
- [ ] NO button destruction animation
- [ ] Victory celebration (confetti, hearts)

### Phase 6: Audio
- [ ] Integrate background music
- [ ] Add sound effects to all interactions
- [ ] Ensure audio works on mobile (user interaction requirement)

### Phase 7: Polish & Testing
- [ ] Mobile responsiveness testing
- [ ] Touch target sizing (min 44px)
- [ ] Performance optimization
- [ ] Test on iPhone Safari, Android Chrome
- [ ] Add loading screen for assets

---

## Verification / Testing Plan

1. **Desktop Chrome:** Full playthrough with keyboard and mouse
2. **Desktop Firefox:** Compatibility check
3. **iPhone Safari:** Touch controls, audio, full playthrough
4. **Android Chrome:** Touch controls, audio, full playthrough
5. **Test the "NO" button:** Verify destruction animation works
6. **Test audio:** Ensure music/SFX play after first interaction
7. **Speed test:** Ensure loads quickly on mobile data

---

## Creative Notes

### Pixel Art Style
- 16-bit aesthetic (SNES era)
- Limited but vibrant color palette
- Chunky, readable fonts
- Clear visual hierarchy

### Tone
- Funny but romantic
- Self-aware and playful
- Celebrates your relationship
- The "NO" destruction is the comedic peak

### What Makes It Special
1. Personal touches (the 3 named exes, inside jokes)
2. The inevitable YES ending
3. Mobile-first thinking
4. Full audio experience
5. It's literally a love letter disguised as a game

---

## Open Questions (Resolved)

- [x] Combat style → Visual Novel + QTE
- [x] Number of exes → 7 (3 named, 4 generic)
- [x] Her name → Abhinandhini
- [x] Audio → Essential (8-bit music + SFX)
- [x] Inside jokes → Wordle, Chennai, cooking/baking
