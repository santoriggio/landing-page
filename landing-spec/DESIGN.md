# Landing page — Design spec

Source of truth for the landing page. It replaces direct Figma access (MCP rate limit reached).
Original Figma file, for humans only: https://www.figma.com/design/aIhpl7Y5LQBqcvAb8wjee0

Visual references are in `design/` (see "Reference images" at the bottom). When this spec and an image disagree, **this spec wins**: every value here is exact, while the images are only approximate.

---

## 1. Tokens

### Colors

| Token | Hex | Use |
|---|---|---|
| `brand-500` | `#1BB549` | Primary buttons, CTA box, dots, quote mark, highlighted card border |
| `brand-600` | `#169A3E` | Primary button hover (not in Figma, suggested) |
| `brand-700` | `#11803A` | Links, overlines, ghost button, icons on light green |
| `brand-100` | `#D3F3DE` | Step number circle, check badge, price tag, green card border |
| `brand-50` | `#EEFAF2` | Pill, "positive" columns, testimonial background |
| `ink-900` | `#0F1A14` | Headings, primary text, text on green |
| `ink-700` | `#33423A` | List text, nav links, case study body |
| `ink-500` | `#5E6D64` | Secondary text, captions, placeholder icon |
| `ink-200` | `#DCE3DE` | Borders, dividers |
| `surface-base` | `#FFFFFF` | Page background, cards |
| `surface-alt` | `#F5F7F5` | Alternating sections, "negative" columns, x badge |
| `surface-placeholder` | `#E6EBE7` | Image placeholders |

**Contrast rule:** text on `brand-500` is always `ink-900`, never white (white fails WCAG AA there).

### Spacing scale
`4, 8, 12, 16, 24, 32, 48, 64, 96, 120` (px)

### Radii
`sm 8` · `md 16` · `lg 24` · `full 999`

### Typography
Font: **Plus Jakarta Sans** (self-host weights 400, 500, 600, 700, 800). Values are size / line-height / letter-spacing / weight.

| Style | Desktop | Mobile |
|---|---|---|
| Display | 64 / 70 / -2px / 800 | 40 / 46 / -1.5px / 800 |
| H2 | 44 / 52 / -1.5px / 700 | 30 / 38 / -1px / 700 |
| H3 | 22 / 30 / -0.5px / 700 | 20 / 28 / -0.4px / 700 |
| Body L | 20 / 32 / 0 / 400 | 18 / 28 / 0 / 400 |

Shared (same on every breakpoint):

| Style | Value |
|---|---|
| Body | 17 / 28 / 0 / 400 |
| Body Strong | 17 / 28 / 0 / 600 |
| Small | 14 / 20 / 0 / 500 |
| Overline | 13 / 16 / +1.5px / 700, UPPERCASE |
| Button | 16 / 20 / 0 / 700 |
| Stat | 44 / 48 / -1.5px / 800 (mobile overrides below) |

### Layout
- Desktop: 1440 frame, content max-width **1200px**, section side padding 120.
- Mobile: 390 frame, side padding **24**.
- Breakpoint: switch to the mobile layout below ~768px. Tablet widths must degrade gracefully (2-column grids can stay 2 columns down to ~900px).

---

## 2. Icons (inline SVG, `currentColor`)

```html
<!-- arrow-right, 20px, stroke 2.2 -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
<!-- check, 16px in a 28px badge -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
<!-- x, 16px in a 28px badge -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
<!-- image (placeholder), 32px -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10" r="2" stroke="currentColor" stroke-width="1.6"/><path d="M21 16l-5-5-9 9" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
<!-- minus (FAQ open) / plus (FAQ closed), 24px -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
<!-- menu (mobile nav), 24px -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
```

---

## 3. Components

### Button
Inline-flex, centered, gap 8, padding 16/24, radius full, text style Button, optional trailing `arrow-right` (prop `icon`, default true).
- **Primary**: bg `brand-500`, text and icon `ink-900`. Hover: `brand-600`.
- **Secondary**: bg `surface-base`, border 1.5px `ink-200`, text and icon `ink-900`.
- **Ghost**: no bg, padding 8/4, text and icon `brand-700`.

