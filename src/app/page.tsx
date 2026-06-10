import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StatsCopa 2026 — Copa do Mundo FIFA",
  description: "Estatísticas completas da Copa do Mundo FIFA 2026. Classificação, artilheiros, confrontos históricos, seleções e muito mais.",
};

const NAV_ITEMS = [
  {
    href: "/classificacao",
    emoji: "🏆",
    title: "Classificação",
    description: "Tabela de grupos · Fase final",
    accent: "#22d3ee",
    accentBg: "rgba(34, 211, 238, 0.08)",
    accentBorder: "rgba(34, 211, 238, 0.2)",
  },
  {
    href: "/jogadores",
    emoji: "🏅",
    title: "Artilheiros",
    description: "Top 20 Gols & Assistências",
    accent: "#8b5cf6",
    accentBg: "rgba(139, 92, 246, 0.08)",
    accentBorder: "rgba(139, 92, 246, 0.2)",
  },
  {
    href: "/h2h",
    emoji: "⚔️",
    title: "Confronto Direto",
    description: "H2H histórico entre seleções",
    accent: "#34d399",
    accentBg: "rgba(52, 211, 153, 0.08)",
    accentBorder: "rgba(52, 211, 153, 0.2)",
  },
  {
    href: "/selecoes",
    emoji: "🌍",
    title: "Seleções",
    description: "32 seleções · Elencos completos",
    accent: "#fbbf24",
    accentBg: "rgba(251, 191, 36, 0.08)",
    accentBorder: "rgba(251, 191, 36, 0.2)",
  },
  {
    href: "/jogos",
    emoji: "📅",
    title: "Jogos",
    description: "Resultados · Escalações · Stats",
    accent: "#f43f5e",
    accentBg: "rgba(244, 63, 94, 0.08)",
    accentBorder: "rgba(244, 63, 94, 0.2)",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col px-4">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-14 pb-8">
        <div
          className="flex items-center justify-center mb-5 rounded-3xl"
          style={{
            width: 90,
            height: 90,
            background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.12))",
            border: "1px solid rgba(34,211,238,0.2)",
            fontSize: 48,
          }}
        >
          🏆
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold"
          style={{
            background: "rgba(34, 211, 238, 0.08)",
            border: "1px solid rgba(34, 211, 238, 0.2)",
            color: "var(--accent-cyan)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-cyan)" }} />
          Copa do Mundo FIFA · Qatar 2026
        </div>

        <h1
          className="text-4xl font-black tracking-tight leading-none mb-2"
          style={{
            background: "linear-gradient(135deg, #fafafa 0%, #a3a3a3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stats
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Copa
          </span>
        </h1>

        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Dados reais da Copa 2026. Troque para <code className="text-xs px-1 rounded" style={{ background: "var(--border-subtle)", color: "var(--accent-cyan)" }}>season=2026</code> quando a Copa começar.
        </p>

        <div
          className="flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-full"
          style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <span>⚡</span>
          <span>ISR Cache · Atualização a cada 12h</span>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="flex flex-col gap-3 max-w-md mx-auto w-full pb-8">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div
              className="card flex items-center gap-4 p-4 active:scale-98 transition-transform"
              style={{ background: item.accentBg, borderColor: item.accentBorder }}
            >
              <div
                className="flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: item.accentBg,
                  border: `1px solid ${item.accentBorder}`,
                  fontSize: 26,
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
              <span style={{ color: item.accent, fontSize: 18 }}>→</span>
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-auto py-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        StatsCopa · API-Football · Copa 2026 → 2026
      </footer>
    </main>
  );
}
