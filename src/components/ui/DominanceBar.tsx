"use client";

interface DominanceBarProps {
  labelA: string;
  labelB: string;
  winsA: number;
  draws: number;
  winsB: number;
  className?: string;
}

export function DominanceBar({
  labelA,
  labelB,
  winsA,
  draws,
  winsB,
  className = "",
}: DominanceBarProps) {
  const total = winsA + draws + winsB;
  const pctA = total > 0 ? (winsA / total) * 100 : 33.3;
  const pctD = total > 0 ? (draws / total) * 100 : 33.3;
  const pctB = total > 0 ? (winsB / total) * 100 : 33.3;

  return (
    <div className={`w-full ${className}`}>
      {/* Labels */}
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--accent-cyan)" }}
        >
          {winsA}V
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {draws} Empates
        </span>
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--accent-violet)" }}
        >
          {winsB}V
        </span>
      </div>

      {/* Bar */}
      <div
        className="flex w-full rounded-full overflow-hidden"
        style={{ height: "10px", gap: "2px" }}
      >
        <div
          className="transition-all duration-700 ease-out rounded-l-full"
          style={{
            width: `${pctA}%`,
            background: "linear-gradient(90deg, #0891b2, #22d3ee)",
          }}
        />
        <div
          className="transition-all duration-700 ease-out"
          style={{
            width: `${pctD}%`,
            background: "linear-gradient(90deg, #404040, #525252)",
          }}
        />
        <div
          className="transition-all duration-700 ease-out rounded-r-full"
          style={{
            width: `${pctB}%`,
            background: "linear-gradient(90deg, #6d28d9, #8b5cf6)",
          }}
        />
      </div>

      {/* Team names */}
      <div className="flex justify-between items-center mt-2">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {labelA}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {labelB}
        </span>
      </div>
    </div>
  );
}
