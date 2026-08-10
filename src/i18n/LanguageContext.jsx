import { createContext, useContext, useEffect, useState } from "react";
import { t as translate } from "./strings";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Français par défaut, toujours — même pour un premier visiteur dont
  // le navigateur est en anglais (on ne détecte jamais la langue du
  // navigateur ici). Seul un choix explicite ("en" déjà enregistré dans
  // localStorage lors d'une visite précédente) bascule en anglais.
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "fr";
    return localStorage.getItem("jin-lang") === "en" ? "en" : "fr";
  });

  useEffect(() => {
    localStorage.setItem("jin-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    setLang((l) => (l === "fr" ? "en" : "fr"));
  }

  const t = (key) => translate(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}