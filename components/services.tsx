"use client";

import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bloc border-t border-trait">
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="titre">Ce que nous filmons</h2>
          <p className="mt-5 max-w-md text-[1.1rem] text-brume">
            Du mariage à la soutenance, nous couvrons les moments de famille comme les projets
            professionnels. Choisissez un service pour pré-remplir votre réservation.
          </p>
        </div>

        <ul className="border-t border-trait">
          {SERVICES.map((s) => (
            <li key={s.nom} className="border-b border-trait">
              <a
                href="#reservation"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("zoe:service", { detail: s.option }))
                }
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 transition-colors hover:bg-foret sm:px-4 md:py-6"
              >
                <h3 className="affiche text-[clamp(1.9rem,4vw,2.9rem)] transition-colors group-hover:text-jade">
                  {s.nom}
                </h3>
                <span
                  aria-hidden
                  className="row-span-2 grid size-11 place-items-center rounded-full border border-trait text-brume transition-all duration-300 group-hover:border-emeraude group-hover:bg-emeraude group-hover:text-white"
                >
                  <ArrowUpRight size={20} />
                </span>
                <p className="max-w-xl text-brume">{s.texte}</p>
                <span className="sr-only">Réserver ce service</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
