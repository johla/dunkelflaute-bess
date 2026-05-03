# Ordliste

Denne siden forklarer termer, forkortelser og enheter som brukes i hovednotebooken og utvidelsene. Forklaringene er ment for nysgjerrige lesere uten dyp energibakgrunn. Tekniske detaljer er holdt korte; følg lenkene i `data/defaults.json` for kildegrunnlag.

## Hvordan bruke ordlisten

- Termene er gruppert tematisk, ikke alfabetisk, for å gjøre det lettere å bygge intuisjon.
- Innenfor hver gruppe står de mest sentrale termene først.
- Engelske originaltermer står i parentes når den norske formen er kort eller uvanlig, slik at du gjenkjenner dem i kilder og artikler.

---

## Selve fenomenet

**Dunkelflaute** *(tysk: «mørk vindstille»)*
En periode der både vind- og solproduksjon er lav over store geografiske områder samtidig, ofte i forbindelse med vinterhøytrykk. Kan vare fra noen timer til 1–2 uker. Begrepet brukes bredt i tysk og europeisk kraftdebatt og har ikke noe etablert norsk synonym.

**Residual effektmangel** *(residual gap)*
Det som blir igjen av etterspørselen etter at all annen produksjon (kjernekraft, vannkraft, import, termisk backup, fleksibelt forbruk osv.) er trukket fra. Det er **denne** mangelen et batterilager må dekke — ikke total last. Måles i GW.

**Hendelsens varighet** *(event duration)*
Antall døgn Dunkelflauten antas å vare. I hovednotebooken er standardverdien 10 døgn, valgt som et pedagogisk midtpunkt mellom korte hendelser (1–2 døgn) og forlengede vinterperioder (2–3 uker).

---

## Energi og effekt

**Effekt** *(power)* — målt i **W, kW, MW, GW, TW**
Hvor mye energi som overføres per tidsenhet. Et kraftverk på 1 GW kan levere 1 GW i øyeblikket — det sier ingenting om hvor lenge.

**Energi** *(energy)* — målt i **Wh, kWh, MWh, GWh, TWh**
Mengden energi over tid. 1 GW i 1 time = 1 GWh. 1 GW i ett år ≈ 8 760 GWh ≈ 8,76 TWh.

**Effektkapasitet vs. energikapasitet**
Et batteri har **to** uavhengige størrelser: hvor stor effekt det kan trekke til/fra (GW), og hvor mye energi det rommer (GWh). Forholdet $E/P$ kalles *varighet* og oppgis i timer.

**Varighet** *(duration)*
$E/P$ for et lager, i timer. Et «4-timers BESS» har $E = 4 \times P$. Dunkelflaute krever varigheter på 50–250 timer — langt over dagens kommersielle norm på 2–8 timer.

**Snittlast** *(average load)*
Total årlig elektrisitet delt på 8 760 timer. EU ligger rundt 318 GW snittlast (≈ 2 790 TWh/år).

---

## Batterier og lager

**BESS** — *Battery Energy Storage System*
Stasjonært batterilager koblet til strømnettet. Inkluderer celler, inverter, transformator, kjøling, brannvern og kontrollsystem.

**LFP** — *Lithium Iron Phosphate (LiFePO₄)*
Vanligste battericelle for stasjonær lagring i 2025. Tåler mange sykluser, er rimelig og branntrygg, men har lavere energitetthet enn NMC.

**NMC** — *Nickel Manganese Cobalt*
Battericelle med høyere energitetthet, brukes mest i bil. Mindre vanlig i BESS i dag.

**Natrium-ion** *(Na-ion, sodium-ion)*
Battericelle som bruker natrium i stedet for litium. Lavere energitetthet, men slipper litiumavhengigheten. Tidlig kommersialisering, sterkt Kina-konsentrert produksjon.

**Pakke-kost** *(stationary pack cost)*
Pris for selve battericellene/-pakken, uten resten av systemet. BNEF rapporterte ca. 70 USD/kWh i 2025.

**Turnkey-kost** *(turnkey BESS cost)*
Total leveringspris for et ferdig installert batterianlegg, inkl. inverter, trafo, kontrollsystem, brann/kjøling, EPC-arbeid og nettilknytning. BNEF rapporterte ca. 117 USD/kWh i 2025.

**Utnyttbar andel** *(usable fraction)*
Hvor stor del av installert batterikapasitet som faktisk er disponibel under en hendelse, etter fradrag for drift, reserve, degradering og marginer. I modellen 80 % som standard.

**SOC** — *State of Charge*
Fyllingsgrad i batteriet, oppgitt i prosent. En seriøs systemmodell simulerer SOC time for time gjennom året.

