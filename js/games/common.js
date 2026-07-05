/* ============================================================================
 * common.js — bits shared by all four games: a game header (title + back to
 * Games) and a friendly end-of-game results panel with Play Again.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.games = window.WC.games || {};

window.WC.games.common = (function () {

  function header(emoji, title, right) {
    return window.WC.ui.el(".game-header", null, [
      window.WC.ui.el("button.btn-back", {
        onclick: function () { window.WC.audio.blip(); window.WC.go("games"); },
        "aria-label": "Back to games menu"
      }, ["⬅ Games"]),
      window.WC.ui.el(".game-header__title", { text: emoji + " " + title }),
      right || window.WC.ui.el("span.game-header__spacer")
    ]);
  }

  // A live scoreboard chip you can update by setting .textContent.
  function scoreChip(text) {
    return window.WC.ui.el("span.score-chip", { text: text, role: "status", "aria-live": "polite" });
  }

  /* Show the results panel. opts:
   *   gameId, emoji, title, score, total, onReplay  */
  function results(host, opts) {
    window.WC.storage.recordGame(opts.gameId, opts.score, opts.total);
    window.WC.audio.fanfare();
    if (opts.score === opts.total && opts.total > 0) window.WC.ui.confetti();

    var panel = window.WC.ui.el(".result-panel", { role: "status" }, [
      window.WC.ui.el(".result-emoji", { text: opts.score === opts.total ? "🏆" : "🎉", "aria-hidden": "true" }),
      window.WC.ui.el("h2.result-title", { text: "You scored" }),
      window.WC.ui.el(".result-score", null, [
        window.WC.ui.el("span.result-score__num", { text: String(opts.score) }),
        window.WC.ui.el("span.result-score__of", { text: " / " + opts.total })
      ]),
      window.WC.ui.el("p.result-message", { text: window.WC.ui.encourage(opts.score, opts.total) }),
      window.WC.ui.el(".result-actions", null, [
        window.WC.ui.el("button.btn.btn--primary.btn--big", {
          onclick: function () { window.WC.audio.blip(); opts.onReplay(); }
        }, ["🔁 Play Again"]),
        window.WC.ui.el("button.btn.btn--soft", {
          onclick: function () { window.WC.audio.blip(); window.WC.go("games"); }
        }, ["🎮 Other Games"])
      ])
    ]);

    window.WC.ui.clear(host);
    host.appendChild(window.WC.ui.el(".screen-inner", null, [panel]));
    void panel.offsetWidth;
    panel.classList.add("enter-pop");

    // celebrate any badge earned by this result
    window.WC.flushBadges();
  }

  return { header: header, scoreChip: scoreChip, results: results };
})();
