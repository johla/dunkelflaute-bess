/*
 * Dunkelflaute batteri-lab — SPA logikk
 *
 * Modellen her er en JS-port av src/dunkelflaute.py.
 * Den må holdes i synk med Python-koden. Den autoritative kilden er
 * src/dunkelflaute.py — denne JS-versjonen er bare en presentasjons-lag.
 *
 *   delivered_twh  = residual_gap_gw * 24 * event_days / 1000
 *   installed_twh  = delivered_twh / usable_fraction
 *   turnkey_cost_t = installed_twh * turnkey_bess_cost_usd_per_kwh / 1000
 *   lithium_t      = installed_twh * lfp_share_norm * 1e9 * lfp_li_kg_per_kwh / 1000
 */

"use strict";

// ---------- Model ----------

function normalizeMix(lfp, sodium, other) {
  const total = lfp + sodium + other;
  if (total <= 0) {
    throw new Error("Kjemimiksen må ha positiv sum.");
  }
  return { lfp: lfp / total, sodium: sodium / total, other: other / total };
}

function calculateScenario(s) {
  if (s.usable_fraction <= 0 || s.usable_fraction > 1) {
    throw new Error("usable_fraction må være i intervallet (0, 1].");
  }
  const mix = normalizeMix(s.lfp_share, s.sodium_ion_share, s.other_long_duration_share);

  const deliveredTwh = (s.residual_gap_gw * 24 * s.event_days) / 1000;
  const installedTwh = deliveredTwh / s.usable_fraction;

  const packCostT = (installedTwh * s.stationary_pack_cost_usd_per_kwh) / 1000;
  const turnkeyCostT = (installedTwh * s.turnkey_bess_cost_usd_per_kwh) / 1000;

  const lfpTwh = installedTwh * mix.lfp;
  const sodiumTwh = installedTwh * mix.sodium;
  const otherTwh = installedTwh * mix.other;

  const lithiumTonnes =
    (lfpTwh * 1_000_000_000 * s.lfp_lithium_intensity_kg_per_kwh) / 1000;

  return {
    delivered_twh: deliveredTwh,
    installed_twh: installedTwh,
    pack_cost_trillion_usd: packCostT,
    turnkey_cost_trillion_usd: turnkeyCostT,
    lfp_twh: lfpTwh,
    sodium_ion_twh: sodiumTwh,
    other_long_duration_twh: otherTwh,
    lithium_required_tonnes: lithiumTonnes,
    lithium_required_million_tonnes: lithiumTonnes / 1_000_000,
    years_of_2025_lithium_production:
      lithiumTonnes / s.global_lithium_production_tonnes_2025,
    years_of_global_cell_capacity:
      installedTwh / s.global_battery_cell_manufacturing_capacity_twh_2024,
    multiples_of_2025_eu_bess_additions:
      (installedTwh * 1000) / s.eu_bess_additions_gwh_2025,
    mix
  };
}

// ---------- Formatting ----------

const NB = new Intl.NumberFormat("nb-NO");

function fmt(n, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000) return NB.format(Math.round(n));
  if (Math.abs(n) >= 100) return NB.format(Math.round(n));
  if (Math.abs(n) >= 10) return NB.format(Math.round(n * 10) / 10);
  return NB.format(Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits));
}

function fmtInt(n) {
  if (!Number.isFinite(n)) return "—";
  return NB.format(Math.round(n));
}

// ---------- State ----------

let DEFAULTS = null;
let SCENARIOS = null;
let ANCHORS = null;
let GLOSSARY = null;

const state = {
  residual_gap_gw: 250,
  event_days: 10,
  usable_fraction: 0.8,
  stationary_pack_cost_usd_per_kwh: 70,
  turnkey_bess_cost_usd_per_kwh: 117,
  lfp_share: 0.75,
  sodium_ion_share: 0.15,
  other_long_duration_share: 0.10,
  lfp_lithium_intensity_kg_per_kwh: 0.09,
  global_lithium_production_tonnes_2025: 290000,
  global_battery_cell_manufacturing_capacity_twh_2024: 3.0,
  eu_bess_additions_gwh_2025: 27.1
};

