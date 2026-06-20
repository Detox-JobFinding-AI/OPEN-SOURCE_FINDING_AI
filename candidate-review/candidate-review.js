/* ============================================================
   candidate-review.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- skills required for this job ---------- */
  const REQUIRED_SKILLS = [
    "Distributed systems design", "PostgreSQL at scale", "Go or Java (production)",
    "Kubernetes", "Event-driven architecture", "gRPC / protobuf", "Kafka or equivalent"
  ];

  const SEGMENT_META = [
    { key: "skills",         label: "Skills",         color: "teal"   },
    { key: "experience",     label: "Experience",     color: "violet" },
    { key: "education",      label: "Education",      color: "amber"  },
    { key: "certifications", label: "Certifications",  color: "coral"  }
  ];

  /* ---------- candidate dataset ---------- */
  const CANDIDATES = [
    {
      id: "c1", name: "Priya Kulkarni", initials: "PK",
      archetype: "Backend Generalist — Cloud-Native",
      appliedDaysAgo: 1, experience: 6, status: "new",
      scores: { skills: 91, experience: 88, education: 80, certifications: 55 },
      matched: ["Distributed systems design", "PostgreSQL at scale", "Go or Java (production)", "Kubernetes", "gRPC / protobuf"],
      summary: "Six years building order-management backends, most recently leading a monolith-to-services migration. Resume emphasizes ownership and on-call depth more than the archetype baseline.",
      history: [
        { title: "Senior Backend Engineer", org: "Veranta Health", when: "2022 — Present", desc: "Owns the claims-processing service, ~12M requests/day." },
        { title: "Backend Engineer", org: "Northstar Cloud", when: "2019 — 2022", desc: "Built internal billing API and migrated it from a monolith." }
      ],
      education: [
        { title: "B.Tech, Computer Science", org: "COEP Pune", when: "2015 — 2019" },
        { title: "AWS Solutions Architect — Associate", org: "Certification", when: "2023" }
      ],
      delta: [
        { title: "Led a zero-downtime monolith migration", desc: "Most peers in this archetype describe migrations they joined, not led." },
        { title: "Direct on-call ownership at 12M req/day scale", desc: "Above the archetype's typical 1–5M req/day baseline." }
      ]
    },
    {
      id: "c2", name: "Arjun Mehta", initials: "AM",
      archetype: "Platform & Infra Specialist",
      appliedDaysAgo: 2, experience: 7, status: "shortlisted",
      scores: { skills: 85, experience: 90, education: 70, certifications: 88 },
      matched: ["Distributed systems design", "Kubernetes", "Event-driven architecture", "Kafka or equivalent", "gRPC / protobuf"],
      summary: "Infra-leaning profile with strong Kafka and Kubernetes depth from a logistics background. Lighter on raw feature delivery than typical candidates for this req.",
      history: [
        { title: "Platform Engineer", org: "Ferroclad", when: "2021 — Present", desc: "Operates the event-streaming backbone for the fulfillment network." },
        { title: "Site Reliability Engineer", org: "Northwind Analytics", when: "2017 — 2021", desc: "Built capacity-planning tooling and on-call runbooks." }
      ],
      education: [
        { title: "B.E., Information Technology", org: "VJTI Mumbai", when: "2013 — 2017" },
        { title: "CKA — Certified Kubernetes Administrator", org: "Certification", when: "2022" }
      ],
      delta: [
        { title: "Hands-on Kafka migration at scale", desc: "Rare in this archetype — most list Kafka as familiarity, not ownership." },
        { title: "Came from a regulated logistics environment", desc: "Brings audit and compliance habits not common in this pool." }
      ]
    },
    {
      id: "c3", name: "Sneha Iyer", initials: "SI",
      archetype: "Backend Generalist — Cloud-Native",
      appliedDaysAgo: 3, experience: 5, status: "interview",
      scores: { skills: 78, experience: 75, education: 95, certifications: 40 },
      matched: ["Distributed systems design", "PostgreSQL at scale", "Go or Java (production)"],
      summary: "Strong academic background with five years of steady backend delivery. Event-driven and Kubernetes exposure is project-based rather than production-scale.",
      history: [
        { title: "Backend Engineer", org: "Lumora Retail", when: "2020 — Present", desc: "Owns the catalog service and its search indexing pipeline." }
      ],
      education: [
        { title: "M.Tech, Computer Science", org: "IIT Bombay", when: "2018 — 2020" },
        { title: "B.Tech, Computer Science", org: "NIT Trichy", when: "2014 — 2018" }
      ],
      delta: [
        { title: "Graduate research in distributed indexing", desc: "Most peers in this archetype hold a single bachelor's degree." }
      ]
    },
    {
      id: "c4", name: "Rohan Deshpande", initials: "RD",
      archetype: "Full-stack, backend-leaning",
      appliedDaysAgo: 4, experience: 4, status: "new",
      scores: { skills: 64, experience: 60, education: 72, certifications: 30 },
      matched: ["Go or Java (production)", "PostgreSQL at scale"],
      summary: "Four years split across frontend and backend work. Backend depth is real but narrower than the role's distributed-systems expectations.",
      history: [
        { title: "Software Engineer", org: "Quillpad", when: "2021 — Present", desc: "Built and maintains the internal admin tools API." }
      ],
      education: [
        { title: "B.Sc., Computer Applications", org: "Fergusson College", when: "2017 — 2020" }
      ],
      delta: [
        { title: "Cross-functional shipping speed", desc: "Faster end-to-end delivery than most pure-backend peers, at the cost of systems depth." }
      ]
    },
    {
      id: "c5", name: "Fatima Sheikh", initials: "FS",
      archetype: "Platform & Infra Specialist",
      appliedDaysAgo: 5, experience: 8, status: "new",
      scores: { skills: 88, experience: 93, education: 85, certifications: 92 },
      matched: ["Distributed systems design", "PostgreSQL at scale", "Go or Java (production)", "Kubernetes", "Event-driven architecture", "Kafka or equivalent", "gRPC / protobuf"],
      summary: "Matches every required skill directly. Eight years owning platform-level infrastructure at companies operating at meaningfully larger scale than this role.",
      history: [
        { title: "Staff Platform Engineer", org: "Northstar Cloud", when: "2019 — Present", desc: "Leads the event-streaming and service-mesh platform for 40+ teams." },
        { title: "Backend Engineer", org: "Arborlight Systems", when: "2016 — 2019", desc: "Early member of the fulfillment platform team." }
      ],
      education: [
        { title: "B.Tech, Computer Science", org: "BITS Pilani", when: "2012 — 2016" },
        { title: "CKA — Certified Kubernetes Administrator", org: "Certification", when: "2021" },
        { title: "AWS Solutions Architect — Professional", org: "Certification", when: "2023" }
      ],
      delta: [
        { title: "Previously worked at Arborlight Systems", desc: "Already familiar with this team's legacy systems and migration history." },
        { title: "Operates at 10x the scale of the typical archetype peer", desc: "Background skews toward platforms serving 40+ internal teams." }
      ]
    },
    {
      id: "c6", name: "Karan Verma", initials: "KV",
      archetype: "Backend Generalist — Cloud-Native",
      appliedDaysAgo: 6, experience: 3, status: "rejected",
      scores: { skills: 45, experience: 38, education: 60, certifications: 20 },
      matched: ["Go or Java (production)"],
      summary: "Three years of experience, mostly on smaller internal tools. Below the experience bar for a senior-level posting.",
      history: [
        { title: "Junior Backend Developer", org: "Quillpad", when: "2022 — Present", desc: "Builds internal reporting endpoints." }
      ],
      education: [
        { title: "B.Sc., Information Technology", org: "Pune University", when: "2019 — 2022" }
      ],
      delta: [
        { title: "Early-career, high growth trajectory", desc: "Promoted twice in under two years — fast ramp relative to tenure." }
      ]
    },
    {
      id: "c7", name: "Ananya Rao", initials: "AR",
      archetype: "Full-stack, backend-leaning",
      appliedDaysAgo: 7, experience: 6, status: "shortlisted",
      scores: { skills: 72, experience: 80, education: 78, certifications: 50 },
      matched: ["Distributed systems design", "Go or Java (production)", "Kubernetes", "gRPC / protobuf"],
      summary: "Six years building backend services for a healthtech product, with growing infra responsibility over the last two years.",
      history: [
        { title: "Backend Engineer II", org: "Veranta Health", when: "2020 — Present", desc: "Owns the scheduling service and its migration to Kubernetes." }
      ],
      education: [
        { title: "B.E., Computer Engineering", org: "Pune Institute of Computer Technology", when: "2015 — 2019" }
      ],
      delta: [
        { title: "Healthtech compliance exposure", desc: "Brings HIPAA-adjacent data-handling habits uncommon in this pool." }
      ]
    },
    {
      id: "c8", name: "Vikram Nair", initials: "VN",
      archetype: "Platform & Infra Specialist",
      appliedDaysAgo: 9, experience: 9, status: "hired",
      scores: { skills: 95, experience: 96, education: 82, certifications: 90 },
      matched: ["Distributed systems design", "PostgreSQL at scale", "Go or Java (production)", "Kubernetes", "Event-driven architecture", "Kafka or equivalent", "gRPC / protobuf"],
      summary: "Nine years, the deepest Kafka and service-mesh background in the pool. Hired after panel interviews confirmed strong system-design depth.",
      history: [
        { title: "Principal Engineer", org: "Ferroclad", when: "2018 — Present", desc: "Designed the company's event-streaming backbone from scratch." }
      ],
      education: [
        { title: "M.Tech, Computer Science", org: "IIT Delhi", when: "2014 — 2016" }
      ],
      delta: [
        { title: "Designed a streaming platform from zero to production", desc: "Most peers operated an existing platform rather than building one." }
      ]
    }
  ];

  /* ---------- helpers ---------- */
  function overallScore(c) {
    const w = { skills: 0.40, experience: 0.35, education: 0.15, certifications: 0.10 };
    return Math.round(
      c.scores.skills * w.skills + c.scores.experience * w.experience +
      c.scores.education * w.education + c.scores.certifications * w.certifications
    );
  }
  function toSegments(c) {
    return SEGMENT_META.map(m => ({ label: m.label, value: c.scores[m.key], color: m.color }));
  }
  function statusLabel(s) {
    return { new: "New", shortlisted: "Shortlisted", interview: "Interviewing", hired: "Hired", rejected: "Rejected" }[s];
  }

  let activePipeline = "all";
  let minScore = 0;
  let searchTerm = "";
  let sortMode = "score";
  let activeCandidateId = null;

  /* ---------- pipeline counts ---------- */
  function refreshPipelineCounts() {
    const counts = { all: CANDIDATES.length, new: 0, shortlisted: 0, interview: 0, hired: 0, rejected: 0 };
    CANDIDATES.forEach(c => counts[c.status]++);
    document.querySelectorAll(".pipe-chip").forEach(chip => {
      const key = chip.dataset.status;
      chip.querySelector(".pipe-count").textContent = counts[key];
    });
  }

  /* ---------- list rendering ---------- */
  function getFilteredCandidates() {
    const checkedArchetypes = Array.from(document.querySelectorAll("#archetypeFilters input:checked")).map(i => i.value);
    let list = CANDIDATES.filter(c => {
      if (activePipeline !== "all" && c.status !== activePipeline) return false;
      if (overallScore(c) < minScore) return false;
      if (!checkedArchetypes.includes(c.archetype)) return false;
      if (searchTerm) {
        const hay = (c.name + " " + c.matched.join(" ")).toLowerCase();
        if (!hay.includes(searchTerm.toLowerCase())) return false;
      }
      return true;
    });
    if (sortMode === "score") list.sort((a, b) => overallScore(b) - overallScore(a));
    if (sortMode === "recent") list.sort((a, b) => a.appliedDaysAgo - b.appliedDaysAgo);
    if (sortMode === "experience") list.sort((a, b) => b.experience - a.experience);
    return list;
  }

  function actionButtonsFor(c) {
    if (c.status === "new") {
      return `<button class="btn btn-ghost btn-sm" data-action="reject" data-id="${c.id}">Reject</button>
              <button class="btn btn-primary btn-sm" data-action="shortlist" data-id="${c.id}">Shortlist</button>`;
    }
    if (c.status === "shortlisted") {
      return `<button class="btn btn-ghost btn-sm" data-action="reject" data-id="${c.id}">Reject</button>
              <button class="btn btn-primary btn-sm" data-action="interview" data-id="${c.id}">Move to interview</button>`;
    }
    if (c.status === "interview") {
      return `<button class="btn btn-ghost btn-sm" data-action="reject" data-id="${c.id}">Reject</button>
              <button class="btn btn-teal btn-sm" data-action="hire" data-id="${c.id}">Hire</button>`;
    }
    return `<button class="btn btn-ghost btn-sm" data-action="view" data-id="${c.id}">View profile</button>`;
  }

  function renderList() {
    const list = getFilteredCandidates();
    const container = document.getElementById("candidateList");

    if (list.length === 0) {
      container.innerHTML = `<div class="cr-empty card">No candidates match these filters.</div>`;
      return;
    }

    container.innerHTML = list.map(c => `
      <article class="cr-card card" data-id="${c.id}">
        <div class="cr-card-id">
          <div class="cr-mini-ring" id="ring-${c.id}"></div>
          <div class="cr-card-name">
            <strong>${c.name}</strong>
            <span class="cr-card-archetype">${c.archetype}</span>
          </div>
        </div>
        <div class="cr-card-mid">
          <div class="cr-card-skills">
            ${c.matched.slice(0, 4).map(s => `<span class="chip matched">${s}</span>`).join("")}
            ${c.matched.length > 4 ? `<span class="chip">+${c.matched.length - 4} more</span>` : ""}
          </div>
          <div class="cr-card-facts">
            <span>${c.experience} yrs experience</span>
            <span>Applied ${c.appliedDaysAgo}d ago</span>
          </div>
        </div>
        <div class="cr-card-actions">
          <span class="cr-status ${c.status}">${statusLabel(c.status)}</span>
          <div class="cr-card-btn-row">
            ${actionButtonsFor(c)}
            <button class="btn btn-ghost btn-sm" data-action="view" data-id="${c.id}">View profile</button>
          </div>
        </div>
      </article>
    `).join("");

    list.forEach(c => {
      renderMatchRing(document.getElementById(`ring-${c.id}`), { overall: overallScore(c), segments: toSegments(c) }, { size: 56, stroke: 6 });
    });
  }

  /* ---------- drawer ---------- */
  const drawerOverlay = document.getElementById("drawerOverlay");

  function openDrawer(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return;
    activeCandidateId = id;

    document.getElementById("drawerAvatar").textContent = c.initials;
    document.getElementById("drawerName").textContent = c.name;
    document.getElementById("drawerArchetype").textContent = c.archetype;
    document.getElementById("drawerSummary").textContent = c.summary;

    document.getElementById("drawerHistory").innerHTML = c.history.map(h => `
      <li><strong>${h.title} · ${h.org}</strong><span>${h.when}</span><p>${h.desc}</p></li>
    `).join("");
    document.getElementById("drawerEducation").innerHTML = c.education.map(e => `
      <li><strong>${e.title}</strong><span>${e.org} · ${e.when}</span></li>
    `).join("");

    document.getElementById("drawerSkillRow").innerHTML = REQUIRED_SKILLS.map(s =>
      `<span class="chip ${c.matched.includes(s) ? "matched" : "missing"}">${s}</span>`
    ).join("");

    document.getElementById("drawerLegend").innerHTML = SEGMENT_META.map(m => {
      const val = c.scores[m.key];
      const color = (RING_COLORS && RING_COLORS[m.color]) || "#999";
      return `<div class="dleg-row">
        <span class="dleg-dot" style="background:${color}"></span>
        <span class="dleg-label">${m.label}</span>
        <span class="dleg-bar"><span class="dleg-bar-fill" style="width:${val}%;background:${color}"></span></span>
        <span class="dleg-value">${val}%</span>
      </div>`;
    }).join("");

    document.getElementById("drawerDelta").innerHTML = c.delta.map(d => `
      <li><strong>${d.title}</strong><p>${d.desc}</p></li>
    `).join("");

    renderMatchRing(document.getElementById("drawerRing"), { overall: overallScore(c), segments: toSegments(c) }, { size: 78, stroke: 7 });

    // reset to profile tab
    document.querySelectorAll(".drawer-tab").forEach(t => t.classList.toggle("active", t.dataset.dtab === "profile"));
    document.querySelectorAll(".drawer-panel").forEach(p => p.hidden = p.dataset.dpanel !== "profile");

    drawerOverlay.hidden = false;
  }
  function closeDrawer() { drawerOverlay.hidden = true; activeCandidateId = null; }

  document.getElementById("drawerClose").addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", e => { if (e.target === drawerOverlay) closeDrawer(); });

  document.querySelectorAll(".drawer-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".drawer-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll(".drawer-panel").forEach(p => p.hidden = p.dataset.dpanel !== tab.dataset.dtab);
    });
  });

  /* ---------- status changes ---------- */
  function setStatus(id, status) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return;
    c.status = status;
    refreshPipelineCounts();
    renderList();
  }

  document.getElementById("candidateList").addEventListener("click", e => {
    const btn = e.target.closest("button[data-action]");
    if (btn) {
      const { action, id } = btn.dataset;
      if (action === "view") return openDrawer(id);
      if (action === "shortlist") { setStatus(id, "shortlisted"); return showToast("Candidate shortlisted"); }
      if (action === "reject") { setStatus(id, "rejected"); return showToast("Candidate rejected"); }
      if (action === "interview") { setStatus(id, "interview"); return showToast("Moved to interview"); }
      if (action === "hire") return openFeedback(id);
      return;
    }
    const card = e.target.closest(".cr-card");
    if (card) openDrawer(card.dataset.id);
  });

  document.getElementById("drawerReject").addEventListener("click", () => { setStatus(activeCandidateId, "rejected"); closeDrawer(); showToast("Candidate rejected"); });
  document.getElementById("drawerShortlist").addEventListener("click", () => { setStatus(activeCandidateId, "shortlisted"); closeDrawer(); showToast("Candidate shortlisted"); });
  document.getElementById("drawerInterview").addEventListener("click", () => { setStatus(activeCandidateId, "interview"); closeDrawer(); showToast("Moved to interview"); });
  document.getElementById("drawerHire").addEventListener("click", () => { const id = activeCandidateId; closeDrawer(); openFeedback(id); });

  /* ---------- feedback modal ---------- */
  const feedbackOverlay = document.getElementById("feedbackOverlay");
  let feedbackCandidateId = null;

  function openFeedback(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return;
    feedbackCandidateId = id;
    document.getElementById("feedbackName").textContent = c.name;
    document.getElementById("feedbackSkillChips").innerHTML = c.matched.map(s =>
      `<span class="chip chip-select" data-skill="${s}">${s}</span>`
    ).join("");
    document.querySelectorAll("#feedbackSkillChips .chip").forEach(chip => {
      chip.addEventListener("click", () => chip.classList.toggle("on"));
    });
    feedbackOverlay.hidden = false;
  }
  function closeFeedback() { feedbackOverlay.hidden = true; feedbackCandidateId = null; }

  document.getElementById("feedbackClose").addEventListener("click", closeFeedback);
  feedbackOverlay.addEventListener("click", e => { if (e.target === feedbackOverlay) closeFeedback(); });

  document.getElementById("feedbackSkip").addEventListener("click", () => {
    if (feedbackCandidateId) setStatus(feedbackCandidateId, "hired");
    closeFeedback();
    showToast("Candidate hired");
  });
  document.getElementById("feedbackSubmit").addEventListener("click", () => {
    if (feedbackCandidateId) setStatus(feedbackCandidateId, "hired");
    closeFeedback();
    showToast("Feedback recorded — this improves future matching");
  });

  /* ---------- filters wiring ---------- */
  document.getElementById("pipelineBar").addEventListener("click", e => {
    const chip = e.target.closest(".pipe-chip");
    if (!chip) return;
    document.querySelectorAll(".pipe-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activePipeline = chip.dataset.status;
    renderList();
  });

  const scoreSlider = document.getElementById("scoreSlider");
  scoreSlider.addEventListener("input", () => {
    minScore = Number(scoreSlider.value);
    document.getElementById("scoreSliderVal").textContent = minScore;
    renderList();
  });

  document.getElementById("searchInput").addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    renderList();
  });

  document.getElementById("sortSelect").addEventListener("change", e => {
    sortMode = e.target.value;
    renderList();
  });

  document.getElementById("archetypeFilters").addEventListener("change", renderList);

  document.getElementById("resetFilters").addEventListener("click", () => {
    activePipeline = "all"; minScore = 0; searchTerm = ""; sortMode = "score";
    document.querySelectorAll(".pipe-chip").forEach(c => c.classList.toggle("active", c.dataset.status === "all"));
    scoreSlider.value = 0; document.getElementById("scoreSliderVal").textContent = "0";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "score";
    document.querySelectorAll("#archetypeFilters input").forEach(i => i.checked = true);
    renderList();
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

  /* ---------- init ---------- */
  refreshPipelineCounts();
  renderList();
});
