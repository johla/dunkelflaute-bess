# Patch-notater

Dette dokumentet beskriver endringene som ble innført gjennom `dunkelflaute-bess-pedagogisk.patch`. Hensikten med patchen var pedagogisk: å gjøre repoet enklere å lese, vurdere og bruke i undervisning, uten å endre den underliggende modellen eller beregningene.

## Sammendrag

Patchen endrer ikke modellens formler. Den legger til lesestøtte, læringsmål, et lite oppvarmingseksempel før Europa-tallene, et regimekart for å klassifisere størrelsesorden, og en falsifikasjonstabell som gjør modellen lettere å angripe.

I tillegg etableres tre nye dokumenter som peker leseren gjennom repoet i en pedagogisk hensiktsmessig rekkefølge.

## Filer som er endret

### `README.md`

- Nytt avsnitt: «Anbefalt leservei» som foreslår rekkefølgen lese, kjøre, endre én parameter, endre flere parametere.
- Nytt avsnitt: «Femminuttersversjonen» med en kompakt tabell over de fire spørsmålene modellen besvarer.
- Nytt avsnitt: «For faglig vurdering» som peker på hvilke antakelser en kritikk mest sannsynlig bør utfordre.
- Mindre språklig presisering i avsnittet om hvorfor modellen er bevisst enkel.

### `notebooks/dunkelflaute_batteri_lab.ipynb`

- Nytt læringsmålsavsnitt nær toppen, slik at leseren vet hva som skal sitte etter gjennomgang.
- Nytt «Mini-eksempel før Europa»: 1 GW residual effektmangel i 10 døgn med 80 % utnyttbar kapasitet, brukt som oppvarming før europeiske tall.
- Nytt «Regimekart»: en hjelpefunksjon som klassifiserer installert kapasitet som BESS-skala, kontinentalt lagerprogram, industriell mobilisering eller strategisk energireserve.
- Ny falsifikasjonstabell som lister hvilke antakelser som faktisk kan endre konklusjonen, og hva som måtte være sant for at de skulle gjøre det.
- Mindre språklig presisering i sluttavsnittet.

## Filer som er lagt til

- `PEDAGOGISK_NOTAT.md` — kort innføring i hva modellen gjør, hva den ikke gjør, anbefalt leservei og falsifikasjonsramme.
- `docs/UNDERVISNINGSOPPLEGG.md` — forslag til hvordan repoet kan brukes i undervisning, med læringsmål, timeplan og diskusjonsspørsmål.
- `PATCH_NOTES.md` — dette dokumentet.

## Hva som med vilje *ikke* er endret

- Beregningsfunksjonen `calculate(...)` i hovednotebooken og i `src/dunkelflaute.py`.
- Verdiene i `data/defaults.json`.
- Skillet mellom kildeverdier og modellantakelser i `ASSUMPTIONS.md`.
- Termene og forklaringene i `ORDLISTE.md`.
- Strukturen og innholdet i utvidelsesnotebookene under `notebooks/extensions/`.

Begrunnelse: patchen er pedagogisk, ikke modellrevisjon. Tallene og formlene skal være de samme før og etter patchen, slik at en faglig vurdering kan ta for seg modellen som den faktisk er.

## Verifikasjon

Etter at patchen ble anvendt:

- hovednotebooken `notebooks/dunkelflaute_batteri_lab.ipynb` kjører fra topp til bunn uten feil
- alle utvidelsesnotebooker under `notebooks/extensions/` kjører uten feil
- lenker fra `README.md` peker til eksisterende filer i repoet
- de tre nye dokumentene er på plass
- forklarende prosa er holdt på norsk; engelsk forekommer kun i kildenavn, pakkenavn, enheter og uunngåelige tekniske termer
- størrelsesordenen i resultatene er uendret sammenlignet med versjonen før patchen
