/* ============================================================================
 * home.js — the welcome screen: mascot, title, and the 4 big nav buttons.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.screens = window.WC.screens || {};

window.WC.screens.home = (function () {
  var el = null;

  // A friendly cartoon soccer-ball mascot, drawn as inline SVG (no image files).
  function mascot() {
    var svg =
      '<svg viewBox="0 0 200 200" class="mascot-svg" role="img" aria-label="Smiling soccer ball mascot">' +
      '  <defs><radialGradient id="ballShine" cx="38%" cy="32%" r="75%">' +
      '    <stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e9eef5"/>' +
      '  </radialGradient></defs>' +
      '  <circle cx="100" cy="105" r="80" fill="url(#ballShine)" stroke="#2b3a4a" stroke-width="4"/>' +
      // classic pentagon patches
      '  <polygon points="100,70 118,84 111,106 89,106 82,84" fill="#2b3a4a"/>' +
      '  <polygon points="52,92 66,80 78,92 72,108 57,108" fill="#2b3a4a"/>' +
      '  <polygon points="148,92 134,80 122,92 128,108 143,108" fill="#2b3a4a"/>' +
      '  <polygon points="80,150 92,138 108,138 120,150 100,162" fill="#2b3a4a"/>' +
      // eyes
      '  <circle cx="84" cy="98" r="10" fill="#fff" stroke="#2b3a4a" stroke-width="2"/>' +
      '  <circle cx="116" cy="98" r="10" fill="#fff" stroke="#2b3a4a" stroke-width="2"/>' +
      '  <circle cx="86" cy="100" r="4.5" fill="#2b3a4a"/>' +
      '  <circle cx="118" cy="100" r="4.5" fill="#2b3a4a"/>' +
      // smile
      '  <path d="M80 120 Q100 138 120 120" fill="none" stroke="#2b3a4a" stroke-width="4" stroke-linecap="round"/>' +
      // rosy cheeks
      '  <circle cx="70" cy="116" r="6" fill="#ff9db0" opacity="0.7"/>' +
      '  <circle cx="130" cy="116" r="6" fill="#ff9db0" opacity="0.7"/>' +
      '</svg>';
    var wrap = window.WC.ui.el(".mascot");
    wrap.innerHTML = svg;
    return wrap;
  }

  function navButton(route, emoji, label, sub, cls) {
    return window.WC.ui.el("button.nav-card." + cls, {
      onclick: function () { window.WC.audio.blip(); window.WC.go(route); }
    }, [
      window.WC.ui.el(".nav-card__emoji", { text: emoji, "aria-hidden": "true" }),
      window.WC.ui.el(".nav-card__label", { text: label }),
      window.WC.ui.el(".nav-card__sub", { text: sub })
    ]);
  }

  function badgeShelf() {
    var storage = window.WC.storage;
    var earned = storage.earnedBadges();
    var total = storage.allBadges.length;
    var shelf = window.WC.ui.el(".badge-shelf", { "aria-label": "Your sticker collection" });
    shelf.appendChild(window.WC.ui.el(".badge-shelf__title", { text: "🏅 My Stickers (" + earned.length + " / " + total + ")" }));
    var row = window.WC.ui.el(".badge-shelf__row");
    storage.allBadges.forEach(function (b) {
      var has = earned.indexOf(b.id) !== -1;
      var chip = window.WC.ui.el("span.badge-chip" + (has ? ".earned" : ".locked"), {
        title: has ? b.title + " — " + b.hint : "Locked: " + b.hint,
        "aria-label": has ? b.title + ", earned. " + b.hint : "Locked sticker. " + b.hint
      }, [ has ? b.emoji : "🔒" ]);
      row.appendChild(chip);
    });
    shelf.appendChild(row);
    return shelf;
  }

  function render(host) {
    el = window.WC.ui.el(".screen-inner.home-screen", null, [
      mascot(),
      window.WC.ui.el("h1.home-title", null, [
        "World Cup ",
        window.WC.ui.el("span.gold", { text: "2026" })
      ]),
      window.WC.ui.el("p.home-subtitle", { text: "Learn, explore, and play! 🇺🇸 🇨🇦 🇲🇽" }),
      window.WC.ui.el(".nav-grid", null, [
        navButton("countries", "🌍", "Countries", "Meet the teams", "c-green"),
        navButton("rules", "📖", "Rules", "How soccer works", "c-blue"),
        navButton("facts", "💡", "Fun Facts", "Amazing stuff", "c-orange"),
        navButton("games", "🎮", "Games", "Play & learn", "c-purple")
      ]),
      badgeShelf()
    ]);
    host.appendChild(el);
  }

  return { render: render };
})();
