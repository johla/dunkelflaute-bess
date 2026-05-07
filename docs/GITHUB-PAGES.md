This repo already has the right substrate: Norwegian framing, `data/defaults.json`, deterministic Python logic, a main notebook, and seven extension notebooks for deeper topics. The README explicitly frames the project as a simple order-of-magnitude model, not a full power-system model, and the current model chain is basically: residual GW × days → delivered TWh → installed TWh → cost → supply-chain/material implications. ([GitHub][1])

## Recommended shape

Create this:

```txt
docs/
  index.html
  styles.css
  app.js
  data/
    defaults.json
    scenarios.json
    glossary.json
  assets/
    og-image.png
```

Then publish GitHub Pages from `main/docs`. GitHub Pages supports publishing from `/docs` on a branch, or via Actions if you later add a build step. For this repo, `/docs` is the simplest path. ([GitHub Docs][2])

## The SPA concept

### 1. Hero: “Hvor stort blir batteriet?”

No code. No notebook. Just the core intuition:

> Effekt er fart. Energi er mengde.
> En flerdagers Dunkelflaute handler ikke primært om batterikjemi. Den handler først om `GW × døgn`.

Then show the default result immediately:

```txt
250 GW × 10 døgn = 60 TWh levert energi
Med 80 % utnyttbar kapasitet: 75 TWh installert batteri
```

That is the “oh shit” moment. Everything else supports it.

### 2. One-screen calculator

Inputs:

```txt
Effektgap: 250 GW
Varighet: 10 døgn
Utnyttbar andel: 80 %
Batterikost: 117 USD/kWh
LFP-andel: 75 %
Natrium-ion-andel: 15 %
Annet langtidslager: 10 %
```

Outputs as cards:

```txt
Levert energi: 60 TWh
Installert batteri: 75 TWh
Ferdig installert kostnad: 8,8 billioner USD
År av global cellekapasitet: 25 år
År av EU batterilager-installasjoner: 2768 år
Litiumbehov: 5,1 millioner tonn
```

Use sliders, but keep them constrained. Don’t let the first user experience become a spreadsheet.

### 3. “Hva betyr tallet?” translation layer

This is where the repo becomes public-friendly.

Translate every result into anchors:

```txt
75 TWh installert batteri tilsvarer:
- ca. 8,6 Oslo-år
- ca. 0,86 norske vannmagasiner
- ca. 1,5 ganger Statkrafts årlige produksjon i Norge
```

You already have these anchors in `defaults.json` / README: Oslo, Bergen, Norwegian household consumption, Statkraft, Norway consumption/production, and hydro reservoir capacity. ([GitHub][1])

### 4. Scenario buttons instead of notebook cells

Add presets:

```js
const scenarios = [
  {
    id: "mild",
    name: "Mild hendelse",
    residual_gap_gw: 100,
    event_days: 3,
    explanation: "Kortvarig, delvis dekket av import, regulerbar produksjon og fleksibilitet."
  },
  {
    id: "base",
    name: "Repoets standardscenario",
    residual_gap_gw: 250,
    event_days: 10
  },
  {
    id: "severe",
    name: "Alvorlig flerdagershendelse",
    residual_gap_gw: 350,
    event_days: 14
  }
]
```

This is much less technical than “open notebook and edit cell 7”.

### 5. “Angrip modellen” mode

This is important. It prevents the page from sounding ideological.

A section called:

```txt
Uenig? Endre én antakelse.
```

With buttons:

```txt
Halver effektgapet
Halver varigheten
Anta 50 % lavere kost
Anta 3× global cellekapasitet
Fjern LFP-litiumbehov
```

Then show which conclusions survive.

This directly mirrors your `PEDAGOGISK_NOTAT.md`: a good critique should identify which assumption it attacks and show the numerical consequence. ([GitHub][3])

## Minimal vanilla JS model

Port the Python function directly to JS. Keep the Python version authoritative for notebooks, but the SPA can use the same formulas.

```js
function normalizeMix(lfp, sodium, other) {
  const total = lfp + sodium + other

  if (total <= 0) {
    throw new Error("Kjemimiksen må ha positiv sum.")
  }

  return {
    lfp: lfp / total,
    sodium: sodium / total,
    other: other / total
  }
}

function calculateScenario(s) {
  if (s.usable_fraction <= 0 || s.usable_fraction > 1) {
    throw new Error("Utnyttbar andel må være mellom 0 og 1.")
  }

  const mix = normalizeMix(
    s.lfp_share,
    s.sodium_ion_share,
    s.other_long_duration_share
  )

  const deliveredTwh = s.residual_gap_gw * 24 * s.event_days / 1000
  const installedTwh = deliveredTwh / s.usable_fraction

  const packCostTrillionUsd =
    installedTwh * s.stationary_pack_cost_usd_per_kwh / 1000

  const turnkeyCostTrillionUsd =
    installedTwh * s.turnkey_bess_cost_usd_per_kwh / 1000

  const lfpTwh = installedTwh * mix.lfp
  const sodiumTwh = installedTwh * mix.sodium
  const otherTwh = installedTwh * mix.other

  const lithiumTonnes =
    lfpTwh * 1_000_000_000 * s.lfp_lithium_intensity_kg_per_kwh / 1000

  return {
    delivered_twh: deliveredTwh,
    installed_twh: installedTwh,
    pack_cost_trillion_usd: packCostTrillionUsd,
    turnkey_cost_trillion_usd: turnkeyCostTrillionUsd,
    lfp_twh: lfpTwh,
    sodium_twh: sodiumTwh,
    other_twh: otherTwh,
    lithium_required_tonnes: lithiumTonnes,
    years_of_2025_lithium_production:
      lithiumTonnes / s.global_lithium_production_tonnes_2025,
    years_of_global_cell_capacity:
      installedTwh / s.global_battery_cell_manufacturing_capacity_twh_2024,
    multiples_of_2025_eu_bess_additions:
      installedTwh * 1000 / s.eu_bess_additions_gwh_2025
  }
}
```

