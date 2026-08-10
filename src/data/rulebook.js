// Règlement du tournoi, bilingue (fr/en). Chaque section/article a un
// titre et un texte dans les deux langues — c'est du contenu, pas des
// noms propres, donc ça se traduit.
export const rulebook = [
  {
    section: { fr: "Format & inscriptions", en: "Format & registration" },
    articles: [
      {
        num: "1.1",
        title: { fr: "Composition des équipes", en: "Team composition" },
        text: {
          fr: "Chaque roster compte au minimum 2 femmes ou personnes issues des minorités de genre.",
          en: "Each roster includes at least 2 women or people from gender minorities.",
        },
      },
      {
        num: "1.2",
        title: { fr: "Inscriptions", en: "Registration" },
        text: {
          fr: "Contactez raredidou en DM sur Discord pour inscrire votre équipe.",
          en: "DM raredidou on Discord to register your team.",
        },
      },
      {
        num: "1.3",
        title: { fr: "Délai d'inscription", en: "Registration deadline" },
        text: {
          fr: "Les inscriptions doivent être bouclées au plus tard la veille du tournoi.",
          en: "Registration must be completed by the day before the tournament at the latest.",
        },
      },
      {
        num: "1.4",
        title: { fr: "Roster incomplet", en: "Incomplete roster" },
        text: {
          fr: "Direction le salon de seek sur le Discord.",
          en: "Head to the seek channel on Discord.",
        },
      },
      {
        num: "1.5",
        title: { fr: "Confirmation", en: "Confirmation" },
        text: {
          fr: "Chaque équipe doit être confirmée sur Challengermode avant le vendredi soir précédant le tournoi.",
          en: "Each team must be confirmed on Challengermode by the Friday evening before the tournament.",
        },
      },
    ],
  },
  {
    section: { fr: "Comportement & code de conduite", en: "Conduct & code of behavior" },
    articles: [
      {
        num: "2.1",
        title: { fr: "Tolérance zéro", en: "Zero tolerance" },
        text: {
          fr: "Aucune tolérance envers le racisme, la misogynie, la transphobie, l'homophobie ou tout propos discriminant.",
          en: "No tolerance for racism, misogyny, transphobia, homophobia, or any discriminatory remarks.",
        },
      },
      {
        num: "2.2",
        title: { fr: "Toxicité", en: "Toxicity" },
        text: {
          fr: "Zéro tolérance sur la toxicité en général.",
          en: "Zero tolerance for toxicity in general.",
        },
      },
      {
        num: "2.3",
        title: { fr: "Litiges sportifs", en: "In-game disputes" },
        text: {
          fr: "En cas de désaccord, les équipes communiquent normalement entre elles.",
          en: "In case of disagreement, teams are expected to communicate normally with each other.",
        },
      },
      {
        num: "2.4",
        title: { fr: "Signalement", en: "Reporting" },
        text: {
          fr: "Tout problème doit être signalé immédiatement à la modération.",
          en: "Any issue must be reported to the moderation team immediately.",
        },
      },
      {
        num: "2.5",
        title: { fr: "Sanctions", en: "Sanctions" },
        text: {
          fr: "Tout comportement allant à l'encontre de ces valeurs peut entraîner une exclusion du tournoi.",
          en: "Any behavior that goes against these values can result in exclusion from the tournament.",
        },
      },
    ],
  },
  {
    section: { fr: "Déroulé du tournoi", en: "Tournament schedule" },
    articles: [
      {
        num: "3.1",
        title: { fr: "Horaire des matchs", en: "Match schedule" },
        text: {
          fr: "Premier round à 13h00 (BO1), grande finale à 21h00 (BO3).",
          en: "First round at 1:00 PM (BO1), grand final at 9:00 PM (BO3).",
        },
      },
      {
        num: "3.2",
        title: { fr: "Serveur de pracc", en: "Practice server" },
        text: {
          fr: "Un serveur de practice est mis à disposition en amont, infos partagées sur le Discord.",
          en: "A practice server is made available ahead of time, details shared on Discord.",
        },
      },
      {
        num: "3.3",
        title: { fr: "Diffusion", en: "Broadcast" },
        text: {
          fr: "Le maximum de matchs possible est casté et diffusé en direct.",
          en: "As many matches as possible are casted and streamed live.",
        },
      },
    ],
  },
];