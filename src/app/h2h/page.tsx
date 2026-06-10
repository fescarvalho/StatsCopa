import type { Metadata } from "next";
import Link from "next/link";
import { TeamSelectH2H } from "@/components/h2h/TeamSelectH2H";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

export const metadata: Metadata = {
  title: "Confronto Direto (H2H) — StatsCopa Copa do Mundo 2026",
  description: "Compare o histórico de confrontos diretos entre quaisquer duas seleções da Copa do Mundo 2026.",
};

export default async function H2HPage() {
  // teams fetched server-side, passed to client component
  const teams = ALL_WC2026_TEAMS;

  return (
    <main className="min-h-dvh px-4 pt-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--border-subtle)", color: "var(--text-secondary)", fontSize: 18 }}
          aria-label="Voltar"
        >←</Link>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            Confronto Direto
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Escolha duas seleções · H2H Histórico
          </p>
        </div>
      </div>

      <TeamSelectH2H
        teams={teams}
        defaultTeamAId={26}
        defaultTeamBId={2}
      />
    </main>
  );
}
