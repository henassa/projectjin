import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RojLogo from "../components/RojLogo";
import Flag from "../components/Flag";
import { editions, teams, playerStats } from "../data/editions";

// Widget destiné à être utilisé comme source navigateur dans OBS Studio
// (overlay de stream). Page volontairement nue : pas de Nav, pas de
// grain, fond transparent pour que seul le widget soit visible par-
// dessus le jeu/la scène. Contour néon animé + carrousel qui alterne
// automatiquement entre plusieurs infos (édition, vainqueur, top rating).
//
// SECRET_TOKEN : change cette valeur (et l'URL que tu utilises dans OBS)
// si jamais elle a fuité. Ce n'est pas une vraie authentification —
// juste une URL non devinable, non listée nulle part sur le site.
const SECRET_TOKEN = "a2a238057c4799bcf26df7aee322546c";
const SLIDE_DURATION_MS = 6000;

export default function Overlay() {
  const { token } = useParams();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  const latest = useMemo(() => [...editions].sort((a, b) => b.number - a.number)[0], []);
  const winner = useMemo(
    () => teams.find((t) => t.editionId === latest?.id && t.result === "Vainqueur"),
    [latest]
  );
  const topRating = useMemo(() => {
    const rows = playerStats.filter((r) => r.editionId === latest?.id);
    if (rows.length === 0) return null;
    return [...rows].sort((a, b) => b.rating - a.rating)[0];
  }, [latest]);

  const slides = useMemo(() => {
    const s = [];
    if (latest) {
      s.push({ type: "edition" });
      if (winner) s.push({ type: "winner" });
      if (topRating) s.push({ type: "rating" });
    }
    return s;
  }, [latest, winner, topRating]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  if (token !== SECRET_TOKEN || !latest) return null;

  const current = slides[slideIndex] ?? slides[0];

  return (
    <div className="flex min-h-screen items-start justify-start p-6">
      <div className="overlay-neon flex h-[92px] w-[420px] items-center gap-4 overflow-hidden bg-black/85 px-5">
        <RojLogo className="h-10 w-10 flex-shrink-0 text-text" />

        <div className="relative h-full flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {current?.type === "edition" && (
              <motion.div
                key="edition"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 font-display text-lg font-bold leading-tight text-text">
                  PROJECT JÎN
                  <span className="chip-badge px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                    {latest.status}
                  </span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-text-muted">
                  {latest.label} · {latest.date}
                </div>
              </motion.div>
            )}

            {current?.type === "winner" && winner && (
              <motion.div
                key="winner"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-xs uppercase tracking-widest text-text-muted">
                  🏆 Vainqueur · {latest.label}
                </div>
                <div className="mt-1 truncate font-display text-lg font-bold text-text">
                  {winner.name}
                </div>
              </motion.div>
            )}

            {current?.type === "rating" && topRating && (
              <motion.div
                key="rating"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="text-xs uppercase tracking-widest text-text-muted">
                  Meilleur rating · {latest.label}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Flag code={topRating.nationality} image={topRating.flagImage} />
                  <span className="truncate font-display text-lg font-bold text-text">
                    {topRating.pseudo}
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {topRating.rating.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}