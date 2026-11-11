"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AVIS } from "@/lib/content";

export function Reviews() {
  const piste = useRef<HTMLUListElement>(null);
  const glisser = (sens: 1 | -1) => {
    const el = piste.current;
    if (!el) return;
    const carte = el.querySelector("li");
    el.scrollBy({ left: sens * ((carte?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section id="avis" className="bloc border-t border-trait">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <h2 className="titre">Nos clients vidéo en parlent</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => glisser(-1)} className="btn btn-ligne size-12 p-0">
            <ArrowLeft size={20} aria-hidden />
            <span className="sr-only">Avis précédents</span>
          </button>
          <button type="button" onClick={() => glisser(1)} className="btn btn-ligne size-12 p-0">
            <ArrowRight size={20} aria-hidden />
            <span className="sr-only">Avis suivants</span>
          </button>
        </div>
      </div>

      <ul
        ref={piste}
        tabIndex={0}
        aria-label="Avis clients"
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[max(1.25rem,calc((100vw-82rem)/2+3rem))] px-[max(1.25rem,calc((100vw-82rem)/2+3rem))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {AVIS.map((a) => (
          <li
            key={a.nom}
            className="panneau flex w-[min(84vw,27rem)] shrink-0 snap-start flex-col justify-between gap-8 p-7 first:rounded-tl-[3.5rem]"
          >
            <blockquote className="font-serif text-[1.4rem] italic leading-snug">
              « {a.q} »
            </blockquote>
            <p>
              <span className="block font-bold">{a.nom}</span>
              <span className="text-[0.95rem] text-brume">{a.ev}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
