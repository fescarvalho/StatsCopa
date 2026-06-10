import type { Metadata } from "next";
import Link from "next/link";
import { getTeams } from "@/services/teams.service";
import { TeamGrid } from "@/components/teams/TeamGrid";

export const metadata: Metadata = {
  title: "Seleções — StatsCopa Copa do Mundo 2026",
  description: "Todas as 32 seleções da Copa do Mundo FIFA 2026 com estatísticas e elencos.",
};

export const revalidate = 43200;

export default async function SelecoesPage() {
  const teams = await getTeams();

  return (
    <main className="min-h-dvh px-4 pt-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--border-subtle)", color: "var(--text-secondary)", fontSize: 18 }}
          aria-label="Voltar"
        >←</Link>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            Seleções
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            32 seleções · Copa do Mundo 2026
          </p>
        </div>
      </div>

      <TeamGrid teams={teams} />
    </main>
  );
}