### ImagePlaceholder
bg `surface-placeholder`, border 1.5px **dashed** `ink-200`, radius lg. Content centered vertically: `image` icon 32px `ink-500`, then label (Small, `ink-500`), gap 8. Frames: `project` (4:3 at every width), `avatar` (round, 56px desktop / 48px mobile, icon 20px, no label).

### StepCard
Column, padding 32, gap 16, bg `surface-base`, border 1px `ink-200`, radius lg.
1. Number circle 44×44, bg `brand-100`, number centered (Button style, `brand-700`)
2. Title (H3 desktop, `ink-900`)
3. Body (Body, `ink-500`)

### Stat
Column, gap 8. Value (Stat style, `ink-900`), then label (Small, `ink-500`).

### ListItem
Row, gap 12, align top. Badge 28×28 circle with a 16px icon, then text (Body, `ink-700`).
- `yes`: badge `brand-100`, check `brand-700`
- `no`: badge `surface-alt`, x `ink-500`

### FaqItem
Native `<details>/<summary>`, **closed by default**, no JS. Padding 24 top and bottom, gap 12, bottom border 1px `ink-200`.
Summary row: question (Body Strong, `ink-900`) fills the width, then a 24px icon in `brand-700` (plus when closed, minus when open). Answer: Body, `ink-500`. Hide the native marker.

### PriceCard
Column, padding 48 (mobile: 32 vertical, 24 horizontal), gap 24, bg `surface-base`, border 1px `ink-200`, radius lg. Prop `highlighted`: border 2px `brand-500`.
1. Tag pill: padding 4/12, radius full, bg `brand-100`, Overline `brand-700`
2. Name (H3, `ink-900`)
3. Price row, baseline-aligned, gap 8: price (Stat style, `ink-900`; 36/42 on mobile) + period (Body, `ink-500`)
4. Description (Body, `ink-500`)
5. Features: ListItem `yes`, gap 12
6. Full-width Button (variant per card)

Cards placed side by side must have **equal height**.

### ProjectCard
Column, padding 24, gap 16, bg `surface-base`, border 1px `ink-200`, radius lg. Equal height in a row.
1. Image, full width of the card. Aspect ratio 4:3 at every width, `object-fit: cover`, centered crop, radius lg. A card without an image uses ImagePlaceholder with the project label.
2. Meta (Small, `ink-500`): category · role · period
3. Name (H3, `ink-900`)
4. Account (Body, `ink-700`)
5. Optional result: Stat value + label
6. Optional Ghost button (with arrow), **left-aligned**. External links open in a new tab.

From 1100px the three cards share rows with subgrid (`grid-row: span 6; grid-template-rows: subgrid`): image, meta, title, account, then the result and link. Meta, title and account start at the same height even when the meta wraps. A missing result or link collapses, with no extra gap. Ghost links sit on the same baseline, pinned to the bottom of the card. Below 1100px the card is a normal flex column.

Data lives in `src/data/projects.ts`.

---

## 4. Page — Desktop (1440)

Sections in order. "py" = vertical padding; horizontal padding is always 120 on desktop. Anchor ids are in brackets.

1. **Nav**: py 24, `space-between`, vertically centered, bottom border 1px `ink-200`.
   Left: logo lockup linking to `/`. `public/logo.svg` at 32px height, then the wordmark "Santo Riggio" (17px / 28 / 700, `ink-900`), gap 10. Center: links gap 32 (Small, `ink-700`): "Come funziona" → `/#come-funziona`, "Prezzi" → `/#prezzi`, "Progetti" → `/#progetti`, "FAQ" → `/#faq`. From another page these open the homepage and scroll to the section. Right: Primary button "Prenota una call", **no icon**, opens `bookingUrl` in a new tab.

