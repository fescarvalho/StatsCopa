import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StatsCopa 2026 — Estatísticas da Copa do Mundo",
  description:
    "Acompanhe estatísticas completas da Copa do Mundo FIFA 2026: Artilheiros, assistências, confrontos históricos e muito mais.",
  keywords: ["Copa do Mundo 2026", "estatísticas futebol", "FIFA World Cup", "artilheiros"],
  authors: [{ name: "StatsCopa" }],
  openGraph: {
    title: "StatsCopa 2026",
    description: "Estatísticas premium da Copa do Mundo FIFA 2026",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="mesh-bg min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
