/* ============================================================================
 * ui.js — small shared helpers used by every screen and game.
 * No frameworks, no imports. Everything hangs off the global WC.ui object.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.ui = (function () {
  /* el("button.big#go", { onclick: fn }, ["Play", iconEl])
   * A tiny helper to build DOM elements without writing document.createElement
   * a hundred times. The first argument is a CSS-ish string: "tag.class.class#id".
   * The second is a map of properties/attributes. The third is child text/nodes. */
  function el(spec, props, children) {
    var parts = String(spec || "div");
    var tag = "div";
    var classes = [];
    var id = null;

    // pull the tag name (before any . or #)
    var m = parts.match(/^[a-zA-Z0-9]+/);
    if (m) { tag = m[0]; parts = parts.slice(m[0].length); }

    // pull .classes and #id
    parts.replace(/([.#])([a-zA-Z0-9_-]+)/g, function (_, kind, val) {
      if (kind === ".") classes.push(val); else id = val;
      return "";
    });

    var node = document.createElement(tag);
    if (classes.length) node.className = classes.join(" ");
    if (id) node.id = id;

    if (props) {
      Object.keys(props).forEach(function (key) {
        var value = props[key];
        if (value == null) return;
        if (key === "onclick" || key.indexOf("on") === 0 && typeof value === "function") {
          node.addEventListener(key.slice(2), value);
        } else if (key === "html") {
          node.innerHTML = value;
        } else if (key === "text") {
          node.textContent = value;
        } else if (key === "class") {
          node.className = value;
        } else if (key in node && key !== "style" && key !== "list") {
          try { node[key] = value; } catch (e) { node.setAttribute(key, value); }
        } else {
          node.setAttribute(key, value);
        }
      });
    }

    appendChildren(node, children);
    return node;
  }

  function appendChildren(node, children) {
    if (children == null) return;
    if (!Array.isArray(children)) children = [children];
    children.forEach(function (child) {
      if (child == null || child === false) return;
      if (typeof child === "string" || typeof child === "number") {
        node.appendChild(document.createTextNode(String(child)));
      } else {
        node.appendChild(child);
      }
    });
  }

  /* Remove everything inside a node. */
  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  /* Return a NEW shuffled copy of an array (Fisher–Yates). */
  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  /* Pick n random items from a list (no repeats). */
  function sample(list, n) {
    return shuffle(list).slice(0, n);
  }

  /* Pick one random item. */
  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /* A cheerful, kid-friendly "well done" line for scores. */
  function encourage(score, total) {
    var ratio = total ? score / total : 0;
    if (ratio === 1) return "Perfect! You're a World Cup superstar! 🌟";
    if (ratio >= 0.7) return "Awesome job! You really know your stuff! 🎉";
    if (ratio >= 0.4) return "Nice work! Keep playing to learn even more! 👍";
    return "Great try! Every play makes you better. Give it another go! 💪";
  }

  /* Burst of confetti for wins. Pure DOM + CSS, cleans itself up. */
  function confetti() {
    var colors = ["#2ecc71", "#3498db", "#f1c40f", "#e67e22", "#e74c3c", "#9b59b6"];
    var layer = el(".confetti-layer");
    for (var i = 0; i < 40; i++) {
      var piece = el(".confetti-piece");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = (Math.random() * 0.4) + "s";
      piece.style.animationDuration = (0.9 + Math.random() * 0.8) + "s";
      layer.appendChild(piece);
    }
    document.body.appendChild(layer);
    setTimeout(function () {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    }, 2200);
  }

  /* Briefly bump an element for a little pop of feedback. */
  function pop(node) {
    node.classList.remove("pop");
    // force reflow so the animation can restart
    void node.offsetWidth;
    node.classList.add("pop");
  }

  return {
    el: el,
    clear: clear,
    shuffle: shuffle,
    sample: sample,
    pick: pick,
    encourage: encourage,
    confetti: confetti,
    pop: pop
  };
})();