2. **Hero** (from 1200px): bg `surface-base`, position relative, min-height 720. No side column. Below 1200px the desktop background is hidden and the hero stacks as on mobile.
   - Background: `public/hero-bg-desktop.png` (2880×1440), a decorative `<img>` (`alt=""`, `aria-hidden="true"`) absolutely positioned over the whole section, `object-fit: cover`, `object-position: right center`, z-index 0, `fetchpriority="high"`, `loading="eager"`. The file already fades to white on the left and bottom, so there is no extra overlay.
   - Text column, z-index 1, left-aligned inside the 1200px container, max-width 600, vertically centered, gap 24:
     - Pill: padding 8/16, radius full, bg `brand-50`, gap 8, 8px dot `brand-500` (dot is `ink-500` when `availableSlots` is 0). Text (Small, `brand-700`) comes from `availableSlots`: 2+ "Solo {n} posti disponibili", 1 "Solo 1 posto disponibile", 0 "Posti esauriti, lista d'attesa aperta"
     - Display, `ink-900`: "La tua app iOS e Android, ad abbonamento. Disdici quando vuoi."
     - Body L, `ink-500`: "Sviluppo app in React Native per startup e PMI. Una fattura al mese, niente contratti da 25 pagine, niente 8 ore fisse."
     - Buttons row, gap 12: Primary "Prenota una call" (with arrow, new tab), Secondary "Come funziona" (no icon, links to `#come-funziona`)
     - Small, `ink-500`: "Si parte in 14 giorni · 7 giorni di prova"

3. **Stats**: bg `surface-alt`, py 64. Four equal Stat columns, gap 32:
   "15+" / "app sviluppate da zero" · "20+" / "app gestite in produzione" · "10% → 40%" / "utenti che creano contenuti su Seetua" · "14 giorni" / "dalla prima chat alla prima riga di codice"

4. **Problema**: py 96, gap 48.
   - Heading block (gap 16, text max-width 760): Overline `brand-700` "Perché ad abbonamento" · H2 "Assumere uno sviluppatore è lento, rigido e costoso." · Body L `ink-500` "Il modello tradizionale non funziona per chi deve lanciare un'app senza un team tech interno."
   - Two equal-height columns, gap 24. Each: padding 32, gap 20, radius lg, title H3 `ink-900`, then ListItems.
     - "Assunzione tradizionale": bg `surface-alt`, items `no`: "Mesi di selezione per trovare la persona giusta" · "Contratti da 25 pagine, e uscirne è peggio" · "Costi fissi anche quando il lavoro non c'è" · "8 ore al giorno, di cui poche produttive"
     - "Con l'abbonamento": bg `brand-50`, border 1px `brand-100`, items `yes`: "Dalla prima chat al codice in 14 giorni" · "Una fattura al mese, zero burocrazia" · "Lavoro le ore che servono, non 8 fisse" · "Non funziona? Disdici"

5. **Come funziona** [`#come-funziona`]: bg `surface-alt`, py 96, gap 48.
   - Heading: Overline "Come funziona" · H2 "Tre passaggi, nessun contratto infinito."
   - Three equal-height StepCards, gap 24:
     1. "Mi scrivi": "Due righe sul progetto, in DM su LinkedIn o prenotando una call qui sotto."
     2. "Call conoscitiva": "Capiamo cosa serve davvero. Spesso è un MVP, non 47 feature."
     3. "Prova o mensile": "Parti con 7 giorni di prova o direttamente col mensile. Se non funziona, disdici."

