"use client";

import { useEffect, useRef, useState } from "react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { PORTANT, PORTANT_DESSINE, PORTANT_URLS } from "@/lib/demo-portant";
import { useRessourcesDistantes } from "@/lib/remote";

export function DemoPortant() {
  const section = useRef<HTMLElement>(null);
  const [proche, setProche] = useState(false);
  const touche = useRef(false);
  const [photos, setPhotos] = useState(false);

  // Les photos distantes ne sont demandées qu'à l'approche de la section.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e.some((x) => x.isIntersecting) && (setProche(true), io.disconnect()),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Elles ne remplacent les dessins que si toutes ont répondu, et jamais sous la main du visiteur.
  const pretes = useRessourcesDistantes(proche ? PORTANT_URLS : []);
  useEffect(() => {
    if (pretes && !touche.current) setPhotos(true);
  }, [pretes]);
  const figer = () => {
    touche.current = true;
  };

  return (
    <section id="demo" ref={section} className="border-t border-trait" onPointerDownCapture={figer} onKeyDownCapture={figer}>
      <div className="wrap pt-[clamp(4.5rem,10vw,8.5rem)]">
        <div className="grid gap-x-16 gap-y-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2 className="titre">Une démo à manipuler</h2>
          <p className="max-w-xl text-[1.1rem] text-brume">
            Voici ce qu'une boutique de mode peut offrir à ses clients : un portant que l'on
            parcourt à la main. Passez sur une pièce, faites glisser un cintre, ouvrez-la pour
            la retourner.
          </p>
        </div>
      </div>

      <ClothingRailHero
        items={photos ? PORTANT : PORTANT_DESSINE}
        hanger={photos ? "none" : "wood"}
        data-source={photos ? "distante" : "locale"}
        autoplay
        caption="Parcourez le portant, puis ouvrez une pièce pour voir son dos."
        labels={{ front: "Devant", back: "Dos", close: "Fermer", show: "Afficher" }}
        aria-label="Démonstration : portant d'une boutique de mode fictive"
        className="mt-6 bg-transparent"
        action={
          <a href="#brief" className="btn btn-primaire">
            Créer une boutique dans ce style
          </a>
        }
      />
      <p className="wrap pb-[clamp(3rem,7vw,5rem)] text-center text-[0.95rem] text-brume">
        Démonstration. La boutique « Atelier Souani », ses pièces et ses prix sont fictifs.
      </p>
    </section>
  );
}
