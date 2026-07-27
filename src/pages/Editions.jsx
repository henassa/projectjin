import { Link } from "react-router-dom";
import { editions, teams } from "../data/editions";

export default function Editions() {
  const sortedEditions = [...editions].sort((a, b) => b.number - a.number);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">Éditions</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Chaque édition regroupe son règlement propre, ses équipes et ses statistiques.
        Clique sur une édition pour tout voir.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedEditions.map((ed) => {
          const teamsCount = teams.filter((t) => t.editionId === ed.id).length;
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
                    {ed.date} · {teamsCount} équipe{teamsCount > 1 ? "s" : ""}
                  </p>
                </div>
                <span className="chip-badge whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-widest text-accent">
                  {ed.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}