## Better: generate SPA data from notebooks

Don’t make the browser execute notebooks. Instead:

```txt
notebooks = research/lab
src/dunkelflaute.py = canonical model
scripts/export_site_data.py = bridge
docs/data/*.json = public artifacts
docs/app.js = interactive presentation
```

Add:

```txt
scripts/export_site_data.py
```

It should:

1. Load `data/defaults.json`.
2. Import `src.dunkelflaute`.
3. Run base scenario + named scenarios.
4. Export `docs/data/site-results.json`.
5. Optionally extract glossary terms from `ORDLISTE.md`.

That gives you one source of truth and avoids formula drift.

## Suggested page sections

```txt
1. Hva er Dunkelflaute?
2. Første regnestykke: GW × døgn
3. Prøv selv
4. Hva betyr TWh i menneskelige størrelser?
5. Batterier er nyttige — men til hva?
6. Hvor begynner flaskehalsene?
7. Angrip modellen
8. Gå dypere: notebooks, antakelser, kilder
```

The key rhetorical move:

```txt
Batterier er glimrende for timer.
Denne siden undersøker hva som skjer når timer blir døgn.
```

That is neutral, memorable, and much less technical.

## Visuals that will help

Use simple plain SVG/Canvas/HTML charts:

```txt
Residual gap × duration heatmap
```

Rows = days. Columns = GW. Color/intensity = installed TWh.

```txt
Installed TWh bar
```

Compare against Oslo-year, Norway annual consumption, Norwegian hydro reservoir.

```txt
Supply-chain gauges
```

Installed TWh vs global cell capacity and EU annual BESS additions.

```txt
Assumption sensitivity tornado
```

Which assumption moves the result most?

Avoid fancy Sankey/3D/energy-flow visuals initially. They look impressive but obscure the point.

## GitHub Pages setup

Simplest:

1. Put SPA in `docs/`.
2. Add `docs/index.html`.
3. Repo Settings → Pages.
4. Source: deploy from branch.
5. Branch: `main`, folder: `/docs`.

GitHub says Pages can publish from a branch/folder such as `/docs`, and the entry file must be `index.html`, `index.md`, or `README.md` at the top level of the publishing source. ([GitHub Docs][2])

If you add a build step later, switch to GitHub Actions.

## Agent instruction I’d send

```txt
Create a vanilla HTML/CSS/JS GitHub Pages SPA in /docs for this repo.

Goal:
Make the Dunkelflaute battery model understandable for non-technical readers while preserving the existing repo/notebook model as the source of truth.

Constraints:
- No React or frontend framework.
- Use plain HTML, CSS and vanilla JS.
- Keep Norwegian Bokmål as the public language.
- Do not change the scientific/model semantics unless necessary.
- Keep src/dunkelflaute.py and data/defaults.json as the canonical model/data.
- The SPA must work as static GitHub Pages from /docs.
- Add .nojekyll if needed.
- Add a small script that exports site data from data/defaults.json and src/dunkelflaute.py into docs/data/site-results.json.
- The browser UI may reimplement the same deterministic formulas in JS, but formulas must be visibly traceable to src/dunkelflaute.py.

SPA requirements:
1. Landing section explaining Dunkelflaute in simple language.
2. Immediate default-result cards:
   - delivered energy TWh
   - installed battery TWh
   - turnkey cost trillion USD
   - years of global cell capacity
   - multiples of EU 2025 BESS additions
   - lithium required
3. Interactive sliders:
   - residual_gap_gw
   - event_days
   - usable_fraction
   - turnkey_bess_cost_usd_per_kwh
   - LFP / sodium-ion / other mix
4. Scenario preset buttons:
   - mild
   - repo standard
   - severe
5. Translation anchors:
   - Oslo-years
   - Bergen-years
   - Statkraft Norway annual production
   - Norway annual consumption
   - Norwegian hydro reservoir capacity
6. “Angrip modellen” section where users can halve/double key assumptions and see which conclusion changes.
7. “Batterier er nyttige — men ikke nødvendigvis for alt” section that clearly separates intra-day BESS use cases from multi-day continental strategic storage.
8. Link back to notebooks, assumptions, glossary and README.

Quality bar:
- The first screen must communicate the core result without scrolling into code.
- No notebook terminology in the main user journey.
- Use large numbers sparingly; always pair TWh with intuitive anchors.
- Be neutral, not anti-battery.
- Run a smoke test locally by opening docs/index.html.
- Update README with a short “GitHub Pages” section.
- Update .github/copilot-instructions.md or agent.md/agents.md if present with this public-education SPA design decision.
```

## My strong recommendation

Do **not** turn the notebooks into the website. Turn the website into the **guided front door**, and keep notebooks as the “show your work” layer.

The public user journey should be:

```txt
intuition → sliders → result → meaning → falsification → deeper notebooks
```

not:

```txt
README → install Python → run notebook → understand cells
```

That shift alone makes it 10× more accessible.

[1]: https://github.com/johla/dunkelflaute-bess "GitHub - johla/dunkelflaute-bess: A laboratory to model battery-only Dunkelflaute coverage from first priciples. · GitHub"
[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com "Configuring a publishing source for your GitHub Pages site"
[3]: https://raw.githubusercontent.com/johla/dunkelflaute-bess/main/PEDAGOGISK_NOTAT.md "raw.githubusercontent.com"
