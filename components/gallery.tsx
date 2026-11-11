"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { CATEGORIES, WHATSAPP } from "@/lib/content";
import type { Media } from "@/lib/supabase";

type Props = {
  medias: Media[] | null; // null = chargement
  erreur: boolean;
  recharger: () => void;
};

export function Gallery({ medias, erreur, recharger }: Props) {
  const [cat, setCat] = useState<string>("all");
  const [ouvert, setOuvert] = useState<Media | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (ouvert && !d.open) d.showModal();
    if (!ouvert && d.open) d.close();
  }, [ouvert]);

  const visibles = (medias ?? []).filter((m) => cat === "all" || m.categorie === cat);
  const label = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

  return (
    <section id="realisations" className="bloc border-t border-trait bg-ardoise/40">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="titre">Réalisations</h2>
          {!!medias?.length && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`btn btn-sm ${cat === c.id ? "btn-clair" : "btn-ligne"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          {erreur ? (
            <Etat>
              <p>La galerie n'a pas pu se charger. Vérifiez votre connexion, puis réessayez.</p>
              <button type="button" onClick={recharger} className="btn btn-ligne mt-5">
                Recharger la galerie
              </button>
            </Etat>
          ) : medias === null ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-ardoise-2/60" />
              ))}
            </div>
          ) : medias.length === 0 ? (
            <Etat>
              <p>
                Les premières réalisations arrivent ici très bientôt. En attendant, demandez-nous
                des exemples de films sur WhatsApp.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-ligne mt-5">
                Demander des exemples
              </a>
            </Etat>
          ) : visibles.length === 0 ? (
            <Etat>
              <p>Aucune réalisation dans cette catégorie pour le moment.</p>
              <button type="button" onClick={() => setCat("all")} className="btn btn-ligne mt-5">
                Voir toutes les réalisations
              </button>
            </Etat>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((m, i) => (
                <li key={m.id} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
                  <button
                    type="button"
                    onClick={() => setOuvert(m)}
                    className={`group relative block size-full overflow-hidden rounded-xl bg-ardoise-2 text-left ${
                      i === 0 ? "aspect-[4/3] rounded-tl-[3.5rem]" : "aspect-[4/3]"
                    }`}
                  >
                    {m.type === "video" ? (
                      <video
                        src={`${m.url}#t=0.5`}
                        muted
                        playsInline
                        preload="metadata"
                        className="size-full object-cover transition-transform duration-700 ease-cine group-hover:scale-[1.04]"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.url}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-cine group-hover:scale-[1.04]"
                      />
                    )}
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-nuit/95 to-transparent p-4 pt-14">
                      <span>
                        <span className="block text-[1.05rem] font-bold leading-tight">{m.titre}</span>
                        <span className="text-sm text-brume">{label(m.categorie)}</span>
                      </span>
                      {m.type === "video" && (
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ruban text-white">
                          <Play size={18} fill="currentColor" aria-hidden />
                          <span className="sr-only">Lire la vidéo</span>
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOuvert(null)}
        onClick={(e) => e.target === dialog.current && setOuvert(null)}
        aria-label={ouvert?.titre}
        className="m-auto max-h-[92dvh] w-[min(92vw,70rem)] bg-transparent p-0 text-papier backdrop:bg-nuit/90 backdrop:backdrop-blur-sm"
      >
        {ouvert && (
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="font-bold">{ouvert.titre}</p>
              <button type="button" onClick={() => setOuvert(null)} className="btn btn-ligne btn-sm">
                <X size={16} aria-hidden />
                Fermer
              </button>
            </div>
            {ouvert.type === "video" ? (
              <video
                src={ouvert.url}
                controls
                autoPlay
                playsInline
                className="max-h-[80dvh] w-full rounded-xl bg-black"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ouvert.url}
                alt={ouvert.titre}
                className="max-h-[80dvh] w-full rounded-xl object-contain"
              />
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}

function Etat({ children }: { children: React.ReactNode }) {
  return (
    <div className="panneau panneau-coin px-6 py-14 text-center text-[1.1rem] text-brume">
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  );
}
