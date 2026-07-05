/* ============================================================================
 * audio.js — cheerful sound effects made with the Web Audio API.
 * No sound files are needed; tones are generated in code, so it works fully
 * offline. Sounds only start after the first tap (browsers require a gesture).
 * A mute setting is saved so kids can keep it quiet.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.audio = (function () {
  var ctx = null;
  var muted = false;

  function init() {
    muted = window.WC.storage ? window.WC.storage.isMuted() : false;
    // Create the audio context on the first user interaction.
    var start = function () {
      if (!ctx) {
        try {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (AC) ctx = new AC();
        } catch (e) { ctx = null; }
      }
      if (ctx && ctx.state === "suspended") ctx.resume();
    };
    document.addEventListener("pointerdown", start, { once: false });
    document.addEventListener("keydown", start, { once: false });
  }

  // Play a single tone. freq in Hz, dur in seconds.
  function tone(freq, startAt, dur, type, gainPeak) {
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    var t = ctx.currentTime + (startAt || 0);
    var peak = gainPeak == null ? 0.18 : gainPeak;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function play(notes) {
    if (muted || !ctx) return;
    notes.forEach(function (n) {
      tone(n.f, n.t || 0, n.d || 0.15, n.type || "sine", n.g);
    });
  }

  /* ---- named effects ---- */

  // soft tap for buttons
  function blip() {
    play([{ f: 440, t: 0, d: 0.08, type: "triangle", g: 0.12 }]);
  }

  // happy rising "correct!" chime
  function ding() {
    play([
      { f: 660, t: 0.00, d: 0.14, type: "sine" },
      { f: 880, t: 0.10, d: 0.18, type: "sine" }
    ]);
  }

  // gentle (not scary) "try again" tone — a soft low blip
  function buzz() {
    play([
      { f: 300, t: 0.00, d: 0.16, type: "sine", g: 0.14 },
      { f: 240, t: 0.12, d: 0.18, type: "sine", g: 0.14 }
    ]);
  }

  // celebratory little fanfare for winning / finishing
  function fanfare() {
    play([
      { f: 523, t: 0.00, d: 0.16, type: "triangle" },
      { f: 659, t: 0.14, d: 0.16, type: "triangle" },
      { f: 784, t: 0.28, d: 0.16, type: "triangle" },
      { f: 1047, t: 0.42, d: 0.30, type: "triangle" }
    ]);
  }

  // little sparkle when a badge is earned
  function sparkle() {
    play([
      { f: 988, t: 0.00, d: 0.10, type: "sine" },
      { f: 1319, t: 0.08, d: 0.10, type: "sine" },
      { f: 1568, t: 0.16, d: 0.16, type: "sine" }
    ]);
  }

  function toggleMute() {
    muted = !muted;
    if (window.WC.storage) window.WC.storage.setMuted(muted);
    return muted;
  }

  function isMuted() { return muted; }

  return {
    init: init,
    blip: blip,
    ding: ding,
    buzz: buzz,
    fanfare: fanfare,
    sparkle: sparkle,
    toggleMute: toggleMute,
    isMuted: isMuted
  };
})();
