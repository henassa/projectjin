import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeamBadge from "../components/TeamBadge";
import Flag from "../components/Flag";
import PlayerName from "../components/PlayerName";
import { editions, editionDateLabel } from "../data/editions";
import { teams, findSteamId } from "../data/teams";
import { playerStats } from "../data/stats";
import { credits } from "../data/credits";
import { useLanguage } from "../i18n/LanguageContext";

const statusKeys = {
  "à venir": "status_upcoming",
  "en cours": "status_ongoing",
  "terminée": "status_done",
};

function resultChipClass(result) {
  if (result === "Vainqueur") return "chip-mvp";
  return "chip-badge text-accent";
}

function RosterRow({ person, role, t }) {
  return (
    <li className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-text">
      <span className="flex min-w-0 items-center gap-2">
        <Flag image={person.flagImage} />
        <span className="truncate">
          <PlayerName pseudo={person.pseudo} steamId={person.steamId} />
        </span>
        {role && (
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {role}
          </span>
        )}
      </span>
      {person.pronouns && (
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {person.pronouns}
        </span>
      )}
    </li>
  );
}

function TeamCard({ team, statsFor, t }) {
  const players = (team.players || []).filter(Boolean);
  const subs = (team.subs || []).filter(Boolean);

  return (
    <div className="surface flex h-full flex-col overflow-hidden">
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
            {team.result === "Vainqueur" ? t("tag_winner") : team.result}
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
                  <Flag image={p.flagImage} />
                  <span className="truncate">
                    <PlayerName pseudo={p.pseudo} steamId={p.steamId} />
                  </span>
                  {p.role && (
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {p.role}
                    </span>
                  )}
                  {stat.mvp && (
                    <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                      {t("tag_mvp")}
                    </span>
                  )}
                  {stat.evp && (
                    <span className="chip-evp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                      {t("tag_evp")}
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
          {subs.map((s) => (
            <RosterRow key={s.pseudo} person={s} role={s.role || t("tag_sub")} t={t} />
          ))}
          {team.coach && (
            <RosterRow person={team.coach} role={team.coach.role || t("tag_coach")} t={t} />
          )}
        </ul>
      )}
    </div>
  );
}

export default function EditionDetail() {
  const { editionId } = useParams();
  const { lang, t } = useLanguage();
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");

  const columns = [
    { key: "pseudo", label: t("col_player") },
    { key: "team", label: t("col_team") },
    { key: "maps", label: t("col_maps") },
    { key: "rounds", label: t("col_rounds") },
    { key: "kdDiff", label: t("col_kd_diff") },
    { key: "kd", label: t("col_kd") },
    { key: "rating", label: t("col_rating") },
  ];

  const edition = editions.find((e) => e.id === editionId);
  const editionCredits = credits[editionId] ?? null;
  const editionTeams = useMemo(
    () => teams.filter((tm) => tm.editionId === editionId),
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
    return teams.find((tm) => tm.name === teamName)?.logo ?? null;
  }

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

  function isWinningTeam(teamName) {
    return teams.find((tm) => tm.editionId === editionId && tm.name === teamName)?.result === "Vainqueur";
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
        <p className="text-text-muted">{t("edition_not_found")}</p>
        <Link to="/editions" className="btn-glass mt-6 inline-block px-4 py-2 text-sm text-text">
          {t("back_to_editions_full")}
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
        {t("back_to_editions")}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-5xl font-bold md:text-6xl">{edition.label}</h1>
        <span className="chip-badge whitespace-nowrap px-3 py-1 text-xs uppercase tracking-widest text-accent">
          {t(statusKeys[edition.status] ?? "status_upcoming")}
        </span>
      </div>
      <p className="mt-3 text-text-muted">{editionDateLabel(edition)}</p>

      {/* ÉQUIPES */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold">{t("section_teams")}</h2>
      </div>

      {editionTeams.length === 0 ? (
        <p className="mt-6 text-text-muted">{t("no_teams_yet")}</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {editionTeams.map((team) => (
            <TeamCard key={team.id} team={team} statsFor={statsFor} t={t} />
          ))}
        </div>
      )}

      {/* STATS */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold">{t("section_stats")}</h2>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-text-muted">{t("no_stats_yet")}</p>
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
                      <Flag image={row.flagImage} />
                      <PlayerName pseudo={row.pseudo} steamId={findSteamId(row.pseudo)} />
                      {isWinningTeam(row.team) && (
                        <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          {t("tag_winner")}
                        </span>
                      )}
                      {row.mvp && (
                        <span className="chip-mvp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          {t("tag_mvp")}
                        </span>
                      )}
                      {row.evp && (
                        <span className="chip-evp whitespace-nowrap px-2 py-0.5 text-[9px] uppercase tracking-widest">
                          {t("tag_evp")}
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
            <p className="mt-1 text-sm text-text-muted">{editionCredits.subtitle[lang]}</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
            {editionCredits.blocks.map((block) => (
              <div key={block.label.fr} className={block.teams ? "sm:col-span-2" : ""}>
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  {block.label[lang]}
                </p>
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
                    {block.teams.map((tm) => (
                      <div key={tm.name}>
                        <p className="text-sm font-semibold text-text">{tm.name}</p>
                        <p className="text-xs text-text-muted">{tm.roster}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}