# Dunkelflaute batteri-lab

Dette er en liten pedagogisk repo for å undersøke et enkelt spørsmål:

> Hvor stor batteripark måtte Europa ha dersom batterier skulle dekke en flerdagers Dunkelflaute?

Modellen er bevisst enkel. Den er laget for å gi intuisjon og størrelsesorden, ikke for å være en full kraftsystemmodell.

## Hva du kan endre

Notebooken lar deg variere:

- varighet på hendelsen i døgn
- residual effektmangel i GW etter kjernekraft, vannkraft, import, termisk backup, etterspørselsrespons osv.
- utnyttbar andel av installert batterikapasitet
- kost per kWh for pakke og turnkey BESS
- kjemimiksen: LFP, natrium-ion og andre langtidslagringsbatterier
- global produksjonskapasitet for battericeller
- EU-installasjonstakt for BESS
- litiumintensitet for LFP

## Viktig tolkning

Dette er ikke et argument mot batterier. Batterier er svært nyttige for frekvensrespons, intra-dag-utjevning, reserve, prisarbitrasje, nettavlastning og integrasjon av sol og vind.

Spørsmålet her er snevrere: **er batterier alene en rasjonell løsning for kontinental, flerdagers Dunkelflaute?**

Standardverdiene peker mot svaret: sannsynligvis nei. Når hendelsen går fra timer til flere døgn, flytter problemet seg fra vanlig BESS til strategisk energilager, fleksibilitet, overføringsnett, regulerbar produksjon, vannmagasiner, hydrogen/metan/ammoniakk, termisk backup og etterspørselsstyring.

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

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab notebooks/dunkelflaute_batteri_lab.ipynb
```

Notebooken fungerer også uten `ipywidgets`, men da mister du glidebryterne.


## Kjør i GitHub Codespaces

GitHub Codespaces er den enkleste måten å kjøre denne laben uten å installere Python, Jupyter eller VS Code lokalt. Tenk på det som **VS Code i nettleseren**, koblet direkte til GitHub-repoet.

### For helt nye brukere

1. Logg inn på GitHub.
2. Åpne repoet.
3. Klikk **Code**-knappen.
4. Velg fanen **Codespaces**.
5. Klikk **Create codespace on main**.
6. Vent til VS Code åpner seg i nettleseren.
7. Åpne `notebooks/dunkelflaute_batteri_lab.ipynb`.
8. Klikk **Run All** eller kjør én celle av gangen.

Når notebooken spør om kernel, velg Python-miljøet som Codespaces foreslår. Hvis du får spørsmål om å installere anbefalte utvidelser, svar ja.

### Hva er “web VS Code”?

Det som åpner seg er Visual Studio Code, men i nettleseren. Filene ligger i en liten Linux-maskin i skyen. Terminalen nederst er derfor ikke PC-en din, men Codespaces-miljøet. Det betyr at kommandoer som dette kjøres i GitHub sitt miljø:

```bash
pip install -r requirements.txt
jupyter lab
```

Denne repoen inneholder en `.devcontainer/devcontainer.json` som gjør oppsettet mer automatisk. Når Codespaces starter, installeres Python-avhengighetene fra `requirements.txt`.

### Nyttige nybegynner-tips

- **Explorer** til venstre viser filene i repoet.
- **Terminal** åpnes via menyen: `Terminal → New Terminal`.
- **Command Palette** åpnes med `Ctrl+Shift+P` på Windows/Linux eller `Cmd+Shift+P` på Mac.
- Hvis notebooken ikke finner riktig kernel, åpne Command Palette og søk etter `Python: Select Interpreter`.
- Hvis miljøet virker fryst etter en pause, trykk **Start** eller last siden på nytt. Codespaces kan stoppe automatisk etter inaktivitet.
- Når du er ferdig, stopp Codespace fra GitHub-siden for å unngå unødvendig bruk av inkluderte minutter/kost.

### Alternativ: JupyterLab direkte

Codespaces kan også åpnes i JupyterLab, men for nybegynnere er VS Code i nettleseren ofte best fordi du ser både filer, terminal, notebook og Git-status på ett sted.

## Repo-struktur

```text
.
├── README.md
├── requirements.txt
├── .devcontainer/
│   └── devcontainer.json
├── data/
│   └── defaults.json
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
└── src/
    └── dunkelflaute.py
```

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
| Residual effektmangel | 250 GW | Modellantakelse, ikke kildeverdi |
| Hendelsesvarighet | 10 døgn | Modellantakelse |
| Utnyttbar batteriandel | 80 % | Drift/reserve/degradering/margin |
| Stationary pack cost | 70 USD/kWh | BNEF 2025 |
| Turnkey BESS cost | 117 USD/kWh | BNEF omtalt av Energy-Storage.news |
| EU BESS-tilvekst 2025 | 27,1 GWh | SolarPower Europe |
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

Dette er med vilje. Første spørsmål er om størrelsesordenen er plausibel. Hvis den ikke er det, bør en mer detaljert modell brukes til å finne god systemmiks, ikke til å redde en dårlig premiss.

## Ordliste

Termer, forkortelser og enheter som brukes i notebookene er forklart i [`ORDLISTE.md`](ORDLISTE.md). Den er skrevet for nysgjerrige lesere uten dyp energibakgrunn.

## Kildegrunnlag

Se `data/defaults.json` for kildeliste med lenker.
## Lisens

Dette arbeidet er lisensiert under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).
