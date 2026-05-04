# Undervisningsopplegg

Dette dokumentet foreslår hvordan repoet kan brukes i undervisning eller i et seminar med en fagperson. Det er ment som et utgangspunkt, ikke en oppskrift.

Målet er at deltakerne skal kunne resonnere selv om hva en flerdagers Dunkelflaute betyr i TWh, kapital og produksjonskapasitet, og kunne skille mellom hva batterikjemi kan og ikke kan endre.

## Læringsmål

Etter å ha gjennomgått opplegget skal en deltaker kunne:

1. regne om fra **GW × døgn** til **TWh** uten å blande effekt og energi
2. forklare hvorfor flerdagers energireserve er en annen problemklasse enn vanlig BESS for korttidsfleksibilitet
3. teste hvordan konklusjonen flytter seg når residual effektmangel, varighet og utnyttbar kapasitet endres
4. skille mellom det batterikjemi som natrium-ion kan forbedre (materialrisiko, geografisk konsentrasjon) og det kjemien ikke endrer (`GW × døgn`)
5. plassere et resultat i riktig regime: BESS-skala, kontinentalt lagerprogram, industriell mobilisering eller strategisk energireserve

## Anbefalt forarbeid

Før samlingen bør deltakerne ha:

- lest [`README.md`](../README.md) (særlig avsnittene «Anbefalt leservei» og «Femminuttersversjonen»)
- lest [`METODE.md`](../METODE.md)
- åpnet `data/defaults.json` og bladd gjennom verdiene
- bladd i [`ORDLISTE.md`](../ORDLISTE.md) for termer som er ukjente

Det er ikke nødvendig å ha kjørt notebooken på forhånd. Det gjøres i opplegget.

## Forslag til timeplan

Opplegget kan kjøres som én sammenhengende økt på omtrent to timer, eller deles i to. Tidsangivelsene er veiledende.

### Del 1 — Størrelsesorden (ca. 30 min)

- Kort introduksjon til spørsmålet og til at modellen er bevisst enkel.
- Kjør hovednotebooken fra toppen uten å endre parametere.
- Stopp ved «Mini-eksempel før Europa» og diskuter: hvis 1 GW i 10 døgn allerede gir et tydelig tall, hva forteller det om Europa-skala?
- Snakk om forskjellen mellom levert energi og installert kapasitet.

### Del 2 — Én parameter om gangen (ca. 30 min)

- Endre **kun** residual effektmangel og se hvordan installert TWh og kapitalbinding endres.
- Tilbakestill og endre **kun** varighet.
- Tilbakestill og endre **kun** utnyttbar andel.
- Diskutér hvilken av de tre som flytter resultatet mest, og hvorfor.

### Del 3 — Regimekartet (ca. 20 min)

- Kjør cellen som klassifiserer scenarier som BESS-skala, kontinentalt lagerprogram, industriell mobilisering eller strategisk energireserve.
- Diskutér hvor grensen mellom «produktdiskusjon» og «systemdesign» bør gå.

### Del 4 — Falsifikasjon (ca. 20 min)

- Gå gjennom falsifikasjonstabellen i hovednotebooken.
- La deltakerne foreslå én antakelse de mener er svakest, og prøv å endre den i koden.
- Knytt diskusjonen til [`ASSUMPTIONS.md`](../ASSUMPTIONS.md) og skillet mellom kildeverdier og modellantakelser.

### Del 5 — Utvidelser (valgfritt, ca. 20 min)

Velg én eller to utvidelser i `notebooks/extensions/` ut fra deltakernes interesse:

- `01_timeprofiler.ipynb` — hvordan tidsprofiler påvirker behovet
- `02_effekt_vs_energi.ipynb` — skillet mellom effekt- og energidimensjonering
- `03_vannmagasin_pumpekraft.ipynb` — sammenligning med vannkraftmagasin
- `04_andre_teknologier.ipynb` — andre lagrings- og produksjonsteknologier
- `05_ladevindu.ipynb` — hvor lang tid det tar å lade lageret før en hendelse
- `06_overforing_regioner.ipynb` — geografisk fordeling og overføring
- `07_levetidskost_per_mwh.ipynb` — kost per levert MWh over levetid

## Forslag til diskusjonsspørsmål

- Hvilken av antakelsene i `data/defaults.json` ville du selv endret først, og hvorfor?
- Når et scenario havner i regimet «strategisk energireserve», hvilke andre tiltak enn batterier bør være på bordet?
- Hva kan natrium-ion realistisk endre i denne modellen, og hva kan den ikke endre?
- Hva skiller en kort BESS-diskusjon (timer) fra en multi-døgn-diskusjon (uker)?
- Hvilken mer detaljert modell ville være riktig neste skritt dersom størrelsesordenen viser seg plausibel?

## Vurderingsformer

Hvis opplegget brukes i et kurs, kan deltakerne for eksempel bli bedt om å:

- velge én antakelse i `data/defaults.json`, dokumentere kilden de mener er bedre, og vise tallmessig konsekvens
- skrive et kort notat (én side) som plasserer resultatet sitt i riktig regime og forklarer hvorfor
- foreslå én utvidelse til modellen og begrunne hvilken antakelse den ville teste

## Praktisk om kjøring

Repoet kjører i Codespaces eller lokalt. Se [`getting_started.md`](../getting_started.md) for installasjon. Anbefalt rekkefølge er hovednotebooken først, deretter utvidelser etter behov.
