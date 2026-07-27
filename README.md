# PROJECT JÎN — site du tournoi

Site du tournoi CS2 antifasciste, féministe et inclusif **PROJECT JÎN**.
Construit en React (Vite) + Tailwind CSS v4 + React Router.

## Pages

- **Accueil** (`/`) — présentation, chiffres clés, signification du nom.
- **Règlement** (`/reglement`) — règlement du tournoi, articles numérotés par section.
- **Stats** (`/stats`) — statistiques des joueureuses, filtrables par édition ou toutes éditions, triables par colonne.
- **Équipes** (`/equipes`) — équipes ayant participé, filtrables par édition.

## Remplir le contenu réel

Tout le contenu variable est centralisé dans `src/data/` :

- `src/data/config.js` — lien Discord, Twitch, Twitter, slogan, format (nombre d'équipes, jours, horaires).
- `src/data/rulebook.js` — le règlement complet, section par section.
- `src/data/editions.js` — les éditions, les équipes et les stats des joueureuses.

**Équipe** : `name`, `logo` (chemin vers une image dans `public/team-logos/`, ou `null` pour un badge à initiales du nom généré automatiquement), `players`, `coach`, `result`.

**Joueur·se** : `pseudo`, `pronouns` (ex. `"elle/she"`), `nationality` (code pays ISO 2 lettres, converti en emoji drapeau par défaut), et `flagImage` optionnel (chemin vers une image dans `public/flags/`, ex. `"/flags/fr.png"`) si tu préfères des drapeaux en image plutôt qu'en emoji — l'image prend le dessus sur l'emoji dès qu'elle est renseignée.

Pour ajouter une nouvelle édition : ajoute un objet dans `editions`, puis des
équipes dans `teams` et des lignes dans `playerStats` en référençant son
`editionId`. Les filtres sur les pages Stats et Équipes se mettent à jour
automatiquement.

## Développer en local

```bash
npm install
npm run dev
```

## Builder

```bash
npm run build
```

Le résultat est généré dans `dist/`.

## Déployer sur Netlify

**Option A — via l'interface Netlify (le plus simple) :**

1. Pousse ce projet sur un dépôt GitHub/GitLab.
2. Sur [app.netlify.com](https://app.netlify.com), clique sur **Add new site → Import an existing project**.
3. Sélectionne le dépôt. Netlify détecte automatiquement `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Clique sur **Deploy**.

**Option B — via Netlify CLI :**

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

Le fichier `netlify.toml` (et `public/_redirects` en filet de sécurité) gère
déjà la redirection nécessaire au routage React (sans ça, actualiser une page
comme `/stats` renverrait une 404 sur Netlify).

## Design

- Palette strictement monochrome (noir `#060606` / blanc cassé), calquée sur la colorimétrie des visuels d'annonce du projet — pas de couleur de marque, le contraste et le grain font le travail.
- Un léger grain photo est superposé à toute la page (`.grain-overlay` dans `src/index.css`), écho direct de la texture des visuels Instagram/Discord.
- Les grands titres ont un halo blanc doux (`.text-glow`), dans le même esprit que le traitement typo des visuels d'annonce.
- Typo : **une seule police sur tout le site — Helvetica Neue** (police système, pas de chargement externe, repli propre sur Helvetica/Arial). Cohérence totale, aucune police mono séparée.
- Logo : le Roj (soleil) du Kurdistan, vectorisé en SVG à partir du PNG fourni (`public/logo-roj.svg` et `src/components/RojLogo.jsx`). `fill="currentColor"`, donc il hérite la couleur du texte autour de lui.
- Motif secondaire : le viseur (`src/components/Reticle.jsx`), réutilisé comme puce/décoration en écho direct à CS2.
- Transitions de page en fondu/glissement (`framer-motion`, voir `App.jsx`), désactivées automatiquement si l'utilisateur·ice a activé "réduire les animations" dans son système.
