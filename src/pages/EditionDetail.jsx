import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeamBadge from "../components/TeamBadge";
import Flag from "../components/Flag";
import { editions } from "../data/editions";
import { teams } from "../data/teams";
import { playerStats } from "../data/stats";
import { credits } from "../data/credits";

const columns = [
  { key: "pseudo", label: "Joueur·se" },
  { key: "team", label: "Équipe" },
  { key: "maps", label: "Maps" },
  { key: "rounds", label: "Rounds" },
  { key: "kdDiff", label: "K-D Diff" },
  { key: "kd", label: "K/D" },
  { key: "rating", label: "Rating" },
];

// Même traitement visuel que MVP : Vainqueur en or, tout le reste en
// pastille neutre.
function resultChipClass(result) {
  if (result === "Vainqueur") return "chip-mvp";
  return "chip-badge text-accent";
}

function TeamCard({ team, statsFor }) {
  const players = (team.players || []).filter(Boolean);
  return (
    <div className="surface flex flex-col overflow-hidden">
      <div className="flex items-start gap-3 p-5">
        <TeamBadge name={team.name} logo={team.logo} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-display text-lg font-bold leading-snug">
            {team.name}
          </h3>
        </div>
        {team.result && team.result !== "—" && (
          <span
            className={`whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-widest ${resultChipClass(
              team.result
            )}`}
          >
            {team.result}
          </span>
        )}
      </div>

      {players.length > 0 && (
        <ul className="mt-2 divide-y divide-border px-2 pb-2">
          {players.map((p) => {
            const stat = statsFor(team.name, p.pseudo);
            return (
              <li
                key={p.pseudo}
                className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Flag code={p.nationality} image={p.flagImage} />
                  <span className="truncate">{p.pseudo}</span>
                  {stat.mvp && (
                    <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                      MVP
                    </span>
                  )}
                  {stat.evp && (
                    <span className="chip-evp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                      EVP
                    </span>
                  )}
                </span>
                {p.pronouns && (
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {p.pronouns}
                  </span>
                )}
              </li>
            );
          })}
          {team.coach && (
            <li className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text-muted">
              <span className="flex min-w-0 items-center gap-2">
                {team.coach.nationality && (
                  <Flag code={team.coach.nationality} image={team.coach.flagImage} />
                )}
                <span className="truncate">{team.coach.pseudo}</span>
                <span className="chip-badge whitespace-nowrap px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                  Coach
                </span>
              </span>
              {team.coach.pronouns && (
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest">
                  {team.coach.pronouns}
                </span>
              )}
            </li>
          )}
          {(team.subs || []).filter(Boolean).map((s) => (
            <li
              key={s.pseudo}
              className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text-muted"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Flag code={s.nationality} image={s.flagImage} />
                <span className="truncate">{s.pseudo}</span>
                <span className="chip-badge whitespace-nowrap px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
                  Sub
                </span>
              </span>
              {s.pronouns && (
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest">
                  {s.pronouns}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function EditionDetail() {
  const { editionId } = useParams();
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");

  const edition = editions.find((e) => e.id === editionId);
  const editionCredits = credits[editionId] ?? null;
  const editionTeams = useMemo(
    () => teams.filter((t) => t.editionId === editionId),
    [editionId]
  );
  const rows = useMemo(() => {
    const filtered = playerStats.filter((r) => r.editionId === editionId);
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [editionId, sortKey, sortDir]);

  function teamLogo(teamName) {
    return teams.find((t) => t.name === teamName)?.logo ?? null;
  }

  // MVP/EVP ne sont saisis qu'une fois, dans playerStats — on les
  // retrouve ici pour les afficher aussi sur les cartes équipes.
  function statsFor(teamName, pseudo) {
    return (
      playerStats.find(
        (r) => r.editionId === editionId && r.team === teamName && r.pseudo === pseudo
      ) || {}
    );
  }

  function ratingColor(rating) {
    if (rating >= 1.05) return "text-emerald-400";
    if (rating >= 0.96) return "text-text-muted";
    return "text-red-400";
  }

  // Même traitement visuel que MVP : Vainqueur en or, tout le reste en
  // pastille neutre.

  function isWinningTeam(teamName) {
    return teams.find((t) => t.editionId === editionId && t.name === teamName)?.result === "Vainqueur";
  }

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  if (!edition) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-text-muted">Cette édition n'existe pas.</p>
        <Link to="/editions" className="btn-glass mt-6 inline-block px-4 py-2 text-sm text-text">
          ← Retour aux éditions
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Link
        to="/editions"
        className="font-body text-xs uppercase tracking-widest text-text-muted hover:text-text"
      >
        ← Éditions
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-5xl font-bold md:text-6xl">{edition.label}</h1>
        <span className="chip-badge whitespace-nowrap px-3 py-1 text-xs uppercase tracking-widest text-accent">
          {edition.status}
        </span>
      </div>
      <p className="mt-3 text-text-muted">{edition.date}</p>

      {/* ÉQUIPES */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold">Équipes</h2>
      </div>

      {editionTeams.length === 0 ? (
        <p className="mt-6 text-text-muted">Aucune équipe enregistrée pour cette édition.</p>
      ) : (
        <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {editionTeams.map((team) => (
            <TeamCard key={team.id} team={team} statsFor={statsFor} />
          ))}
        </div>
      )}

      {/* STATS */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold">Stats</h2>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-text-muted">Aucune statistique pour cette édition.</p>
      ) : (
        <div className="surface mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-border-strong bg-bg-elevated text-left text-text-muted">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-xs uppercase tracking-widest hover:text-text"
                  >
                    {col.label}
                    {sortKey === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={`${row.pseudo}-${i}`}
                  className={`border-b border-border ${i % 2 === 1 ? "bg-bg-elevated" : ""}`}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-text">
                    <span className="flex items-center gap-2">
                      <Flag code={row.nationality} image={row.flagImage} />
                      {row.pseudo}
                      {isWinningTeam(row.team) && (
                        <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          Vainqueur
                        </span>
                      )}
                      {row.mvp && (
                        <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          MVP
                        </span>
                      )}
                      {row.evp && (
                        <span className="chip-evp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          EVP
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-muted">
                    <div className="flex items-center gap-2">
                      <TeamBadge name={row.team} logo={teamLogo(row.team)} size="sm" />
                      {row.team}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-muted">{row.maps}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-muted">{row.rounds}</td>
                  <td
                    className={`whitespace-nowrap px-4 py-3 font-medium ${
                      row.kdDiff > 0
                        ? "text-emerald-400"
                        : row.kdDiff < 0
                        ? "text-red-400"
                        : "text-text-muted"
                    }`}
                  >
                    {row.kdDiff > 0 ? `+${row.kdDiff}` : row.kdDiff}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-muted">
                    {row.kd.toFixed(2)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 font-bold ${ratingColor(row.rating)}`}>
                    {row.rating.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CRÉDITS */}
      {editionCredits && (
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="text-center">
            <p className="font-display text-2xl font-bold">PROJECT JÎN</p>
            <p className="mt-1 text-sm text-text-muted">{editionCredits.subtitle}</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
            {editionCredits.blocks.map((block) => (
              <div key={block.label} className={block.teams ? "sm:col-span-2" : ""}>
                <p className="text-xs uppercase tracking-widest text-text-muted">{block.label}</p>

                {block.lines && (
                  <div className="mt-1.5 space-y-0.5">
                    {block.lines.map((line, i) => (
                      <p key={i} className="text-sm text-text">
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {block.teams && (
                  <div className="mt-2 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {block.teams.map((t) => (
                      <div key={t.name}>
                        <p className="text-sm font-semibold text-text">{t.name}</p>
                        <p className="text-xs text-text-muted">{t.roster}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editionCredits.closing && (
            <div className="mx-auto mt-12 max-w-xl text-center">
              <p className="font-display text-xl font-bold">{editionCredits.closing.heading}</p>
              <div className="mt-3 space-y-2">
                {editionCredits.closing.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-text-muted">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-4 font-semibold text-text">{editionCredits.closing.tagline}</p>
              <p className="mt-2 text-accent">♥︎</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}