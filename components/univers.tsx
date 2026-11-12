import { Clapperboard, MonitorSmartphone, Palette, Sparkles } from "lucide-react";

const UNIVERS = [
  { icone: MonitorSmartphone, nom: "Sites web", texte: "Sites vitrines, boutiques en ligne, sites de mariage et d'événement, réservation, portfolios.", lien: "#brief", action: "Décrire mon projet de site" },
  { icone: Clapperboard, nom: "Vidéo", texte: "Mariages, baptêmes, soutenances, publicités, formats pour les réseaux. Livraison sous 48 à 72 h.", lien: "#services", action: "Voir les tournages" },
  { icone: Palette, nom: "Identité visuelle", texte: "Logo, charte, affiches et supports pour que votre marque se reconnaisse partout.", lien: "#brief", action: "Parler de ma marque" },
  { icone: Sparkles, nom: "Expériences interactives", texte: "Démonstrations à manipuler, animations au défilement, 3D quand elle sert le propos.", lien: "bibliotheque/", action: "Ouvrir la bibliothèque" },
];

export function Univers() {
  return (
    <section id="univers" className="bloc border-t border-trait bg-foret/40">
      <div className="wrap">
        <h2 className="titre max-w-3xl">Un studio, quatre métiers</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERS.map((u, i) => (
            <li key={u.nom} className={`panneau flex flex-col p-6 ${i === 0 ? "rounded-tl-[3.5rem]" : ""}`}>
              <u.icone size={28} className="text-jade" aria-hidden />
              <h3 className="affiche mt-5 text-[2rem]">{u.nom}</h3>
              <p className="mt-2 flex-1 text-brume">{u.texte}</p>
              <a href={u.lien} className="mt-5 font-bold text-jade underline underline-offset-4 hover:text-papier">
                {u.action}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
