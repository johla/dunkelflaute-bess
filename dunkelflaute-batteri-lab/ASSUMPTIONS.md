# Kilde- og antakelsesnotat

Dette notatet er kortversjonen av `data/defaults.json`.

## Kildeverdier

- EU elektrisitet 2025: Ember oppgir 1 331 TWh fornybart og 47,7 % fornybarandel. Modellen bruker derfor ca. 2 790 TWh/år som implisert total.
- EU BESS 2025: SolarPower Europe oppgir 27,1 GWh ny batterilagring i EU i 2025.
- Global cellekapasitet: IEA oppgir mer enn 3 TWh/år global battericellekapasitet i 2024 og ca. 6,5 TWh/år for forpliktede 2030-prosjekter.
- Batterikost: BNEF oppgir stationary storage pack cost rundt 70 USD/kWh i 2025. Energy-Storage.news omtaler BNEF turnkey BESS rundt 117 USD/kWh.
- Litium: USGS oppgir ca. 290 000 tonn global litiumproduksjon i 2025, ekskl. USA.
- LFP-litiumintensitet: ICCT bruker 0,09 kg litium per kWh LFP-cellekapasitet.
- Natrium-ion: IEA vurderer natrium-ion som lovende for diversifisering, men dagens og annonserte kapasitet er sterkt konsentrert i Kina.

## Modellantakelser

- Residual gap 250 GW er en pedagogisk baseantakelse, ikke en kildeverdi.
- 10 døgn er en stress-test, ikke en typisk hendelse.
- 80 % utnyttbar kapasitet er en konservativ driftsmargin.
- Kjemimiks 75 % LFP, 15 % natrium-ion, 10 % andre langtidsbatterier er en arbeidshypotese.
