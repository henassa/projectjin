export default function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 select-none">
      <span className="font-body text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <span
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-10 transition-all ${
          checked ? "chip-active" : "btn-glass"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </label>
  );
}