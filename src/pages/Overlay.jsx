import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RojLogo from "../components/RojLogo";
import { editions, teams } from "../data/editions";

// Widget destiné à être utilisé comme source navigateur dans OBS Studio
// (overlay de stream). Page volontairement nue : pas de Nav, pas de
// grain, fond transparent pour que seul le widget soit visible par-
// dessus le jeu/la scène.
//
// SECRET_TOKEN : change cette valeur (et l'URL que tu utilises dans OBS)
// si jamais elle a fuité. Ce n'est pas une vraie authentification —
// juste une URL non devinable, non listée nulle part sur le site.
const SECRET_TOKEN = "a2a238057c4799bcf26df7aee322546c";

export default function Overlay() {
  const { token } = useParams();

  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  if (token !== SECRET_TOKEN) return null;

  const latest = [...editions].sort((a, b) => b.number - a.number)[0];
  const winner = teams.find((t) => t.editionId === latest?.id && t.result === "Vainqueur");

  if (!latest) return null;

  return (
    <div className="flex min-h-screen items-start justify-start p-6">
      <div className="surface flex items-center gap-4 bg-black/80 px-5 py-4 backdrop-blur-sm">
        <RojLogo className="h-10 w-10 flex-shrink-0 text-text" />
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold leading-tight text-text">
            PROJECT JÎN
            <span className="chip-badge px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
              {latest.status}
            </span>
          </div>
          <div className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted">
            {latest.label} · {latest.date}
          </div>
          {winner && (
            <div className="mt-1 text-sm text-text">
              🏆 <span className="chip-mvp px-1.5 py-0.5 text-xs uppercase tracking-widest">
                {winner.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}