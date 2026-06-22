/* ============================================================
   job-wizard.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const WEIGHT_META = [
    { key: "skills",         label: "Skills",         color: "#0E7C7B" },
    { key: "experience",     label: "Experience",     color: "#6E5BC4" },
    { key: "education",      label: "Education",      color: "#DB9A35" },
    { key: "certifications", label: "Certifications",  color: "#DD5C4E" },
    { key: "projects",       label: "Projects",       color: "#12161F" }
  ];

  const state = {
    skills: [],
    certs: [],
    responsibilities: [],
    niceToHave: [],
    weights: { skills: 35, experience: 30, education: 15, certifications: 10, projects: 10 }
  };

  let currentStep = 1;
  let visitedStep4 = false;
  const TOTAL_STEPS = 5;

  /* ============ STEP NAVIGATION ============ */
  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll(".wiz-step-dot").forEach(dot => {
      const n = Number(dot.dataset.step);
      dot.classList.toggle("active", n === step);
      dot.classList.toggle("done", n < step);
    });
    document.querySelectorAll(".wiz-panel").forEach(p => {
      p.hidden = Number(p.dataset.panel) !== step;
    });
    document.getElementById("wizBack").hidden = step === 1;
    document.getElementById("wizNext").hidden = step === TOTAL_STEPS;
    document.getElementById("wizPublish").hidden = step !== TOTAL_STEPS;

    if (step === 4 && !visitedStep4) {
      visitedStep4 = true;
      document.getElementById("prevWeightSection").hidden = false;
      renderWeightDonut();
    }
    if (step === 5) renderReview();
  }

  function validateStep(step) {
    if (step === 1) {
      const title = document.getElementById("f-title");
      if (!title.value.trim()) { flagError(title); return false; }
    }
    if (step === 2) {
      if (state.skills.length === 0) {
        flagError(document.getElementById("skillChipInput"));
        document.getElementById("f-skillEntry").focus();
        return false;
      }
    }
    return true;
  }
  function flagError(el) {
    el.classList.add("field-error");
    el.focus();
    setTimeout(() => el.classList.remove("field-error"), 1400);
  }

  document.getElementById("wizNext").addEventListener("click", () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
  });
  document.getElementById("wizBack").addEventListener("click", () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  });
  document.getElementById("stepper").addEventListener("click", e => {
    const dot = e.target.closest(".wiz-step-dot");
    if (dot) {
      const targetStep = Number(dot.dataset.step);
      if (targetStep > currentStep) {
        for (let s = 1; s < targetStep; s++) {
          if (!validateStep(s)) {
            goToStep(s);
            return;
          }
        }
      }
      goToStep(targetStep);
    }
  });

  /* ============ LIVE PREVIEW (basics) ============ */
  function updatePreview() {
    const title = document.getElementById("f-title").value.trim();
    const dept = document.getElementById("f-department").value;
    const loc = document.getElementById("f-location").value.trim();
    const type = document.getElementById("f-type").value;

    document.getElementById("prevTitle").textContent = title || "Untitled role";
    const metaParts = [dept, loc, type].filter(Boolean);
    document.getElementById("prevMeta").textContent =
      metaParts.length ? metaParts.join(" · ") : "Add details to see them appear here";

    const skillsEl = document.getElementById("prevSkills");
    skillsEl.innerHTML = state.skills.length
      ? state.skills.map(s => `<span class="chip matched">${s}</span>`).join("")
      : `<span class="prev-empty">None added yet</span>`;

    const respEl = document.getElementById("prevResp");
    respEl.innerHTML = state.responsibilities.length
      ? state.responsibilities.map(r => `<li>${r}</li>`).join("")
      : `<li class="prev-empty">None added yet</li>`;
  }

  ["f-title", "f-department", "f-location", "f-type", "f-explevel", "f-salmin", "f-salmax"]
    .forEach(id => document.getElementById(id).addEventListener("input", updatePreview));

  /* ============ CHIP INPUTS (skills / certs) ============ */
  function wireChipInput(entryId, tagsId, arr) {
    const entry = document.getElementById(entryId);
    const tagsEl = document.getElementById(tagsId);

    function render() {
      tagsEl.innerHTML = arr.map((val, i) =>
        `<span class="tag-chip">${val}<button type="button" data-i="${i}" aria-label="Remove ${val}">✕</button></span>`
      ).join("");
      updatePreview();
    }
    tagsEl.addEventListener("click", e => {
      const btn = e.target.closest("button[data-i]");
      if (!btn) return;
      arr.splice(Number(btn.dataset.i), 1);
      render();
    });
    entry.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const val = entry.value.trim().replace(/,$/, "");
        if (val && !arr.includes(val)) arr.push(val);
        entry.value = "";
        render();
      }
    });
    return render;
  }
  wireChipInput("f-skillEntry", "skillTags", state.skills);
  wireChipInput("f-certEntry", "certTags", state.certs);

  /* ============ DYNAMIC LISTS (responsibilities / nice-to-have) ============ */
  function setupDynList(listId, addBtnId, arr, placeholder) {
    const list = document.getElementById(listId);

    function sync() {
      arr.length = 0;
      list.querySelectorAll("input").forEach(inp => {
        if (inp.value.trim()) arr.push(inp.value.trim());
      });
      updatePreview();
    }
    function addRow(focus) {
      const row = document.createElement("div");
      row.className = "dyn-row";
      row.innerHTML = `<input type="text" placeholder="${placeholder}">
                        <button type="button" class="dyn-remove" aria-label="Remove">✕</button>`;
      list.appendChild(row);
      if (focus) row.querySelector("input").focus();
    }
    function reset() {
      list.innerHTML = "";
      arr.length = 0;
      addRow(false);
    }

    list.addEventListener("input", sync);
    list.addEventListener("click", e => {
      const btn = e.target.closest(".dyn-remove");
      if (!btn) return;
      btn.closest(".dyn-row").remove();
      sync();
    });
    document.getElementById(addBtnId).addEventListener("click", () => addRow(true));

    addRow(false); // seed with one empty row
    return { reset };
  }
  const respCtl = setupDynList("respList", "respAdd", state.responsibilities, "e.g. Own the order-fulfillment service end to end");
  const niceCtl = setupDynList("niceList", "niceAdd", state.niceToHave, "e.g. Experience with Kafka at production scale");

  /* ============ WEIGHTING SLIDERS ============ */
  function renderWeightRows() {
    const container = document.getElementById("weightRows");
    container.innerHTML = WEIGHT_META.map(m => `
      <div class="weight-row" data-key="${m.key}">
        <div class="weight-row-label"><span class="weight-dot" style="background:${m.color}"></span>${m.label}</div>
        <input type="range" min="0" max="100" value="${state.weights[m.key]}" data-key="${m.key}">
        <div class="weight-row-value mono" data-out="${m.key}">${state.weights[m.key]}%</div>
      </div>
    `).join("");
  }
  renderWeightRows();

  function rebalance(changedKey, newVal) {
    const prev = { ...state.weights };
    newVal = Math.max(0, Math.min(100, newVal));
    state.weights[changedKey] = newVal;
    const remainder = 100 - newVal;
    const otherKeys = WEIGHT_META.map(m => m.key).filter(k => k !== changedKey);
    const sumOthersOld = otherKeys.reduce((s, k) => s + prev[k], 0);

    otherKeys.forEach(k => {
      state.weights[k] = sumOthersOld > 0
        ? Math.round(remainder * (prev[k] / sumOthersOld))
        : Math.round(remainder / otherKeys.length);
    });

    // fix rounding drift so total is exactly 100
    let total = WEIGHT_META.reduce((s, m) => s + state.weights[m.key], 0);
    let diff = 100 - total;
    if (diff !== 0) {
      const biggestOther = otherKeys.reduce((a, b) => state.weights[a] > state.weights[b] ? a : b, otherKeys[0]);
      state.weights[biggestOther] = Math.max(0, state.weights[biggestOther] + diff);
    }

    syncWeightUI();
  }

  function syncWeightUI() {
    WEIGHT_META.forEach(m => {
      const row = document.querySelector(`.weight-row[data-key="${m.key}"]`);
      if (!row) return;
      row.querySelector('input[type="range"]').value = state.weights[m.key];
      row.querySelector(".weight-row-value").textContent = state.weights[m.key] + "%";
    });
    const total = WEIGHT_META.reduce((s, m) => s + state.weights[m.key], 0);
    document.getElementById("weightTotal").textContent = total + "%";
    renderWeightDonut();
  }

  document.getElementById("weightRows").addEventListener("input", e => {
    const input = e.target.closest('input[type="range"]');
    if (!input) return;
    rebalance(input.dataset.key, Number(input.value));
  });

  /* ---- weight donut (self-contained, no shared module needed) ---- */
  function wPolar(cx, cy, r, angleDeg) {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }
  function wArc(cx, cy, r, start, end) {
    const s = wPolar(cx, cy, r, end);
    const e = wPolar(cx, cy, r, start);
    const largeArc = end - start <= 180 ? "0" : "1";
    return ["M", s.x, s.y, "A", r, r, 0, largeArc, 1, e.x, e.y].join(" ");
  }
  function renderWeightDonut() {
    const target = document.getElementById("weightRing");
    if (!target) return;
    const size = 96, stroke = 13, cx = size / 2, cy = size / 2, r = size / 2 - stroke;
    let angle = 0;
    const gap = 3;
    let arcs = "";
    WEIGHT_META.forEach(m => {
      const span = (state.weights[m.key] / 100) * 360;
      const start = angle + gap / 2;
      const end = angle + span - gap / 2;
      if (end > start) arcs += `<path d="${wArc(cx, cy, r, start, end)}" stroke="${m.color}" stroke-width="${stroke}" fill="none" stroke-linecap="round"/>`;
      angle += span;
    });
    target.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${arcs}</svg>`;

    document.getElementById("weightLegend").innerHTML = WEIGHT_META.map(m => `
      <div class="wleg-row">
        <span class="wleg-dot" style="background:${m.color}"></span>
        <span class="wleg-label">${m.label}</span>
        <span class="wleg-value">${state.weights[m.key]}%</span>
      </div>
    `).join("");
  }

  /* ============ REVIEW STEP ============ */
  function renderReview() {
    const title = document.getElementById("f-title").value.trim() || "Untitled role";
    const dept = document.getElementById("f-department").value;
    const loc = document.getElementById("f-location").value.trim() || "—";
    const type = document.getElementById("f-type").value;
    const expLevel = document.getElementById("f-explevel").value;
    const salMin = document.getElementById("f-salmin").value;
    const salMax = document.getElementById("f-salmax").value;
    const education = document.getElementById("f-education").value;
    const minYears = document.getElementById("f-minyears").value;

    const salaryText = (salMin || salMax) ? `₹${salMin || "—"}L – ₹${salMax || "—"}L /yr` : "Not specified";

    document.getElementById("reviewBlock").innerHTML = `
      <div class="review-row">
        <span class="eyebrow">Role</span>
        <div class="review-row-content"><strong>${title}</strong> · ${dept} · ${type} · ${loc}</div>
        <div class="review-row-content">${expLevel} · ${salaryText}</div>
      </div>

      <div class="review-row">
        <span class="eyebrow">Required skills</span>
        <div class="chip-row">
          ${state.skills.length ? state.skills.map(s => `<span class="chip matched">${s}</span>`).join("") : `<span class="review-row-content muted">No skills added</span>`}
        </div>
      </div>

      <div class="review-row">
        <span class="eyebrow">Preferred certifications</span>
        <div class="chip-row">
          ${state.certs.length ? state.certs.map(s => `<span class="chip mono">${s}</span>`).join("") : `<span class="review-row-content muted">None specified</span>`}
        </div>
      </div>

      <div class="review-row">
        <span class="eyebrow">Education & experience floor</span>
        <div class="review-row-content">${education} · ${minYears ? minYears + "+ years minimum" : "No minimum specified"}</div>
      </div>

      <div class="review-row">
        <span class="eyebrow">Responsibilities</span>
        ${state.responsibilities.length
          ? `<ul class="review-list">${state.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>`
          : `<div class="review-row-content muted">None added</div>`}
      </div>

      <div class="review-row">
        <span class="eyebrow">Nice to have</span>
        ${state.niceToHave.length
          ? `<ul class="review-list">${state.niceToHave.map(r => `<li>${r}</li>`).join("")}</ul>`
          : `<div class="review-row-content muted">None added</div>`}
      </div>

      <div class="review-row">
        <span class="eyebrow">Matching weights</span>
        <ul class="review-list">
          ${WEIGHT_META.map(m => `<li>${m.label} — ${state.weights[m.key]}%</li>`).join("")}
        </ul>
      </div>
    `;
  }

  /* ============ PUBLISH / RESET ============ */
  document.getElementById("wizPublish").addEventListener("click", () => {
    if (!validateStep(1)) { goToStep(1); return; }
    if (!validateStep(2)) { goToStep(2); return; }
    document.getElementById("successOverlay").hidden = false;
  });

  document.getElementById("postAnother").addEventListener("click", () => {
    document.getElementById("successOverlay").hidden = true;
    document.getElementById("wizardForm").reset();
    state.skills.length = 0; state.certs.length = 0;
    state.weights = { skills: 35, experience: 30, education: 15, certifications: 10, projects: 10 };
    document.getElementById("skillTags").innerHTML = "";
    document.getElementById("certTags").innerHTML = "";
    respCtl.reset();
    niceCtl.reset();
    renderWeightRows();
    visitedStep4 = false;
    document.getElementById("prevWeightSection").hidden = true;
    updatePreview();
    goToStep(1);
  });

  /* ============ INIT ============ */
  updatePreview();
  goToStep(1);
});
