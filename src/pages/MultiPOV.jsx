import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { mainStreamLogin, extraStreams } from "../data/streams";
import { getPlayersWithTwitch } from "../data/teams";
import { currentEdition } from "../data/editions";
import TeamBadge from "../components/TeamBadge";

const POLL_INTERVAL_MS = 30_000;
const MAX_SPOTLIGHT = 4;

// Le paramètre "parent" de l'embed Twitch doit correspondre exactement
// au(x) domaine(s) qui servent le site, sinon le player refuse de charger.
const EMBED_PARENTS = [window.location.hostname];

function embedSrc(login) {
  const parentQS = EMBED_PARENTS.map((p) => `&parent=${p}`).join("");
  return `https://player.twitch.tv/?channel=${login}&muted=true${parentQS}`;
}

function ExpandIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3H3v6M15 21h6v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

// Libellé affiché pour une chaîne : logo d'équipe + nom d'équipe + pseudo
// si la personne vient de teams.js, sinon simplement le displayName
// Twitch ou le login brut.
function ChannelLabel({ entry, liveInfo, size = "sm" }) {
  if (entry.teamName) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <TeamBadge name={entry.teamName} logo={entry.teamLogo} size={size} />
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">{entry.pseudo}</p>
          <p className="truncate text-[10px] uppercase tracking-widest text-text-muted">
            {entry.teamName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <span className="truncate font-display text-sm font-bold">
      {liveInfo?.displayName || entry.login}
    </span>
  );
}

