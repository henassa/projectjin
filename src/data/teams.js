// ─────────────────────────────────────────────────────────────
// ÉQUIPES — une équipe par édition, reliée via `editionId`.
// - `logo` : chemin vers l'image du logo (ex. "/team-logos/team-1.png"),
//   à déposer dans le dossier `public/team-logos/`. Laisse `null` tant
//   que tu n'as pas le fichier : un badge avec les initiales du NOM
//   s'affiche à la place.
// - `players` : le roster titulaire. Chaque personne a un pseudo, ses
//   pronoms et sa nationalité (code pays ISO à 2 lettres, ex. "FR", "BE",
//   "CH" — affiché en emoji par défaut). Si tu préfères une image de
//   drapeau personnalisée, ajoute `flagImage: "/flags/flag_fr.png"`
//   (fichiers nommés "flag_XX.png" dans `public/flags/`) : elle
//   remplacera automatiquement l'emoji.
// - `steamId` (optionnel) : le SteamID64 de la personne. S'il est
//   renseigné, son pseudo devient cliquable partout sur le site et
//   ouvre son profil Steam dans un nouvel onglet. Sans ce champ, le
//   pseudo reste juste du texte.
// - `subs` : remplaçant·es de l'équipe, même structure que `players`.
//   Laisse un tableau vide `[]` (ou omets le champ) s'il n'y en a pas.
// - `coach` : `null` si pas de coach, sinon même structure que les
//   joueur·ses (pseudo, pronouns, flagImage).
// - `pool` : mets `true` pour une catégorie qui n'est pas une vraie
//   équipe en compétition (ex. "Joueur·ses libres", groupe d'attente,
//   etc.) — elle s'affiche alors seule sur sa ligne, centrée, sous les
//   vraies équipes, plutôt que dans la grille normale.
// - `role` (optionnel, texte libre) : un rôle/poste affiché à côté du
//   pseudo, comme les pronoms — "TOP", "JUNGLE", "MID", "ADC", "SUPP",
//   "IGL", "AWP", ou n'importe quoi d'autre. Marche sur `players`, sur
//   `coach` et sur `subs` : pour ces deux derniers, laisse `role` vide
//   et "Coach"/"Sub" s'affiche par défaut, ou mets ta propre valeur
//   (ex. role: "Coach IGL") pour la remplacer.
// - `twitch` (optionnel) : le login Twitch de la personne (ex. "henassa"
//   pour twitch.tv/henassa, en minuscules). Utilisé par la page Multi POV
//   (src/data/streams.js) pour afficher le logo + nom d'équipe + pseudo
//   à côté de son stream, au lieu du seul nom de chaîne.
// ─────────────────────────────────────────────────────────────

