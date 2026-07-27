export default function EditionFilter({ editions, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 font-body text-xs uppercase tracking-widest transition-all ${
          value === "all" ? "chip-active" : "btn-glass text-text-muted hover:text-text"
        }`}
      >
        Toutes éditions
      </button>
      {editions.map((ed) => (
        <button
          key={ed.id}
          onClick={() => onChange(ed.id)}
          className={`px-4 py-2 font-body text-xs uppercase tracking-widest transition-all ${
            value === ed.id ? "chip-active" : "btn-glass text-text-muted hover:text-text"
          }`}
        >
          {ed.label}
        </button>
      ))}
    </div>
  );
}