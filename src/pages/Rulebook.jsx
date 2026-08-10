import { rulebook } from "../data/rulebook";
import { useLanguage } from "../i18n/LanguageContext";

export default function Rulebook() {
  const { lang, t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">{t("rulebook_title")}</h1>
      <p className="mt-4 max-w-2xl text-text-muted">{t("rulebook_intro")}</p>

      <div className="mt-10 space-y-10">
        {rulebook.map((section) => (
          <div key={section.section.fr}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-text">
              {section.section[lang]}
            </h2>
            <div className="surface mt-6 divide-y divide-white/5 px-6">
              {section.articles.map((article) => (
                <p key={article.title.fr} className="py-5 text-sm leading-relaxed text-text-muted">
                  <span className="font-semibold text-text">{article.title[lang]}.</span>{" "}
                  {article.text[lang]}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}