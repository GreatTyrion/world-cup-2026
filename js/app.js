/* ============================================================================
 * app.js — boots the app, runs a tiny hash-based router, and manages the top
 * bar (Home + mute) and the badge celebration toast.
 *
 * Routes (the part after # in the address bar):
 *   #home                -> Home screen
 *   #countries           -> Countries explorer
 *   #rules               -> Rules of soccer
 *   #facts               -> Fun facts
 *   #games               -> Games menu
 *   #game/quiz           -> a specific game (quiz | flagMatch | guessCountry | trueFalse)
 * ========================================================================== */

(function () {
  var WC = window.WC = window.WC || {};

  var screenHost, homeBtn, muteBtn, toastHost;

  function currentRoute() {
    var hash = (location.hash || "#home").replace(/^#/, "");
    return hash || "home";
  }

  function go(route) {
    location.hash = "#" + route;
  }
  WC.go = go; // let screens navigate

  function render() {
    var route = currentRoute();
    WC.ui.clear(screenHost);
    // scroll back to top on every screen change
    screenHost.scrollTop = 0;
    window.scrollTo(0, 0);

    var parts = route.split("/");

    if (parts[0] === "game" && parts[1]) {
      var game = WC.games && WC.games[parts[1]];
      if (game && typeof game.render === "function") {
        game.render(screenHost);
      } else {
        WC.screens.games.render(screenHost);
      }
    } else if (WC.screens && WC.screens[parts[0]]) {
      WC.screens[parts[0]].render(screenHost);
    } else {
      WC.screens.home.render(screenHost);
    }

    // The Home button is pointless on Home itself.
    homeBtn.style.visibility = (parts[0] === "home") ? "hidden" : "visible";

    // celebrate any badges earned during the last render/interaction
    flushBadges();
  }

  /* ---- mute button ---- */
  function refreshMuteButton() {
    var muted = WC.audio.isMuted();
    muteBtn.textContent = muted ? "🔇" : "🔊";
    muteBtn.setAttribute("aria-label", muted ? "Sound is off. Turn sound on." : "Sound is on. Turn sound off.");
    muteBtn.setAttribute("aria-pressed", muted ? "true" : "false");
  }

  /* ---- badge celebration toast ---- */
  function flushBadges() {
    if (!WC.storage) return;
    var fresh = WC.storage.takeNewBadges();
    fresh.forEach(function (badge, i) {
      setTimeout(function () { showBadgeToast(badge); }, i * 600);
    });
  }

  function showBadgeToast(badge) {
    WC.audio.sparkle();
    var toast = WC.ui.el(".badge-toast", { role: "status" }, [
      WC.ui.el(".badge-toast__emoji", { text: badge.emoji }),
      WC.ui.el(".badge-toast__body", null, [
        WC.ui.el(".badge-toast__label", { text: "New badge!" }),
        WC.ui.el(".badge-toast__title", { text: badge.title })
      ])
    ]);
    toastHost.appendChild(toast);
    // force the entrance animation
    void toast.offsetWidth;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
    }, 3200);
  }
  WC.flushBadges = flushBadges; // screens can trigger after awarding

  function boot() {
    screenHost = document.getElementById("screen");
    homeBtn = document.getElementById("home-btn");
    muteBtn = document.getElementById("mute-btn");
    toastHost = document.getElementById("toast-host");

    WC.audio.init();
    refreshMuteButton();

    homeBtn.addEventListener("click", function () {
      WC.audio.blip();
      go("home");
    });

    muteBtn.addEventListener("click", function () {
      WC.audio.toggleMute();
      // a friendly blip if we just turned sound ON
      if (!WC.audio.isMuted()) WC.audio.blip();
      refreshMuteButton();
    });

    window.addEventListener("hashchange", render);

    if (!location.hash) location.hash = "#home";
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
