// ─────────────────────────────────────────────────────────────
// CHAÎNES TWITCH — Multi POV
//
// La liste des joueur·ses affiché·es sur /multi-pov est AUTOMATIQUE :
// dès que tu ajoutes `twitch: "login"` à une personne dans data/teams.js
// (pour l'édition en cours), sa chaîne apparaît toute seule sur la
// page, avec son logo d'équipe et son pseudo. Rien à dupliquer ici.
//
// Ce fichier ne sert que pour deux choses :
//
// 1. `mainStreamLogin` : le login Twitch du STREAM PRINCIPAL (celui du
//    cast), affiché en grand tout en haut de la page. Mets `null` si
//    aucun stream principal pour l'instant.
//
// 2. `extraStreams` : des chaînes à afficher qui ne correspondent à
//    personne dans data/teams.js — casteur·ses, staff, chaîne
//    officielle du tournoi, etc. Même structure que teams.js aurait
//    donné : juste `{ login: "..." }`.
// ─────────────────────────────────────────────────────────────

export const mainStreamLogin;

export const extraStreams = [
  // { login: "chaine-du-staff" },
];