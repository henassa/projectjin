// Logo d'équipe. Si `logo` est fourni (chemin d'image dans public/), on
// l'affiche ; sinon, badge de repli avec les initiales du nom, dans la
// même charte que le reste du site.
function initialsFromName(name) {
  const words = (name || "?").trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function TeamBadge({ name, logo, size = "md" }) {
  const initials = initialsFromName(name);
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  };

  if (logo) {
    return (
      <img
        src={logo}
        alt={`Logo ${name}`}
        className={`flex-shrink-0 border border-white/10 object-cover shadow-[0_4px_12px_-2px_rgba(0,0,0,0.6)] ${sizes[size]}`}
      />
    );
  }

  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center surface font-semibold text-text ${sizes[size]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}