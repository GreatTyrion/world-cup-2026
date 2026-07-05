# World Cup 2026 Kids App — Build Spec

## Role

You are a soccer expert and a professional app designer/developer. Build a fun, educational, kid-friendly app about the FIFA World Cup 2026.

## Project Summary

Build a **local, offline-friendly, single-page web app** that teaches kids ages **7–11** about the 2026 FIFA World Cup (hosted by the USA, Canada, and Mexico). The app should feel like a colorful, playful learning game, not a boring reference site. No sign-up, no backend, no internet dependency after load — everything runs from static files (HTML/CSS/JS) so it can be opened locally or served with a simple static server.

## Target Audience

- Kids aged 7–11, mixed reading levels.
- Assume short attention spans: favor visuals, big buttons, short text, sound/animation feedback over dense paragraphs.
- Should work on a tablet or laptop with mouse/touch. Not required to support tiny phone screens, but should be responsive.
- Parents may sit alongside, so content must be accurate and appropriate (no gambling/betting references, no violence).

## Learning Objectives

The app should help kids:
1. **Learn the countries** competing in World Cup 2026 — flags, names, continents, host cities.
2. **Learn the basic rules of soccer** — positions, fouls, offside, cards, how scoring/winning works, tournament format (groups, knockout).
3. **Learn fun/interesting/amazing facts** about the World Cup (history, records, host countries, 2026-specific facts like it being the first 48-team World Cup).
4. **Play simple games** that reinforce the above (quizzes, matching, memory).

## Core Features

### 1. Home Screen
- Big, colorful welcome screen with a friendly mascot (e.g., a cartoon soccer ball character) and app title.
- Simple nav to 4 main sections: **Countries**, **Rules**, **Fun Facts**, **Games**.
- Background music/sound toggle (optional, default off or low volume) and a mute button.

### 2. Countries Explorer
- Grid/carousel of participating teams with flag, country name, and continent.
- Tap a country to open a simple detail card: flag, nickname (e.g., "Brazil - Seleção"), continent, fun tidbit (best finish, star player kids would recognize, etc.).
- Group/filter by continent or by host country (USA / Canada / Mexico highlighted specially since they co-host).
- Include a short note that 2026 is the first World Cup with 48 teams (up from 32).

### 3. Rules of Soccer (kid-friendly explainer)
- Short, illustrated sections, each digestible in under 30 seconds of reading:
  - Goal of the game (score more goals to win)
  - Basic positions (goalkeeper, defenders, midfielders, forwards) with simple icons/diagrams
  - Fouls & free kicks (simple, non-scary explanation)
  - Yellow card / red card (what they mean)
  - Offside (explained visually/simply — this is the hardest concept, use a simple diagram metaphor)
  - Penalty kicks
  - How the tournament works: group stage → knockout rounds → final (mention 2026 has 12 groups of 4, top teams advance, single-elimination knockout after groups)
- Use analogies kids understand (e.g., "offside is like cutting in line").

### 4. Fun Facts
- A scrollable/swipeable deck of "fact cards" (like flashcards), each with a headline, short 1-2 sentence explanation, and an emoji/icon or illustration.
- Include a mix of:
  - History facts (first World Cup was 1930, most World Cup wins by a country, etc.)
  - 2026-specific facts (first tournament hosted by 3 countries, first 48-team format, matches played in cities across USA/Canada/Mexico, final host stadium)
  - "Wow" facts (fastest goal ever, youngest player, longest match, etc.)
- Consider a "shuffle" or "random fact" button kids can tap repeatedly for delight.

### 5. Games (at least 2–3, simple and replayable)
Pick from (implement at least 3):
- **Flag Match**: match flags to country names (memory-card flip game or drag-and-drop).
- **Quiz Challenge**: multiple-choice quiz mixing rules questions and fun facts, with immediate feedback (correct/incorrect + fun animation/sound), score tracker, and encouraging messages (no harsh "you lost" messaging).
- **Guess the Country**: show a flag or silhouette/outline of a country, kid picks from 3-4 options.
- **Rules Quiz / True-or-False**: simple true/false cards about soccer rules with instant feedback.
- Keep difficulty adjustable or adaptive-lite (e.g., easy/medium mode), and always allow retry — never a dead-end "game over" screen; encourage replay.

## Content & Data Requirements

- Create a structured local data file (e.g., `data/teams.json`, `data/facts.json`, `data/quiz.json`, `data/rules.json`) so content is easy to edit/extend without touching app logic.
- Populate with real, accurate World Cup 2026 info you know:
  - Host nations: USA, Canada, Mexico
  - Tournament dates: June–July 2026
  - Format: 48 teams, 12 groups of 4
  - As many confirmed qualified/participating teams as you can, with flags (use emoji flags or simple SVG/CSS flag representations — no external image downloads required)
- Where exact details are uncertain (e.g., final qualified team list may not be 100% locked), use clearly-labeled illustrative/placeholder data and note it's easy to update later in the data file. Prioritize being correct over guessing.

## Design & UX Guidelines

- **Visual style**: bright, playful, rounded shapes, big tappable buttons, soccer-themed color palette (greens, blues, yellows, plus World Cup gold).
- **Typography**: large, rounded, easy-to-read font; minimal text per screen.
- **Feedback**: use motion/animation and simple sound effects for correct answers, button taps, and page transitions to keep it engaging.
- **Navigation**: always show a clear way back to Home; no dead ends; no more than 2 taps to reach any feature from Home.
- **Accessibility**: good color contrast, avoid relying on color alone for correct/incorrect feedback (add icons like ✓/✗ too), keyboard-navigable where feasible.
- **No ads, no external links, no chat/social features** — this is a closed, safe local app for kids.

## Technical Requirements

- Single-page app using plain **HTML/CSS/JavaScript** (or a lightweight framework like React if you prefer) — no backend server or database required, no login.
- Must run fully offline once loaded (bundle/inline any assets; avoid CDN dependencies where practical).
- Store content in local JSON files for easy editing.
- Should run via a simple static file server or by opening `index.html` directly.
- Keep the codebase organized: separate structure for components/screens, data, styles, and game logic.
- Include a short `README.md` with instructions on how to run the app locally.
- **Always use context7** to look up current documentation/usage before installing or using any package or dependency (e.g., React, build tools, animation libraries). Do not rely on memory for library APIs or install instructions — verify via context7 first.

## Success Criteria

- A 7–11 year old can open the app and, within 1 minute with no adult help, figure out how to explore a country, read a fun fact, and start a game.
- All 4 core sections (Countries, Rules, Fun Facts, Games) are implemented and functional.
- At least 3 playable games with score/feedback and easy replay.
- No dead links, broken states, or console errors.
- Content is age-appropriate, accurate, and encouraging in tone (positive reinforcement, no harsh failure states).

## Stretch Goals (optional, only if time permits)

- Simple progress tracking (e.g., "facts read", "quizzes completed") stored in local storage, with a fun badge/sticker reward system.
- Printable/downloadable "passport" or "sticker album" kids can fill out as they learn about each country.
- Light/dark or "day/night stadium" theme toggle.
- Basic text-to-speech read-aloud for younger/pre-readers.
