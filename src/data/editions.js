// `date` : début (ou date unique si l'édition dure 1 jour).
// `dateEnd` (optionnel) : fin, si l'édition dure plusieurs jours.
// Utilise `editionDateLabel(ed)` pour l'affichage, elle gère les deux
// cas automatiquement — n'accède jamais à `ed.date` seul pour afficher.
export const editions = [
  {
    id: "ep-3",
    number: 3,
    label: "ÉPISODE 3",
    game: "LEAGUE OF LEGENDS",
    date: "30 août",
    dateEnd: null,
    status: "à venir",
    poster: "/edition-posters/ep-3.png",
  },
  {
    id: "ep-2",
    number: 2,
    label: "ÉPISODE 2",
    game: "COUNTER-STRIKE 2",
    date: "22 août",
    dateEnd: "23 août",
    status: "à venir",
    poster: "/edition-posters/ep-2.png",
  },
  {
    id: "ep-1",
    number: 1,
    label: "ÉPISODE 1",
    game: "COUNTER-STRIKE 2",
    date: "18 juillet",
    dateEnd: null,
    status: "terminée",
    poster: "/edition-posters/ep-1.jpg",
  },
];

// Formate la date d'une édition pour l'affichage : "22 août" si un seul
// jour, "22 – 23 août" si `dateEnd` est renseigné.
export function editionDateLabel(ed) {
  if (!ed) return "";
  return ed.dateEnd ? `${ed.date} – ${ed.dateEnd}` : ed.date;
}