6. **Prezzi** [`#prezzi`]: py 96, gap 48, everything **centered**.
   - Heading (centered text): Overline "Prezzi" · H2 "Prezzi chiari, niente sorprese." · Body L `ink-500` "Sai quanto paghi e cosa ricevi prima di iniziare."
   - Cards row, width 1000, gap 24, equal height:
     - Left: Tag "Per iniziare" · Name "Prova di 7 giorni" · Price `prices.trial` ("€ 700") · Period "una tantum" · Description "Una settimana di lavoro vero sul tuo progetto, per capire se lavoriamo bene insieme." · Features "Call conoscitiva per fissare le priorità", "Lavoro reale sul tuo codice o da zero", "Nessun impegno dopo la prova", "Se continui, i 700 € si scalano dal primo mese" · Secondary button "Inizia la prova" (with arrow, opens `bookingUrl` in a new tab)
     - Right, **highlighted**: Tag "Abbonamento" · Name "Mensile" · Price `prices.monthly` ("€ 2.500") · Period "/ mese" · Description "Sviluppo continuativo della tua app iOS e Android, con una sola fattura al mese." · Features "App iOS e Android in React Native", "Pubblicazione su App Store e Play Store", "Direzione tecnica e mentoring dei junior", "Disdici quando vuoi" · Primary button "Prenota una call" (with arrow, new tab)
   - Small, `ink-500`: "Fattura senza IVA (regime forfettario). Per riferimento: un MVP completo di solito costa tra 5.000 e 15.000 €, in base alle funzionalità."

7. **Progetti** [`#progetti`]: bg `surface-alt`, py 96, gap 48.
   - Heading block (gap 16, max-width 760): Overline "Progetti" · H2 "App vere, in mano a utenti veri." · Body L `ink-500` "Tre progetti a cui ho lavorato, raccontati da me. Le testimonianze dei founder arriveranno presto."
   - Three equal-height ProjectCards, 3 columns, gap 24 (one column below 1100px, gap 16). Order and copy come from `src/data/projects.ts`:
     1. **Consi** — Meta "Educazione finanziaria · Co-founder & CTO · dal 2025" · Account "Una palestra per allenare ogni giorno il proprio rapporto con i soldi. Seguo tutta la parte tecnica del prodotto. La sfida più grande è creare interfacce semplici e veloci che sappiano educare chi le usa. Dopo il redesign, Consi 2.0 è online." · Ghost "Scopri Consi" → https://consi.online (new tab) · Image `public/projects/consi.png` (1600×1200), alt "Tre schermate dell'app Consi: allenamento, FinFit Index e profilo", 4:3 at every width, cover, centered crop, radius lg, no placeholder border or background.
     2. **Filmamo** — Meta "Social network per film lovers · Sviluppo app mobile" · Account "Filmamo è il social network per chi ama il cinema: non solo un catalogo, ma un posto dove scoprire film e serie, condividere cosa guardi e confrontarti con altri appassionati. Ho lavorato allo sviluppo dell'app mobile." · no result · Ghost "Scopri Filmamo" → https://www.filmamo.com (new tab) · Image `public/projects/filmamo.png` (1600×1200), alt "Tre schermate dell'app Filmamo: profilo, feed e ricerca", same treatment as Seetua.
     3. **Seetua** — Meta "App di incontri di gruppo · React Native Developer · dal 2024" · Account "Ho rifatto da zero il frontend: onboarding, feed, profilo, creazione contenuti e animazioni, con l'analisi dei dati su Amplitude. Con un A/B test sul feed (blur e una sola call to action) ho portato gli utenti che creano contenuti dal 10% al 40%." · Result "10% → 40%" / "utenti che creano contenuti" · no link · Image `public/projects/seetua.png` (1600×1200), alt "Tre schermate dell'app Seetua: feed, profilo e messaggi", 4:3 at every width, cover, centered crop, radius lg, no placeholder border or background.

8. **Testimonianza**: bg `brand-50`, py 96. Data in `src/data/testimonials.ts`. `fullQuote` is stored and not rendered.
   - One item: centered, gap 32. Quote mark "“": 96px, weight 800, line-height 64, `brand-500`. Quote, max-width 880, centered, 28/40, weight 700, `ink-900`. Author row, gap 16, centered: round avatar placeholder 56px, then name (Body Strong, `ink-900`), role (Small, `ink-500`), source (Small, `ink-500`), gap 4.
   - Two or more: grid of cards, 2 columns, gap 24 (1 column below 768px, gap 16). Card: bg `surface-base`, border 1px `ink-200`, radius lg, padding 24, gap 16, equal height. Same quote size, no giant quote mark. Author row as above, left-aligned.
   - Current item: name "Francesco Matteoni", role "Seetua", source "Raccomandazione LinkedIn", photo `public/francesco-matteoni.jpg` (his LinkedIn profile picture, round, same size as the avatar placeholder). Displayed quote: "Ha gestito in totale autonomia l'ottimizzazione di onboarding, feed, profilo e creazione contenuti, curando anche le animazioni. […] Altamente raccomandato per progetti che richiedono sia capacità tecniche che sensibilità per l'esperienza utente."

