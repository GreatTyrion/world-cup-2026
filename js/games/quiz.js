/* ============================================================================
 * quiz.js — multiple-choice Quiz Challenge with instant, kind feedback.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.games = window.WC.games || {};

window.WC.games.quiz = (function () {
  var questions, index, score, host, scoreEl, stageEl;

  function start() {
    // fresh shuffle of questions each play; options shuffled per question too
    questions = window.WC.ui.shuffle(window.WC.quiz);
    index = 0;
    score = 0;
    build();
    showQuestion();
  }

  function build() {
    scoreEl = window.WC.games.common.scoreChip("Score: 0");
    stageEl = window.WC.ui.el(".quiz-stage");
    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.games.common.header("❓", "Quiz Challenge", scoreEl),
      stageEl
    ]);
    window.WC.ui.clear(host);
    host.appendChild(inner);
  }

  function showQuestion() {
    var q = questions[index];
    // build shuffled options that remember their original correctness
    var opts = q.options.map(function (text, i) { return { text: text, correct: i === q.answer }; });
    opts = window.WC.ui.shuffle(opts);

    var answered = false;
    var optionsWrap = window.WC.ui.el(".quiz-options");
    var feedback = window.WC.ui.el(".quiz-feedback");

    opts.forEach(function (opt) {
      var btn = window.WC.ui.el("button.quiz-option", {
        onclick: function () {
          if (answered) return;
          answered = true;
          choose(opt, btn, optionsWrap, feedback, q);
        }
      }, [opt.text]);
      optionsWrap.appendChild(btn);
    });

    var card = window.WC.ui.el(".quiz-card.enter-slide", null, [
      window.WC.ui.el(".quiz-counter", { text: "Question " + (index + 1) + " of " + questions.length }),
      window.WC.ui.el("h2.quiz-question", { text: q.question }),
      optionsWrap,
      feedback
    ]);
    window.WC.ui.clear(stageEl);
    stageEl.appendChild(card);
  }

  function choose(opt, btn, optionsWrap, feedback, q) {
    // reveal correctness on all buttons; lock them
    var buttons = optionsWrap.querySelectorAll("button");
    buttons.forEach(function (b) { b.disabled = true; });

    if (opt.correct) {
      score++;
      scoreEl.textContent = "Score: " + score;
      btn.classList.add("correct");
      btn.appendChild(mark("✓"));
      window.WC.audio.ding();
      feedback.className = "quiz-feedback good show";
      feedback.textContent = "✓ Correct! " + q.explanation;
    } else {
      btn.classList.add("wrong");
      btn.appendChild(mark("✗"));
      window.WC.audio.buzz();
      // highlight the right one so it's a learning moment, not a fail
      buttons.forEach(function (b) {
        if (b.textContent.replace(/[✓✗]/g, "").trim() === q.options[q.answer]) {
          b.classList.add("correct");
          b.appendChild(mark("✓"));
        }
      });
      feedback.className = "quiz-feedback try show";
      feedback.textContent = "The answer is “" + q.options[q.answer] + "”. " + q.explanation;
    }

    var nextBtn = window.WC.ui.el("button.btn.btn--primary.quiz-next", {
      onclick: function () {
        window.WC.audio.blip();
        index++;
        if (index >= questions.length) finish();
        else showQuestion();
      }
    }, [ index + 1 >= questions.length ? "See my score ➡" : "Next question ➡" ]);
    feedback.appendChild(nextBtn);
    nextBtn.focus();
  }

  function mark(sym) {
    return window.WC.ui.el("span.opt-mark", { text: " " + sym, "aria-hidden": "true" });
  }

  function finish() {
    window.WC.games.common.results(host, {
      gameId: "quiz",
      score: score,
      total: questions.length,
      onReplay: start
    });
  }

  function render(h) {
    host = h;
    start();
  }

  return { render: render };
})();
