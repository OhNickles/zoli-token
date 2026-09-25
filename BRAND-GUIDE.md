# ZOLI Web Brand Guide

ZOLI should feel like a clean, slightly nostalgic 8-bit website — playful without becoming visually noisy.

## 1. Section hierarchy

Every major homepage section follows the same pattern:

1. Small orange eyebrow label
2. Large pixel-font section title
3. One plain-language supporting sentence
4. Content below

Major sections currently are:

- The Basics
- The Original Good Cat
- The Purpose
- The Goodwill Mission
- The Trust Layer
- The Build

Technical detail should live one level deeper on dedicated information pages rather than overwhelm the homepage.

## 2. The three box styles

The site intentionally uses only three box treatments.

### Surface 1 — Card

CSS class: `.surface-card`

Use for primary content that deserves emphasis:
- story cards
- feature cards
- donation ledger
- official token details
- information-page blocks

Treatment:
- paper background
- 3px dark border
- 5px hard pixel shadow

### Surface 2 — Flat

CSS class: `.surface-flat`

Use for compact facts and secondary information:
- token facts
- cat ranks
- trust-summary items

Treatment:
- cream background
- 2px dark border
- no shadow

### Surface 3 — Dark

CSS class: `.surface-dark`

Use sparingly for system/status messaging:
- security warning
- build status

Treatment:
- dark brown background
- cream text
- 3px dark border
- orange hard shadow

Do not introduce another card/box treatment without first deciding whether one of these three already serves the purpose.

## 3. Colour system

- Ink: `#2c211b`
- Brown: `#5b3927`
- Orange: `#d8752f`
- Gold: `#f3b25b`
- Cream: `#fff4dc`
- Paper: `#f8e6c5`
- Green/status: `#6f8f5b`

Orange is the primary accent. Gold is for small highlights, labels and icon fields rather than large page areas.

## 4. Typography

- Display / UI labels: Press Start 2P
- Body / technical information: DM Mono

Pixel type is an accent, not the body copy. Long paragraphs should stay in DM Mono for readability.

## 5. Interaction rules

- Primary actions use the pixel button treatment.
- Secondary text links use a simple underline.
- Zoli remains a small corner easter egg rather than a competing navigation element.
- Dense technical information should use disclosure or dedicated pages.
- Never make users hunt for official mint/security information: it remains available under Verify and Transparency.

## 6. Voice

ZOLI is:
- playful
- transparent
- cat-first
- slightly deadpan
- technically honest

ZOLI is not:
- hype-driven
- financially promotional
- overloaded with crypto jargon
- visually chaotic

The design test is simple: it should look like a tiny polished retro game interface that happens to contain a real Solana project.


## 7. Wallet experience

Wallet UI follows the same system rather than introducing a fourth visual language.

- Wallet picker: Surface 1 / Card
- Wallet choices and connected state: Surface 2 / Flat
- Security warnings, if needed: Surface 3 / Dark
- The main CTA changes from `CONNECT WALLET` to a shortened connected address after connection.
- Connection must never request or handle a seed phrase/private key.
- Full addresses are shown only where useful; compact addresses are preferred in primary UI.
- Wallet discovery uses the Wallet Standard browser registration protocol.
