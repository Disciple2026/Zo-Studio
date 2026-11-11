"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { PORTANT } from "@/lib/demo-portant";

export function DemoPortant() {
  return (
    <section id="demo" className="border-t border-trait">
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
        items={PORTANT}
        hanger="wood"
        autoplay
        caption="Parcourez le portant, puis ouvrez une pièce pour voir son dos."
        labels={{ front: "Devant", back: "Dos", close: "Fermer", show: "Afficher" }}
        aria-label="Démonstration : portant d'une boutique de mode fictive"
        className="mt-6 bg-transparent"
        action={
          <a
            href="#reservation"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("zoe:service", { detail: "Autre / Sur Mesure" }))
            }
            className="btn btn-primaire"
          >
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