9. **Per chi è**: py 96, gap 48.
   - Heading: Overline "Per chi è" · H2 "Lavoro bene con chi vuole muoversi in fretta."
   - Two equal-height columns, same style as Problema:
     - "Fa per te se" (bg `brand-50`, border `brand-100`, `yes`): "Sei una startup con budget per sviluppare un'app" · "Sei una PMI che cerca direzione tecnica" · "Hai un team con junior da far crescere"
     - "Non fa per te se" (bg `surface-alt`, `no`): "Il progetto ha budget zero" · "Sei una corporate da 100+ persone" · "Sei un'agenzia"

10. **FAQ** [`#faq`]: bg `surface-alt`, py 96, gap 48, centered.
    - Heading (centered text): Overline "FAQ" · H2 "Domande frequenti"
    - List, width 800, of FaqItems:
      1. "Cosa include l'abbonamento?": "Lo sviluppo della tua app: design in Figma, sviluppo, pubblicazione su App Store e Google Play e direzione tecnica. Non c'è un monte ore e non sono un dipendente a tempo pieno: prendo in carico le attività, le porto a termine e passo alla successiva. Lavoro per obiettivi, non a ore. Se ti sembro lento, disdici."
      2. "Quanto costa?": "La prova di 7 giorni costa 700 €, l'abbonamento 2.500 € al mese, senza IVA (regime forfettario). Un MVP completo di solito richiede tra 2 e 6 mesi, cioè tra 5.000 e 15.000 €."
      3. "Come funziona la prova di 7 giorni?": "Lavoro una settimana sul tuo progetto, con consegne vere. Se poi continui, i 700 € vengono scalati dal primo mese: per completarlo paghi 1.800 €. Se non continui, nessun impegno."
      4. "Il codice è mio? E se disdico?": "Sì, dal primo giorno. Codice, account Apple e Google e credenziali restano tuoi: io lavoro come sviluppatore sui tuoi strumenti. Se disdici, tieni tutto."
      5. "Come seguo i progressi?": "Lavoriamo a milestone: se hai già una roadmap parto da lì, altrimenti la costruiamo insieme. Ogni settimana ci sentiamo per fare il punto su cosa è stato fatto e cosa viene dopo."
      6. "Quanti clienti segui contemporaneamente?": "Pochi, per dare a ognuno l'attenzione che serve. Per questo i posti sono limitati."
      7. "Ti occupi anche del design? E se il progetto cresce?": "Sono uno sviluppatore, ma per partire non ti serve un team: disegno le schermate in Figma in base alle tue richieste, sistemiamo insieme quello che non ti convince e porto avanti l'intero progetto. Se il progetto cresce e servono più risorse, posso coinvolgere collaboratori molto validi che lavorano al mio fianco."
      8. "Lavori anche su app già esistenti?": "Sì, sia da zero sia su codice esistente. Nella mia carriera ho gestito più di 20 app in produzione, quindi so come mettere mano a un progetto avviato senza rompere quello che funziona."
    Summary focus: no outline on mouse click. Keyboard `:focus-visible` shows a 2px `ink-900` outline, offset 4px, radius 8px.

