import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StatsCopa 2026 — Copa do Mundo FIFA",
  description: "Estatísticas completas da Copa do Mundo FIFA 2026. Artilheiros, confrontos históricos e muito mais.",
};

const NAV_ITEMS = [
  {
    href: "/h2h",
    emoji: "⚔️",
    title: "Confronto Direto",
    description: "Histórico entre seleções",
    accent: "var(--accent-cyan)",
    accentBg: "rgba(34, 211, 238, 0.08)",
    accentBorder: "rgba(34, 211, 238, 0.2)",
  },
  {
    href: "/jogadores",
    emoji: "🏅",
    title: "Estatísticas",
    description: "Artilheiros & Assistências",
    accent: "var(--accent-violet)",
    accentBg: "rgba(139, 92, 246, 0.08)",
    accentBorder: "rgba(139, 92, 246, 0.2)",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col px-4 pt-safe">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-16 pb-10">
        {/* Trophy */}
        <div
          className="flex items-center justify-center mb-6 rounded-3xl"
          style={{
            width: 96,
            height: 96,
            background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.12))",
            border: "1px solid rgba(34,211,238,0.2)",
            fontSize: 52,
          }}
        >
          🏆
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
          style={{
            background: "rgba(34, 211, 238, 0.08)",
            border: "1px solid rgba(34, 211, 238, 0.2)",
            color: "var(--accent-cyan)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent-cyan)" }}
          />
          Copa do Mundo FIFA 2026
        </div>

        <h1
          className="text-4xl font-black tracking-tight leading-none mb-3"
          style={{
            background: "linear-gradient(135deg, #fafafa 0%, #a3a3a3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stats<span
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >Copa</span>
        </h1>

        <p
          className="text-sm max-w-xs leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Dados atualizados a cada 12h. Estatísticas profundas de jogadores, confrontos históricos e muito mais.
        </p>

        {/* Cache badge */}
        <div
          className="flex items-center gap-1.5 mt-4 text-xs px-3 py-1.5 rounded-full"
          style={{
            background: "var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <span>⚡</span>
          <span>Cache ISR · Atualização a cada 12h</span>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="flex flex-col gap-3 max-w-md mx-auto w-full">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div
              className="card flex items-center gap-4 p-4"
              style={{
                background: item.accentBg,
                borderColor: item.accentBorder,
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: item.accentBg,
                  border: `1px solid ${item.accentBorder}`,
                  fontSize: 28,
                }}
              >
                {item.emoji}
              </div>
              <div className="flex-1">
                <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              </div>
              <span style={{ color: item.accent, fontSize: 20 }}>→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="mt-auto py-6 text-center text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        StatsCopa 2026 · Powered by API-Football
      </footer>
    </main>
  );
}
