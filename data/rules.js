/* ============================================================================
 * World Cup 2026 — Rules of Soccer, explained for kids
 * ----------------------------------------------------------------------------
 * HOW TO EDIT: Each rule is one { ... } block. Keep the text short and friendly.
 * Fields:
 *   emoji    - a big icon for the section
 *   title    - the section heading
 *   text     - the simple explanation (1–3 short sentences)
 *   analogy  - (optional) an everyday comparison kids understand
 *   diagram  - (optional) the special key: "positions" or "offside" draws a
 *              little picture. Leave it out for normal cards.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.rules = [
  {
    emoji: "🥅",
    title: "The Goal of the Game",
    text: "Two teams try to kick the ball into the other team's net. Each ball in the net is one goal. Whoever scores more goals wins!",
    analogy: "It's a race to see who can score the most before time runs out."
  },
  {
    emoji: "👕",
    title: "The Players & Positions",
    text: "Each team has 11 players. The goalkeeper guards the net, defenders protect the goal, midfielders run everywhere, and forwards try to score.",
    diagram: "positions"
  },
  {
    emoji: "🧤",
    title: "Only the Keeper Uses Hands",
    text: "The goalkeeper is the only player allowed to catch the ball with their hands — and only near their own net. Everyone else uses feet, chest, or head.",
    analogy: "Hands are the goalkeeper's superpower. No one else gets it!"
  },
  {
    emoji: "🙅",
    title: "Fouls & Free Kicks",
    text: "A foul is when a player breaks a rule, like tripping or pushing. The other team then gets a free kick to start again — nobody gets hurt or in big trouble.",
    analogy: "It's like a 'do-over' given to the team that was treated unfairly."
  },
  {
    emoji: "🟨",
    title: "The Yellow Card",
    text: "The referee shows a yellow card as a warning for a bad foul. It means 'be careful — no more of that!'",
    analogy: "A yellow card is like a warning: 'Please stop, or there will be trouble.'"
  },
  {
    emoji: "🟥",
    title: "The Red Card",
    text: "A red card is for a very bad foul, or a second yellow card. That player has to leave the game and can't be replaced, so their team plays with fewer players.",
    analogy: "Red means 'you're out for today' — the strongest referee decision."
  },
  {
    emoji: "🚫",
    title: "Offside",
    text: "An attacker must have at least two opponents (usually the goalkeeper and one defender) between them and the goal when the ball is passed to them. If they sneak too far ahead, it's offside and the goal doesn't count.",
    analogy: "Offside is like cutting in line — you can't wait past everyone to grab the ball early!",
    diagram: "offside"
  },
  {
    emoji: "🎯",
    title: "Penalty Kicks",
    text: "For a serious foul very close to the net, the other team gets a penalty: one player against the goalkeeper, kicking from a special spot. It's a huge chance to score!",
    analogy: "A penalty is a one-on-one showdown: striker versus goalkeeper."
  },
  {
    emoji: "🏆",
    title: "How the Tournament Works",
    text: "The 48 teams are split into 12 groups of 4. Teams play everyone in their group. The best teams move on to the knockout rounds, where the loser goes home each game — until two teams reach the grand final!",
    analogy: "First it's like a league with friends, then it becomes a single-elimination showdown."
  }
];
