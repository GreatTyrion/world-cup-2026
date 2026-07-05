/* ============================================================================
 * trueFalse.js — simple True/False cards about soccer & the World Cup.
 * ========================================================================== */

window.WC = window.WC || {};
window.WC.games = window.WC.games || {};

window.WC.games.trueFalse = (function () {
  var host, stageEl, scoreEl;
  var items, index, score;

  function start() {
    items = window.WC.ui.shuffle(window.WC.trueFalse);
    index = 0; score = 0;

    scoreEl = window.WC.games.common.scoreChip("Score: 0");
    stageEl = window.WC.ui.el(".tf-stage");
    var inner = window.WC.ui.el(".screen-inner", null, [
      window.WC.games.common.header("🤔", "True or False", scoreEl),
      stageEl
    ]);
    window.WC.ui.clear(host);
    host.appendChild(inner);
    showItem();
  }

  function showItem() {
    var item = items[index];
    var answered = false;
    var feedback = window.WC.ui.el(".quiz-feedback");
    var btnRow = window.WC.ui.el(".tf-buttons");

    var trueBtn = window.WC.ui.el("button.tf-btn.tf-true", {
      onclick: function () { if (!answered) { answered = true; choose(true, item, trueBtn, falseBtn, feedback); } }
    }, ["👍 True"]);
    var falseBtn = window.WC.ui.el("button.tf-btn.tf-false", {
      onclick: function () { if (!answered) { answered = true; choose(false, item, trueBtn, falseBtn, feedback); } }
    }, ["👎 False"]);
    btnRow.appendChild(trueBtn);
    btnRow.appendChild(falseBtn);

    var card = window.WC.ui.el(".tf-card.enter-slide", null, [
      window.WC.ui.el(".quiz-counter", { text: "Card " + (index + 1) + " of " + items.length }),
      window.WC.ui.el(".tf-emoji", { text: "🤔", "aria-hidden": "true" }),
      window.WC.ui.el("h2.tf-statement", { text: item.statement }),
      btnRow,
      feedback
    ]);
    window.WC.ui.clear(stageEl);
    stageEl.appendChild(card);
  }

  function choose(pick, item, trueBtn, falseBtn, feedback) {
    trueBtn.disabled = true;
    falseBtn.disabled = true;
    var correctBtn = item.answer ? trueBtn : falseBtn;
    var chosenBtn = pick ? trueBtn : falseBtn;

    if (pick === item.answer) {
      score++;
      scoreEl.textContent = "Score: " + score;
      chosenBtn.classList.add("correct");
      window.WC.audio.ding();
      feedback.className = "quiz-feedback good show";
      feedback.textContent = "✓ Correct! " + item.explanation;
    } else {
      chosenBtn.classList.add("wrong");
      correctBtn.classList.add("correct");
      window.WC.audio.buzz();
      feedback.className = "quiz-feedback try show";
      feedback.textContent = "✗ The answer was " + (item.answer ? "True" : "False") + ". " + item.explanation;
    }

    var nextBtn = window.WC.ui.el("button.btn.btn--primary.quiz-next", {
      onclick: function () {
        window.WC.audio.blip();
        index++;
        if (index >= items.length) finish();
        else showItem();
      }
    }, [ index + 1 >= items.length ? "See my score ➡" : "Next ➡" ]);
    feedback.appendChild(nextBtn);
    nextBtn.focus();
  }

  function finish() {
    window.WC.games.common.results(host, {
      gameId: "trueFalse",
      score: score,
      total: items.length,
      onReplay: start
    });
  }

  function render(h) { host = h; start(); }

  return { render: render };
})();
