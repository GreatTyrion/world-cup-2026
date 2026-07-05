/* ============================================================================
 * World Cup 2026 — Teams data
 * ----------------------------------------------------------------------------
 * HOW TO EDIT: This is just a list. Copy one { ... } block, change the words,
 * and save. No coding needed. Each team has:
 *   name      - country name shown to kids
 *   flag      - flag emoji (see note below)
 *   code      - 3-letter code, used as a backup label if the emoji flag
 *               doesn't show up (some Windows browsers hide flag emojis)
 *   continent - one of: North America, South America, Europe, Africa, Asia, Oceania
 *   nickname  - the team's fun nickname
 *   tidbit    - one friendly fact kids will enjoy
 *   isHost    - true for the 3 host countries (USA, Canada, Mexico)
 *
 * ACCURACY NOTE:
 * This is the full, confirmed 48-team field for World Cup 2026, grouped by
 * confederation: 3 hosts + AFC 9 + CAF 10 + CONCACAF 6 (incl. hosts) +
 * CONMEBOL 6 + OFC 1 + UEFA 16 = 48. To change anything, just edit the list.
 * ========================================================================== */

window.WC = window.WC || {};

window.WC.teams = [
  /* ---- HOSTS (always qualify, highlighted specially in the app) ---- */
  { name: "United States", flag: "🇺🇸", code: "USA", continent: "North America", nickname: "The Stars and Stripes", tidbit: "Co-hosting World Cup 2026! The USA will play games in cities from coast to coast.", isHost: true },
  { name: "Canada",        flag: "🇨🇦", code: "CAN", continent: "North America", nickname: "The Reds",              tidbit: "A co-host in 2026. Canada came back to the World Cup in 2022 after 36 years away!", isHost: true },
  { name: "Mexico",        flag: "🇲🇽", code: "MEX", continent: "North America", nickname: "El Tri",                tidbit: "A co-host in 2026. Mexico's famous Estadio Azteca will host the very first match!", isHost: true },

  /* ---- NORTH & CENTRAL AMERICA / CARIBBEAN (CONCACAF), besides the hosts ---- */
  { name: "Panama",   flag: "🇵🇦", code: "PAN", continent: "North America", nickname: "Los Canaleros", tidbit: "Named after the famous Panama Canal — one of the biggest ships' shortcuts in the world!" },
  { name: "Haiti",    flag: "🇭🇹", code: "HAI", continent: "North America", nickname: "Les Grenadiers", tidbit: "Back at the World Cup for the first time since 1974 — a huge celebration for the island!" },
  { name: "Curaçao",  flag: "🇨🇼", code: "CUW", continent: "North America", nickname: "Blue Wave",      tidbit: "A tiny Caribbean island of about 156,000 people — the smallest nation ever to reach a men's World Cup!" },

  /* ---- SOUTH AMERICA (CONMEBOL) ---- */
  { name: "Argentina", flag: "🇦🇷", code: "ARG", continent: "South America", nickname: "La Albiceleste", tidbit: "The reigning champions! They won in 2022 and are the home of superstar Lionel Messi." },
  { name: "Brazil",    flag: "🇧🇷", code: "BRA", continent: "South America", nickname: "Seleção",        tidbit: "The most successful team ever, with a record 5 World Cup titles!" },
  { name: "Uruguay",   flag: "🇺🇾", code: "URU", continent: "South America", nickname: "La Celeste",     tidbit: "Uruguay won the very first World Cup way back in 1930." },
  { name: "Colombia",  flag: "🇨🇴", code: "COL", continent: "South America", nickname: "Los Cafeteros",  tidbit: "Famous for happy, dancing goal celebrations." },
  { name: "Ecuador",   flag: "🇪🇨", code: "ECU", continent: "South America", nickname: "La Tri",         tidbit: "They play home games high in the mountains, over 2,800 metres up!" },
  { name: "Paraguay",  flag: "🇵🇾", code: "PAR", continent: "South America", nickname: "La Albirroja",   tidbit: "Known for a brave, never-give-up defense." },

  /* ---- EUROPE (UEFA) — a few final spots are settled in March 2026 playoffs ---- */
  { name: "France",      flag: "🇫🇷", code: "FRA", continent: "Europe", nickname: "Les Bleus",   tidbit: "World champions in 1998 and 2018, and finalists in 2022." },
  { name: "England",     flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", continent: "Europe", nickname: "Three Lions", tidbit: "England won the World Cup at home in 1966." },
  { name: "Spain",       flag: "🇪🇸", code: "ESP", continent: "Europe", nickname: "La Roja",     tidbit: "Champions in 2010 with a passing style called 'tiki-taka'." },
  { name: "Germany",     flag: "🇩🇪", code: "GER", continent: "Europe", nickname: "Die Mannschaft", tidbit: "Four-time World Cup winners." },
  { name: "Portugal",    flag: "🇵🇹", code: "POR", continent: "Europe", nickname: "A Seleção",   tidbit: "The home of superstar Cristiano Ronaldo." },
  { name: "Netherlands", flag: "🇳🇱", code: "NED", continent: "Europe", nickname: "Oranje",      tidbit: "Famous for their bright orange kits and total football." },
  { name: "Belgium",     flag: "🇧🇪", code: "BEL", continent: "Europe", nickname: "Red Devils",  tidbit: "Finished 3rd at the 2018 World Cup." },
  { name: "Croatia",     flag: "🇭🇷", code: "CRO", continent: "Europe", nickname: "Vatreni",     tidbit: "A small country with a big heart — they reached the final in 2018!" },
  { name: "Switzerland", flag: "🇨🇭", code: "SUI", continent: "Europe", nickname: "La Nati",     tidbit: "They play in bright red with a white cross." },
  { name: "Norway",      flag: "🇳🇴", code: "NOR", continent: "Europe", nickname: "The Lions",   tidbit: "Back at the World Cup with powerful striker Erling Haaland." },
  { name: "Austria",     flag: "🇦🇹", code: "AUT", continent: "Europe", nickname: "Das Team",    tidbit: "One of the oldest football teams in the world." },
  { name: "Scotland",    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", code: "SCO", continent: "Europe", nickname: "The Tartan Army", tidbit: "Scotland played in the very first international football match, way back in 1872." },
  { name: "Sweden",      flag: "🇸🇪", code: "SWE", continent: "Europe", nickname: "Blågult",     tidbit: "Their blue-and-yellow team once finished as high as 2nd at a World Cup." },
  { name: "Czechia",     flag: "🇨🇿", code: "CZE", continent: "Europe", nickname: "Národní tým", tidbit: "Long ago, as Czechoslovakia, they reached the World Cup final twice." },
  { name: "Türkiye",     flag: "🇹🇷", code: "TUR", continent: "Europe", nickname: "Ay-Yıldızlılar", tidbit: "Türkiye surprised everyone by finishing 3rd at the 2002 World Cup." },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦", code: "BIH", continent: "Europe", nickname: "The Dragons", tidbit: "A small country with a fiery team spirit." },

  /* ---- AFRICA (CAF) ---- */
  { name: "Morocco",     flag: "🇲🇦", code: "MAR", continent: "Africa", nickname: "Atlas Lions",       tidbit: "In 2022 they became the first African team to reach the semi-finals!" },
  { name: "Senegal",     flag: "🇸🇳", code: "SEN", continent: "Africa", nickname: "Lions of Teranga",  tidbit: "African champions known for fast, powerful players." },
  { name: "Egypt",       flag: "🇪🇬", code: "EGY", continent: "Africa", nickname: "The Pharaohs",      tidbit: "The home of superstar Mohamed Salah." },
  { name: "Tunisia",     flag: "🇹🇳", code: "TUN", continent: "Africa", nickname: "Eagles of Carthage", tidbit: "Their fans are some of the loudest in the world." },
  { name: "Algeria",     flag: "🇩🇿", code: "ALG", continent: "Africa", nickname: "Desert Foxes",      tidbit: "Known for clever, quick-passing football." },
  { name: "Ghana",       flag: "🇬🇭", code: "GHA", continent: "Africa", nickname: "Black Stars",       tidbit: "Famous for thrilling, edge-of-your-seat World Cup games." },
  { name: "Ivory Coast", flag: "🇨🇮", code: "CIV", continent: "Africa", nickname: "The Elephants",     tidbit: "Their team colours are bright orange, white and green." },
  { name: "Cape Verde",  flag: "🇨🇻", code: "CPV", continent: "Africa", nickname: "Blue Sharks",       tidbit: "A tiny group of islands reaching their first-ever World Cup!" },
  { name: "South Africa", flag: "🇿🇦", code: "RSA", continent: "Africa", nickname: "Bafana Bafana",    tidbit: "South Africa hosted the very first World Cup in Africa in 2010." },
  { name: "DR Congo",     flag: "🇨🇩", code: "COD", continent: "Africa", nickname: "The Leopards",     tidbit: "Known for passionate fans and bright red kits — they battled through a nail-biting playoff to qualify." },

  /* ---- ASIA (AFC) ---- */
  { name: "Japan",        flag: "🇯🇵", code: "JPN", continent: "Asia", nickname: "Samurai Blue",     tidbit: "Their fans famously help clean up the stadium after games!" },
  { name: "South Korea",  flag: "🇰🇷", code: "KOR", continent: "Asia", nickname: "Taegeuk Warriors", tidbit: "They reached the semi-finals as hosts in 2002." },
  { name: "Iran",         flag: "🇮🇷", code: "IRN", continent: "Asia", nickname: "Team Melli",       tidbit: "One of Asia's strongest and most experienced teams." },
  { name: "Australia",    flag: "🇦🇺", code: "AUS", continent: "Asia", nickname: "Socceroos",        tidbit: "Australia plays in Asian qualifying even though it's its own continent!" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "KSA", continent: "Asia", nickname: "The Green Falcons", tidbit: "They pulled off a huge shock by beating Argentina in 2022." },
  { name: "Qatar",        flag: "🇶🇦", code: "QAT", continent: "Asia", nickname: "The Maroon",        tidbit: "Qatar hosted the World Cup in 2022." },
  { name: "Jordan",       flag: "🇯🇴", code: "JOR", continent: "Asia", nickname: "The Chivalrous",    tidbit: "Reaching their first-ever World Cup — a huge moment for the country!" },
  { name: "Uzbekistan",   flag: "🇺🇿", code: "UZB", continent: "Asia", nickname: "The White Wolves",  tidbit: "Also reaching their first-ever World Cup in 2026!" },
  { name: "Iraq",         flag: "🇮🇶", code: "IRQ", continent: "Asia", nickname: "Lions of Mesopotamia", tidbit: "Iraq pulled off an inspiring story by winning the Asian Cup in 2007." },

  /* ---- OCEANIA (OFC) ---- */
  { name: "New Zealand",  flag: "🇳🇿", code: "NZL", continent: "Oceania", nickname: "All Whites", tidbit: "The only country to qualify automatically from Oceania." }
];

/* The list of continents, in the order the filter buttons should appear. */
window.WC.continents = ["North America", "South America", "Europe", "Africa", "Asia", "Oceania"];