export const teams = [
  /* {
    
    id: "team-1",
    editionId: "ep-3",
    name: "ROUX NATION",
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "Lunattack",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "Kyo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "Lilith",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "roux",
        pronouns: "iel / they",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "Melinoë",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  */
  {
    id: "team-2",
    editionId: "ep-3",
    name: "CALDYA ESPORT",
    logo: "/team-logos/caldya-esport.png",
    players: [],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-3",
    editionId: "ep-3",
    name: "ÉQUIPE 3",
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "Aos Sith (à confirmer)",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Kassime",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "S0bek",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-4",
    editionId: "ep-3",
    name: "MIMI CORP",
    logo: "/team-logos/tbd.png",
    players: [],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-5",
    editionId: "ep-3",
    name: "ÉQUIPE 5",
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "Alua",
        pronouns: "elle / she",
        flagImage: "/flags/flag_it.png",
      },
      {
        pseudo: "Maghrebiere",
        pronouns: "il / he",
        flagImage: "/flags/flag_dz.png",
      },
      {
        pseudo: "Steve",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Wik",
        pronouns: "il / he",
        flagImage: "/flags/flag_jp.png",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-6",
    editionId: "ep-3",
    name: "ÉQUIPE 6",
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "felschrr",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Liquidz",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-br.png",
      },
      {
        pseudo: "Mael",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-7",
    editionId: "ep-3",
    name: "PIPI SOUS LA DOUCHE",
    logo: "/team-logos/pipi-sous-la-douche.png",
    players: [
      {
        pseudo: "aynashaa",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Birouf",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "hedrostage",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "lumiky",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "sluje",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-8",
    editionId: "ep-3",
    name: "TAHM KUNZ",
    logo: "/team-logos/tbd.png",
    players: [],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-1",
    editionId: "ep-2",
    name: "PROLÉTAIRES V2",
    logo: "/team-logos/proletaires-v2.png",
    players: [
      {
        pseudo: "didou",
        pronouns: "il / he",
        flagImage: "/flags/flag_kr.png",
        steamId: "76561198123365503",
        twitch: "henassa",
      },
      {
        pseudo: "kyracujoh",
        pronouns: "elle / she",
        flagImage: "/flags/flag_dz.png",
        steamId: "76561198282049491",
      },
      {
        pseudo: "lune33",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198118146069",
      },
      {
        pseudo: "Meyru",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561199031928617",
      },
      {
        pseudo: "xeno",
        pronouns: "il / he",
        flagImage: "/flags/flag_vend.png",
        steamId: "76561198329257038",
      },
    ],
    subs: [
      {
        pseudo: "Hasemal",
        pronouns: "il / he",
        flagImage: "/flags/flag_arg.png",
        steamId: "76561198168674743",
      },
      {
        pseudo: "kaori",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199025470669",
      },
    ],
    coach: {
      pseudo: "vyia",
      pronouns: "elle / she",
      flagImage: "/flags/flag_pt.png",
      steamId: "76561198358098002",
    },
    result: null,
  },
  {
    id: "team-2",
    editionId: "ep-2",
    name: "CALDYA ESPORT",
    logo: "/team-logos/caldya-esport.png",
    players: [
      {
        pseudo: "Charlon",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199054204778",
      },
      {
        pseudo: "chichi",
        pronouns: "elle / she",
        flagImage: "/flags/flag_de.png",
        steamId: "76561199057059966",
      },
      {
        pseudo: "Clotilde",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198154418394",
      },
      {
        pseudo: "matriix",
        pronouns: "elle / she",
        flagImage: "/flags/flag_be.png",
        steamId: "76561199074412034",
      },

      {
        pseudo: "Neex",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
    ],
    subs: [
      {
        pseudo: "Jud",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198981538232",
      },
    ],
    coach: null,
    result: null,
  },
  {
    id: "team-3",
    editionId: "ep-2",
    name: "ACAB ACADEMY",
    logo: "/team-logos/acab-academy.png",
    players: [
      {
        pseudo: "Liquidz",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561198935677261",
        twitch: "liquidz_l9",
      },
      {
        pseudo: "MaasKyyy",
        pronouns: "il / he",
        flagImage: "/flags/flag_ch.png",
        steamId: "76561198310735136",
      },
      {
        pseudo: "Maxine",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-norm.png",
        steamId: "76561198025946650",
      },
      {
        pseudo: "neear",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198332437870",
        twitch: "neear1221",
      },
      {
        pseudo: "ZeroX",
        pronouns: "elle / she",
        flagImage: "/flags/flag_es-ev.png",
        steamId: "76561198113356567",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-4",
    editionId: "ep-2",
    name: "LARME À GAUCHE",
    logo: "/team-logos/larme-a-gauche.png",
    players: [
      {
        pseudo: "Chaps",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199037636924",
      },
      {
        pseudo: "Shaana",
        pronouns: "elle / she",
        flagImage: "/flags/flag_amaz.png",
        steamId: "76561198876538726",
      },
      {
        pseudo: "Shyz",
        pronouns: "il / he",
        flagImage: "/flags/flag_xz.png",
        steamId: "76561199557339456",
      },
      {
        pseudo: "Slatacos",
        pronouns: "elle / she",
        flagImage: "/flags/flag_amaz.png",
        steamId: "76561198121367038",
      },
      {
        pseudo: "Static2k",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198178774414",
      },
    ],
    subs: [
      {
        pseudo: "amanek",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198068944951",
      },
    ],
    coach: null,
    result: null,
  },
  {
    id: "team-5",
    editionId: "ep-2",
    name: "PAUVRES N LOVÉS",
    logo: "/team-logos/pauvres-n-loves.png",
    players: [
      {
        pseudo: "abwi",
        pronouns: "il / he",
        flagImage: "/flags/flag_dz.png",
        steamId: "76561198158653120",
      },
      {
        pseudo: "davy",
        pronouns: "elle / she",
        flagImage: "/flags/flag_kh.png",
        steamId: "76561198351001632",
        twitch: "davyy_y",
      },
      {
        pseudo: "Nepo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198147626457",
      },
      {
        pseudo: "wall",
        pronouns: "il / he",
        flagImage: "/flags/flag_vn.png",
        steamId: "76561198013210429",
      },
      {
        pseudo: "watZ",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198416245253",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-6",
    editionId: "ep-2",
    name: "SAUCISSE MERGUEZ UNITED",
    logo: "/team-logos/saucisse-merguez-united.png",
    players: [
      {
        pseudo: "Avy",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198312648436",
      },
      {
        pseudo: "LeiCO",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-fc.png",
        steamId: "76561198207125751",
      },
      {
        pseudo: "Lockjaw",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199224352089",
      },
      {
        pseudo: "Resval",
        pronouns: "il / he",
        flagImage: "/flags/flag_es-ev.png",
        steamId: "76561199051272230",
      },
      {
        pseudo: "Stannah",
        pronouns: "iel / they",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198016931975",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-7",
    editionId: "ep-2",
    name: "SICK 7",
    logo: "/team-logos/sick-7.png",
    players: [
      {
        pseudo: "Jupiter",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198933238576",
      },
      {
        pseudo: "sharko",
        pronouns: "il / he",
        flagImage: "/flags/flag_amaz.png",
        steamId: "76561198180431419",
      },
      {
        pseudo: "SirDaewen",
        pronouns: "iel / they",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198369128117",
        twitch: "sirdaewen",
      },
      {
        pseudo: "Sxcret",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198137403799",
      },
      {
        pseudo: "Vital",
        pronouns: "il / he",
        flagImage: "/flags/flag_be.png",
        steamId: "76561198128717257",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-8",
    editionId: "ep-2",
    name: "CYPRIEN GAMING",
    logo: "/team-logos/cyprien-gaming.png",
    players: [
      {
        pseudo: "Alua",
        pronouns: "elle / she",
        flagImage: "/flags/flag_it.png",
        steamId: "76561198975050006",
        twitch: "AluAngePerdu",
      },
      {
        pseudo: "Konai",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198796469890",
      },
      {
        pseudo: "Porco",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198333390618",
      },
      {
        pseudo: "wati",
        pronouns: "elle / she",
        flagImage: "/flags/flag_ma.png",
        steamId: "76561199204977143",
      },
      {
        pseudo: "Wik",
        pronouns: "il / he",
        flagImage: "/flags/flag_jp.png",
        steamId: "76561198306215753",
      },
    ],
    subs: [],
    coach: {
      pseudo: "Finite",
      pronouns: "il / he",
      flagImage: "/flags/flag_occ.png",
      steamId: "76561198217350221",
    },
    result: null,
  },
  {
    id: "team-9",
    editionId: "ep-2",
    name: "FREE ELO BOOST PEEK",
    logo: "/team-logos/free-elo-boost-peek.png",
    players: [
      {
        pseudo: "aspppen",
        pronouns: "il / he",
        flagImage: "/flags/flag_ga.png",
        steamId: "76561198008039153",
      },
      {
        pseudo: "Blh1te",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198414712451",
        twitch: "b1h1tee",
      },
      {
        pseudo: "Emerald",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198044601695",
        twitch: "emeraldcsgoo",
      },
      {
        pseudo: "injuxta",
        pronouns: "il / he",
        flagImage: "/flags/flag_kr.png",
        steamId: "76561198836770861",
      },

      {
        pseudo: "Togrqm",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561198143478066",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-10",
    editionId: "ep-2",
    name: "FRACTURE",
    logo: "/team-logos/fracture.png",
    players: [
      {
        pseudo: "Alyx Nevara",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198090810272",
      },
      {
        pseudo: "Ari",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198398107579",
      },

      {
        pseudo: "Arjuna",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199861605243",
        twitch: "arjuna_cs2",
      },
      {
        pseudo: "Darly",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199053706159",
      },
      {
        pseudo: "Lunax",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199106416127",
        twitch: "itzlunax",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-11",
    editionId: "ep-2",
    name: "95RPZ",
    logo: "/team-logos/95rpz.png",
    players: [
      {
        pseudo: "AST",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199120465590",
      },
      {
        pseudo: "Bloupe",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198360571776",
      },
      {
        pseudo: "elfosoo",
        pronouns: "il / he",
        flagImage: "/flags/flag_ltte.png",
        steamId: "76561198409214986",
      },
      {
        pseudo: "Wobu",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198104422076",
      },

      {
        pseudo: "xagro",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198372275494",
        twitch: "xagrozz",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
  {
    id: "team-1",
    editionId: "ep-1",
    name: "VÉRITABLES PROLÉTAIRES",
    logo: "/team-logos/veritables-proletaires.png",
    players: [
      {
        pseudo: "didou",
        pronouns: "il / he",
        flagImage: "/flags/flag_kr.png",
        steamId: "76561198123365503",
      },
      {
        pseudo: "kyracujoh",
        pronouns: "elle / she",
        flagImage: "/flags/flag_dz.png",
        steamId: "76561198282049491",
      },
      {
        pseudo: "Meyru",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561199031928617",
      },
      {
        pseudo: "Mika",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199053508275",
      },
      {
        pseudo: "Nepo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198147626457",
      },
    ],
    subs: [],
    coach: null,
    result: "Vainqueur",
  },
  {
    id: "team-3",
    editionId: "ep-1",
    name: "BRITNEY SPEED",
    logo: "/team-logos/britney-speed.png",
    players: [
      {
        pseudo: "Liquidz",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561198935677261",
      },
      {
        pseudo: "neear",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198332437870",
      },
      {
        pseudo: "Togrqm",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561198143478066",
      },
      {
        pseudo: "xagro",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198372275494",
      },
      {
        pseudo: "ZeroX",
        pronouns: "elle / she",
        flagImage: "/flags/flag_es-ev.png",
        steamId: "76561198113356567",
      },
    ],
    coach: null,
    result: "Finaliste",
  },
  {
    id: "team-2",
    editionId: "ep-1",
    name: "MOG-7",
    logo: "/team-logos/mog-7.png",
    players: [
      {
        pseudo: "Aurèle",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198964879287",
      },
      {
        pseudo: "Shyz",
        pronouns: "il / he",
        flagImage: "/flags/flag_xz.png",
        steamId: "76561199557339456",
      },
      {
        pseudo: "SirDaewen",
        pronouns: "iel / they",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198369128117",
      },
      {
        pseudo: "Sxcret",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198137403799",
      },
      {
        pseudo: "wall",
        pronouns: "il / he",
        flagImage: "/flags/flag_vn.png",
        steamId: "76561198013210429",
      },
    ],
    coach: {
      pseudo: "Colevag",
      pronouns: "il / he",
      flagImage: "/flags/flag_fr.png",
      steamId: "76561198119141964",
    },
    result: "1/2 finale",
  },
  {
    id: "team-4",
    editionId: "ep-1",
    name: "YOUNG PROLÉTAIRES",
    logo: "/team-logos/young-proletaires.png",
    players: [
      {
        pseudo: "abwi",
        pronouns: "il / he",
        flagImage: "/flags/flag_dz.png",
        steamId: "76561198158653120",
      },
      {
        pseudo: "lune33",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198118146069",
      },
      {
        pseudo: "Maxine",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-norm.png",
        steamId: "76561198025946650",
      },
      {
        pseudo: "Rabenas",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198084533783",
      },
      {
        pseudo: "watZ",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198416245253",
      },
    ],
    coach: null,
    result: "1/2 finale",
  },
  {
    id: "team-5",
    editionId: "ep-1",
    name: "FRACTURE",
    logo: "/team-logos/fracture.png",
    players: [
      {
        pseudo: "Alyx Nevara",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198090810272",
      },
      {
        pseudo: "Ari",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198398107579",
      },
      {
        pseudo: "Arjuna",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199861605243",
      },
      {
        pseudo: "AST",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199120465590",
      },
      {
        pseudo: "Clothure",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199132684012",
      },
    ],
    coach: null,
    result: "5-6e place",
  },
  {
    id: "team-6",
    editionId: "ep-1",
    name: "SAUCISSE MERGUEZ",
    logo: "/team-logos/saucisse-merguez.png",
    players: [
      {
        pseudo: "LeiCO",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-fc.png",
        steamId: "76561198207125751",
      },
      {
        pseudo: "Lockjaw",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199224352089",
      },
      {
        pseudo: "Avy",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198312648436",
      },
      {
        pseudo: "Stannah",
        pronouns: "iel / they",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198016931975",
      },
      {
        pseudo: "Resval",
        pronouns: "il / he",
        flagImage: "/flags/flag_es-ev.png",
        steamId: "76561199051272230",
      },
    ],
    subs: [
      {
        pseudo: "Jupiter",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198933238576",
      },
    ],
    coach: null,
    result: "5-6e place",
  },
  {
    id: "team-7",
    editionId: "ep-1",
    name: "AWP PUPPIES",
    logo: "/team-logos/awp-puppies.png",
    players: [
      {
        pseudo: "Ambraser",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198207492340",
      },
      {
        pseudo: "Elic0pt3r",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198780645064",
      },
      {
        pseudo: "Mangeuse2prout",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561199092183436",
      },
      {
        pseudo: "SillyJune",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "76561198671911785",
      },
      {
        pseudo: "Sophie",
        pronouns: "elle / she",
        flagImage: "/flags/flag_fr.png",
        steamId: "76561198832146626",
      },
    ],
    coach: null,
    result: "7-8e place",
  },
  {
    id: "team-8",
    editionId: "ep-1",
    name: "UNFRENCH",
    logo: "/team-logos/unfrench.png",
    players: [
      {
        pseudo: "Amy",
        pronouns: "elle / she",
        flagImage: "/flags/flag_de.png",
        steamId: "76561198180597545",
      },
      {
        pseudo: "axperial",
        pronouns: "il / he",
        flagImage: "/flags/flag_fi.png",
        steamId: "76561198096680289",
      },
      {
        pseudo: "Flamyft",
        pronouns: "iel / they",
        flagImage: "/flags/flag_be.png",
        steamId: "76561199028145708",
      },
      {
        pseudo: "Mimiah",
        pronouns: "elle / she",
        flagImage: "/flags/flag_at.png",
        steamId: "76561198396185021",
      },
      {
        pseudo: "The_Toble",
        pronouns: "il / he",
        flagImage: "/flags/flag_de.png",
        steamId: "76561198212916785",
      },
    ],
    coach: null,
    result: "7-8e place",
  } /*
  {
    id: "team-99",
    editionId: "ep-2",
    name: "JOUEURS ET JOUEUSES LIBRES",
    pool: true,
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "Gebonimo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-sa.png",
        steamId: "",
      },
      {
        pseudo: "Hugo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-br.png",
        steamId: "",
      },
      {
        pseudo: "MehdiAndCo",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "NaturalSelectixn",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "ORDOME",
        pronouns: "il / he",
        flagImage: "/flags/flag_cm.png",
        steamId: "",
      },
      {
        pseudo: "TOM",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
      {
        pseudo: "phiVe",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
        steamId: "",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },*/,
  {
    id: "team-100",
    editionId: "ep-3",
    name: "JOUEURS ET JOUEUSES LIBRES",
    pool: true,
    logo: "/team-logos/tbd.png",
    players: [
      {
        pseudo: "Colevag",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr-norm.png",
      },
      {
        pseudo: "Kesscro",
        pronouns: "il / he",
        flagImage: "/flags/flag_be.png",
      },
      {
        pseudo: "Static2k",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Ulyxx3",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
      {
        pseudo: "Zweely",
        pronouns: "il / he",
        flagImage: "/flags/flag_fr.png",
      },
    ],
    subs: [],
    coach: null,
    result: null,
  },
];

// Retrouve le SteamID64 d'une personne par son pseudo, en cherchant
// dans toutes les équipes (titulaires, remplaçant·es, coachs). Utilisé
// pour rendre un pseudo cliquable même sur des pages où seul le pseudo
// est disponible (tableau de stats, classement), sans devoir dupliquer
// le SteamID dans stats.js.
export function findSteamId(pseudo) {
  for (const team of teams) {
    const people = [
      ...(team.players || []).filter(Boolean),
      ...(team.subs || []).filter(Boolean),
      ...(team.coach ? [team.coach] : []),
    ];
    const found = people.find((p) => p.pseudo === pseudo && p.steamId);
    if (found) return found.steamId;
  }
  return null;
}

// Retrouve la personne (pseudo + équipe) associée à un login Twitch, en
// cherchant dans toutes les équipes (titulaires, remplaçant·es, coachs).
// Utilisé par la page Multi POV pour afficher le logo d'équipe et le
// pseudo à côté du stream, plutôt que le seul nom de chaîne Twitch.
// Retourne `null` si personne n'a ce login renseigné.
export function findPlayerByTwitch(login) {
  if (!login) return null;
  const target = login.trim().toLowerCase();
  for (const team of teams) {
    const people = [
      ...(team.players || []).filter(Boolean),
      ...(team.subs || []).filter(Boolean),
      ...(team.coach ? [team.coach] : []),
    ];
    const found = people.find(
      (p) => p.twitch && p.twitch.trim().toLowerCase() === target,
    );
    if (found) {
      return {
        pseudo: found.pseudo,
        teamName: team.name,
        teamLogo: team.logo,
      };
    }
  }
  return null;
}

// Liste toutes les chaînes Twitch renseignées (champ `twitch`) parmi les
// joueur·ses, remplaçant·es et coachs d'une édition donnée. C'est ce qui
// permet à la page Multi POV de suivre automatiquement les bonnes
// chaînes dès qu'on ajoute `twitch: "..."` à quelqu'un dans ce fichier —
// sans avoir à dupliquer l'info dans data/streams.js.
export function getPlayersWithTwitch(editionId) {
  const result = [];
  const seen = new Set();
  for (const team of teams) {
    if (team.editionId !== editionId) continue;
    const people = [
      ...(team.players || []).filter(Boolean),
      ...(team.subs || []).filter(Boolean),
      ...(team.coach ? [team.coach] : []),
    ];
    for (const p of people) {
      if (!p.twitch) continue;
      const login = p.twitch.trim().toLowerCase();
      if (!login || seen.has(login)) continue;
      seen.add(login);
      result.push({
        login,
        pseudo: p.pseudo,
        teamName: team.name,
        teamLogo: team.logo,
      });
    }
  }
  return result;
}
