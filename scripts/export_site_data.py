"""Eksporter offentlige SPA-data fra `data/defaults.json` og `src/dunkelflaute.py`.

Skriver `docs/data/site-results.json` med:
- standardresultater fra hovedmodellen
- resultater for hvert navngitt scenario i `docs/data/scenarios.json`
- ankrene fra `data/defaults.json`

Dette gir én sannhetskilde for SPAen, og hindrer at JS-formelen
sklir bort fra Python-formelen i `src/dunkelflaute.py`.

Bruk:
    python scripts/export_site_data.py
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
import sys

REPO_ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = REPO_ROOT / "src"
DATA_FILE = REPO_ROOT / "data" / "defaults.json"
SCENARIOS_FILE = REPO_ROOT / "docs" / "data" / "scenarios.json"
OUT_FILE = REPO_ROOT / "docs" / "data" / "site-results.json"

# Make src/ importable
sys.path.insert(0, str(SRC_DIR))

from dunkelflaute import BatteryScenario, calculate  # noqa: E402


def _scenario_from_defaults(defaults: dict, **overrides) -> BatteryScenario:
    base = dict(
        residual_gap_gw=defaults["residual_gap_gw"],
        event_days=defaults["event_days"],
        usable_fraction=defaults["usable_fraction"],
        pack_cost_usd_per_kwh=defaults["stationary_pack_cost_usd_per_kwh"],
        turnkey_cost_usd_per_kwh=defaults["turnkey_bess_cost_usd_per_kwh"],
        lfp_share=defaults["lfp_share"],
        sodium_ion_share=defaults["sodium_ion_share"],
        other_long_duration_share=defaults["other_long_duration_share"],
        lfp_lithium_intensity_kg_per_kwh=defaults["lfp_lithium_intensity_kg_per_kwh"],
        global_lithium_production_tonnes_2025=defaults[
            "global_lithium_production_tonnes_2025"
        ],
        global_cell_capacity_twh_per_year=defaults[
            "global_battery_cell_manufacturing_capacity_twh_2024"
        ],
        eu_bess_additions_gwh_per_year=defaults["eu_bess_additions_gwh_2025"],
    )
    base.update(overrides)
    return BatteryScenario(**base)


def main() -> int:
    with DATA_FILE.open("r", encoding="utf-8") as f:
        defaults_doc = json.load(f)
    defaults = defaults_doc["defaults"]
    anchors = defaults_doc["norwegian_anchors"]

    if SCENARIOS_FILE.exists():
        with SCENARIOS_FILE.open("r", encoding="utf-8") as f:
            scenarios_doc = json.load(f)
        named_scenarios = scenarios_doc.get("scenarios", [])
    else:
        named_scenarios = []

    base_scenario = _scenario_from_defaults(defaults)
    base_result = calculate(base_scenario)

    scenario_results = []
    for sc in named_scenarios:
        overrides = {}
        if "residual_gap_gw" in sc:
            overrides["residual_gap_gw"] = float(sc["residual_gap_gw"])
        if "event_days" in sc:
            overrides["event_days"] = float(sc["event_days"])
        result = calculate(_scenario_from_defaults(defaults, **overrides))
        scenario_results.append(
            {
                "id": sc.get("id"),
                "name": sc.get("name"),
                "explanation": sc.get("explanation"),
                "inputs": {
                    "residual_gap_gw": result["residual_gap_gw"],
                    "event_days": result["event_days"],
                    "usable_fraction": result["usable_fraction"],
                },
                "outputs": {
                    "delivered_energy_twh": result["delivered_energy_twh"],
                    "installed_battery_twh": result["installed_battery_twh"],
                    "turnkey_cost_trillion_usd": result["turnkey_cost_trillion_usd"],
                    "years_of_global_cell_capacity": result[
                        "years_of_global_cell_capacity"
                    ],
                    "multiples_of_2025_eu_bess_additions": result[
                        "multiples_of_2025_eu_bess_additions"
                    ],
                    "lithium_required_million_tonnes": result[
                        "lithium_required_million_tonnes"
                    ],
                },
            }
        )

    out = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": {
            "defaults": "data/defaults.json",
            "model": "src/dunkelflaute.py",
            "scenarios": "docs/data/scenarios.json",
        },
        "anchors": anchors,
        "base_scenario": {
            "inputs": {
                "residual_gap_gw": base_result["residual_gap_gw"],
                "event_days": base_result["event_days"],
                "usable_fraction": base_result["usable_fraction"],
            },
            "outputs": {
                "delivered_energy_twh": base_result["delivered_energy_twh"],
                "installed_battery_twh": base_result["installed_battery_twh"],
                "pack_cost_trillion_usd": base_result["pack_cost_trillion_usd"],
                "turnkey_cost_trillion_usd": base_result["turnkey_cost_trillion_usd"],
                "lfp_twh": base_result["lfp_twh"],
                "sodium_ion_twh": base_result["sodium_ion_twh"],
                "other_long_duration_twh": base_result["other_long_duration_twh"],
                "lithium_required_tonnes": base_result["lithium_required_tonnes"],
                "lithium_required_million_tonnes": base_result[
                    "lithium_required_million_tonnes"
                ],
                "years_of_2025_lithium_production": base_result[
                    "years_of_2025_lithium_production"
                ],
                "years_of_global_cell_capacity": base_result[
                    "years_of_global_cell_capacity"
                ],
                "multiples_of_2025_eu_bess_additions": base_result[
                    "multiples_of_2025_eu_bess_additions"
                ],
            },
        },
        "named_scenarios": scenario_results,
    }

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with OUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Skrev {OUT_FILE.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