// Visuel "hors ligne" maison — on n'affiche jamais la carte native de
// Twitch (fond blanc, hors charte). Tant que la chaîne n'est pas live,
// on ne charge même pas l'iframe : juste ce placeholder sobre.
function OfflinePlaceholder({ entry, t, large = false }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
      {entry.teamLogo ? (
        <TeamBadge name={entry.teamName} logo={entry.teamLogo} size={large ? "lg" : "md"} />
      ) : (
        <div
          className={`flex items-center justify-center rounded-none border border-border text-text-muted ${
            large ? "h-16 w-16" : "h-10 w-10"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className={large ? "h-7 w-7" : "h-5 w-5"} fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 8v8a2 2 0 002 2h9l4 3V5.5L15 8H6a2 2 0 00-2 2z" />
          </svg>
        </div>
      )}
      <div>
        <p className={`font-display font-bold ${large ? "text-base" : "text-sm"}`}>
          {entry.pseudo || entry.login}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-text-muted">
          {t("multipov_offline")}
        </p>
      </div>
    </div>
  );
}

// Tuile dans la zone du haut : un ou plusieurs streams sélectionnés,
// affichés côte à côte. Un bouton "✕" les retire de la sélection.
function SpotlightTile({ entry, liveInfo, isOfficial, onRemove, t }) {
  const isLive = !!liveInfo;

  return (
    <motion.div layout className="surface flex flex-col overflow-hidden border-border-strong">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        {isOfficial ? (
          <span className="chip-active px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest">
            {t("multipov_main_stream")}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={t("multipov_remove_from_spotlight")}
          className="flex items-center gap-1.5 font-body text-xs text-text-muted transition-colors hover:text-text"
        >
          <CloseIcon className="h-3.5 w-3.5" />
          {t("multipov_remove_from_spotlight")}
        </button>
      </div>

      <div className="aspect-video w-full bg-bg-elevated">
        {isLive ? (
          <iframe
            title={`twitch-spotlight-${entry.login}`}
            src={embedSrc(entry.login)}
            allowFullScreen
            className="h-full w-full"
            frameBorder="0"
          />
        ) : (
          <OfflinePlaceholder entry={entry} t={t} large />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <ChannelLabel entry={entry} liveInfo={liveInfo} size="md" />
      </div>
    </motion.div>
  );
}

// Tuile cliquable dans la grille du bas : un clic l'ajoute à la zone du
// haut, à côté des streams déjà sélectionnés (comme un switcher de PoV).
function GridTile({ entry, liveInfo, onSelect, t }) {
  const isLive = !!liveInfo;

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      onClick={onSelect}
      aria-label={`${t("multipov_feature_action")} — ${entry.pseudo || entry.login}`}
      className={`surface group flex flex-col overflow-hidden text-left transition-colors hover:border-border-strong ${
        isLive ? "border-border-strong" : ""
      }`}
    >
      <div className="relative aspect-video w-full bg-bg-elevated">
        {isLive ? (
          <iframe
            title={`twitch-${entry.login}`}
            src={embedSrc(entry.login)}
            allowFullScreen
            className="h-full w-full"
            frameBorder="0"
          />
        ) : (
          <OfflinePlaceholder entry={entry} t={t} />
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-150 group-hover:bg-black/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 border border-text/70 bg-bg/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-text">
            <ExpandIcon className="h-3.5 w-3.5" />
            {t("multipov_feature_action")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3">
        <ChannelLabel entry={entry} liveInfo={liveInfo} size="sm" />
      </div>
    </motion.button>
  );
}

export default function MultiPOV() {
  const { t } = useLanguage();

  // Liste combinée : joueur·ses de l'édition en cours ayant un `twitch`
  // renseigné dans teams.js, + les chaînes "hors roster" de streams.js
  // (casteur·ses, staff...). Dédupliquée par login.
  const allEntries = useMemo(() => {
    const edition = currentEdition();
    const fromTeams = edition ? getPlayersWithTwitch(edition.id) : [];
    const seen = new Set(fromTeams.map((e) => e.login));

    const extras = (extraStreams || [])
      .map((s) => ({ login: s.login.trim().toLowerCase() }))
      .filter((s) => s.login && !seen.has(s.login));

    return [...fromTeams, ...extras];
  }, []);

  const mainLogin = mainStreamLogin ? mainStreamLogin.trim().toLowerCase() : null;

  // Table de lookup login → entrée (infos équipe si dispo), en s'assurant
  // que le flux officiel a toujours une entrée même s'il n'apparaît pas
  // dans teams.js / extraStreams (ex. un·e casteur·se sans fiche joueur).
  const entriesByLogin = useMemo(() => {
    const map = {};
    allEntries.forEach((e) => {
      map[e.login] = e;
    });
    if (mainLogin && !map[mainLogin]) {
      map[mainLogin] = { login: mainLogin };
    }
    return map;
  }, [allEntries, mainLogin]);

  const combinedLogins = useMemo(() => {
    const logins = mainLogin ? [mainLogin] : [];
    allEntries.forEach((e) => {
      if (!logins.includes(e.login)) logins.push(e.login);
    });
    return logins;
  }, [allEntries, mainLogin]);
  const loginsKey = combinedLogins.join(",");

  // Chaînes actuellement affichées côte à côte en haut de page. Le flux
  // officiel y est par défaut ; un clic sur une tuile de la grille
  // l'ajoute à côté (jusqu'à MAX_SPOTLIGHT en simultané), un clic sur
  // "✕" dans la zone du haut la retire.
  const [spotlightLogins, setSpotlightLogins] = useState(mainLogin ? [mainLogin] : []);

  const addToSpotlight = (login) => {
    setSpotlightLogins((prev) => {
      if (prev.includes(login)) return prev;
      if (prev.length >= MAX_SPOTLIGHT) return [...prev.slice(1), login];
      return [...prev, login];
    });
  };

  const removeFromSpotlight = (login) => {
    setSpotlightLogins((prev) => prev.filter((l) => l !== login));
  };

  const resetSpotlight = () => {
    setSpotlightLogins(mainLogin ? [mainLogin] : []);
  };

  const [liveMap, setLiveMap] = useState({});
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const fetchLiveStatus = useCallback(async () => {
    if (combinedLogins.length === 0) {
      setLiveMap({});
      return;
    }
    try {
      const res = await fetch(
        `/.netlify/functions/twitch-live?logins=${encodeURIComponent(loginsKey)}`
      );
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      const map = {};
      (data.live || []).forEach((entry) => {
        map[entry.login] = entry;
      });
      setLiveMap(map);
      setError(null);
    } catch {
      setError(t("multipov_error"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginsKey, t]);

  useEffect(() => {
    fetchLiveStatus();
    clearInterval(pollRef.current);
    pollRef.current = setInterval(fetchLiveStatus, POLL_INTERVAL_MS);
    return () => clearInterval(pollRef.current);
  }, [fetchLiveStatus]);

  const sortLabel = (entry) => (entry.teamName || entry.pseudo || entry.login).toLowerCase();

  const gridEntries = combinedLogins
    .filter((login) => !spotlightLogins.includes(login))
    .map((login) => entriesByLogin[login])
    .sort((a, b) => {
      const aLive = liveMap[a.login];
      const bLive = liveMap[b.login];
      if (aLive && !bLive) return -1;
      if (!aLive && bLive) return 1;
      return sortLabel(a).localeCompare(sortLabel(b), "fr");
    });

  const spotlightEntries = spotlightLogins
    .map((login) => entriesByLogin[login])
    .filter(Boolean);

  const spotlightColsClass =
    spotlightEntries.length <= 1
      ? "grid-cols-1"
      : spotlightEntries.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : spotlightEntries.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";

  const isDefaultSpotlight =
    spotlightLogins.length === (mainLogin ? 1 : 0) &&
    (mainLogin ? spotlightLogins[0] === mainLogin : true);

  const liveCount = combinedLogins.filter((l) => liveMap[l]).length;
  const totalViewers = combinedLogins.reduce(
    (sum, l) => sum + (liveMap[l]?.viewers || 0),
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">
        {t("multipov_title")}
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("multipov_intro")}</p>

      {combinedLogins.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-widest text-text-muted">
            {combinedLogins.length}{" "}
            {t(
              combinedLogins.length > 1
                ? "multipov_count_channels_plural"
                : "multipov_count_channels"
            )}
            {" · "}
            {liveCount} {t("multipov_count_live")}
            {totalViewers > 0 && (
              <>
                {" · "}
                {totalViewers.toLocaleString("fr-CH")} {t("multipov_total_viewers")}
              </>
            )}
          </p>

          {!isDefaultSpotlight && (
            <button
              type="button"
              onClick={resetSpotlight}
              className="font-body text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
            >
              {t("multipov_reset_selection")}
            </button>
          )}
        </div>
      )}

      {error && <p className="mt-3 text-xs text-text-muted">{error}</p>}

      {combinedLogins.length === 0 ? (
        <div className="surface mt-10 flex items-center justify-center py-16 text-sm text-text-muted">
          {t("multipov_empty")}
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {spotlightEntries.length > 0 && (
            <motion.div layout className={`grid gap-4 ${spotlightColsClass}`}>
              <AnimatePresence>
                {spotlightEntries.map((entry) => (
                  <SpotlightTile
                    key={entry.login}
                    entry={entry}
                    liveInfo={liveMap[entry.login]}
                    isOfficial={entry.login === mainLogin}
                    onRemove={() => removeFromSpotlight(entry.login)}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {gridEntries.length > 0 && (
            <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {gridEntries.map((entry) => (
                  <GridTile
                    key={entry.login}
                    entry={entry}
                    liveInfo={liveMap[entry.login]}
                    onSelect={() => addToSpotlight(entry.login)}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}