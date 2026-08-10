import { useEffect, useState } from "react";

// Easter egg : code Konami (↑↑↓↓←→←→BA) déclenche un petit pop-up plein
// écran. Dépose ton GIF dans public/easter-egg/lune-fiveseven.gif — tant
// qu'il n'y est pas, un message de repli s'affiche à la place (pas
// d'icône d'image cassée).
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEgg() {
  const [active, setActive] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    let progress = 0;
    function onKeyDown(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[progress];
      if (key === expected) {
        progress += 1;
        if (progress === KONAMI.length) {
          setImgOk(true);
          setActive(true);
          progress = 0;
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(false), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-black/90 p-6"
      onClick={() => setActive(false)}
    >
      {imgOk ? (
        <img
          src="/easter-egg/lune-fiveseven.gif"
          alt=""
          className="max-h-[80vh] max-w-[80vw]"
          onError={() => setImgOk(false)}
        />
      ) : (
        <p className="max-w-md text-center font-display text-xl font-bold text-text">
          🎉 Easter egg trouvé — dépose ton GIF dans
          <br />
          <span className="font-mono text-sm text-text-muted">
            public/easter-egg/lune-fiveseven.gif
          </span>
        </p>
      )}
    </div>
  );
}