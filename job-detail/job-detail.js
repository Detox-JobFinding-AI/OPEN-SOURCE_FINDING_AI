/* ============================================================
   job-detail.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- candidate's match data for this posting ---------- */
  const matchData = {
    overall: 87,
    segments: [
      { label: "Skills",         value: 82, color: "teal"   },
      { label: "Experience",     value: 94, color: "violet" },
      { label: "Education",     value: 90, color: "amber"  },
      { label: "Certifications", value: 60, color: "coral"  }
    ]
  };

  const requiredSkills = [
    { name: "Distributed systems design", matched: true },
    { name: "PostgreSQL at scale",        matched: true },
    { name: "Go or Java (production)",    matched: true },
    { name: "Kubernetes",                 matched: true },
    { name: "Event-driven architecture",  matched: false },
    { name: "gRPC / protobuf",            matched: true },
    { name: "Kafka or equivalent",        matched: false }
  ];

  /* ---------- render match ring ---------- */
  renderMatchRing(document.getElementById("matchRing"), matchData, { size: 110, stroke: 9 });

  /* ---------- render required-skill chips ---------- */
  const skillRow = document.getElementById("skillChipRow");
  skillRow.innerHTML = requiredSkills
    .map(s => `<span class="chip ${s.matched ? "matched" : "missing"}">${s.name}</span>`)
    .join("");

  /* ---------- tabs ---------- */
  const tabs = document.querySelectorAll(".jd-tab");
  const panels = document.querySelectorAll(".jd-panel");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const name = tab.dataset.tab;
      panels.forEach(p => { p.hidden = p.dataset.panel !== name; });
    });
  });

  /* ---------- why score expand ---------- */
  const whyBtn = document.getElementById("whyScoreBtn");
  const whyPanel = document.getElementById("whyScorePanel");
  whyBtn.addEventListener("click", () => {
    const open = whyPanel.hidden;
    whyPanel.hidden = !open;
    whyBtn.setAttribute("aria-expanded", String(open));
  });

  /* ---------- save job (both buttons stay in sync) ---------- */
  const saveTop = document.getElementById("saveJobTop");
  const saveBtn = document.getElementById("saveJobBtn");
  let saved = false;
  function toggleSave() {
    saved = !saved;
    saveTop.classList.toggle("active", saved);
    saveTop.textContent = saved ? "★" : "☆";
    saveBtn.textContent = saved ? "★ Saved" : "☆ Save for later";
    showToast(saved ? "Job saved to your list" : "Removed from saved jobs");
  }
  saveTop.addEventListener("click", toggleSave);
  saveBtn.addEventListener("click", toggleSave);

  /* ---------- apply modal ---------- */
  const overlay = document.getElementById("applyOverlay");
  const openApply = () => { overlay.hidden = false; };
  const closeApply = () => { overlay.hidden = true; };

  document.getElementById("applyBtn").addEventListener("click", openApply);
  document.getElementById("applyClose").addEventListener("click", closeApply);
  document.getElementById("applyCancel").addEventListener("click", closeApply);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeApply(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closeApply(); });

  document.getElementById("applySubmit").addEventListener("click", () => {
    closeApply();
    showToast("Application submitted to Arborlight Systems");
  });

  /* ---------- toast ---------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => { toast.hidden = true; }, 250);
    }, 2600);
  }
});
