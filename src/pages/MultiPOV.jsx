import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { mainStreamLogin, extraStreams } from "../data/streams";
import { getPlayersWithTwitch } from "../data/teams";
import { currentEdition } from "../data/editions";
import TeamBadge from "../components/TeamBadge";

const POLL_INTERVAL_MS = 30_000;

// Le paramètre "parent" de l'embed Twitch doit correspondre exactement
// au(x) domaine(s) qui servent le site, sinon le player refuse de charger.
const EMBED_PARENTS = [window.location.hostname];

function embedSrc(login) {
  const parentQS = EMBED_PARENTS.map((p) => `&parent=${p}`).join("");
  return `https://player.twitch.tv/?channel=${login}&muted=true${parentQS}`;
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

function MainStreamTile({ entry, liveInfo, t }) {
  const isLive = !!liveInfo;

  return (
    <motion.div layout className="surface flex flex-col overflow-hidden border-border-strong">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <span className="chip-active px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest">
          {t("multipov_main_stream")}
        </span>
        {isLive && (
          <span className="chip-badge flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-text" />
            {t("multipov_live")}
          </span>
        )}
      </div>

      <div className="aspect-video w-full bg-bg-elevated">
        {isLive ? (
          <iframe
            title={`twitch-main-${entry.login}`}
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
        {isLive && liveInfo.viewers != null && (
          <span className="shrink-0 text-xs text-text-muted">
            {liveInfo.viewers.toLocaleString("fr-CH")} {t("multipov_viewers")}
          </span>
        )}
      </div>

      {isLive && liveInfo.title && (
        <p className="truncate px-4 pb-3 -mt-2 text-xs text-text-muted">{liveInfo.title}</p>
      )}
    </motion.div>
  );
}

function SecondaryStreamTile({ entry, liveInfo, t }) {
  const isLive = !!liveInfo;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`surface flex flex-col overflow-hidden ${
        isLive ? "border-border-strong" : ""
      }`}
    >
      <div className="aspect-video w-full bg-bg-elevated">
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
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {isLive && (
            <span className="chip-badge flex shrink-0 items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
              {t("multipov_live")}
            </span>
          )}
          <ChannelLabel entry={entry} liveInfo={liveInfo} size="sm" />
        </div>
        {isLive && liveInfo.viewers != null && (
          <span className="shrink-0 text-xs text-text-muted">
            {liveInfo.viewers.toLocaleString("fr-CH")} {t("multipov_viewers")}
          </span>
        )}
      </div>

      {isLive && liveInfo.title && (
        <p className="truncate px-4 pb-3 -mt-2 text-xs text-text-muted">{liveInfo.title}</p>
      )}
    </motion.div>
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

  // Le stream principal peut être un des joueur·ses ci-dessus, ou une
  // chaîne qui n'apparaît nulle part ailleurs (ex. un·e casteur·se sans
  // fiche joueur) — dans ce cas on l'ajoute quand même, sans infos
  // d'équipe.
  const mainLogin = mainStreamLogin ? mainStreamLogin.trim().toLowerCase() : null;
  const mainFromEntries = mainLogin ? allEntries.find((e) => e.login === mainLogin) : null;
  const mainEntry = mainLogin ? mainFromEntries || { login: mainLogin } : null;
  const secondaryEntries = allEntries.filter((e) => e.login !== mainLogin);

  const combinedLogins = [
    ...(mainEntry ? [mainEntry.login] : []),
    ...secondaryEntries.map((e) => e.login),
  ];
  const loginsKey = combinedLogins.join(",");

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

  const sortedSecondary = [...secondaryEntries].sort((a, b) => {
    const aLive = liveMap[a.login];
    const bLive = liveMap[b.login];
    if (aLive && bLive) return (bLive.viewers || 0) - (aLive.viewers || 0);
    if (aLive) return -1;
    if (bLive) return 1;
    return 0;
  });

  const liveCount = combinedLogins.filter((l) => liveMap[l]).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">
        {t("multipov_title")}
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("multipov_intro")}</p>

      {combinedLogins.length > 0 && (
        <p className="mt-6 text-xs uppercase tracking-widest text-text-muted">
          {combinedLogins.length}{" "}
          {t(
            combinedLogins.length > 1
              ? "multipov_count_channels_plural"
              : "multipov_count_channels"
          )}
          {" · "}
          {liveCount} {t("multipov_count_live")}
        </p>
      )}

      {error && <p className="mt-3 text-xs text-text-muted">{error}</p>}

      {combinedLogins.length === 0 ? (
        <div className="surface mt-10 flex items-center justify-center py-16 text-sm text-text-muted">
          {t("multipov_empty")}
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {mainEntry && (
            <MainStreamTile entry={mainEntry} liveInfo={liveMap[mainEntry.login]} t={t} />
          )}

          {sortedSecondary.length > 0 && (
            <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {sortedSecondary.map((entry) => (
                  <SecondaryStreamTile
                    key={entry.login}
                    entry={entry}
                    liveInfo={liveMap[entry.login]}
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