const MIX_KEYS = ["lfp_share", "sodium_ion_share", "other_long_duration_share"];
const HEATMAP_GAPS = [50, 100, 150, 200, 250, 300, 400, 500];
const HEATMAP_DAYS = [1, 3, 5, 7, 10, 14, 21];
const HEATMAP_AXIS_WIDTH = 64;
const HEATMAP_HEADER_HEIGHT = 36;
const HEATMAP_CELL_WIDTH = 96;
const HEATMAP_CELL_HEIGHT = 64;

function applyDefaults() {
  Object.assign(state, DEFAULTS.defaults);
  // ensure UI canonical names
  state.residual_gap_gw = DEFAULTS.defaults.residual_gap_gw;
  state.event_days = DEFAULTS.defaults.event_days;
  state.usable_fraction = DEFAULTS.defaults.usable_fraction;
  state.turnkey_bess_cost_usd_per_kwh = DEFAULTS.defaults.turnkey_bess_cost_usd_per_kwh;
  state.stationary_pack_cost_usd_per_kwh = DEFAULTS.defaults.stationary_pack_cost_usd_per_kwh;
  state.lfp_share = DEFAULTS.defaults.lfp_share;
  state.sodium_ion_share = DEFAULTS.defaults.sodium_ion_share;
  state.other_long_duration_share = DEFAULTS.defaults.other_long_duration_share;
}

// ---------- Rendering ----------

function $(id) { return document.getElementById(id); }

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function syncSlidersFromState() {
  $("i-gap").value = state.residual_gap_gw;
  $("i-days").value = state.event_days;
  $("i-usable").value = Math.round(state.usable_fraction * 100);
  $("i-cost").value = state.turnkey_bess_cost_usd_per_kwh;
  $("i-lfp").value = Math.round(state.lfp_share * 100);
  $("i-sodium").value = Math.round(state.sodium_ion_share * 100);
  $("i-other").value = Math.round(state.other_long_duration_share * 100);

  setText("v-gap", fmtInt(state.residual_gap_gw));
  setText("v-days", fmtInt(state.event_days));
  setText("v-usable", fmtInt(state.usable_fraction * 100));
  setText("v-cost", fmtInt(state.turnkey_bess_cost_usd_per_kwh));
  setText("v-lfp", fmtInt(state.lfp_share * 100));
  setText("v-sodium", fmtInt(state.sodium_ion_share * 100));
  setText("v-other", fmtInt(state.other_long_duration_share * 100));
}

function setMixShare(changedKey, percent) {
  const nextShare = Math.min(100, Math.max(0, Number(percent))) / 100;
  const otherKeys = MIX_KEYS.filter((key) => key !== changedKey);
  const remaining = 1 - nextShare;
  const otherTotal = otherKeys.reduce((sum, key) => sum + state[key], 0);

  state[changedKey] = nextShare;

  if (remaining <= 0) {
    otherKeys.forEach((key) => { state[key] = 0; });
  } else if (otherTotal <= 0) {
    otherKeys.forEach((key) => { state[key] = remaining / otherKeys.length; });
  } else {
    otherKeys.forEach((key) => { state[key] = remaining * (state[key] / otherTotal); });
  }
}

function renderHero(r) {
  setText("hero-gw", `${fmtInt(state.residual_gap_gw)} GW`);
  setText("hero-days", `${fmtInt(state.event_days)} døgn`);
  setText("hero-delivered", `${fmt(r.delivered_twh)} TWh`);
  setText("hero-usable", `${fmtInt(state.usable_fraction * 100)} %`);
  setText("hero-installed", `${fmt(r.installed_twh)} TWh`);
}

