// ─────────────────────────────────────────────────────────────
// TEXTES DE L'INTERFACE — clé → { fr, en }. Les noms de joueur·ses,
// d'équipes, de pays etc. restent dans les fichiers de données et ne
// passent JAMAIS par ce dictionnaire (ce sont des noms propres, pas du
// texte d'interface).
// ─────────────────────────────────────────────────────────────

export const strings = {
  // Identité
  site_tagline: { fr: "Féministe et inclusif.", en: "Feminist and inclusive." },
  site_meaning: {
    fr: "« Jîn » signifie « vie » et « femme » en kurde.",
    en: "\u201cJ\u00een\u201d means \u201clife\u201d and \u201cwoman\u201d in Kurdish.",
  },

  // Nav
  nav_home: { fr: "Accueil", en: "Home" },
  nav_editions: { fr: "Éditions", en: "Editions" },
  nav_palmares: { fr: "Hall of Fame", en: "Hall of Fame" },
  nav_rulebook: { fr: "Règlement", en: "Rules" },
  nav_discord: { fr: "Discord", en: "Discord" },

  // Home
  home_intro: {
    fr: "Un tournoi CS2 antifasciste, organisé bénévolement, loin de la toxicité qui gangrène le reste de la scène. Un espace sûr n'est pas un slogan, c'est une exigence.",
    en: "An antifascist CS2 tournament, run entirely by volunteers, far from the toxicity that plagues the rest of the scene. A safe space isn't a slogan, it's a requirement.",
  },
  home_join_discord: { fr: "Rejoindre le Discord", en: "Join the Discord" },
  home_view_editions: { fr: "Voir les éditions", en: "See the editions" },
  home_read_rulebook: { fr: "Lire le règlement", en: "Read the rulebook" },
  stat_editions_run: { fr: "Éditions organisées", en: "Editions run" },
  stat_teams: { fr: "Équipes ayant participé", en: "Teams that took part" },
  stat_unique_players: { fr: "Joueur·ses uniques", en: "Unique players" },
  stat_next_edition: { fr: "Prochaine édition", en: "Next edition" },
  home_cta: {
    fr: "On ne demande pas notre place, on la crée.",
    en: "We don't ask for our place, we create it.",
  },

  // Editions
  editions_title: { fr: "Éditions", en: "Editions" },
  editions_intro: {
    fr: "Chaque édition regroupe son règlement propre, ses équipes et ses statistiques. Clique sur une édition pour tout voir.",
    en: "Each edition has its own rules, teams and statistics. Click an edition to see everything.",
  },
  team_singular: { fr: "équipe", en: "team" },
  team_plural: { fr: "équipes", en: "teams" },
  status_upcoming: { fr: "à venir", en: "upcoming" },
  status_ongoing: { fr: "en cours", en: "ongoing" },
  status_done: { fr: "terminée", en: "finished" },

  // Edition detail
  back_to_editions: { fr: "← Éditions", en: "← Editions" },
  section_teams: { fr: "Équipes", en: "Teams" },
  section_stats: { fr: "Stats", en: "Stats" },
  no_teams_yet: {
    fr: "Aucune équipe enregistrée pour cette édition.",
    en: "No team registered for this edition yet.",
  },
  no_stats_yet: {
    fr: "Aucune statistique pour cette édition.",
    en: "No statistics for this edition yet.",
  },
  col_player: { fr: "Joueur·se", en: "Player" },
  col_team: { fr: "Équipe", en: "Team" },
  col_maps: { fr: "Maps", en: "Maps" },
  col_rounds: { fr: "Rounds", en: "Rounds" },
  col_kd_diff: { fr: "K-D Diff", en: "K-D Diff" },
  col_kd: { fr: "K/D", en: "K/D" },
  col_rating: { fr: "Rating", en: "Rating" },
  tag_coach: { fr: "Coach", en: "Coach" },
  tag_sub: { fr: "Sub", en: "Sub" },
  tag_mvp: { fr: "MVP", en: "MVP" },
  tag_evp: { fr: "EVP", en: "EVP" },
  tag_winner: { fr: "Vainqueur", en: "Winner" },
  edition_not_found: { fr: "Cette édition n'existe pas.", en: "This edition doesn't exist." },
  back_to_editions_full: { fr: "← Retour aux éditions", en: "← Back to editions" },

  // Rulebook
  rulebook_title: { fr: "Règlement", en: "Rulebook" },
  rulebook_intro: {
    fr: "Ce règlement encadre le déroulement du tournoi et les conditions de participation. Il est amené à être complété au fil des éditions.",
    en: "This rulebook governs how the tournament runs and the conditions for taking part. It will be expanded as new editions happen.",
  },

  // Palmarès
  palmares_title: { fr: "Hall of Fame", en: "Hall of Fame" },
  palmares_intro: {
    fr: "Vainqueur·ses, MVP et EVP de chaque édition, plus un classement individuel toutes éditions confondues.",
    en: "Winners, MVPs and EVPs of every edition, plus an individual leaderboard across all editions.",
  },
  palmares_leaderboard_title: { fr: "Classement individuel", en: "Individual leaderboard" },
  palmares_no_data: { fr: "Pas encore assez de données.", en: "Not enough data yet." },
  col_titles: { fr: "Titres", en: "Titles" },
  palmares_by_edition_title: { fr: "Par édition", en: "By edition" },
  label_winner: { fr: "Vainqueur", en: "Winner" },

  // Multi POV
  nav_multipov: { fr: "Multi POV", en: "Multi POV" },
  multipov_title: { fr: "Multi POV", en: "Multi POV" },
  multipov_intro: {
    fr: "Ajoute les chaînes Twitch du tournoi pour suivre plusieurs points de vue en même temps. Les personnes en live remontent automatiquement en haut.",
    en: "Add the tournament's Twitch channels to follow several points of view at once. Live channels automatically move to the top.",
  },
  multipov_input_placeholder: {
    fr: "Nom de chaîne ou lien twitch.tv/…",
    en: "Channel name or twitch.tv/… link",
  },
  multipov_add: { fr: "Ajouter", en: "Add" },
  multipov_empty: { fr: "Aucune chaîne pour l'instant.", en: "No channel yet." },
  multipov_error: {
    fr: "Impossible de vérifier les chaînes en live pour le moment.",
    en: "Couldn't check live status right now.",
  },
  multipov_live: { fr: "Live", en: "Live" },
  multipov_viewers: { fr: "viewers", en: "viewers" },
  multipov_remove: { fr: "Retirer", en: "Remove" },
  multipov_count_channels: {
    fr: "chaîne suivie",
    en: "channel followed",
  },
  multipov_count_channels_plural: {
    fr: "chaînes suivies",
    en: "channels followed",
  },
  multipov_count_live: { fr: "en live", en: "live" },
};

export function t(key, lang) {
  return strings[key]?.[lang] ?? strings[key]?.fr ?? key;
}