/* ============================================================
   LATTICE — match ring renderer
   A segmented ring: one arc per scoring category (skills,
   experience, education, certifications…), each arc filled
   to that category's sub-score. Center shows the overall score.
   Shared by job-detail.js and candidate-review.js
   ============================================================ */

const RING_COLORS = {
  teal:   "#0E7C7B",
  amber:  "#DB9A35",
  violet: "#6E5BC4",
  coral:  "#DD5C4E",
  track:  "#E9ECEB"
};

function lattice_polarToCartesian(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function lattice_describeArc(cx, cy, r, startAngle, endAngle) {
  const start = lattice_polarToCartesian(cx, cy, r, startAngle);
  const end = lattice_polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 1, end.x, end.y].join(" ");
}

function lattice_tierColor(score) {
  if (score >= 80) return RING_COLORS.teal;
  if (score >= 60) return RING_COLORS.amber;
  return RING_COLORS.coral;
}

/**
 * Render a match ring into `container`.
 * data = { overall: 0-100, segments: [{ label, value: 0-100, color: 'teal'|'amber'|'violet'|'coral' }] }
 * options = { size, stroke, gapDeg, showLegend }
 */
function renderMatchRing(container, data, options = {}) {
  const size = options.size || 132;
  const stroke = options.stroke || 10;
  const gapDeg = options.gapDeg ?? 8;
  const n = data.segments.length;
  const segAngle = 360 / n;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - stroke;

  let arcs = "";
  data.segments.forEach((seg, i) => {
    const start = i * segAngle + gapDeg / 2;
    const end = (i + 1) * segAngle - gapDeg / 2;
    const fillEnd = start + (end - start) * Math.max(0, Math.min(100, seg.value)) / 100;
    const color = RING_COLORS[seg.color] || lattice_tierColor(seg.value);
    arcs += `<path class="ring-seg ring-track" d="${lattice_describeArc(cx, cy, r, start, end)}" stroke="${RING_COLORS.track}" stroke-width="${stroke}"/>`;
    if (seg.value > 0) {
      arcs += `<path class="ring-seg ring-fill" data-label="${seg.label}" d="${lattice_describeArc(cx, cy, r, start, fillEnd)}" stroke="${color}" stroke-width="${stroke}"/>`;
    }
  });

  const overallColor = lattice_tierColor(data.overall);

  container.innerHTML = `
    <div class="match-ring-wrap" style="width:${size}px;height:${size}px;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${arcs}</svg>
      <div class="ring-center">
        <span class="ring-score" style="color:${overallColor};font-size:${size * 0.26}px;">${Math.round(data.overall)}<span style="font-size:${size*0.15}px;">%</span></span>
        <span class="ring-label">match</span>
      </div>
    </div>
  `;

  if (options.showLegend) {
    const legend = document.createElement("div");
    legend.className = "ring-legend";
    legend.innerHTML = data.segments
      .map(
        (seg) =>
          `<div class="ring-legend-row">
             <span class="ring-legend-dot" style="background:${RING_COLORS[seg.color] || lattice_tierColor(seg.value)}"></span>
             <span class="ring-legend-label">${seg.label}</span>
             <span class="ring-legend-value">${Math.round(seg.value)}%</span>
           </div>`
      )
      .join("");
    container.appendChild(legend);
  }
}
