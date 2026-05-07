"""Enkle beregningsfunksjoner for Dunkelflaute batteri-lab.

Alle funksjoner er deterministiske og bruker kun eksplisitte inngangsverdier.
Dette er pedagogisk størrelsesorden, ikke kraftsystemoptimalisering.
"""

from __future__ import annotations

from dataclasses import dataclass, asdict


@dataclass(frozen=True)
class BatteryScenario:
    residual_gap_gw: float = 250.0
    event_days: float = 10.0
    usable_fraction: float = 0.80
    pack_cost_usd_per_kwh: float = 70.0
    turnkey_cost_usd_per_kwh: float = 117.0
    power_capex_usd_per_kw: float = 0.0
    epc_overhead_fraction: float = 0.0
    lfp_share: float = 0.75
    sodium_ion_share: float = 0.15
    other_long_duration_share: float = 0.10
    lfp_lithium_intensity_kg_per_kwh: float = 0.09
    global_lithium_production_tonnes_2025: float = 290000.0
    global_cell_capacity_twh_per_year: float = 3.0
    eu_bess_additions_gwh_per_year: float = 27.1


def normalize_mix(lfp: float, sodium: float, other: float) -> tuple[float, float, float]:
    total = lfp + sodium + other
    if total <= 0:
        raise ValueError("Kjemimiksen må ha positiv sum.")
    return lfp / total, sodium / total, other / total


def calculate(s: BatteryScenario) -> dict[str, float]:
    if s.usable_fraction <= 0 or s.usable_fraction > 1:
        raise ValueError("usable_fraction må være i intervallet (0, 1].")

    lfp, sodium, other = normalize_mix(
        s.lfp_share, s.sodium_ion_share, s.other_long_duration_share
    )

    delivered_twh = s.residual_gap_gw * 24 * s.event_days / 1000
    installed_twh = delivered_twh / s.usable_fraction
    pack_cost_trillion_usd = installed_twh * s.pack_cost_usd_per_kwh / 1000
    energy_cost_trillion_usd = installed_twh * s.turnkey_cost_usd_per_kwh / 1000
    power_cost_trillion_usd = s.residual_gap_gw * 1_000_000 * s.power_capex_usd_per_kw / 1_000_000_000_000
    equipment_cost = energy_cost_trillion_usd + power_cost_trillion_usd
    turnkey_cost_trillion_usd = equipment_cost * (1 + s.epc_overhead_fraction)

    lfp_twh = installed_twh * lfp
    sodium_twh = installed_twh * sodium
    other_twh = installed_twh * other

    lithium_tonnes = lfp_twh * 1_000_000_000 * s.lfp_lithium_intensity_kg_per_kwh / 1000
    lithium_years = lithium_tonnes / s.global_lithium_production_tonnes_2025
    global_cell_years = installed_twh / s.global_cell_capacity_twh_per_year
    eu_bess_years = installed_twh * 1000 / s.eu_bess_additions_gwh_per_year

    return {
        **asdict(s),
        "lfp_share_normalized": lfp,
        "sodium_ion_share_normalized": sodium,
        "other_long_duration_share_normalized": other,
        "delivered_energy_twh": delivered_twh,
        "installed_battery_twh": installed_twh,
        "pack_cost_trillion_usd": pack_cost_trillion_usd,
        "energy_cost_trillion_usd": energy_cost_trillion_usd,
        "power_cost_trillion_usd": power_cost_trillion_usd,
        "turnkey_cost_trillion_usd": turnkey_cost_trillion_usd,
        "lfp_twh": lfp_twh,
        "sodium_ion_twh": sodium_twh,
        "other_long_duration_twh": other_twh,
        "lithium_required_tonnes": lithium_tonnes,
        "lithium_required_million_tonnes": lithium_tonnes / 1_000_000,
        "years_of_2025_lithium_production": lithium_years,
        "years_of_global_cell_capacity": global_cell_years,
        "multiples_of_2025_eu_bess_additions": eu_bess_years,
    }
