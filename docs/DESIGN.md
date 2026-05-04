---
version: "alpha"
name: "Nordic Energy Explainer"
description: "A calm, numerate, public-science design system for explaining Dunkelflaute battery scaling to non-technical readers."

colors:
  paper: "#F7F4EC"
  paper-elevated: "#FFFDF7"
  ink: "#1D2528"
  ink-muted: "#5B666B"
  ink-soft: "#7A858A"
  grid: "#D8D1C3"
  grid-soft: "#E8E2D7"
  energy-blue: "#1F6F8B"
  energy-blue-dark: "#124D63"
  sodium-cyan: "#3A9FA8"
  lfp-green: "#5E8C61"
  amber: "#C9822B"
  amber-soft: "#F2D6A2"
  red-muted: "#A9483F"
  white: "#FFFFFF"

typography:
  h1:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.4rem)"
    fontWeight: 740
    lineHeight: "0.95"
    letterSpacing: "-0.055em"
  h2:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 3.2rem)"
    fontWeight: 720
    lineHeight: "1.02"
    letterSpacing: "-0.04em"
  h3:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: "1.15"
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: "1.58"
    letterSpacing: "-0.005em"
  body-large:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "-0.015em"
  number-xl:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5rem)"
    fontWeight: 760
    lineHeight: "0.92"
    letterSpacing: "-0.06em"
  number-md:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 740
    lineHeight: "1"
    letterSpacing: "-0.045em"
  label:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "0.075em"
    textTransform: "uppercase"
  small:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: "1.45"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "72px"
  section: "112px"

rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "999px"

components:
  page:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  result-card-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  result-card-secondary:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.energy-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "{colors.paper-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  warning-chip:
    backgroundColor: "{colors.amber-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  slider-track:
    backgroundColor: "{colors.grid}"
    textColor: "{colors.energy-blue}"
    rounded: "{rounded.pill}"
    height: "6px"
---

## Overview

This design system is for a public educational explainer about Dunkelflaute, batteries, scale, cost, and supply chains.

The interface must feel calm, serious, and useful. It should not look like a corporate sustainability campaign, an engineering notebook, a crypto dashboard, or a SaaS analytics template.

The design goal is: make non-technical readers feel that the math is approachable, transparent, and falsifiable.

## Colors

Use warm paper as the default background. Use deep graphite for text. Use muted blue for energy and interaction. Use amber only for caution, sensitivity, and “this assumption matters” moments.

Do not use bright green as the main brand color. Green makes the page feel ideological. This project should feel analytical and neutral.

Use red sparingly. Red is reserved for constraints, impossible combinations, and falsification results.

## Typography

Typography should be large, tight, and editorial.

Big numbers are the visual anchor of the page. Use the number styles for TWh, cost, years of capacity, and material requirements.

Body text should be plain, readable, and Norwegian-friendly. Avoid tiny dashboard text.

## Layout

Use a max-width content column for explanation and wider breakout sections for calculators and charts.

Preferred page rhythm:

1. Editorial hero.
2. Large result cards.
3. Interactive calculator.
4. Human-scale translations.
5. Sensitivity/falsification.
6. Notebook/source links.

Use generous vertical spacing. Do not cram.

Use subtle grid lines and thin dividers to suggest measurement and systems thinking.

## Elevation & Depth

Use shallow elevation only. Prefer borders, background contrast, and spacing over shadows.

Cards may use:
- 1px solid grid-soft border
- soft background contrast
- very subtle shadow only if needed

Avoid glassmorphism, blur panels, neon glow, or high-saturation gradients.

## Shapes

Use rounded rectangles, but not playful bubbles. Rounded corners should make the page approachable without making it childish.

Use pill buttons for scenario presets and assumption toggles.

## Components

### Hero

Hero should contain one strong claim:

“Batterier er glimrende for timer. Denne siden undersøker hva som skjer når timer blir døgn.”

Below it, show the core identity:

GW × døgn → TWh

### Result cards

Result cards must show:
- one large number
- one short label
- one plain-language interpretation
- optional “why this matters” footnote

Never show more than six primary result cards at once.

### Calculator

The calculator should feel like a guided experiment.

Every slider must have:
- current value
- default marker
- short explanation
- allowed range

Do not expose all parameters at once. Put advanced assumptions behind an “Avanserte antakelser” disclosure.

### Charts

Charts should be restrained and explanatory.

Use:
- bar charts for comparisons
- heatmaps for gap × duration
- tornado charts for sensitivity
- simple stacked bars for chemistry mix

Avoid decorative chart junk.

### Falsification section

This section should invite critique.

Use the title:
“Angrip modellen”

Tone:
“Endre én antakelse og se hva som faktisk flytter konklusjonen.”

This section should visually distinguish assumptions from outputs.

## Do's and Don'ts

Do:
- write in calm Norwegian Bokmål
- make the first screen understandable without scrolling into code
- pair every TWh number with a human-scale comparison
- make assumptions visible
- make critique easy
- keep charts simple
- keep notebooks as the deeper lab layer

Don't:
- use AI-dashboard styling
- use generic Tailwind blue gradients
- make it look like anti-renewables propaganda
- hide assumptions
- overload the user with model internals
- use notebook terminology in the main journey
- require Python knowledge to understand the public page