function renderResults(r) {
  setText("r-installed", `${fmt(r.installed_twh)} TWh`);
  setText(
    "r-installed-interp",
    `≈ ${fmt(r.installed_twh / ANCHORS.oslo_twh_per_year_2024)} Oslo-år`
  );
  setText("r-delivered", `${fmt(r.delivered_twh)} TWh`);
  setText("r-cost", `${fmt(r.turnkey_cost_trillion_usd)}`);
  setText("r-cell-years", `${fmt(r.years_of_global_cell_capacity)}`);
  setText("r-eu-mult", `${fmtInt(r.multiples_of_2025_eu_bess_additions)}×`);
  setText("r-lithium", `${fmt(r.lithium_required_million_tonnes)}`);
  renderAdvancedImpacts(r);
}

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function tablePosition(value, stops) {
  if (value <= stops[0]) return 0.5;
  const lastIndex = stops.length - 1;
  if (value >= stops[lastIndex]) return lastIndex + 0.5;

  for (let i = 0; i < lastIndex; i += 1) {
    if (value >= stops[i] && value <= stops[i + 1]) {
      const t = (value - stops[i]) / (stops[i + 1] - stops[i]);
      return i + 0.5 + t;
    }
  }
  return 0.5;
}

function renderGlideMap(r) {
  const marker = $("glide-marker");
  if (!marker) return;

  const gapPosition = tablePosition(state.residual_gap_gw, HEATMAP_GAPS);
  const dayPosition = tablePosition(state.event_days, HEATMAP_DAYS);
  marker.style.left = `${HEATMAP_AXIS_WIDTH + gapPosition * HEATMAP_CELL_WIDTH}px`;
  marker.style.top = `${HEATMAP_HEADER_HEIGHT + dayPosition * HEATMAP_CELL_HEIGHT}px`;
  marker.style.width = `${HEATMAP_CELL_WIDTH - 8}px`;
  marker.style.height = `${HEATMAP_CELL_HEIGHT - 8}px`;

  setText(
    "glide-summary",
    `${fmtInt(state.residual_gap_gw)} GW × ${fmtInt(state.event_days)} døgn → ${fmt(r.installed_twh)} TWh`
  );
  setText("glide-marker-value", `${fmt(r.installed_twh)} TWh`);
}

function renderAdvancedImpacts(r) {
  setText(
    "cost-impact",
    `${fmtInt(state.turnkey_bess_cost_usd_per_kwh)} USD/kWh gir ${fmt(r.turnkey_cost_trillion_usd)} billioner USD. Kost påvirker ikke levert eller installert TWh.`
  );
  setText(
    "mix-impact",
    `Miksen er ${fmtInt(r.mix.lfp * 100)} % LFP, ${fmtInt(r.mix.sodium * 100)} % natrium-ion og ${fmtInt(r.mix.other * 100)} % annet. Den påvirker litiumbehovet, ikke total batteristørrelse.`
  );
  setText("mix-lfp-output", `${fmt(r.lfp_twh)} TWh`);
  setText("mix-sodium-output", `${fmt(r.sodium_ion_twh)} TWh`);
  setText("mix-other-output", `${fmt(r.other_long_duration_twh)} TWh`);
}

function renderAnchors(r) {
  const installed = r.installed_twh;
  setText("anchor-installed", `${fmt(installed)} TWh`);

  const items = [
    {
      num: fmt(installed / ANCHORS.oslo_twh_per_year_2024),
      name: "Oslo-år (årsforbruk i Oslo kommune, 2024)"
    },
    {
      num: fmt(installed / ANCHORS.bergen_twh_per_year_2024),
      name: "Bergen-år (årsforbruk i Bergen kommune, 2024)"
    },
    {
      num: fmt(installed / ANCHORS.norway_hydro_reservoir_capacity_twh),
      name: "norske vannmagasin (samlet kapasitet, ~87 TWh)"
    },
    {
      num: fmt(installed / ANCHORS.statkraft_norway_twh_per_year_2025),
      name: "Statkrafts årsproduksjon i Norge (2025)"
    },
    {
      num: fmt(installed / ANCHORS.norway_consumption_including_losses_twh_2025),
      name: "Norges årlige strømforbruk inkl. tap (2025)"
    },
    {
      num: fmt(installed / ANCHORS.norway_production_twh_2025),
      name: "Norges årlige strømproduksjon (2025)"
    }
  ];

  const ul = $("anchor-list");
  ul.innerHTML = items
    .map(
      (it) => `
      <li>
        <div class="anchor-num">× ${it.num}</div>
        <div class="anchor-name">${it.name}</div>
      </li>`
    )
    .join("");
}

