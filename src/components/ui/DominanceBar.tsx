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
          style={{ color: "var(--accent-primary)" }}
        >
          {winsA}V
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {draws} Empates
        </span>
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {winsB}V
        </span>
      </div>

      {/* Bar */}
      <div
        className="flex w-full rounded-md overflow-hidden"
        style={{ height: "8px", gap: "2px" }}
      >
        <div
          className="transition-all duration-700 ease-out rounded-l-md"
          style={{
            width: `${pctA}%`,
            background: "var(--accent-primary)",
          }}
        />
        <div
          className="transition-all duration-700 ease-out"
          style={{
            width: `${pctD}%`,
            background: "var(--border-strong)",
          }}
        />
        <div
          className="transition-all duration-700 ease-out rounded-r-md"
          style={{
            width: `${pctB}%`,
            background: "var(--text-secondary)",
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