11. **CTA finale**: py 96. Box: bg `brand-500`, radius lg, padding 96/64, gap 24, centered.
    Above the heading: photo `public/santo.jpg`, 72px circle, `object-fit: cover`, 3px `surface-base` border, alt "Santo Riggio", then Small `ink-900` "Ti risponde Santo, di solito entro 24 ore", stacked, gap 8.
    H2 `ink-900` "Hai un'app da far partire?" · Body L `ink-900` "Scrivimi due righe sul progetto e fissiamo una call." · Secondary button "Prenota una call" (with arrow, new tab) · Small `ink-900` "oppure scrivimi su LinkedIn" (link to LinkedIn)

12. **Footer**: py 32, top border 1px `ink-200`, `space-between`, vertically centered.
    Left: Small `ink-500` "© 2026 Santo Riggio · P. IVA 12167160964". Right: links gap 24 (Small, `ink-700`): "LinkedIn", "info@santoriggio.it" (mailto), "Privacy policy".

---

## 5. Page — Mobile (390)

Same content and order as desktop. Only the differences are listed. Default section: py 64, side padding 24, gap 32 between blocks. Desktop text styles switch to their Mobile versions.

1. **Nav**: py 16. Logo mark 28px plus the same wordmark, gap 10, on the left. `menu` icon 24px (`ink-900`) on the right. Links and CTA are hidden behind the menu: a simple dropdown with the 4 links + Primary "Prenota una call" (new tab). Minimal JS.
2. **Hero**: py 48 top / 64 bottom, gap 24, single column. The desktop background is not used. Order: pill → Display → Body L → buttons **stacked, full width**, gap 12 (Primary, then Secondary) → trust line **centered** → `public/hero-bg-mobile.png` (1170×1260) as a full-bleed image (`width: 100vw`, aspect-ratio 390/420, `object-fit: cover`), decorative (`alt=""`, `aria-hidden="true"`), `loading="eager"`. Its top and bottom already fade to white.
3. **Stats**: py 48. 2×2 grid, column gap 24, row gap 32. Stat value **32/38**.
4. **Problema**: columns stacked, gap 16. Column padding 24, gap 16, title Mobile H3.
5. **Come funziona**: StepCards stacked, gap 16.
6. **Prezzi**: heading left-aligned (not centered). Cards stacked, gap 16, **Mensile first, then Prova**. Card padding 32/24, price 36/42. The MVP note goes below.
7. **Progetti**: one column, gap 16. Project image stays 4:3.
8. **Testimonianza**: one item uses gap 24, quote mark 72px, line-height 48, quote in Mobile H3 (20/28), avatar 48px, author row gap 12. Two or more stay one column.
9. **Per chi è**: columns stacked, gap 16.
10. **FAQ**: heading left-aligned, gap 16, list full width.
11. **CTA finale**: py 48. Box padding 48/24, gap 16, photo and caption above the heading, H2 and Body L centered, button full width.
12. **Footer**: column, py 32, gap 16. Links row first (gap 16): "LinkedIn", "Email", "Privacy policy", then the copyright line.

---

## 6. Editable values

Keep these in `src/config.ts`, never hardcoded in components:
- `bookingUrl`: every "Prenota una call" and "Inizia la prova" opens this URL in a new tab (`https://calendly.com/santoriggio-info/30min?utm_source=landing&utm_medium=website`)
- `linkedinUrl`, `email` (`info@santoriggio.it`)
- `vatNumber`: `12167160964`. Shown in the footer and on `/privacy-policy`. That page is `noindex`, max-width 720, and reads `email` and `vatNumber` from this file.
- `availableSlots`: `2`. Drives the hero pill (see §4).
- `prices.trial` (`€ 700`), `prices.monthly` (`€ 2.500`)

Project copy is in `src/data/projects.ts`. Testimonial copy, including the undisplayed `fullQuote`, is in `src/data/testimonials.ts`.

Text in `[square brackets]` is placeholder content and must render as-is.

---

## 7. Reference images

`design/` contains the visual references. They are approximate, so take numbers from this spec, not from the images:
- `desktop-full.png`: whole desktop page (low resolution, layout overview)
- `mobile-hero.png`, `mobile-stats.png`, `mobile-pricing.png`: mobile sections at 1x
- `mobile-full.png`: whole mobile page (very low resolution, section order only)
