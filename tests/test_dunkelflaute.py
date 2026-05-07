"""Regresjonstester for src/dunkelflaute.py.

Sikrer at standardscenarioet ikke utilsiktet degraderes.
Kjør med: pytest
"""

import json
from pathlib import Path

from src.dunkelflaute import BatteryScenario, calculate


def test_default_scenario_order_of_magnitude():
    r = calculate(BatteryScenario())

    assert r["delivered_energy_twh"] == 60.0
    assert r["installed_battery_twh"] == 75.0
    assert round(r["turnkey_cost_trillion_usd"], 3) == 8.775
    assert round(r["years_of_global_cell_capacity"], 1) == 25.0
    assert round(r["multiples_of_2025_eu_bess_additions"]) == 2768
    assert round(r["lithium_required_million_tonnes"], 2) == 5.06


def test_power_capex_adds_to_turnkey_cost():
    """Effektkapex skal legge seg på toppen av energikapex."""
    base = calculate(BatteryScenario())
    with_power = calculate(BatteryScenario(power_capex_usd_per_kw=100.0))

    # 250 GW × 1e6 kW/GW × 100 USD/kW / 1e12 = 0.025 trillion USD extra
    expected_extra = 250 * 1e6 * 100.0 / 1e12
    assert abs(
        with_power["turnkey_cost_trillion_usd"]
        - base["turnkey_cost_trillion_usd"]
        - expected_extra
    ) < 1e-9


def test_epc_overhead_scales_total_equipment_cost():
    """EPC-overhead skal skalere summen av energi- og effektkapex."""
    s = BatteryScenario(epc_overhead_fraction=0.15)
    r = calculate(s)

    energy = r["energy_cost_trillion_usd"]
    power = r["power_cost_trillion_usd"]
    expected = (energy + power) * 1.15
    assert abs(r["turnkey_cost_trillion_usd"] - expected) < 1e-9


def test_normalize_mix_sums_to_one():
    """Kjemimiksen skal normaliseres til 1 uavhengig av inngangsverdier."""
    # Intentionally unnormalized values (3, 1, 1) to exercise the normalization logic
    r = calculate(BatteryScenario(lfp_share=3.0, sodium_ion_share=1.0, other_long_duration_share=1.0))
    assert abs(r["lfp_share_normalized"] + r["sodium_ion_share_normalized"] + r["other_long_duration_share_normalized"] - 1.0) < 1e-9


def test_docs_defaults_contains_sources():
    data = json.loads(Path("docs/data/defaults.json").read_text(encoding="utf-8"))
    assert "sources" in data
    assert len(data["sources"]) > 0


def test_root_and_docs_defaults_share_core_fields():
    root = json.loads(Path("data/defaults.json").read_text(encoding="utf-8"))
    docs = json.loads(Path("docs/data/defaults.json").read_text(encoding="utf-8"))

    assert root["defaults"].keys() <= docs["defaults"].keys()
    assert root["norwegian_anchors"].keys() <= docs["norwegian_anchors"].keys()
    assert root["currency"] == docs["currency"]
