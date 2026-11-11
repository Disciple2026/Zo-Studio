import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zoé Studio | Production vidéo à Tanger",
    template: "%s | Zoé Studio",
  },
  description:
    "Zoé Studio filme et monte vos mariages, baptêmes, soutenances, publicités et événements à Tanger et partout au Maroc. Vidéo livrée sous 48 à 72 h.",
  openGraph: {
    title: "Zoé Studio | Production vidéo à Tanger",
    description:
      "Mariages, baptêmes, soutenances, publicités, événements. Réservez votre tournage en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#151a24",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
