# Metode

Dette notatet er ment som inngangsdøren til repoet for en fagperson eller en student. Det forklarer kort hva modellen gjør, hva den med vilje ikke gjør, og hvilken rekkefølge som er pedagogisk hensiktsmessig når man leser eller kritiserer den.

Notatet erstatter ikke [README.md](README.md), [ASSUMPTIONS.md](ASSUMPTIONS.md) eller [ORDLISTE.md](ORDLISTE.md). Det er en lesestøtte som peker videre til disse.

## Hva modellen gjør

Modellen er en deterministisk størrelsesorden-beregning. Den svarer på ett spørsmål:

> Hvor stor batteripark, målt i installert TWh, må Europa ha hvis batterier alene skulle dekke en flerdagers Dunkelflaute?

Beregningen bygger på fire ledd som kjøres i rekkefølge:

1. **Energimengde**: effektgap i GW ganges med varighet i timer for å få levert energi i TWh.
2. **Installert kapasitet**: levert energi deles på utnyttbar andel for å ta hensyn til reserve, degradering og driftsmargin.
3. **Kapitalbinding**: installert kapasitet ganges med kost per kWh (pakke og turnkey).
4. **Forsyningskjede og materialer**: installert kapasitet sammenlignes med global cellekapasitet, EU-installasjonstakt og litiumforbruk.

Hvert ledd er bevisst lineært. Dette gjør det mulig å se hvor i kjeden en antakelse flytter konklusjonen.

## Hva modellen ikke gjør

Modellen er ikke en kraftsystemmodell. Den behandler ikke:

- timeoppløst etterspørsel og produksjon
- geografisk fordeling, nettilknytning eller flaskehalser
- optimal miks av regulerbar produksjon, fleksibel last og lagring
- markedsdesign, prisdannelse eller inntektsstrømmer for sjelden brukt lager
- arealbruk, tillatelser, brannvern og lokal aksept

Disse temaene er viktige, men de hører hjemme i mer detaljerte modeller. Hensikten her er å avgjøre om størrelsesordenen er plausibel før systemmiksen optimeres.

## Anbefalt leservei

For en fagperson eller en student som skal vurdere modellen, foreslås følgende rekkefølge:

1. Les dette notatet og [README.md](README.md) sin femminuttersversjon.
2. Kjør [`notebooks/dunkelflaute_batteri_lab.ipynb`](notebooks/dunkelflaute_batteri_lab.ipynb) fra toppen uten å endre noe.
3. Endre **bare effektgap** og se hvordan tall flytter seg.
4. Endre deretter **bare varighet**.
5. Først etter at størrelsesordenen er forstått: endre kjemimiks, kost og produksjonskapasitet.
6. Bruk utvidelsesnotebookene i `notebooks/extensions/` for å se enkelte deltemaer nærmere.

Begrunnelsen er at `GW × døgn` dominerer resultatet. Kjemivalg og kost er nedstrøms av denne størrelsesordenen.

## Falsifikasjonsramme

Modellen er laget for å være mulig å angripe. Den er ikke et argument for eller mot batterier. En relevant kritikk vil typisk endre én av disse antakelsene:

- effektgap under hendelsen
- varighet og sannsynlighet for hendelsen
- tilgjengelig regulerbar produksjon, import og fleksibilitet som reduserer effektgapet
- relevant batterikost for multi-døgn lagring
- forsyningskjede og produksjonstakt for valgt kjemi
- alternativverdien av samme kapital i nett, vannkraft, termisk eller kjemisk reserve, eller i etterspørselsrespons

Dersom en endring i én av disse antakelsene flytter konklusjonen kraftig, er det et signal om at konklusjonen er drevet av nettopp den antakelsen, og bør diskuteres deretter.

## Hva en god kritikk bør gjøre

En god faglig kritikk bør:

- peke på hvilken antakelse i `data/defaults.json` eller i notebooken den utfordrer
- vise en tallmessig konsekvens av den endrede antakelsen
- skille mellom kildeverdier (jf. [ASSUMPTIONS.md](ASSUMPTIONS.md)) og modellantakelser
- foreslå hvilken mer detaljert modell som ville være riktig neste skritt dersom størrelsesordenen er plausibel

Dette er en pedagogisk modell. Den er nyttig nettopp fordi den er enkel nok til at uenighet kan lokaliseres til konkrete linjer og tall.

## Videre lesning i repoet

- [README.md](README.md) — overordnet forklaring og repo-struktur
- [ASSUMPTIONS.md](ASSUMPTIONS.md) — skille mellom kildeverdier og modellantakelser
- [ORDLISTE.md](ORDLISTE.md) — termer, forkortelser og enheter
- `data/defaults.json` — alle tallverdier samlet på ett sted
- [`notebooks/dunkelflaute_batteri_lab.ipynb`](notebooks/dunkelflaute_batteri_lab.ipynb) — hovednotebook
- [`notebooks/extensions/`](notebooks/extensions/) — utvidelser som belyser enkelttemaer
- [`docs/UNDERVISNINGSOPPLEGG.md`](docs/UNDERVISNINGSOPPLEGG.md) — forslag til hvordan repoet kan brukes i undervisning
