// Règlement du tournoi. Chaque section contient une liste d'articles
// (titre + texte), affichés de façon naturelle, sans numérotation
// visible. Le champ `num` est gardé pour référence interne/tri, mais
// n'est plus affiché sur le site.

export const rulebook = [
  {
    section: "Format & inscriptions",
    articles: [
      {
        num: "1.1",
        title: "Composition des équipes",
        text: "Chaque roster compte au minimum 2 femmes ou personnes issues des minorités de genre. Tous les joueur·se·s de l'équipe doivent être présent·e·s sur le Discord du tournoi.",
      },
      {
        num: "1.2",
        title: "Inscriptions",
        text: "Contactez raredidou en DM sur Discord pour inscrire votre équipe. À fournir : nom de l'équipe, logo, Discord de chaque joueur·se, profil Steam de chaque joueur·se, nationalité de chaque joueur·se (sous-nationalité si souhaité), présence d'un·e remplaçant·e éventuel·le, et compte Twitter de chaque joueur·se si vous souhaitez être cité·es dans les annonces d'équipes.",
      },
      {
        num: "1.3",
        title: "Délai d'inscription",
        text: "Les inscriptions doivent être bouclées au plus tard le 21 août, la veille du tournoi.",
      },
      {
        num: "1.4",
        title: "Roster incomplet",
        text: "Si vous cherchez des joueur·se·s pour compléter votre équipe, direction le salon de seek sur le Discord : vous pouvez vous y déclarer disponible, ou recruter directement vos futur·es coéquipier·es.",
      },
      {
        num: "1.5",
        title: "Confirmation",
        text: "Chaque équipe doit être confirmée sur Challengermode avant le vendredi soir précédant le tournoi. Aucune installation d'application ni d'anti-cheat n'est nécessaire côté Challengermode. Un·e remplaçant·e éventuel·le peut être déclaré·e dès l'inscription.",
      },
    ],
  },
  {
    section: "Comportement & code de conduite",
    articles: [
      {
        num: "2.1",
        title: "Tolérance zéro",
        text: "Aucune tolérance envers le racisme, la misogynie, la transphobie, l'homophobie ou tout propos discriminant, avant, pendant ou après les matchs.",
      },
      {
        num: "2.2",
        title: "Toxicité",
        text: "Zéro tolérance sur la toxicité en général : insultes, harcèlement, comportements toxiques envers son équipe ou l'équipe adverse.",
      },
      {
        num: "2.3",
        title: "Litiges sportifs",
        text: "En cas de désaccord ou de litige sportif, les équipes communiquent normalement entre elles pour trouver une résolution.",
      },
      {
        num: "2.4",
        title: "Signalement",
        text: "Tout problème (comportement déplacé, propos hors de propos, tricherie suspectée, etc.) doit être signalé immédiatement à la modération, qui prendront les mesures nécessaires.",
      },
      {
        num: "2.5",
        title: "Sanctions",
        text: "Tout comportement allant à l'encontre de ces valeurs peut entraîner une exclusion du tournoi.",
      },
    ],
  },
  {
    section: "Déroulé du tournoi",
    articles: [
      {
        num: "3.1",
        title: "Horaire des matchs",
        text: "Premier round à 13h00 (BO1), deuxième round à 14h30 (BO1), troisième round à 16h00 (BO1), demi-finales à 17h30 (BO3), grande finale à 21h00 (BO3).",
      },
      {
        num: "3.2",
        title: "Serveur de pracc",
        text: "Un serveur de practice est mis à disposition des équipes en amont du tournoi : les infos de connexion sont partagées sur le Discord. Les équipes s'organisent librement entre elles pour caler des créneaux, et peuvent demander des permissions admin (changement de map, config) auprès de l'organisation.",
      },
      {
        num: "3.3",
        title: "Diffusion",
        text: "Le maximum de matchs possible est casté et diffusé en direct.",
      },
    ],
  },
];