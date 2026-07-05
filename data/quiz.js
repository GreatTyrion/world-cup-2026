/* ============================================================================
 * World Cup 2026 — Quiz & True/False questions
 * ----------------------------------------------------------------------------
 * HOW TO EDIT:
 *  - Multiple-choice questions (window.WC.quiz): each has a question, a list of
 *    options, the answer number (0 = first option), and a friendly explanation.
 *  - True/False questions (window.WC.trueFalse): a statement, whether it's true,
 *    and an explanation.
 * Keep questions kind and encouraging. There are no trick questions here.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.quiz = [
  { question: "How many countries are hosting World Cup 2026?", options: ["1", "2", "3", "5"], answer: 2, explanation: "Three! The USA, Canada, and Mexico share hosting duties." },
  { question: "How many teams play in World Cup 2026?", options: ["16", "32", "48", "64"], answer: 2, explanation: "48 teams — the most ever in a World Cup!" },
  { question: "Which player can use their hands during play?", options: ["The captain", "The goalkeeper", "The forward", "Nobody"], answer: 1, explanation: "Only the goalkeeper, and only near their own net." },
  { question: "What does a red card mean?", options: ["Great job!", "A warning", "You must leave the game", "Half-time"], answer: 2, explanation: "A red card means that player is out for the rest of the game." },
  { question: "Which country has won the most World Cups?", options: ["Germany", "Brazil", "Argentina", "France"], answer: 1, explanation: "Brazil, with a record 5 titles!" },
  { question: "How do you win a game of soccer?", options: ["Run the fastest", "Score the most goals", "Have the most players", "Cheer the loudest"], answer: 1, explanation: "The team with more goals when time runs out wins." },
  { question: "How many players are on a team on the field?", options: ["7", "9", "11", "15"], answer: 2, explanation: "Each team plays with 11 players, including the goalkeeper." },
  { question: "What year was the very first World Cup?", options: ["1930", "1966", "1994", "2010"], answer: 0, explanation: "The first World Cup was in 1930, in Uruguay." },
  { question: "A yellow card is a...", options: ["Reward", "Warning", "Goal", "Time-out"], answer: 1, explanation: "A yellow card is a warning to be more careful." },
  { question: "How many groups are there in World Cup 2026?", options: ["8 groups", "10 groups", "12 groups", "16 groups"], answer: 2, explanation: "12 groups of 4 teams each." },
  { question: "Which city hosts the opening match in 2026?", options: ["Toronto", "Mexico City", "Miami", "Seattle"], answer: 1, explanation: "Mexico City's Estadio Azteca hosts the very first game." },
  { question: "What happens if you are 'offside'?", options: ["You score double", "The goal doesn't count", "You get a penalty", "Nothing"], answer: 1, explanation: "An offside goal doesn't count — you can't sneak too far ahead." },
  { question: "The reigning World Cup champions are...", options: ["Spain", "Argentina", "England", "Japan"], answer: 1, explanation: "Argentina won the last World Cup in 2022!" },
  { question: "How often is the World Cup held?", options: ["Every year", "Every 2 years", "Every 4 years", "Every 10 years"], answer: 2, explanation: "Once every four years — that's why it's so special." },
  { question: "What is Mexico's team nickname?", options: ["El Tri", "The Reds", "Oranje", "Samurai Blue"], answer: 0, explanation: "Mexico's team is nicknamed 'El Tri'." },
  { question: "A penalty kick is taken against the...", options: ["Referee", "Goalkeeper", "Whole team", "Coach"], answer: 1, explanation: "It's one player versus the goalkeeper — a big chance to score!" }
];

window.WC.trueFalse = [
  { statement: "World Cup 2026 has more teams than ever before.", answer: true,  explanation: "True! 48 teams play, up from 32." },
  { statement: "The goalkeeper can pick up the ball anywhere on the field.", answer: false, explanation: "False. Only near their own net." },
  { statement: "A red card means the player must leave the game.", answer: true,  explanation: "True! And their team must play with one fewer player." },
  { statement: "Only two countries are hosting the 2026 World Cup.", answer: false, explanation: "False — three countries: USA, Canada, and Mexico." },
  { statement: "Brazil has won the most World Cups of any country.", answer: true,  explanation: "True — Brazil has 5 titles." },
  { statement: "You can use your hands to score a goal.", answer: false, explanation: "False — use feet, head, or chest, but not your hands!" },
  { statement: "The World Cup happens every single year.", answer: false, explanation: "False — it happens every four years." },
  { statement: "A yellow card is a warning.", answer: true,  explanation: "True! It means 'be careful'." },
  { statement: "The first World Cup was played in 1930.", answer: true,  explanation: "True — in Uruguay, who then won it!" },
  { statement: "In offside, sneaking too far ahead is not allowed.", answer: true,  explanation: "True — it's a bit like cutting in line." }
];
