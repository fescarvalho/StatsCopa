import type { Metadata } from "next";
import Link from "next/link";
import { PlayerList } from "@/components/players/PlayerList";
import { fetchTopScorers, fetchTopAssists } from "@/services/players.service";

export const metadata: Metadata = {
  title: "Estatísticas de Jogadores — StatsCopa 2026",
  description: "Top 20 artilheiros e assistências da Copa do Mundo FIFA 2026 com estatísticas detalhadas.",
};

// ISR: revalidate every 12 hours
export const revalidate = 43200;

export default async function JogadoresPage() {
  const [scorers, assisters] = await Promise.all([
    fetchTopScorers(),
    fetchTopAssists(),
  ]);

  return (
    <main className="min-h-dvh px-4 pt-4 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 38,
            height: 38,
            background: "var(--border-subtle)",
            color: "var(--text-secondary)",
            fontSize: 18,
          }}
          aria-label="Voltar"
        >
          ←
        </Link>
        <div>
          <h1
            className="text-xl font-black tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Estatísticas
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Top 20 · Copa do Mundo 2026
          </p>
        </div>

        {/* Cache badge */}
        <div
          className="ml-auto flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(34, 211, 238, 0.08)",
            color: "var(--accent-cyan)",
            border: "1px solid rgba(34, 211, 238, 0.15)",
          }}
        >
          <span>⚡</span>
          <span>12h cache</span>
        </div>
      </div>

      {/* Player list + drawer */}
      <PlayerList scorers={scorers} assisters={assisters} />
    </main>
  );
}
