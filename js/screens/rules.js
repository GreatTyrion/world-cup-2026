/* ============================================================================
 * rules.js — illustrated, kid-friendly rule cards, including little SVG
 * diagrams for player positions and offside.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.screens = window.WC.screens || {};

window.WC.screens.rules = (function () {

  // A simple pitch showing the four position groups.
  function positionsDiagram() {
    var svg =
      '<svg viewBox="0 0 320 180" class="diagram-svg" role="img" aria-label="A soccer field showing goalkeeper, defenders, midfielders and forwards">' +
      '  <rect x="0" y="0" width="320" height="180" rx="10" fill="#2ecc71"/>' +
      '  <rect x="6" y="6" width="308" height="168" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>' +
      '  <line x1="160" y1="6" x2="160" y2="174" stroke="#ffffff" stroke-width="2"/>' +
      '  <circle cx="160" cy="90" r="26" fill="none" stroke="#ffffff" stroke-width="2"/>' +
      '  <rect x="6" y="55" width="34" height="70" fill="none" stroke="#fff" stroke-width="2"/>' +
      // players (left team attacking right)
      dot(24, 90, "#f1c40f", "GK") +
      dot(70, 45, "#3498db", "D") + dot(70, 90, "#3498db", "D") + dot(70, 135, "#3498db", "D") +
      dot(125, 60, "#e67e22", "M") + dot(125, 120, "#e67e22", "M") +
      dot(175, 90, "#e74c3c", "F") +
      '</svg>';
    return wrapDiagram(svg, [
      legend("#f1c40f", "GK = Goalkeeper"),
      legend("#3498db", "D = Defenders"),
      legend("#e67e22", "M = Midfielders"),
      legend("#e74c3c", "F = Forwards")
    ]);
  }

  function dot(x, y, color, label) {
    return '<g>' +
      '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + color + '" stroke="#fff" stroke-width="2"/>' +
      '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#1c2733">' + label + '</text>' +
      '</g>';
  }

  // Offside picture: attacker level check vs last defender.
  function offsideDiagram() {
    var svg =
      '<svg viewBox="0 0 320 180" class="diagram-svg" role="img" aria-label="Diagram showing an attacker level with the last defender">' +
      '  <rect x="0" y="0" width="320" height="180" rx="10" fill="#2ecc71"/>' +
      '  <rect x="6" y="6" width="308" height="168" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>' +
      // goal on the right
      '  <rect x="300" y="66" width="14" height="48" fill="none" stroke="#fff" stroke-width="3"/>' +
      // last defender line (dashed) at x=210
      '  <line x1="210" y1="14" x2="210" y2="166" stroke="#ffef9f" stroke-width="2" stroke-dasharray="6 5"/>' +
      '  <text x="210" y="176" text-anchor="middle" font-size="9" fill="#fff9d6">last defender line</text>' +
      dot(120, 60, "#3498db", "P") +    // passer
      dot(210, 120, "#e74c3c", "D") +   // last defender
      dot(245, 60, "#e67e22", "✗") +    // attacker past the line = offside
      // pass arrow
      '  <path d="M132 62 Q195 45 238 60" fill="none" stroke="#fff" stroke-width="2.5" marker-end="url(#arrow)"/>' +
      '  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">' +
      '    <path d="M0 0 L8 4 L0 8 z" fill="#fff"/></marker></defs>' +
      '</svg>';
    return wrapDiagram(svg, [
      legend("#3498db", "P = Passer (has the ball)"),
      legend("#e74c3c", "D = Last defender"),
      legend("#e67e22", "✗ = Attacker is offside (past the line)")
    ]);
  }

  function wrapDiagram(svgString, legendItems) {
    var box = window.WC.ui.el(".diagram");
    box.innerHTML = svgString;
    var leg = window.WC.ui.el(".diagram-legend");
    legendItems.forEach(function (n) { leg.appendChild(n); });
    var wrap = window.WC.ui.el(".diagram-wrap", null, [box, leg]);
    return wrap;
  }

  function legend(color, label) {
    return window.WC.ui.el(".legend-item", null, [
      window.WC.ui.el("span.legend-swatch", { style: "background:" + color }),
      window.WC.ui.el("span", { text: label })
    ]);
  }

  function ruleCard(rule) {
    var children = [
      window.WC.ui.el(".rule-head", null, [
        window.WC.ui.el("span.rule-emoji", { text: rule.emoji, "aria-hidden": "true" }),
        window.WC.ui.el("h2.rule-title", { text: rule.title })
      ]),
      window.WC.ui.el("p.rule-text", { text: rule.text })
    ];

    if (rule.diagram === "positions") children.push(positionsDiagram());
    if (rule.diagram === "offside") children.push(offsideDiagram());

    if (rule.analogy) {
      children.push(window.WC.ui.el(".rule-analogy", null, [
        window.WC.ui.el("span.rule-analogy__tag", { text: "💭 Think of it like…" }),
        window.WC.ui.el("span", { text: rule.analogy })
      ]));
    }

    return window.WC.ui.el(".rule-card", null, children);
  }

  function render(host) {
    var list = window.WC.ui.el(".rules-list");
    window.WC.rules.forEach(function (r) { list.appendChild(ruleCard(r)); });

    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.ui.el("h1.screen-title", null, ["📖 Rules of Soccer"]),
      window.WC.ui.el("p.screen-intro", { text: "Everything you need to know to enjoy the game. Take your time!" }),
      list
    ]);
    host.appendChild(inner);
  }

  return { render: render };
})();
