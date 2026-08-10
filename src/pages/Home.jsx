import { Link } from "react-router-dom";
import RojLogo from "../components/RojLogo";
import { siteConfig } from "../data/config";
import { editions } from "../data/editions";
import { teams } from "../data/teams";
import { useLanguage } from "../i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const upcoming = [...editions]
    .filter((e) => e.status !== "terminée")
    .sort((a, b) => a.number - b.number)[0];
  const latest = upcoming ?? [...editions].sort((a, b) => b.number - a.number)[0];

  const teamsCount = teams.filter((t) => !t.pool).length;

  const uniquePlayers = new Set();
  teams.forEach((team) => {
    (team.players || []).filter(Boolean).forEach((p) => uniquePlayers.add(p.pseudo));
    (team.subs || []).filter(Boolean).forEach((p) => uniquePlayers.add(p.pseudo));
    if (team.coach) uniquePlayers.add(team.coach.pseudo);
  });

  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-white/5"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-20">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
            <RojLogo className="h-16 w-16 flex-shrink-0 text-text md:h-24 md:w-24" />
            <h1 className="font-display text-6xl font-bold leading-[0.9] tracking-tight md:text-8xl">
              JÎN
            </h1>
          </div>

          <p className="mt-6 max-w-2xl font-body text-lg text-text md:text-xl">
            {t("site_tagline")}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
            {t("home_intro")} {t("site_meaning")}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-glass-primary px-6 py-2.5 font-body text-sm font-medium"
            >
              {t("home_join_discord")}
            </a>
            <Link to="/editions" className="btn-glass px-6 py-2.5 font-body text-sm font-medium text-text">
              {t("home_view_editions")}
            </Link>
            <Link to="/reglement" className="btn-glass px-6 py-2.5 font-body text-sm font-medium text-text">
              {t("home_read_rulebook")}
            </Link>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: t("stat_editions_run"), value: String(editions.length).padStart(2, "0") },
            { label: t("stat_teams"), value: String(teamsCount).padStart(2, "0") },
            { label: t("stat_unique_players"), value: String(uniquePlayers.size).padStart(2, "0") },
            { label: t("stat_next_edition"), value: latest?.date ?? "—" },
          ].map((stat) => (
            <div key={stat.label} className="surface px-5 py-4">
              <div className="font-mono text-2xl font-semibold text-accent">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl border-t border-white/5 px-6 py-14 text-center">
        <p className="font-display text-2xl font-bold md:text-4xl">{t("home_cta")}</p>
        <div className="mt-6 flex justify-center">
          <a
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-glass-primary px-6 py-2.5 font-body text-sm font-medium"
          >
            {t("home_join_discord")}
          </a>
        </div>
      </section>
    </div>
  );
}