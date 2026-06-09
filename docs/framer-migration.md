# Framer Migration Guide

This guide is for recreating the portfolio page as editable Framer layers.

## Recommended Path

Use Framer's native canvas and rebuild the page section by section, using this Next project as the visual source.

Avoid importing the whole page as one code component if the goal is editing in Framer. A code component can preserve visual fidelity, but the layout, text, buttons, cards, and decorative elements will not feel like normal editable Framer layers.

## Source Page

Run the local site:

```bash
npm run dev
```

Open:

```text
http://localhost:3001
```

If Next chooses another port, use the port shown in the terminal.

## Assets

Use these files from `public/images`:

- `star1.svg`
- `star2.svg`
- `ornament-a.svg`
- `ornament-b.svg`
- `ornament-c.svg`
- `stamp-badge.png`
- `about-photo.jpg`

Fonts:

- Helvetica from `public/fonts`
- Playfair Display from Google Fonts

Framer may not preserve custom/local fonts during Figma import. Add fonts directly in Framer after import/rebuild.

## Page Structure

Create one Framer page with these sections:

1. Sticky nav
2. Hero
3. Work
4. About
5. Contact

Use Framer breakpoints:

- Desktop: `1200+`
- Tablet: `768`
- Phone: `390`
- Narrow phone check: `320`

## Global Colors

```text
lime-green:   #bbff6c
light-green:  #ddffb7
pink-hot:     #ff43b7
pink-mid:     #ff61cd
pink-light:   #ffc4e8
pink-pale:    #ff99d8
purple:       #d586ff
purple-pale:  #edd1fc
purple-light: #dfa5ff
purple-hot:   #ba43ff
pink-btn:     #ff76ca
black:        #000000
```

## Nav

Desktop and mobile:

- Height: `60`
- Position: sticky top
- Background: `light-green`
- Links aligned right
- Gap: `24` desktop, `20` phone padding
- Text: Helvetica Bold, `16`, `pink-hot`

Links:

- Work
- About & Contact

In Framer, link:

- Work -> section `#work`
- About & Contact -> section `#about`

## Hero Section

Section:

- Background: `lime-green`
- Min height: viewport minus nav
- Desktop padding top roughly `132-220`
- Phone padding top roughly `84-90`

Headline:

- "Welcome" Helvetica Bold Oblique
- "to" Playfair Italic
- "Abhi's Portfolio" Playfair Bold Italic

Approx desktop sizes:

- Welcome: `58-92`
- to: `34-52`
- Title: `68-110`

Approx phone sizes:

- Welcome: `44-54`
- to: `28`
- Title: `52-64`

Buttons:

- `Browse Projects` -> `#work`
- `Get in Touch` -> `#contact`
- Size desktop: `181 x 61`
- Phone: full-width within content
- Border: `3` black
- Radius: `63`
- Shadow: `0 7 black`

Decoratives:

- Keep as absolute positioned decorative images.
- Hide or crop overflow at section boundary.
- On phone, keep stamp/star partially off-canvas to the right.

## Work Section

Section:

- Background: `lime-green`
- Desktop padding: about `72-112` top, `24-80` sides
- Phone padding: `56 24 72`

Text:

- Heading: `Work, Work, Work`
- Playfair Bold, `38-54`
- Subtitle: Helvetica `16-20`, `pink-hot`

Cards:

- Desktop grid: 3 columns
- Phone grid: 2 columns
- Card aspect ratio: `5 / 4`
- Desktop max width: `200`
- Phone card width: fluid
- Border radius: `26`

Project labels:

- Social Media Brand Identity
- Internal Comms
- Fintech Schmintech
- Fully Filmy
- Print Media
- Email Strategy

Card colors:

- Top/corner blob: `pink-pale`
- Main block: `pink-hot`
- Text: white, Helvetica Bold Oblique

## About Section

Section:

- Background: `purple`
- Desktop: two visual areas, text left and phone illustration right/middle
- Tablet/phone: hide phone illustration

Heading:

- `About Me`
- Playfair Bold
- Desktop: `64-118`
- Phone: `56`
- Shadow: pink-light

Body:

- Helvetica regular
- Desktop: `16-19`
- Phone: `15`
- Line-height around `1.28`

Buttons:

- Browse Projects -> `#work`
- Download Resume: add a file in Framer when available

Phone illustration desktop:

- Wrapper: `210 x 660`
- Antenna: `12 x 146`
- Body: `210 x 560`
- Photo frame: `176 x 370`
- Keypad: 3 columns, `38 x 38`, gap `9`
- Hide below tablet.

## Contact Section

Section:

- Background: `purple`
- Padding top: `84-116` desktop
- Phone: `56` top, `18-24` sides

Heading:

- `Got a brief or role to discuss?`
- Playfair Bold
- Desktop: `44-72`
- Phone: `42`
- Shadow: pink-light

Email line:

- Helvetica `15-20`
- Color: `light-green`
- Email is underlined, bold oblique

Form:

- Width max: `614`
- Gap: `20` desktop, `16` phone
- Inputs: `54` high
- Textarea: `124` high
- Background: `purple-pale`
- Border: `3` black
- Radius: `57` inputs, `47` textarea
- Send button: `181 x 61`, pink-mid

Footer strip:

- Height: `40`
- Background: `light-green`
- Full-width edge to edge.

## Framer Build Notes

- Use Framer Stacks for section internals instead of absolute positioning wherever possible.
- Keep decorative images absolute, but keep primary content in stacks.
- Build phone/tablet breakpoints manually instead of relying on desktop scaling.
- Check `320px` width before publishing; this page was specifically fixed to avoid horizontal overflow at that width.
- Recreate hover effects in Framer interactions only after the base responsive layout is correct.

## Alternative Import Paths

### Figma to Framer

If you have the original Figma file, clean it first:

- Use Auto Layout for real layout groups.
- Remove hidden/unused layers.
- Flatten complex decorative vector groups if you do not need to edit their internals.
- Import only one section at a time.

Then use Framer's Figma plugin and paste the selected layers into Framer.

### Web/HTML Import

Framer has a web/HTML import workflow, but use it as a visual starting point only. Imported webpage layers often need manual cleanup for responsiveness.

### Code Component

Only use this if you want a nearly exact embedded version of the current page and do not care about visual editing inside Framer.

This page currently uses Next.js `Image`, CSS modules, local fonts, and section hash links. A Framer code component would need to be rewritten as React 18-compatible plain React/CSS and assets uploaded to Framer.
