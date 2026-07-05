/* ============================================================================
 * flagMatch.js — a memory card-flip game: match each flag to its country name.
 * Kid-friendly: 6 pairs (12 cards), flip two, keep going until all matched.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.games = window.WC.games || {};

window.WC.games.flagMatch = (function () {
  var PAIRS = 6;
  var host, boardEl, movesEl;
  var first = null, lock = false, matched = 0, moves = 0;

  function start() {
    matched = 0; moves = 0; first = null; lock = false;

    var teams = window.WC.ui.sample(window.WC.teams, PAIRS);
    var cards = [];
    teams.forEach(function (t, i) {
      cards.push({ pair: i, kind: "flag", team: t });
      cards.push({ pair: i, kind: "name", team: t });
    });
    cards = window.WC.ui.shuffle(cards);

    movesEl = window.WC.games.common.scoreChip("Moves: 0");
    boardEl = window.WC.ui.el(".match-board");

    cards.forEach(function (c) { boardEl.appendChild(makeCard(c)); });

    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.games.common.header("🚩", "Flag Match", movesEl),
      window.WC.ui.el("p.screen-intro", { text: "Flip two cards to match each flag with its country. Find all " + PAIRS + " pairs!" }),
      boardEl
    ]);
    window.WC.ui.clear(host);
    host.appendChild(inner);
  }

  function makeCard(c) {
    var faceContent = c.kind === "flag"
      ? window.WC.ui.el(".match-face__flag", null, [
          window.WC.ui.el("span.match-face__emoji", { text: c.team.flag, "aria-hidden": "true" }),
          window.WC.ui.el("span.match-face__code", { text: c.team.code })
        ])
      : window.WC.ui.el(".match-face__name", { text: c.team.name });

    var card = window.WC.ui.el("button.match-card", {
      "aria-label": "Hidden card",
      onclick: function () { flip(card, c); }
    }, [
      window.WC.ui.el(".match-inner", null, [
        window.WC.ui.el(".match-back", null, ["⚽"]),
        window.WC.ui.el(".match-front", null, [faceContent])
      ])
    ]);
    card._data = c;
    return card;
  }

  function flip(card, c) {
    if (lock) return;
    if (card.classList.contains("flipped") || card.classList.contains("done")) return;

    window.WC.audio.blip();
    card.classList.add("flipped");

    if (!first) {
      first = card;
      return;
    }

    // second card
    moves++;
    movesEl.textContent = "Moves: " + moves;
    var a = first._data, b = c;

    if (a.pair === b.pair && a.kind !== b.kind) {
      // match!
      window.WC.audio.ding();
      var f = first; first = null;
      setTimeout(function () {
        f.classList.add("done");
        card.classList.add("done");
        matched++;
        if (matched === PAIRS) finish();
      }, 350);
    } else {
      // no match — flip both back
      lock = true;
      var f2 = first; first = null;
      window.WC.audio.buzz();
      setTimeout(function () {
        f2.classList.remove("flipped");
        card.classList.remove("flipped");
        lock = false;
      }, 850);
    }
  }

  function finish() {
    window.WC.games.common.results(host, {
      gameId: "flagMatch",
      score: PAIRS,
      total: PAIRS,
      onReplay: start
    });
  }

  function render(h) { host = h; start(); }

  return { render: render };
})();
