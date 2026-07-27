import { flagEmoji } from "../utils";

// Drapeau de nationalité. Passe `image` (chemin vers un png/jpg dans
// public/flags/, ex. "/flags/fr.png") pour utiliser un visuel personnalisé ;
// sinon, l'emoji drapeau correspondant au code pays (`code`, ex. "FR")
// s'affiche automatiquement. Proportion 4:3 (format standard des drapeaux),
// pas un carré forcé — évite de rogner les bords des images fournies.
export default function Flag({ code, image, height = "1.6em" }) {
  if (image) {
    return (
      <img
        src={image}
        alt={code || "Drapeau"}
        style={{ height, width: `calc(${height} * 4 / 3)` }}
        className="inline-block flex-shrink-0 object-cover align-middle"
      />
    );
  }
  return (
    <span className="inline-block flex-shrink-0" aria-hidden="true">
      {flagEmoji(code)}
    </span>
  );
}