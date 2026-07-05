# ⚽ World Cup 2026 — Fun Learning App for Kids

A colorful, offline, single-page web app that teaches kids **ages 7–11** about the
2026 FIFA World Cup (co-hosted by the **USA 🇺🇸, Canada 🇨🇦, and Mexico 🇲🇽**).
It's built to feel like a playful learning game — explore countries, learn the
rules of soccer, flip through fun facts, and play four simple games.

No sign-up, no internet, no ads. Everything runs from plain HTML/CSS/JavaScript.

---

## ▶️ How to run it

You have two easy options — **no installing anything required.**

### Option 1 — Just open it (simplest)
Double-click **`index.html`**. It opens in your web browser and works right away.
The app is built specifically so this works with no server.

### Option 2 — Run a tiny local server (optional)
If you'd rather serve it (some browsers are stricter), run one of these from
inside the project folder, then open the address it prints:

```bash
# Python 3 (comes with macOS / most Linux)
python3 -m http.server 8000
# then visit http://localhost:8000
```

```bash
# Node.js, if you have it
npx serve
```

That's it. The app is the same either way.

---

## 🌐 Put it online (optional — free with GitHub Pages)

Because the app is just static files, it hosts anywhere with **no build step**.
To publish it free on GitHub Pages:

1. Create a new **public** repo on [github.com/new](https://github.com/new) (don't add a README — this project has one).
2. From this folder, push it up:
   ```bash
   git init          # skip if already a repo
   git add -A && git commit -m "World Cup 2026 kids app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/world-cup-2026.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
4. After ~1 minute your app is live at
   `https://<your-username>.github.io/world-cup-2026/`.

The app uses relative paths and hash-based navigation, so it works correctly at
that sub-folder URL with no extra configuration. The included `.nojekyll` file
tells GitHub to serve every file as-is.

> **Tip:** After editing any content, run `git add -A && git commit -m "update" && git push`
> and Pages redeploys automatically.

---

## 🎮 What's inside

| Section | What kids do |
|---|---|
| **🌍 Countries** | Browse the teams, filter by continent or host country, tap a flag for a fun detail card. |
| **📖 Rules** | Short, illustrated explainers — positions, fouls, cards, **offside** (with a simple diagram), penalties, and how the tournament works. |
| **💡 Fun Facts** | A deck of fact "flashcards" with a **Shuffle** button for endless discovery. |
| **🎮 Games** | Four replayable games: **Quiz Challenge**, **Flag Match** (memory), **Guess the Country**, and **True or False**. |

**Kid-friendly by design:** big buttons, cheerful sounds (with a mute toggle 🔊/🔇),
gentle feedback (never a harsh "Game Over"), a Home button on every screen, and a
**sticker/badge collection** that saves your progress on the device.

---

## ✏️ Editing the content (no coding needed)

All the words kids see live in the **`data/`** folder as simple lists. Open any
file in a text editor, change the text between the quotes, and save. The app
updates automatically.

| File | What it holds |
|---|---|
| `data/teams.js` | Countries: name, flag, continent, nickname, fun tidbit. |
| `data/facts.js` | The fun-fact cards. |
| `data/rules.js` | The rule explainer cards. |
| `data/quiz.js`  | Quiz questions **and** True/False statements. |

Each file starts with a short **HOW TO EDIT** comment showing the format.

> **📌 Note on the team list:** `data/teams.js` contains the full, confirmed
> **48-team** field for World Cup 2026, grouped by confederation (3 hosts +
> Europe 16 + Africa 10 + Asia 9 + South America 6 + North/Central America 6 +
> Oceania 1). If FIFA details ever change, or you just want to tweak a nickname
> or fun fact, edit `data/teams.js` — the app updates in seconds.

> **🚩 Note on flags:** Flags are shown as emoji, which look great on Macs, iPads,
> Android, and Chromebooks. A few Windows browsers don't draw flag emojis — for
> those, each flag also shows a 3-letter country code (like `BRA`) as a backup.

---

## 🗂️ Project structure

```
world-cup-2026/
├── index.html          # the single page (loads everything in order)
├── css/styles.css      # all the styling
├── data/               # editable content (teams, facts, rules, quiz)
├── js/
│   ├── ui.js           # small DOM + animation helpers
│   ├── storage.js      # saves progress & badges (localStorage)
│   ├── audio.js        # cheerful sound effects (Web Audio, no files)
│   ├── app.js          # boot + simple hash router + top bar
│   ├── screens/        # home, countries, rules, facts, games menu
│   └── games/          # quiz, flagMatch, guessCountry, trueFalse
└── README.md
```

**Tech:** plain HTML/CSS/JavaScript — no build step, no dependencies, no backend.
Content data is stored in `.js` files (not `.json`) on purpose, so the app loads
correctly even when you just double-click `index.html`.

---

## ♿ Accessibility & safety notes

- Correct/incorrect uses **icons (✓/✗) and words**, not color alone.
- Buttons are real, keyboard-focusable buttons with visible focus rings.
- Honors the system **"reduce motion"** setting.
- No ads, no external links, no chat/social features — a closed, safe local app.

Have fun, and enjoy World Cup 2026! ⚽🏆
