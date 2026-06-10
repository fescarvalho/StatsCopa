"use client";

import Image from "next/image";
import Link from "next/link";
import type { MatchFixture } from "@/types";

export function FixtureCard({ fixture }: { fixture: MatchFixture }) {
  const isFinished =
    fixture.status === "FT" ||
    fixture.status === "FT_PEN" ||
    fixture.status === "AET";
  const isPen = fixture.status === "FT_PEN";

  return (
    <Link href={`/jogos/${fixture.id}`} id={`fixture-card-${fixture.id}`} className="block">
      <div className="card flex items-center gap-3 p-3">
        {/* Home */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {fixture.homeTeam.shortName}
          </span>
          <div className="relative w-7 h-7">
            <Image
              src={fixture.homeTeam.logo}
              alt={fixture.homeTeam.shortName}
              fill
              style={{ objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-0.5 min-w-[56px]">
          {isFinished ? (
            <>
              <span
                className="text-base font-black tabular-nums"
                style={{ color: "var(--text-primary)" }}
              >
                {fixture.score.fulltime.home}–{fixture.score.fulltime.away}
              </span>
              {isPen && fixture.score.penalty && (
                <span className="text-[10px]" style={{ color: "var(--accent-cyan)" }}>
                  ({fixture.score.penalty.home}–{fixture.score.penalty.away})
                </span>
              )}
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                FT
              </span>
            </>
          ) : (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {new Date(fixture.date).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        {/* Away */}
        <div className="flex items-center gap-2 flex-1">
          <div className="relative w-7 h-7">
            <Image
              src={fixture.awayTeam.logo}
              alt={fixture.awayTeam.shortName}
              fill
              style={{ objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {fixture.awayTeam.shortName}
          </span>
        </div>

        <span style={{ color: "var(--text-muted)", fontSize: 14 }}>›</span>
      </div>
    </Link>
  );
}
