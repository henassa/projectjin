// Convertit un code pays ISO 3166-1 alpha-2 (ex: "FR", "BE") en emoji drapeau.
export function flagEmoji(code) {
  if (!code || code.length !== 2) return "🏳️";
  const A = 0x1f1e6;
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(A + (c.charCodeAt(0) - 65)))
    .join("");
}
