import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Nav from "./components/Nav";
import KonamiEgg from "./components/KonamiEgg";
import Home from "./pages/Home";
import Rulebook from "./pages/Rulebook";
import Editions from "./pages/Editions";
import EditionDetail from "./pages/EditionDetail";
import Palmares from "./pages/Palmares";
import Overlay from "./pages/Overlay";
import MultiPOV from "./pages/MultiPOV";

function AnimatedPage({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  // Route "nue" pour l'overlay OBS : ni Nav, ni grain, ni transitions —
  // juste le widget, sur fond transparent.
  if (location.pathname.startsWith("/overlay/")) {
    return (
      <Routes>
        <Route path="/overlay/:token" element={<Overlay />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grain-overlay" aria-hidden="true" />
      <KonamiEgg />
      <Nav />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/reglement" element={<AnimatedPage><Rulebook /></AnimatedPage>} />
            <Route path="/editions" element={<AnimatedPage><Editions /></AnimatedPage>} />
            <Route path="/editions/:editionId" element={<AnimatedPage><EditionDetail /></AnimatedPage>} />
            <Route path="/palmares" element={<AnimatedPage><Palmares /></AnimatedPage>} />
            <Route path="/multi-pov" element={<AnimatedPage><MultiPOV /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}