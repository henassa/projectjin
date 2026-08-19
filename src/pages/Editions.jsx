import { Link } from "react-router-dom";
import { editions, editionDateLabel } from "../data/editions";
import { teams } from "../data/teams";
import { useLanguage } from "../i18n/LanguageContext";

const statusKeys = {
  "à venir": "status_upcoming",
  "en cours": "status_ongoing",
  "terminée": "status_done",
};

export default function Editions() {
  const { t } = useLanguage();
  const sortedEditions = [...editions].sort((a, b) => b.number - a.number);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">{t("editions_title")}</h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("editions_intro")}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedEditions.map((ed) => {
          const teamsCount = teams.filter((tm) => tm.editionId === ed.id).length;
          return (
            <Link
              key={ed.id}
              to={`/editions/${ed.id}`}
              className="surface group flex flex-col overflow-hidden transition-colors hover:border-border-strong"
            >
              <div className="aspect-square w-full overflow-hidden bg-bg-elevated">
                {ed.poster ? (
                  <img
                    src={ed.poster}
                    alt={ed.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-3xl font-bold text-text-muted">
                      {ed.label}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="font-display text-lg font-bold">{ed.label}</h2>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-text-muted">
                    {editionDateLabel(ed)} · {teamsCount} {t(teamsCount > 1 ? "team_plural" : "team_singular")}
                  </p>
                </div>
                <span className="chip-badge whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-widest text-accent">
                  {t(statusKeys[ed.status] ?? "status_upcoming")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}