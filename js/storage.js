/* ============================================================================
 * storage.js — remembers progress and badges in the browser's localStorage.
 * Everything is wrapped in try/catch so that if storage is blocked (which can
 * happen when opening the file directly), the app still works using an
 * in-memory copy for the session.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.storage = (function () {
  var PREFIX = "wc2026:";
  var memory = {};           // fallback if localStorage is unavailable
  var hasLocal = (function () {
    try {
      var k = PREFIX + "__test";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  })();

  function read(key, fallback) {
    var raw;
    try {
      raw = hasLocal ? window.localStorage.getItem(PREFIX + key) : memory[key];
    } catch (e) {
      raw = memory[key];
    }
    if (raw == null) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }

  function write(key, value) {
    var raw = JSON.stringify(value);
    try {
      if (hasLocal) window.localStorage.setItem(PREFIX + key, raw);
      else memory[key] = raw;
    } catch (e) {
      memory[key] = raw;
    }
  }

  /* ---- progress counters ---- */

  // Record that a fact (by index) has been read. Returns the count of unique facts read.
  function markFactRead(index) {
    var seen = read("factsRead", []);
    if (seen.indexOf(index) === -1) {
      seen.push(index);
      write("factsRead", seen);
    }
    checkBadges();
    return seen.length;
  }

  function factsReadCount() {
    return read("factsRead", []).length;
  }

  // Record a finished game and (optionally) a new best score.
  function recordGame(gameId, score, total) {
    var played = read("gamesPlayed", {});
    played[gameId] = (played[gameId] || 0) + 1;
    write("gamesPlayed", played);

    if (typeof score === "number") {
      var best = read("bestScores", {});
      if (best[gameId] == null || score > best[gameId]) {
        best[gameId] = score;
        write("bestScores", best);
      }
    }
    checkBadges();
  }

  function bestScore(gameId) {
    return read("bestScores", {})[gameId];
  }

  function gamesPlayedTotal() {
    var played = read("gamesPlayed", {});
    return Object.keys(played).reduce(function (sum, k) { return sum + played[k]; }, 0);
  }

  /* ---- mute setting ---- */

  function isMuted() { return read("muted", false); }
  function setMuted(v) { write("muted", !!v); }

  /* ---- badges ----
   * Each badge has an id, an emoji, a title, and a test() that looks at current
   * progress. checkBadges() awards any newly-earned ones and returns them so the
   * app can celebrate. */
  var BADGES = [
    { id: "first-fact",  emoji: "📖", title: "Curious Cub",  hint: "Read your first fun fact", test: function () { return factsReadCount() >= 1; } },
    { id: "fact-fan",    emoji: "🤓", title: "Fact Fan",     hint: "Read 10 fun facts",        test: function () { return factsReadCount() >= 10; } },
    { id: "fact-master", emoji: "🧠", title: "Fact Master",  hint: "Read every fun fact",      test: function () { return factsReadCount() >= (window.WC.facts ? window.WC.facts.length : 20); } },
    { id: "first-game",  emoji: "🎮", title: "Let's Play",   hint: "Finish your first game",   test: function () { return gamesPlayedTotal() >= 1; } },
    { id: "quiz-whiz",   emoji: "🏅", title: "Quiz Whiz",    hint: "Score 12+ on the Quiz",    test: function () { var b = bestScore("quiz"); return b != null && b >= 12; } },
    { id: "flag-master", emoji: "🚩", title: "Flag Master",  hint: "Win the Flag Match game",  test: function () { var b = bestScore("flagMatch"); return b != null && b >= 1; } },
    { id: "geo-genius",  emoji: "🌍", title: "Geo Genius",   hint: "Score 8+ on Guess the Country", test: function () { var b = bestScore("guessCountry"); return b != null && b >= 8; } },
    { id: "true-star",   emoji: "⭐", title: "True Star",    hint: "Score 8+ on True or False", test: function () { var b = bestScore("trueFalse"); return b != null && b >= 8; } },
    { id: "all-star",    emoji: "🏆", title: "World Cup Hero", hint: "Play all four games",     test: function () { var p = read("gamesPlayed", {}); return Object.keys(p).length >= 4; } }
  ];

  var pendingCelebration = [];

  function earnedBadges() {
    return read("badges", []);
  }

  function checkBadges() {
    var earned = read("badges", []);
    var changed = false;
    BADGES.forEach(function (b) {
      if (earned.indexOf(b.id) === -1 && b.test()) {
        earned.push(b.id);
        pendingCelebration.push(b);
        changed = true;
      }
    });
    if (changed) write("badges", earned);
  }

  // Return (and clear) any freshly-earned badges so the UI can pop a toast.
  function takeNewBadges() {
    var out = pendingCelebration.slice();
    pendingCelebration = [];
    return out;
  }

  return {
    allBadges: BADGES,
    earnedBadges: earnedBadges,
    takeNewBadges: takeNewBadges,
    markFactRead: markFactRead,
    factsReadCount: factsReadCount,
    recordGame: recordGame,
    bestScore: bestScore,
    gamesPlayedTotal: gamesPlayedTotal,
    isMuted: isMuted,
    setMuted: setMuted
  };
})();
