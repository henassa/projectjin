// ─────────────────────────────────────────────────────────────
// ÉDITIONS DU TOURNOI — une entrée par édition. Les équipes et les
// stats sont dans des fichiers séparés (teams.js et stats.js), reliées
// via `editionId`.
// ─────────────────────────────────────────────────────────────

export const editions = [
  {
    id: "ep-3",
    number: 3,
    label: "ÉPISODE 3",
    game: "COUNTER-STRIKE 2",
    date: "29 août",
    status: "à venir",
    poster: "/edition-posters/ep-3.png",
  },
  {
    id: "ep-2",
    number: 2,
    label: "ÉPISODE 2",
    game: "COUNTER-STRIKE 2",
    date: "22 août",
    status: "à venir",
    poster: "/edition-posters/ep-2.png",
  },
  {
    id: "ep-1",
    number: 1,
    label: "ÉPISODE 1",
    game: "COUNTER-STRIKE 2",
    date: "18 juillet",
    status: "terminée", // "à venir" | "en cours" | "terminée"
    poster: "/edition-posters/ep-1.jpg", // visuel d'annonce ; laisse `null` si tu n'en as pas encore
  },

  // Ajoute une nouvelle édition ici quand le tournoi suivant est lancé.
  // `game` : le nom du jeu affiché sur l'édition (ex. "COUNTER-STRIKE 2",
  // "LEAGUE OF LEGENDS"...) — utile le jour où le format change de jeu.
];