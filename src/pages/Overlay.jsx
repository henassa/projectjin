import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RojLogo from "../components/RojLogo";
import { editions } from "../data/editions";

// Widget destiné à être utilisé comme source navigateur dans OBS Studio
// (overlay de stream). Page nue : pas de Nav, pas de grain, fond
// transparent. Contour néon animé, logo qui tourne en boucle, et un
// carrousel à 3 temps (édition en cours → tagline → appel Discord) avec
// une transition "glass" (flou qui se referme/rouvre entre les slides).
//
// SECRET_TOKEN : change cette valeur (et l'URL que tu utilises dans OBS)
// si jamais elle a fuité. Ce n'est pas une vraie authentification —
// juste une URL non devinable, non listée nulle part sur le site.
const SECRET_TOKEN = "a2a238057c4799bcf26df7aee322546c";
const SLIDE_DURATION_MS = 6000;

const glassTransition = {
  initial: { opacity: 0, filter: "blur(14px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(14px)" },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
};

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

  const slides = ["edition", "tagline", "discord"];

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  if (token !== SECRET_TOKEN || !latest) return null;

  const current = slides[slideIndex];

  return (
    <div className="flex min-h-screen items-start justify-start p-6">
      <div className="overlay-neon flex h-[100px] w-[560px] items-center gap-4 overflow-hidden bg-black/85 px-6">
        <RojLogo className="overlay-sun h-11 w-11 flex-shrink-0 text-text" />

        <div className="relative h-full flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {current === "edition" && (
              <motion.div
                key="edition"
                initial={glassTransition.initial}
                animate={glassTransition.animate}
                exit={glassTransition.exit}
                transition={glassTransition.transition}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-display text-lg font-bold leading-tight text-text">
                  PROJECT JÎN
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-text-muted">
                  {latest.label} · {latest.date}
                </div>
              </motion.div>
            )}

            {current === "tagline" && (
              <motion.div
                key="tagline"
                initial={glassTransition.initial}
                animate={glassTransition.animate}
                exit={glassTransition.exit}
                transition={glassTransition.transition}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-display text-base font-bold leading-snug text-text">
                  TOURNOI CS2 INCLUSIF ET ANTIFASCISTE
                </div>
              </motion.div>
            )}

            {current === "discord" && (
              <motion.div
                key="discord"
                initial={glassTransition.initial}
                animate={glassTransition.animate}
                exit={glassTransition.exit}
                transition={glassTransition.transition}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="font-display text-base font-bold leading-snug text-text">
                  !DISCORD POUR REJOINDRE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}