**Round-trip-effektivitet** *(η, RTE, round-trip efficiency)*
Andel av energien inn som kommer ut igjen, etter tap i lading og utlading. Typisk 0,85–0,90 for moderne BESS.

**Pumpekraft** *(PHS — Pumped Hydro Storage)*
Pumper vann opp til et magasin når strømmen er billig, og slipper det ned gjennom turbiner når den er dyr. Europa har ca. 55 GW installert effekt og ca. 1,3 TWh energiinnhold.

**Hydrogen / ammoniakk / syntetisk metan**
Energibærere som kan produseres fra fornybar strøm (elektrolyse osv.) og lagres lenge, for så å brennes i turbiner eller brenselceller når det trengs. Tap er store, men de skalerer på TWh- og sesongnivå der batterier ikke gjør det.

**CCGT** — *Combined Cycle Gas Turbine*
Gassturbin med dampgjenvinning. Effektiv termisk kraftproduksjon, kan kjøre på naturgass, hydrogen eller (i prinsippet) ammoniakk.

**CCS** — *Carbon Capture and Storage*
Fanger CO₂ fra forbrenning eller industri og lagrer det permanent, typisk i geologiske formasjoner.

---

## Kraftnettet

**HVDC** — *High Voltage Direct Current*
Likestrømskabel for langdistanse-overføring av elektrisitet, typisk mellom land eller landsdeler. Eksempler: NorthConnect-typen kabler mellom Norge og kontinentet.

**Interkonnektor** *(interconnector)*
Overføringsforbindelse mellom to land eller områder. Kan være HVDC eller AC.

**NTC** — *Net Transfer Capacity*
Maksimal effekt som kan overføres mellom to soner uten å bryte sikkerhetskrav. Ofte vesentlig lavere enn fysisk linjekapasitet.

**Copperplate**
En forenklet modell-antakelse om at hele området (f.eks. «Europa») fungerer som én eneste kobberplate uten flaskehalser. Brukes pedagogisk, men virkeligheten har soner og NTC-grenser.

**OPF** — *Optimal Power Flow*
Matematisk optimalisering av kraftflyt gjennom nettet, gitt last, produksjon og fysiske begrensninger. Krever spesialisert programvare; vi bruker en mye enklere «greedy»-flyt i utvidelse 06.

**Frekvensrespons** *(frequency response)*
Rask justering av produksjon eller forbruk for å holde nettfrekvensen rundt 50 Hz. Batterier er svært gode på dette.

**Etterspørselsrespons / DR** *(demand response)*
Forbruk som flyttes eller reduseres når kraften er knapp. Eksempler: industri som senker produksjon, varmtvannsberedere som styres sentralt, lading av elbiler som utsettes.

**Reserve** *(operating reserve)*
Produksjon eller lager som holdes ledig for å håndtere uforutsette hendelser (utfall, prognoseavvik). Kan ikke samtidig brukes til energiarbitrasje.

---

## Roller og driftsbegreper

**Baselast** *(base load)*
Produksjon som går jevnt store deler av tiden. Typisk kjernekraft, deler av vannkraften, varmekraft.

**Mid-merit / peak**
Produksjon som ramper opp/ned etter behov (mid-merit) eller bare slås på i kortvarige toppperioder (peak).

**Merit-orden** *(merit order)*
Rekkefølgen kraftverk tas i bruk i markedet, fra laveste til høyeste marginalkostnad. Avgjør hvilken teknologi som setter prisen.

**Kapasitetsmarked** *(capacity market)*
Marked der produsenter får betalt for å være *tilgjengelige*, uavhengig av om de produserer. Brukes i flere europeiske land for å holde reservekapasitet i drift.

**Arbitrasje** *(arbitrage)*
Kjøpe energi billig (om natten/i overskuddstimer) og selge dyrt (i topptimer). Hovedinntektskilden for daglig BESS.

**Sykluser per år** *(cycles per year)*
Antall ganger et batteri lades helt opp og tømmes helt i løpet av et år. Daglig arbitrasje gir 300+, en Dunkelflaute-rolle alene gir mindre enn 1.

**Throughput** *(energi-throughput)*
Total energi som passerer gjennom batteriet over levetiden — direkte avgjørende for levetidskost per levert MWh.

---

## Kost og økonomi

**CAPEX** — *Capital Expenditure*
Investeringskostnad opp front (bygge, kjøpe, installere).

**OPEX** — *Operational Expenditure*
Løpende driftskostnader (vedlikehold, forsikring, brensel).

**LCOE** — *Levelized Cost of Energy*
Snittkost per produsert MWh over hele levetiden, inkl. kapital og drift. Standardmål for kraftverk.

**LCOS** — *Levelized Cost of Storage*
Tilsvarende mål for lager: snittkost per **levert** MWh ut av lageret. Avhenger sterkt av antall sykluser per år.

