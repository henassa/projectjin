// Rend un pseudo cliquable vers son profil Steam (nouvel onglet) si un
// `steamId` est fourni pour cette personne. Sinon, texte simple — pas
// besoin que tout le monde ait un profil renseigné pour que le site
// fonctionne.
export default function PlayerName({ pseudo, steamId, className = "" }) {
  if (!steamId) {
    return <span className={className}>{pseudo}</span>;
  }
  return (
    <a
      href={`https://steamcommunity.com/profiles/${steamId}`}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${className} hover:underline`}
    >
      {pseudo}
    </a>
  );
}