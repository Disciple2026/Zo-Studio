import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zoé Studio | Sites web, vidéo et identité visuelle à Tanger",
    template: "%s | Zoé Studio",
  },
  description:
    "Simulez l'apparence de votre futur site, essayez des démonstrations, puis confiez sa réalisation à Zoé Studio. Sites web, vidéo et identité visuelle à Tanger et partout au Maroc.",
  openGraph: {
    title: "Zoé Studio | Sites web, vidéo et identité visuelle à Tanger",
    description:
      "Voyez votre futur site avant de le commander. Démonstrations à manipuler, brief en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body>
        <a
          href="#contenu"
          className="btn btn-clair sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