**Annuitet** *(annuity factor)*
Måte å gjøre om en engangsinvestering til en årlig kostnad over levetiden, gitt en diskonteringsrente. Brukes i LCOE/LCOS-beregninger.

**Diskonteringsrente** *(discount rate)*
Renten man bruker for å sammenligne kostnader/inntekter på ulike tidspunkter. Høyere rente straffer kapitalintensive teknologier.

**Stablede inntekter** *(revenue stacking)*
Når samme batterianlegg tjener penger på flere markeder samtidig — f.eks. frekvens, intra-dag-arbitrasje, kapasitetsmarked og sjelden krise-bruk. Ofte nødvendig for å forsvare investeringen.

---

## BESS-komponenter (system-nivå)

**Celle / modul / rack / pack**
Hierarkiet i et batterisystem: celler kobles i moduler, moduler i racks, racks i en pakke (pack) eller container.

**PCS** — *Power Conversion System*
Inverteren som konverterer mellom batteriets likestrøm (DC) og nettets vekselstrøm (AC).

**BMS** — *Battery Management System*
Elektronikken som overvåker spenning, temperatur og strøm i hver celle, og styrer lading/utlading sikkert.

**EPC** — *Engineering, Procurement, Construction*
Den totale kontrakten for å prosjektere, kjøpe inn og bygge anlegget.

**MV-trafo / switchgear**
Mellomspenningstransformator og bryteranlegg som kobler BESS til distribusjons- eller transmisjonsnettet.

**HVAC** *(her: brann og klima)*
I BESS-sammenheng: oppvarming, ventilasjon, kjøling og brannhåndtering — kritisk for sikkerhet og levetid.

---

## Materialer og produksjon

**Litiumintensitet** *(lithium intensity)*
Hvor mye litium en celletype trenger per kWh, oppgitt i kg Li/kWh. ICCT anslår ca. 0,09 kg/kWh for LFP.

**Cellekapasitet** *(global cell manufacturing capacity)*
Hvor mye battericelle-produksjon (i TWh/år) som finnes globalt. IEA: over 3 TWh/år i 2024, ca. 6,5 TWh/år forpliktet mot 2030.

**EU BESS-tilvekst** *(annual additions)*
Hvor mye nytt stasjonært batterilager som installeres i EU per år. SolarPower Europe: 27,1 GWh i 2025.

**USGS / Ember / IEA / BNEF / NREL ATB / ICCT / NVE / JRC PECDEC / IHA**
Forkortelser for kildene som brukes i `data/defaults.json`. USGS = US Geological Survey (litium); Ember = uavhengig klima-tenketank (kraftmiks); IEA = International Energy Agency; BNEF = BloombergNEF; NREL ATB = National Renewable Energy Laboratory Annual Technology Baseline; ICCT = International Council on Clean Transportation; NVE = Norges vassdrags- og energidirektorat; JRC PECDEC = EUs Joint Research Centre, Power Electronics & Distributed Energy Conversion-database; IHA = International Hydropower Association.

---

## Datakilder og verktøy nevnt i utvidelsene

**ENTSO-E Transparency Platform**
Offentlig dataportal for europeisk kraft: timeoppløst forbruk, produksjon per teknologi, flyt mellom land.

**MERRA-2 / ERA5**
Reanalyse-datasett for vær (vind, sol, temperatur) over tiår. Brukes til å rekonstruere realistiske vind- og solprofiler.

**renewables.ninja**
Gratis verktøy som omsetter MERRA-2/ERA5 til vind- og solproduksjon for et valgt sted.

---

## Enheter og prefiks

| Prefiks | Faktor | Eksempel |
|---|---:|---|
| k (kilo) | 10³ | 1 kW = 1 000 W |
| M (mega) | 10⁶ | 1 MW = 1 000 kW |
| G (giga) | 10⁹ | 1 GW = 1 000 MW |
| T (tera) | 10¹² | 1 TW = 1 000 GW |

| Tidsfaktor | Verdi |
|---|---:|
| Timer per døgn | 24 |
| Timer per år | 8 760 |
| Døgn per år | 365 |

**Konvertering du møter ofte i modellen:**

- 1 GW × 24 t = 24 GWh
- 1 GW × 24 t × 10 d = 240 GWh = 0,24 TWh
- 250 GW × 24 t × 10 d = 60 000 GWh = 60 TWh

---

## Kort om navnekonvensjoner i koden

I notebookene brukes engelske variabelnavn (`residual_gap_gw`, `event_days`, `usable_fraction` osv.) for å være tett på publiserte kilder og gjøre det lett å sammenligne med internasjonale modeller. Visningstekst (titler, tabellkolonner, akseetiketter) er på norsk.
