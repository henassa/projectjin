// ─────────────────────────────────────────────────────────────
// CRÉDITS PAR ÉDITION — façon générique "credits" de fin de film.
// Affichés en bas de la page de chaque édition (EditionDetail),
// sous le tableau des stats. Laisse une édition absente de cet objet
// (ou mets `null`) si tu n'as pas encore ses crédits : la section ne
// s'affiche simplement pas.
//
// Structure d'un bloc de `blocks` :
// - { label, lines: [...] }               → texte simple, une ligne par entrée
// - { label, teams: [{ name, roster }] }   → liste d'équipes + roster en une ligne
// ─────────────────────────────────────────────────────────────

export const credits = {
  "ep-1": {
    subtitle: "Tournoi inclusif et antifasciste",
    blocks: [
      {
        label: "Sur une idée originale de",
        lines: ["Quelques passionné·es voulant raviver la scène féminine"],
      },
      {
        label: "Avec la participation de",
        teams: [
          { name: "UNFRENCH", roster: "Amy · Axperial · Flamyft · Mimiah · The_Toble" },
          { name: "YOUNG PROLÉTAIRES", roster: "Abwi · Lune33 · Maxine · Rabenas · Watz" },
          { name: "BRITNEY SPEED", roster: "Liquidz · Neear · Togrqm · Xagro · Zerox" },
          { name: "VÉRITABLES PROLÉTAIRES", roster: "Didou · Kyracujoh · Meyru · Mika · Nepo" },
          { name: "AWP PUPPIES", roster: "Ambraser · Elic0pt3r · Mangeuse2Prout · Silly June · Sophie" },
          { name: "MOG-7", roster: "Aurèle · Shyz · Sir Daewen · Sxcret · Wall · Colevag (Coach)" },
          { name: "SAUCISSE MERGUEZ", roster: "Leico · Lockjaw · TheoWhy · Stannah · Pazuzu" },
          { name: "FRACTURE", roster: "Alyx Nevara · Ari · Arjuna · Ast · Clothure" },
        ],
      },
      { label: "Régisseur", lines: ["Hezus"] },
      { label: "Direction artistique", lines: ["Didou"] },
      { label: "Habillage graphique en jeu", lines: ["John Timmermann · CSHUDS"] },
      { label: "Casters", lines: ["Kyra · Hezus"] },
      {
        label: "Participants du programme artistique",
        lines: ["Moana Tuamasaga · Camille Azocar · GRËJ"],
      },
      {
        label: "Crédits musicaux",
        lines: [
          "LinLin · Nia Archives · Color Plus · 2 Mello",
          "Bosked · Hydraa · DJ Swisha · OSSX · CLIPZ",
          "Khadija Al Hanafi · DJ Paypal · Soia · Dazegxd",
          "Coco Bryce · Oklou · Bladee · Underscores · Frou Frou",
        ],
      },
      { label: "Speedrun en fond", lines: ["Hövenmark"] },
      {
        label: "Remerciements",
        lines: [
          "À tous les petits et grands acteurs et actrices de la scène esport nous ayant relayé·es, directement ou indirectement",
        ],
      },
    ],
  },
  // "ep-2": { ... } — à compléter une fois l'édition terminée.
};