"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/shell";
import { FICHES, SECTEURS_BIBLIO, STATUTS } from "@/lib/bibliotheque";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Bibliotheque() {
  const [secteur, setSecteur] = useState("tous");
  const visibles = FICHES.filter((f) => secteur === "tous" || f.secteur === secteur);

  return (
    <Shell>
      <h1 className="titre max-w-4xl">Des sites à essayer, pas à regarder</h1>
      <p className="mt-5 max-w-2xl text-[1.15rem] text-brume">
        Chaque démonstration est un vrai site, navigable, avec une idée forte. Ouvrez-en une,
        manipulez-la, puis demandez la vôtre. Marques, contenus et prix y sont fictifs.
      </p>

      <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filtrer par secteur">
        {["tous", ...SECTEURS_BIBLIO].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={secteur === s}
            onClick={() => setSecteur(s)}
            className={`btn btn-sm ${secteur === s ? "btn-clair" : "btn-ligne"}`}
          >
            {s === "tous" ? "Tous les secteurs" : s}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {visibles.map((f, i) => (
          <li key={f.id} className={`panneau flex flex-col overflow-hidden ${i === 0 ? "rounded-tl-[3.5rem]" : ""}`}>
            <a href={BASE + f.url} className="group relative block aspect-[16/10] overflow-hidden bg-foret-2" aria-label={`Ouvrir la démonstration ${f.nom}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BASE + f.apercu}
                alt=""
                loading="lazy"
                className="size-full object-cover object-top transition-transform duration-700 ease-cine group-hover:scale-[1.03]"
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
              <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-encre/80 text-papier transition-colors group-hover:bg-emeraude">
                <ArrowUpRight size={20} aria-hidden />
              </span>
            </a>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-2 text-[0.9rem]">
                <span className={`pastille ${f.statut === "original" ? "pastille-new" : "pastille-done"}`} title={STATUTS[f.statut].aide}>
                  {STATUTS[f.statut].label}
                </span>
                <span className="text-brume">{f.secteur}, direction {f.direction.toLowerCase()}</span>
              </div>
              <h2 className="affiche mt-3 text-[2.4rem]">{f.nom}</h2>
              <p className="mt-1 text-[1.05rem]">{f.identite}</p>
              <ul className="mt-4 grid gap-1 text-brume">
                {f.interactions.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-jade" />
                    {x}
                  </li>
                ))}
              </ul>
              {f.note && <p className="mt-4 border-l-2 border-trait pl-3 text-[0.92rem] text-brume">{f.note}</p>}
              <div className="mt-6 flex flex-wrap gap-3 pt-1">
                <a href={BASE + f.url} className="btn btn-primaire btn-sm">Essayer la démo</a>
                <Link href="/#brief" className="btn btn-ligne btn-sm">Créer un site dans ce style</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-brume">
        D'autres démonstrations arrivent : mariage, parfum, immobilier, association, tableau de bord.
        Un secteur vous manque ? <Link href="/#brief" className="font-bold text-jade underline underline-offset-4">Décrivez votre projet</Link>.
      </p>
    </Shell>
  );
}
