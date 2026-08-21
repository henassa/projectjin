import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { streams } from "../data/streams";

const POLL_INTERVAL_MS = 30_000;

// Le paramètre "parent" de l'embed Twitch doit correspondre exactement
// au(x) domaine(s) qui servent le site, sinon le player refuse de charger.
const EMBED_PARENTS = [window.location.hostname];

function ChannelTile({ login, liveInfo, t }) {
  const isLive = !!liveInfo;
  const parentQS = EMBED_PARENTS.map((p) => `&parent=${p}`).join("");

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
        <iframe
          title={`twitch-${login}`}
          src={`https://player.twitch.tv/?channel=${login}&muted=true${parentQS}`}
          allowFullScreen
          className="h-full w-full"
          frameBorder="0"
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {isLive && (
            <span className="chip-badge flex shrink-0 items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
              {t("multipov_live")}
            </span>
          )}
          <span className="truncate font-display text-sm font-bold">
            {liveInfo?.displayName || login}
          </span>
          {isLive && liveInfo.viewers != null && (
            <span className="shrink-0 text-xs text-text-muted">
              {liveInfo.viewers.toLocaleString("fr-CH")} {t("multipov_viewers")}
            </span>
          )}
        </div>
      </div>

      {isLive && liveInfo.title && (
        <p className="truncate px-4 pb-3 -mt-2 text-xs text-text-muted">{liveInfo.title}</p>
      )}
    </motion.div>
  );
}

export default function MultiPOV() {
  const { t } = useLanguage();
  const logins = streams.map((s) => s.login.toLowerCase());
  const loginsKey = logins.join(",");

  const [liveMap, setLiveMap] = useState({});
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const fetchLiveStatus = useCallback(async () => {
    if (logins.length === 0) {
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

  const sortedLogins = [...logins].sort((a, b) => {
    const aLive = liveMap[a];
    const bLive = liveMap[b];
    if (aLive && bLive) return (bLive.viewers || 0) - (aLive.viewers || 0);
    if (aLive) return -1;
    if (bLive) return 1;
    return 0;
  });

  const liveCount = logins.filter((l) => liveMap[l]).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">
        {t("multipov_title")}
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("multipov_intro")}</p>

      {logins.length > 0 && (
        <p className="mt-6 text-xs uppercase tracking-widest text-text-muted">
          {logins.length}{" "}
          {t(logins.length > 1 ? "multipov_count_channels_plural" : "multipov_count_channels")}
          {" · "}
          {liveCount} {t("multipov_count_live")}
        </p>
      )}

      {error && <p className="mt-3 text-xs text-text-muted">{error}</p>}

      {logins.length === 0 ? (
        <div className="surface mt-10 flex items-center justify-center py-16 text-sm text-text-muted">
          {t("multipov_empty")}
        </div>
      ) : (
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {sortedLogins.map((login) => (
              <ChannelTile key={login} login={login} liveInfo={liveMap[login]} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}