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
    accent: "var(--text-secondary)",
    accentBg: "var(--bg-surface)",
    accentBorder: "var(--border-subtle)",
  },
  {
    href: "/jogadores",
    emoji: "🏅",
    title: "Artilheiros",
    description: "Top 20 Gols & Assistências",
    accent: "var(--text-secondary)",
    accentBg: "var(--bg-surface)",
    accentBorder: "var(--border-subtle)",
  },
  {
    href: "/h2h",
    emoji: "⚔️",
    title: "Confronto Direto",
    description: "H2H histórico entre seleções",
    accent: "var(--text-secondary)",
    accentBg: "var(--bg-surface)",
    accentBorder: "var(--border-subtle)",
  },
  {
    href: "/selecoes",
    emoji: "🌍",
    title: "Seleções",
    description: "48 seleções · Elencos completos",
    accent: "var(--text-secondary)",
    accentBg: "var(--bg-surface)",
    accentBorder: "var(--border-subtle)",
  },
  {
    href: "/jogos",
    emoji: "📅",
    title: "Jogos",
    description: "Resultados · Escalações · Stats",
    accent: "var(--text-secondary)",
    accentBg: "var(--bg-surface)",
    accentBorder: "var(--border-subtle)",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col px-4">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-14 pb-8">
        <div
          className="flex items-center justify-center mb-5 rounded-lg"
          style={{
            width: 80,
            height: 80,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            fontSize: 40,
          }}
        >
          ⚽
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md mb-3 text-xs font-medium"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
          Copa do Mundo FIFA 2026
        </div>

        <h1 className="text-4xl font-bold tracking-tight leading-none mb-2 text-white">
          StatsCopa
        </h1>

        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Painel de estatísticas da Copa do Mundo FIFA 2026.
        </p>

        <div
          className="flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-md"
          style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
        >
          <span>🔄</span>
          <span>Sincronização com API-Football em Produção</span>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="flex flex-col gap-3 max-w-md mx-auto w-full pb-8">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div
              className="card flex items-center gap-4 p-4 hover:bg-neutral-900 transition-colors"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-default)", borderRadius: "var(--radius-lg)" }}
            >
              <div
                className="flex items-center justify-center rounded-md shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--bg-surface)",
                  border: `1px solid var(--border-subtle)`,
                  fontSize: 24,
                }}
              >
                {item.emoji}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </p>
                <p className="text-[13px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 16 }}>→</span>
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
