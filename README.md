# Dunkelflaute batteri-lab

Dette prosjekt er en liten pedagogisk øvelse for å undersøke et enkelt spørsmål:

> Hvor stor batteripark måtte Europa ha dersom batterier skulle dekke en (flerdagers) Dunkelflaute?

Modellen er bevisst enkel. Den er laget for å gi intuisjon og størrelsesorden, ikke for å være en full kraftsystemmodell. I Norge pågår for tiden debatter mellom aktører hvor tall og scenarios tegnes, faktiske tall og modeller kunne bidratt til å gi et realistisk bilde utifra ulike forutsettninger. 


## Anbefalt leservei

Hvis repoet skal deles med/brukes av en fagperson, start med dette løpet:

1. Les [`METODE.md`](METODE.md) først.
2. Kjør hovednotebooken fra toppen uten å endre parametere.
3. Endre bare **én parameter**: effektgap.
4. Endre deretter bare **varighet**.
5. Først etterpå: endre batterikjemi, kost og produksjonskapasitet.

Grunnen er pedagogisk: kjemi og kost er viktige, men de kommer etter størrelsesordenen `GW × døgn`.

## Femminuttersversjonen

Modellen kan forklares med fire spørsmål:

| Spørsmål | Formel / test | Hva det lærer |
|---|---|---|
| Hvor mye energi mangler? | `GW × 24 × døgn / 1000` | Varighet gjør problemet stort |
| Hvor stort batteri trengs? | `levert TWh / utnyttbar andel` | Reserve, degradering og drift øker installert behov |
| Hva koster det? | `installert kWh × USD/kWh` | Kapitalbindingen blir synlig |
| Kan det bygges? | `installert TWh / årlig cellekapasitet` | Forsyningskjeden blir en del av svaret |

Denne rekkefølgen er viktig. Den hindrer at diskusjonen begynner med teknologioptimisme eller teknologipessimisme. Først regnes energimengden. Deretter diskuteres systemmiksen.

## Hva du kan endre

Notebooken lar deg variere:

- varighet på hendelsen i døgn
- effektgap i GW etter kjernekraft, vannkraft, import, termisk reserve, etterspørselsrespons osv.
- utnyttbar andel av installert batterikapasitet
- kost per kWh for pakke og ferdig installert batterilager (BESS)
- kjemimiksen: LFP, natrium-ion og andre langtidslagringsbatterier
- global produksjonskapasitet for battericeller
- EU-installasjonstakt for batterilager (BESS)
- litiumintensitet for LFP

## Viktig tolkning

Dette er ikke et argument mot batterier. Batterier er svært nyttige for frekvensrespons, intra-dag-utjevning, reserve, prisarbitrasje, nettavlastning og integrasjon av sol og vind.

Spørsmålet her er snevrere: **er batterier alene en rasjonell løsning for kontinental, flerdagers Dunkelflaute?**

Standardverdiene peker mot svaret: sannsynligvis nei. Når hendelsen går fra timer til flere døgn, flytter problemet seg fra ordinært batterilager til strategisk energilager, fleksibilitet, overføringsnett, regulerbar produksjon, vannmagasiner, hydrogen/metan/ammoniakk, termisk reserve og etterspørselsstyring.

## Energi og effekt

Effekt er fart. Energi er mengde.

En panelovn på 1 kW som står på i én time bruker 1 kWh. Den samme ovnen som står på i 10 timer bruker 10 kWh.

Formel:

```text
energi = effekt × tid
```

Derfor er det ikke nok å si at vi trenger «mer GW» eller «mer TWh». GW handler om kapasitet i øyeblikket. TWh handler om energimengde over tid.

En nyttig norsk huskeregel:

**Oslo bruker omtrent 1 GW i gjennomsnitt gjennom året.** Dermed er 1 GW-år omtrent ett Oslo-år, altså ca. 8,76 TWh.

Notebookene bruker derfor **Oslo-år** som felles normalisering:

