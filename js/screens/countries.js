/* ============================================================================
 * countries.js — grid of teams with continent/host filters and a detail card.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.screens = window.WC.screens || {};

window.WC.screens.countries = (function () {
  var ui = null;
  var currentFilter = "All";

  function flagBadge(team, big) {
    // Emoji flag with a small country-code chip underneath as a backup for
    // browsers (mostly Windows) that don't draw flag emojis.
    return window.WC.ui.el(".flag" + (big ? ".flag--big" : ""), null, [
      window.WC.ui.el("span.flag__emoji", { text: team.flag, "aria-hidden": "true" }),
      window.WC.ui.el("span.flag__code", { text: team.code })
    ]);
  }

  function teamCard(team) {
    return window.WC.ui.el("button.team-card" + (team.isHost ? ".team-card--host" : ""), {
      onclick: function () { window.WC.audio.blip(); openDetail(team); },
      "aria-label": team.name + (team.isHost ? ", a host country" : "")
    }, [
      team.isHost ? window.WC.ui.el("span.host-ribbon", { text: "HOST" }) : null,
      flagBadge(team, false),
      window.WC.ui.el(".team-card__name", { text: team.name }),
      window.WC.ui.el(".team-card__continent", { text: team.continent })
    ]);
  }

  function openDetail(team) {
    var overlay = window.WC.ui.el(".modal-overlay", {
      onclick: function (e) { if (e.target === overlay) close(); }
    });
    function close() {
      overlay.classList.remove("show");
      setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 250);
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);

    var card = window.WC.ui.el(".modal-card" + (team.isHost ? ".modal-card--host" : ""), { role: "dialog", "aria-label": team.name }, [
      window.WC.ui.el("button.modal-close", { onclick: close, "aria-label": "Close" }, ["✕"]),
      team.isHost ? window.WC.ui.el(".modal-host-tag", { text: "⭐ 2026 HOST COUNTRY ⭐" }) : null,
      flagBadge(team, true),
      window.WC.ui.el("h2.modal-name", { text: team.name }),
      window.WC.ui.el(".modal-nick", { text: "“" + team.nickname + "”" }),
      window.WC.ui.el(".modal-row", null, [
        window.WC.ui.el("span.modal-chip", { text: "🌍 " + team.continent })
      ]),
      window.WC.ui.el("p.modal-tidbit", { text: team.tidbit })
    ]);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    void overlay.offsetWidth;
    overlay.classList.add("show");
  }

  function filterButton(label) {
    var active = currentFilter === label;
    return window.WC.ui.el("button.chip-btn" + (active ? ".active" : ""), {
      onclick: function () {
        window.WC.audio.blip();
        currentFilter = label;
        rebuild();
      },
      "aria-pressed": active ? "true" : "false"
    }, [label]);
  }

  var gridHost, filterHost, countLabel;

  function rebuild() {
    // filters row
    window.WC.ui.clear(filterHost);
    filterHost.appendChild(filterButton("All"));
    filterHost.appendChild(filterButton("Hosts"));
    window.WC.continents.forEach(function (c) { filterHost.appendChild(filterButton(c)); });

    // filtered teams
    var teams = window.WC.teams.filter(function (t) {
      if (currentFilter === "All") return true;
      if (currentFilter === "Hosts") return t.isHost;
      return t.continent === currentFilter;
    });

    countLabel.textContent = teams.length + " team" + (teams.length === 1 ? "" : "s");

    window.WC.ui.clear(gridHost);
    teams.forEach(function (t) { gridHost.appendChild(teamCard(t)); });
  }

  function render(host) {
    filterHost = window.WC.ui.el(".chip-row", { role: "group", "aria-label": "Filter teams" });
    gridHost = window.WC.ui.el(".team-grid");
    countLabel = window.WC.ui.el(".muted-count");

    ui = window.WC.ui.el(".screen-inner", null, [
      window.WC.ui.el("h1.screen-title", null, ["🌍 Countries"]),
      window.WC.ui.el("p.screen-intro", { text: "2026 is the first-ever World Cup with 48 teams — up from 32! Tap a flag to learn more." }),
      filterHost,
      countLabel,
      gridHost
    ]);
    host.appendChild(ui);
    rebuild();
  }

  return { render: render };
})();
