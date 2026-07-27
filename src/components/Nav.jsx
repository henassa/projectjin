import { NavLink } from "react-router-dom";
import RojLogo from "./RojLogo";
import { siteConfig } from "../data/config";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/editions", label: "Éditions" },
  { to: "/reglement", label: "Règlement" },
];

export default function Nav() {
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

        <a
          href={siteConfig.discordUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-glass px-4 py-1.5 font-body text-sm font-medium text-text"
        >
          Discord
        </a>
      </div>

      {/* Nav mobile compacte */}
      <nav className="flex items-center justify-center gap-6 border-t border-border py-2 md:hidden">
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