| Referanse | Årlig energi | Gjennomsnittlig effekt | Oslo-år |
|---|---:|---:|---:|
| Norsk husholdning | 14 700 kWh/år | 1,68 kW | 0,00000168 |
| Bergen kommune | 3,49 TWh/år | 398 MW | 0,40 |
| Oslo kommune | 8,76 TWh/år | 1,00 GW | 1,00 |
| Statkraft Norge | 51,2 TWh/år | 5,84 GW | 5,85 |
| Norge, strømforbruk inkl. tap | 139,2 TWh/år | 15,9 GW | 15,9 |
| Norge, strømproduksjon | ca. 162 TWh/år | 18,5 GW | 18,5 |

Viktig nyanse: ikke bruk disse ankrene til å late som energi er fullt flyttbar. Kraftsystemet trenger også effektkapasitet, varighet, geografisk plassering, regulerbarhet, sesongprofil og nett.

## Installer og kjør

Se [`getting_started.md`](getting_started.md) for instruksjoner for lokal installasjon og GitHub Codespaces.

## GitHub Pages

Repoet publiserer en publikumsvennlig SPA i [`docs/`](docs/) som lar leseren
endre antakelser og umiddelbart se konsekvensene. Den bruker samme
deterministiske formler som [`src/dunkelflaute.py`](src/dunkelflaute.py).

- **Designsystem:** [`docs/DESIGN.md`](docs/DESIGN.md) (Nordic Energy Explainer).
- **Spesifikasjon:** [`docs/GITHUB-PAGES.md`](docs/GITHUB-PAGES.md).
- **Eksport av data:** kjør `python scripts/export_site_data.py` for å
  regenerere `docs/data/site-results.json` fra `data/defaults.json` og
  `src/dunkelflaute.py`. Det gir én sannhetskilde og hindrer formelsklid
  mellom Python og JS.
- **Lokal funksjonstest:** `python -m http.server --directory docs 8000` og
  åpne `http://localhost:8000`.

For å publisere: GitHub → Settings → Pages → Source: deploy from branch,
branch `main`, folder `/docs`.

## For faglig vurdering

Repoet er skrevet for å være mulig å angripe. De viktigste antakelsene ligger i `data/defaults.json`, og [`ASSUMPTIONS.md`](ASSUMPTIONS.md) skiller kildeverdier fra modellantakelser. [`METODE.md`](METODE.md) oppsummerer hva modellen viser, hva den ikke viser, og hvilke spørsmål som er mest relevante å diskutere.

En nyttig faglig kritikk bør derfor helst endre én av disse:

- effektgap under hendelsen
- varighet og sannsynlighet for hendelsen
- tilgjengelig regulerbar produksjon og fleksibilitet
- relevant batterikost for multi-døgn lagring
- forsyningskjede og produksjonstakt for valgt kjemi
- alternativverdien av samme kapital i nett, vannkraft, termisk/kjemisk reserve eller etterspørselsrespons

## Repo-struktur

```text
.
├── README.md
├── getting_started.md
├── METODE.md
├── ASSUMPTIONS.md
├── ORDLISTE.md
├── requirements.txt
├── .devcontainer/
│   └── devcontainer.json
├── data/
│   └── defaults.json
├── docs/
│   ├── DESIGN.md
│   ├── GITHUB-PAGES.md
│   ├── UNDERVISNINGSOPPLEGG.md
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── data/
│       ├── defaults.json
│       ├── scenarios.json
│       ├── glossary.json
│       └── site-results.json
├── notebooks/
│   ├── dunkelflaute_batteri_lab.ipynb
│   └── extensions/
│       ├── 01_timeprofiler.ipynb
│       ├── 02_effekt_vs_energi.ipynb
│       ├── 03_vannmagasin_pumpekraft.ipynb
│       ├── 04_andre_teknologier.ipynb
│       ├── 05_ladevindu.ipynb
│       ├── 06_overforing_regioner.ipynb
│       └── 07_levetidskost_per_mwh.ipynb
├── scripts/
│   └── export_site_data.py
└── src/
    └── dunkelflaute.py
```

## Hovednotebook

