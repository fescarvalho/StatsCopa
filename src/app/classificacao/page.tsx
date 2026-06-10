import type { Metadata } from "next";
import Link from "next/link";
import { getStandings } from "@/services/standings.service";
import { StandingsGroupCard } from "@/components/standings/StandingsGroup";

export const metadata: Metadata = {
  title: "Classificação — StatsCopa Copa do Mundo 2022",
  description: "Tabela de classificação completa por grupos da Copa do Mundo FIFA 2022.",
};

export const revalidate = 43200;

export default async function ClassificacaoPage() {
  const groups = await getStandings();

  return (
    <main className="min-h-dvh px-4 pt-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--border-subtle)", color: "var(--text-secondary)", fontSize: 18 }}
          aria-label="Voltar"
        >←</Link>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            Classificação
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Fase de Grupos · Copa do Mundo 2022
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
          style={{ background: "rgba(34,211,238,0.08)", color: "var(--accent-cyan)", border: "1px solid rgba(34,211,238,0.15)" }}
        >
          <span>⚡</span><span>12h cache</span>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 mb-4 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-cyan)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Classificados</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-strong)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Eliminados</span>
        </div>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-4">
        {groups.map((group, i) => (
          <StandingsGroupCard key={group.group} group={group} index={i} />
        ))}
      </div>
    </main>
  );
}