function renderHeatmap() {
  const gaps = HEATMAP_GAPS;
  const days = HEATMAP_DAYS;

  const cells = [];
  for (const d of days) {
    for (const g of gaps) {
      const installed = (g * 24 * d) / 1000 / state.usable_fraction;
      cells.push({ g, d, installed });
    }
  }
  const maxV = Math.max(...cells.map((c) => c.installed));

  // Build grid: 1 + gaps.length columns, 1 + days.length rows
  const grid = $("heatmap");
  grid.style.gridTemplateColumns = `${HEATMAP_AXIS_WIDTH}px repeat(${gaps.length}, ${HEATMAP_CELL_WIDTH}px)`;
  grid.style.gridTemplateRows = `${HEATMAP_HEADER_HEIGHT}px repeat(${days.length}, ${HEATMAP_CELL_HEIGHT}px)`;

  const html = [];
  // Header row
  html.push(`<div class="cell axis"></div>`);
  for (const g of gaps) html.push(`<div class="cell axis">${g} GW</div>`);

  for (const d of days) {
    html.push(`<div class="cell axis">${d} d</div>`);
    for (const g of gaps) {
      const installed = (g * 24 * d) / 1000 / state.usable_fraction;
      const t = Math.min(1, installed / maxV);
      // mix paper -> energy-blue
      const bg = blendColor("#FFFDF7", "#1F6F8B", t);
      const fg = t > 0.55 ? "#FFFDF7" : "#1D2528";
      html.push(
        `<div class="cell" style="background:${bg};color:${fg}" title="${g} GW × ${d} døgn">${fmt(installed)}</div>`
      );
    }
  }
  grid.innerHTML = html.join("");
}

function blendColor(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}

function renderScenarioButtons() {
  const wrap = $("scenario-buttons");
  wrap.innerHTML = SCENARIOS.scenarios
    .map(
      (s) => `
      <button type="button" class="btn btn-secondary" data-scenario="${s.id}" title="${escapeHtml(s.explanation || "")}">
        ${escapeHtml(s.name)}
      </button>`
    )
    .join("");
  wrap.querySelectorAll("button[data-scenario]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sc = SCENARIOS.scenarios.find((x) => x.id === btn.dataset.scenario);
      if (!sc) return;
      state.residual_gap_gw = sc.residual_gap_gw;
      state.event_days = sc.event_days;
      syncSlidersFromState();
      recalc();
      markActiveScenario(sc.id);
    });
  });
}

function markActiveScenario(id) {
  document.querySelectorAll("#scenario-buttons button[data-scenario]").forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.scenario === id ? "true" : "false");
  });
}

function renderAttacks() {
  const wrap = $("attack-buttons");
  wrap.innerHTML = SCENARIOS.attacks
    .map(
      (a) => `
      <button type="button" class="btn btn-secondary" data-attack="${a.id}">
        ${escapeHtml(a.label)}
      </button>`
    )
    .join("");

  // Always render results for all attacks at once (shows sensitivity at a glance)
  renderAttackResults();

  wrap.querySelectorAll("button[data-attack]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("aria-pressed") === "true" ? "false" : "true"
      );
      // visual selection only — results already shown
      const card = document.querySelector(
        `#attack-results [data-attack-card="${btn.dataset.attack}"]`
      );
      if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

function renderAttackResults() {
  // Baseline = repo standard scenario, NOT user sliders
  const baselineState = { ...state, ...DEFAULTS.defaults };
  const baseline = calculateScenario(baselineState);

  const cards = SCENARIOS.attacks.map((a) => {
    const patched = applyPatch(baselineState, a.patch);
    const result = calculateScenario(patched);
    const delta =
      (result.installed_twh - baseline.installed_twh) / baseline.installed_twh;
    let cls = "flat";
    if (delta > 0.02) cls = "up";
    else if (delta < -0.02) cls = "down";
    const sign = delta > 0 ? "+" : "";
    return `
      <div class="attack-card" data-attack-card="${a.id}">
        <div class="label">${escapeHtml(a.label)}</div>
        <div class="delta ${cls}">${sign}${fmt(delta * 100)} %</div>
        <div class="interp">
          ${fmt(baseline.installed_twh)} → <strong>${fmt(result.installed_twh)} TWh</strong> installert
        </div>
        <p class="interp">${escapeHtml(a.description)}</p>
      </div>`;
  });
  $("attack-results").innerHTML = cards.join("");
}

function applyPatch(base, patch) {
  const next = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (k.endsWith("_factor")) {
      const realKey = k.replace(/_factor$/, "");
      next[realKey] = base[realKey] * v;
    } else if (k.endsWith("_value")) {
      const realKey = k.replace(/_value$/, "");
      next[realKey] = v;
    } else {
      next[k] = v;
    }
  }
  return next;
}