Start her hvis du er ny i repoet: [`notebooks/dunkelflaute_batteri_lab.ipynb`](notebooks/dunkelflaute_batteri_lab.ipynb). Den gir den enkle grunnmodellen, standardverdiene og hovedresultatene før du eventuelt går videre til utvidelsene under.

## Naturlige utvidelser

Hovednotebooken er bevisst enkel. Hver av de pedagogiske begrensningene er løftet til en egen, kjørbar notebook under [`notebooks/extensions/`](notebooks/extensions):

1. [`01_timeprofiler.ipynb`](notebooks/extensions/01_timeprofiler.ipynb) — timeprofiler for last, vind og sol.
2. [`02_effekt_vs_energi.ipynb`](notebooks/extensions/02_effekt_vs_energi.ipynb) — skille effektkapasitet (GW) fra energikapasitet (GWh/TWh).
3. [`03_vannmagasin_pumpekraft.ipynb`](notebooks/extensions/03_vannmagasin_pumpekraft.ipynb) — eksisterende vannmagasin og pumpekraft.
4. [`04_andre_teknologier.ipynb`](notebooks/extensions/04_andre_teknologier.ipynb) — kjernekraft, gass+CCS, hydrogen, ammoniakk, syntetisk metan som separate lag.
5. [`05_ladevindu.ipynb`](notebooks/extensions/05_ladevindu.ipynb) — modellér ladevinduet før/etter hendelsen.
6. [`06_overforing_regioner.ipynb`](notebooks/extensions/06_overforing_regioner.ipynb) — land/regioner og overføringsbegrensninger.
7. [`07_levetidskost_per_mwh.ipynb`](notebooks/extensions/07_levetidskost_per_mwh.ipynb) — levetidskost per faktisk levert MWh for sjeldne hendelser.

## Standardverdier

De viktigste standardverdiene er hentet fra offentlige kilder og kan endres i `data/defaults.json`:

| Parameter | Standard | Kommentar |
|---|---:|---|
| EU total elektrisitet | 2 790 TWh/år | Implisert fra Ember: 1 331 TWh fornybart = 47,7 % i 2025 |
| EU snittlast | 318 GW | 2 790 TWh / 8 760 timer |
| Effektgap | 250 GW | Modellantakelse, ikke kildeverdi |
| Hendelsesvarighet | 10 døgn | Modellantakelse |
| Utnyttbar batteriandel | 80 % | Drift/reserve/degradering/margin |
| Batteripakke-kostnad | 70 USD/kWh | BNEF 2025 |
| Ferdig installert batterikostnad | 117 USD/kWh | BNEF omtalt av Energy-Storage.news |
| EU batterilager-tilvekst 2025 | 27,1 GWh | SolarPower Europe |
| Global cellekapasitet 2024 | >3 TWh/år | IEA |
| Global litiumproduksjon 2025 | ca. 290 000 tonn | USGS, ekskl. USA |
| LFP litiumintensitet | 0,09 kg Li/kWh | ICCT |

## Begrensninger

Modellen ignorerer blant annet:

- geografisk korrelasjon mellom vind/sol
- timeprofiler for produksjon og last
- flaskehalser i transmisjonsnett
- markedsdesign og reservekrav
- ladevinduer før og etter hendelsen
- effektbegrensninger, ikke bare energi
- degradering over levetid
- omløpshastighet og inntektsmodell for sjelden brukt lager
- lokal arealbruk, brannvern, trafostasjoner, nettilknytning og tillatelser

Dette er med vilje. Første spørsmål er om størrelsesordenen er plausibel. Hvis størrelsesordenen ikke er plausibel, bør en mer detaljert modell brukes til å finne en bedre systemmiks, ikke til å forsvare én bestemt teknologi.

## Ordliste

Termer, forkortelser og enheter som brukes i notebookene er forklart i [`ORDLISTE.md`](ORDLISTE.md). Den er skrevet for nysgjerrige lesere uten dyp energibakgrunn.

## Kildegrunnlag

Se `data/defaults.json` for kildeliste med lenker.
## Lisens

Dette arbeidet er lisensiert under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).
