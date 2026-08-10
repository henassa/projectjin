import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RojLogo from "../components/RojLogo";
import { editions } from "../data/editions";

// Widget destiné à être utilisé comme source navigateur dans OBS Studio
// (overlay de stream). Page nue : pas de Nav, pas de grain, fond
// transparent. Contour néon en glow pulsant, et un carrousel à 4 temps
// avec transition "glass" (flou qui se referme/rouvre entre les slides) :
//   1. Le soleil qui tourne, seul
//   2. PROJECT JÎN + infos du prochain tournoi
//   3. Tagline "Circuit e-sport inclusif et antifasciste"
//   4. Appel à rejoindre le Discord
//
// SECRET_TOKEN : change cette valeur (et l'URL que tu utilises dans OBS)
// si jamais elle a fuité. Ce n'est pas une vraie authentification —
// juste une URL non devinable, non listée nulle part sur le site.
const SECRET_TOKEN = "a2a238057c4799bcf26df7aee322546c";
const SLIDE_DURATION_MS = 5000;

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

  // Même correctif que sur la page d'accueil : la "prochaine édition"
  // affichée sur l'overlay doit être la plus proche à venir/en cours,
  // pas la plus lointaine.
  const latest = useMemo(() => {
    const upcoming = [...editions]
      .filter((e) => e.status !== "terminée")
      .sort((a, b) => a.number - b.number)[0];
    return upcoming ?? [...editions].sort((a, b) => b.number - a.number)[0];
  }, []);

  const slides = ["sun", "edition", "tagline", "discord"];

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
      <div
        className="overlay-neon flex h-[155px] w-[340px] items-center overflow-hidden px-5"
        style={{
          background: "linear-gradient(155deg, rgba(20,20,20,0.95), rgba(0,0,0,0.97) 60%)",
        }}
      >
          <AnimatePresence mode="wait">
            {current === "sun" && (
              <motion.div
                key="sun"
                initial={glassTransition.initial}
                animate={glassTransition.animate}
                exit={glassTransition.exit}
                transition={glassTransition.transition}
                className="absolute inset-0 flex items-center justify-center"
              >
                <RojLogo className="overlay-sun h-20 w-20 text-text" />
              </motion.div>
            )}

            {current === "edition" && (
              <motion.div
                key="edition"
                initial={glassTransition.initial}
                animate={glassTransition.animate}
                exit={glassTransition.exit}
                transition={glassTransition.transition}
                className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
              >
                <div className="font-display text-3xl font-bold leading-tight text-text">
                  PROJECT JÎN
                </div>
                <div className="mt-1.5 text-base uppercase tracking-wide text-text-muted">
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
                className="absolute inset-0 flex items-center justify-center px-5 text-center"
              >
                <div className="w-full font-display text-2xl font-bold leading-snug text-text">
                  CIRCUIT E-SPORT
                  <br />
                  INCLUSIF ET ANTIFASCISTE
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
                className="absolute inset-0 flex items-center justify-center px-5 text-center"
              >
                <div className="w-full font-display text-2xl font-bold leading-snug text-text">
                  !DISCORD POUR
                  <br />
                  REJOINDRE LE PROJET
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}