function renderGlossary() {
  if (!GLOSSARY) return;
  $("glossary").innerHTML = GLOSSARY.terms
    .map(
      (t) => `
      <dt>${escapeHtml(t.term)}</dt>
      <dd>${escapeHtml(t.definition)}</dd>`
    )
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Recalc & wire-up ----------

function recalc() {
  let r;
  try {
    r = calculateScenario(state);
  } catch (e) {
    console.error(e);
    return;
  }
  renderHero(r);
  renderResults(r);
  renderAnchors(r);
  renderGlideMap(r);
  renderHeatmap();
}

function wireSliders() {
  const map = [
    ["i-gap", "v-gap", (v) => { state.residual_gap_gw = +v; }, (v) => fmtInt(+v)],
    ["i-days", "v-days", (v) => { state.event_days = +v; }, (v) => fmtInt(+v)],
    ["i-usable", "v-usable", (v) => { state.usable_fraction = +v / 100; }, (v) => fmtInt(+v)],
    ["i-cost", "v-cost", (v) => { state.turnkey_bess_cost_usd_per_kwh = +v; }, (v) => fmtInt(+v)]
  ];
  for (const [inputId, valueId, setter, formatter] of map) {
    const inp = $(inputId);
    inp.addEventListener("input", () => {
      setter(inp.value);
      setText(valueId, formatter(inp.value));
      // No scenario active anymore
      markActiveScenario(null);
      recalc();
    });
  }

  const mixMap = [
    ["i-lfp", "lfp_share"],
    ["i-sodium", "sodium_ion_share"],
    ["i-other", "other_long_duration_share"]
  ];
  for (const [inputId, key] of mixMap) {
    const inp = $(inputId);
    inp.addEventListener("input", () => {
      setMixShare(key, inp.value);
      syncSlidersFromState();
      markActiveScenario(null);
      recalc();
    });
  }

  $("btn-reset").addEventListener("click", () => {
    applyDefaults();
    syncSlidersFromState();
    markActiveScenario("base");
    recalc();
  });
}

// ---------- Bootstrap ----------

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Kunne ikke laste ${path}: ${res.status}`);
  return res.json();
}

async function init() {
  try {
    const [defaults, scenarios, glossary] = await Promise.all([
      loadJson("data/defaults.json"),
      loadJson("data/scenarios.json"),
      loadJson("data/glossary.json").catch(() => null)
    ]);
    DEFAULTS = defaults;
    SCENARIOS = scenarios;
    ANCHORS = defaults.norwegian_anchors;
    GLOSSARY = glossary;
  } catch (e) {
    console.error("Klarte ikke å laste data, faller tilbake til hardkodede standardverdier.", e);
    DEFAULTS = {
      defaults: { ...state },
      norwegian_anchors: {
        household_kwh_per_year_2024: 14700,
        bergen_twh_per_year_2024: 3.4898,
        oslo_twh_per_year_2024: 8.7589,
        statkraft_norway_twh_per_year_2025: 51.2,
        norway_consumption_including_losses_twh_2025: 139.2,
        norway_production_twh_2025: 162.0,
        norway_hydro_reservoir_capacity_twh: 87.0
      }
    };
    ANCHORS = DEFAULTS.norwegian_anchors;
    SCENARIOS = { scenarios: [], attacks: [] };
  }

  applyDefaults();
  syncSlidersFromState();
  wireSliders();
  renderScenarioButtons();
  renderAttacks();
  renderGlossary();
  markActiveScenario("base");
  recalc();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
