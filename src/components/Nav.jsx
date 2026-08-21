import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RojLogo from "./RojLogo";
import { siteConfig } from "../data/config";
import { useLanguage } from "../i18n/LanguageContext";

export default function Nav() {
  const { lang, toggleLang, t } = useLanguage();

  const links = [
    { to: "/", label: t("nav_home"), end: true },
    { to: "/editions", label: t("nav_editions") },
    { to: "/palmares", label: t("nav_palmares") },
    { to: "/reglement", label: t("nav_rulebook") },
    { to: "/multi-pov", label: t("nav_multipov") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <RojLogo className="h-6 w-6 text-accent" />
          <span className="font-display text-base font-bold tracking-tight text-text">
            PROJECT JÎN
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `font-body text-xs uppercase tracking-widest transition-colors ${
                  isActive ? "text-accent" : "text-text-muted hover:text-text"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="btn-glass overflow-hidden px-4 py-1.5 font-body text-sm font-medium text-text-muted hover:text-text"
            aria-label="Changer de langue / Switch language"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lang}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="inline-block"
              >
                {lang === "fr" ? "EN" : "FR"}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-glass px-4 py-1.5 font-body text-sm font-medium text-text"
          >
            {t("nav_discord")}
          </a>
        </div>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-4 border-t border-border py-2 md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `font-body text-[10px] uppercase tracking-widest ${
                isActive ? "text-accent" : "text-text-muted"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}