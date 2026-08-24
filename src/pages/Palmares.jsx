import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Flag from "../components/Flag";
import PlayerName from "../components/PlayerName";
import { editions, editionDateLabel } from "../data/editions";
import { teams, findSteamId } from "../data/teams";
import { playerStats } from "../data/stats";
import { useLanguage } from "../i18n/LanguageContext";

export default function Palmares() {
  const { t } = useLanguage();
  const [sortKey, setSortKey] = useState("wins");
  const [sortDir, setSortDir] = useState("desc");

  const sortedEditions = useMemo(
    () => [...editions].sort((a, b) => b.number - a.number),
    []
  );

  const recaps = sortedEditions.map((ed) => {
    const winner = teams.find((tm) => tm.editionId === ed.id && tm.result === "Vainqueur");
    const editionStats = playerStats.filter((r) => r.editionId === ed.id);
    const mvps = editionStats.filter((r) => r.mvp);
    const evps = editionStats.filter((r) => r.evp);
    return { edition: ed, winner, mvps, evps };
  });

  const leaderboardRaw = useMemo(() => {
    const record = {};

    function ensure(pseudo, flagImage) {
      record[pseudo] ??= { pseudo, flagImage, wins: 0, finals: 0, mvp: 0, evp: 0 };
      return record[pseudo];
    }

    teams.forEach((team) => {
      if (team.result === "Vainqueur") {
        (team.players || []).filter(Boolean).forEach((p) => {
          ensure(p.pseudo, p.flagImage).wins += 1;
        });
      }
      if (team.result === "Finaliste") {
        (team.players || []).filter(Boolean).forEach((p) => {
          ensure(p.pseudo, p.flagImage).finals += 1;
        });
      }
    });

    playerStats.forEach((r) => {
      const entry = ensure(r.pseudo, r.flagImage);
      if (r.mvp) entry.mvp += 1;
      if (r.evp) entry.evp += 1;
    });

    return Object.values(record).filter((r) => r.wins + r.finals + r.mvp + r.evp > 0);
  }, []);

  const leaderboard = useMemo(() => {
    return [...leaderboardRaw].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [leaderboardRaw, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const columns = [
    { key: "pseudo", label: t("col_player") },
    { key: "wins", label: t("col_titles") },
    { key: "finals", label: t("tag_finalist") },
    { key: "mvp", label: t("tag_mvp") },
    { key: "evp", label: t("tag_evp") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-5xl font-bold md:text-6xl">{t("palmares_title")}</h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("palmares_intro")}</p>

      {/* CLASSEMENT INDIVIDUEL */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold">{t("palmares_leaderboard_title")}</h2>
        {leaderboard.length === 0 ? (
          <p className="mt-4 text-text-muted">{t("palmares_no_data")}</p>
        ) : (
          <div className="surface mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] table-fixed border-collapse font-body text-sm">
              <colgroup>
                <col className="w-[40%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border-strong bg-bg-elevated text-left text-text-muted">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="cursor-pointer select-none whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest hover:text-text"
                    >
                      {col.label}
                      <span className={sortKey === col.key ? "" : "invisible"}>
                        {" "}
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((r, i) => (
                  <tr
                    key={r.pseudo}
                    className={`border-b border-border ${i % 2 === 1 ? "bg-bg-elevated" : ""}`}
                  >
                    <td className="whitespace-nowrap px-4 py-2 text-text">
                      <span className="flex items-center gap-2">
                        <Flag image={r.flagImage} />
                        <PlayerName pseudo={r.pseudo} steamId={findSteamId(r.pseudo)} />
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {r.wins > 0 && (
                        <span className="chip-mvp px-2 py-0.5 text-[10px] uppercase tracking-widest">
                          {r.wins}×
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {r.finals > 0 && (
                        <span className="chip-badge px-2 py-0.5 text-[10px] uppercase tracking-widest">
                          {r.finals}×
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {r.mvp > 0 && (
                        <span className="chip-mvp px-2 py-0.5 text-[10px] uppercase tracking-widest">
                          {r.mvp}×
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {r.evp > 0 && (
                        <span className="chip-evp px-2 py-0.5 text-[10px] uppercase tracking-widest">
                          {r.evp}×
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAR ÉDITION */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold">{t("palmares_by_edition_title")}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recaps.map(({ edition, winner, mvps, evps }) => (
            <Link
              key={edition.id}
              to={`/editions/${edition.id}`}
              className="surface flex flex-col gap-4 p-5 transition-colors hover:border-border-strong"
            >
              <div>
                <h3 className="font-display text-lg font-bold">{edition.label}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-text-muted">
                  {editionDateLabel(edition)}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-muted">
                  {t("label_winner")}
                </p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {winner ? winner.name : "—"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-muted">
                  {t("tag_mvp")}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {mvps.length === 0 ? (
                    <span className="text-sm text-text-muted">—</span>
                  ) : (
                    mvps.map((m) => (
                      <span
                        key={m.pseudo}
                        className="chip-mvp px-2 py-0.5 text-[10px] uppercase tracking-widest"
                      >
                        {m.pseudo}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-muted">
                  {t("tag_evp")}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {evps.length === 0 ? (
                    <span className="text-sm text-text-muted">—</span>
                  ) : (
                    evps.map((e) => (
                      <span
                        key={e.pseudo}
                        className="chip-evp px-2 py-0.5 text-[10px] uppercase tracking-widest"
                      >
                        {e.pseudo}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}