/* ============================================================================
 * games.js — the Games menu. Each tile links to a game route (#game/<id>).
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.screens = window.WC.screens || {};

window.WC.screens.games = (function () {

  var GAMES = [
    { id: "quiz",         emoji: "❓", title: "Quiz Challenge",  desc: "Rules & facts. How many can you get?", cls: "c-blue" },
    { id: "flagMatch",    emoji: "🚩", title: "Flag Match",      desc: "Flip cards and match the pairs.",       cls: "c-green" },
    { id: "guessCountry", emoji: "🔎", title: "Guess the Country", desc: "See a flag, pick the right team.",     cls: "c-orange" },
    { id: "trueFalse",    emoji: "🤔", title: "True or False",    desc: "Is it true? Tap to find out!",          cls: "c-purple" }
  ];

  function tile(g) {
    var best = window.WC.storage.bestScore(g.id);
    var children = [
      window.WC.ui.el(".game-tile__emoji", { text: g.emoji, "aria-hidden": "true" }),
      window.WC.ui.el(".game-tile__title", { text: g.title }),
      window.WC.ui.el(".game-tile__desc", { text: g.desc })
    ];
    if (best != null) {
      children.push(window.WC.ui.el(".game-tile__best", { text: "⭐ Best: " + best }));
    }
    return window.WC.ui.el("button.game-tile." + g.cls, {
      onclick: function () { window.WC.audio.blip(); window.WC.go("game/" + g.id); },
      "aria-label": g.title + ". " + g.desc
    }, children);
  }

  function render(host) {
    var grid = window.WC.ui.el(".games-grid");
    GAMES.forEach(function (g) { grid.appendChild(tile(g)); });

    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.ui.el("h1.screen-title", null, ["🎮 Games"]),
      window.WC.ui.el("p.screen-intro", { text: "Pick a game! You can always try again — there's no way to lose." }),
      grid
    ]);
    host.appendChild(inner);
  }

  return { render: render };
})();
