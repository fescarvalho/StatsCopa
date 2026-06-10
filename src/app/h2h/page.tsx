import type { Metadata } from "next";
import Link from "next/link";
import { H2HMatchup } from "@/components/h2h/H2HMatchup";
import { fetchH2H } from "@/services/h2h.service";

export const metadata: Metadata = {
  title: "Confronto Direto (H2H) — StatsCopa 2026",
  description: "Histórico de confrontos diretos entre seleções na Copa do Mundo FIFA 2026.",
};

// ISR: revalidate every 12 hours
export const revalidate = 43200;

export default async function H2HPage() {
  // Default matchup: Brazil vs Argentina
  const data = await fetchH2H(6, 26);

  return (
    <main className="min-h-dvh px-4 pt-4 pb-8">
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
            Confronto Direto
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Histórico H2H · Copa do Mundo 2026
          </p>
        </div>
      </div>

      {/* Matchup */}
      <H2HMatchup data={data} />

      {/* More matchups hint */}
      <div
        className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs"
        style={{
          background: "var(--border-subtle)",
          color: "var(--text-muted)",
          border: "1px solid var(--border-default)",
        }}
      >
        <span>⚡</span>
        <span>Dados em cache por 12h · API-Football</span>
      </div>
    </main>
  );
}
