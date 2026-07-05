/* ============================================================================
 * facts.js — a swipeable deck of fact "flashcards" with Next / Shuffle.
 * Reading facts counts toward progress + badges.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.screens = window.WC.screens || {};

window.WC.screens.facts = (function () {
  var order = [];      // shuffled list of indices into WC.facts
  var pos = 0;
  var cardHost, progressLabel;

  function categoryClass(cat) {
    if (cat === "2026") return "cat-2026";
    if (cat === "History") return "cat-history";
    return "cat-wow";
  }

  function showCurrent(animateDir) {
    var idx = order[pos];
    var fact = window.WC.facts[idx];

    // mark as read for progress
    window.WC.storage.markFactRead(idx);

    var card = window.WC.ui.el(".fact-card." + categoryClass(fact.category), { key: idx }, [
      window.WC.ui.el("span.fact-cat", { text: fact.category === "2026" ? "2026" : fact.category }),
      window.WC.ui.el(".fact-emoji", { text: fact.emoji, "aria-hidden": "true" }),
      window.WC.ui.el("h2.fact-headline", { text: fact.headline }),
      window.WC.ui.el("p.fact-text", { text: fact.text })
    ]);

    window.WC.ui.clear(cardHost);
    cardHost.appendChild(card);
    void card.offsetWidth;
    card.classList.add(animateDir === "shuffle" ? "enter-pop" : "enter-slide");

    progressLabel.textContent = "Card " + (pos + 1) + " of " + order.length;

    // any badge earned from reading?
    window.WC.flushBadges();
  }

  function next() {
    window.WC.audio.blip();
    pos = (pos + 1) % order.length;
    showCurrent("slide");
  }

  function prev() {
    window.WC.audio.blip();
    pos = (pos - 1 + order.length) % order.length;
    showCurrent("slide");
  }

  function shuffleDeck() {
    window.WC.audio.ding();
    order = window.WC.ui.shuffle(order);
    pos = 0;
    showCurrent("shuffle");
  }

  function render(host) {
    order = window.WC.facts.map(function (_, i) { return i; });
    order = window.WC.ui.shuffle(order);
    pos = 0;

    cardHost = window.WC.ui.el(".fact-stage");
    progressLabel = window.WC.ui.el(".fact-progress");

    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.ui.el("h1.screen-title", null, ["💡 Fun Facts"]),
      window.WC.ui.el("p.screen-intro", { text: "Tap Next for more, or Shuffle to mix them up!" }),
      cardHost,
      progressLabel,
      window.WC.ui.el(".fact-controls", null, [
        window.WC.ui.el("button.btn.btn--soft", { onclick: prev, "aria-label": "Previous fact" }, ["⬅ Back"]),
        window.WC.ui.el("button.btn.btn--gold", { onclick: shuffleDeck }, ["🔀 Shuffle"]),
        window.WC.ui.el("button.btn.btn--primary", { onclick: next, "aria-label": "Next fact" }, ["Next ➡"])
      ])
    ]);
    host.appendChild(inner);
    showCurrent("slide");
  }

  return { render: render };
})();
