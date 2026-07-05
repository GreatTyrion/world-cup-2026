/* ============================================================================
 * guessCountry.js — show a big flag, pick the right country from 4 choices.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.games = window.WC.games || {};

window.WC.games.guessCountry = (function () {
  var ROUNDS = 10;
  var host, stageEl, scoreEl;
  var rounds, index, score;

  function start() {
    // one distinct answer per round
    rounds = window.WC.ui.sample(window.WC.teams, Math.min(ROUNDS, window.WC.teams.length));
    index = 0; score = 0;

    scoreEl = window.WC.games.common.scoreChip("Score: 0");
    stageEl = window.WC.ui.el(".guess-stage");
    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.games.common.header("🔎", "Guess the Country", scoreEl),
      stageEl
    ]);
    window.WC.ui.clear(host);
    host.appendChild(inner);
    showRound();
  }

  function showRound() {
    var answer = rounds[index];
    // 3 wrong options from other teams
    var wrong = window.WC.ui.sample(
      window.WC.teams.filter(function (t) { return t.name !== answer.name; }), 3);
    var options = window.WC.ui.shuffle([answer].concat(wrong));

    var answered = false;
    var optionsWrap = window.WC.ui.el(".guess-options");
    var feedback = window.WC.ui.el(".quiz-feedback");

    options.forEach(function (team) {
      var btn = window.WC.ui.el("button.guess-option", {
        onclick: function () {
          if (answered) return;
          answered = true;
          choose(team, answer, btn, optionsWrap, feedback);
        }
      }, [team.name]);
      optionsWrap.appendChild(btn);
    });

    var card = window.WC.ui.el(".guess-card.enter-slide", null, [
      window.WC.ui.el(".quiz-counter", { text: "Flag " + (index + 1) + " of " + rounds.length }),
      window.WC.ui.el(".guess-flag", null, [
        window.WC.ui.el("span.guess-flag__emoji", { text: answer.flag, "aria-hidden": "true" }),
        window.WC.ui.el("span.guess-flag__code", { text: answer.code })
      ]),
      window.WC.ui.el("p.guess-prompt", { text: "Which country is this?" }),
      optionsWrap,
      feedback
    ]);
    window.WC.ui.clear(stageEl);
    stageEl.appendChild(card);
  }

  function choose(team, answer, btn, optionsWrap, feedback) {
    var buttons = optionsWrap.querySelectorAll("button");
    buttons.forEach(function (b) { b.disabled = true; });

    if (team.name === answer.name) {
      score++;
      scoreEl.textContent = "Score: " + score;
      btn.classList.add("correct");
      btn.appendChild(mark("✓"));
      window.WC.audio.ding();
      feedback.className = "quiz-feedback good show";
      feedback.textContent = "✓ Yes! That's " + answer.name + " (" + answer.nickname + ").";
    } else {
      btn.classList.add("wrong");
      btn.appendChild(mark("✗"));
      window.WC.audio.buzz();
      buttons.forEach(function (b) {
        if (b.textContent.replace(/[✓✗]/g, "").trim() === answer.name) {
          b.classList.add("correct");
          b.appendChild(mark("✓"));
        }
      });
      feedback.className = "quiz-feedback try show";
      feedback.textContent = "This flag is " + answer.name + ". Nice try!";
    }

    var nextBtn = window.WC.ui.el("button.btn.btn--primary.quiz-next", {
      onclick: function () {
        window.WC.audio.blip();
        index++;
        if (index >= rounds.length) finish();
        else showRound();
      }
    }, [ index + 1 >= rounds.length ? "See my score ➡" : "Next flag ➡" ]);
    feedback.appendChild(nextBtn);
    nextBtn.focus();
  }

  function mark(sym) {
    return window.WC.ui.el("span.opt-mark", { text: " " + sym, "aria-hidden": "true" });
  }

  function finish() {
    window.WC.games.common.results(host, {
      gameId: "guessCountry",
      score: score,
      total: rounds.length,
      onReplay: start
    });
  }

  function render(h) { host = h; start(); }

  return { render: render };
})();
