"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AMBIANCES, COULEURS, POLICES, SECTEURS, texteSur } from "@/lib/simulateur";
import { CHIFFRES } from "@/lib/content";

const ease = [0.2, 0.7, 0.1, 1] as const;

function Choix<T extends { id: string; label: string }>({
  titre,
  options,
  valeur,
  onChange,
  pastille,
}: {
  titre: string;
  options: T[];
  valeur: string;
  onChange: (id: string) => void;
  pastille?: (o: T) => string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-[0.95rem] font-semibold text-brume">{titre}</legend>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
        {options.map((o) => {
          const actif = o.id === valeur;
          return (
            <label
              key={o.id}
              className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.98rem] font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-jade ${
                actif
                  ? "border-papier bg-papier text-encre"
                  : "border-trait text-papier hover:border-papier/60"
              }`}
            >
              <input
                type="radio"
                name={titre}
                value={o.id}
                checked={actif}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              {pastille && (
                <span
                  aria-hidden
                  className="size-4 rounded-full ring-1 ring-black/20"
                  style={{ background: pastille(o) }}
                />
              )}
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Hero() {
  const [secteurId, setSecteur] = useState("restaurant");
  const [ambianceId, setAmbiance] = useState("editorial");
  const [couleurId, setCouleur] = useState("emeraude");

  const s = SECTEURS.find((x) => x.id === secteurId)!;
  const a = AMBIANCES.find((x) => x.id === ambianceId)!;
  const c = COULEURS.find((x) => x.id === couleurId)!;

  // La palette de l'aperçu se déduit de l'ambiance et de la couleur choisies.
  const fond = a.fond === "clair" ? "#F6F2E9" : a.fond === "sombre" ? "#0C0C0D" : c.hex;
  const texte = a.fond === "couleur" ? texteSur(c.hex) : a.fond === "clair" ? "#161714" : "#F1ECE1";
  const accent = a.fond === "couleur" ? texte : c.hex;
  const surAccent = a.fond === "couleur" ? c.hex : texteSur(c.hex);
  const doux = `color-mix(in oklab, ${texte} 9%, ${fond})`;
  const titrePolice = POLICES[a.police];

  const demander = () =>
    window.dispatchEvent(new CustomEvent("zoe:service", { detail: "Autre / Sur Mesure" }));

  return (
    <section id="accueil" className="relative overflow-hidden pt-16">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-8 pb-14 pt-8 md:pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="min-w-0 lg:self-end"
        >
          <h1 className="affiche text-[clamp(2.9rem,5.4vw,5.2rem)]">
            Voyez votre futur site avant de le commander
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.15rem] leading-relaxed text-brume">
            Choisissez un métier, une ambiance et une couleur : l'aperçu se refait sous vos yeux.
            Zoé Studio le conçoit ensuite pour de vrai, à Tanger et partout au Maroc.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="min-w-0 max-lg:order-3 lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <div className="grid gap-4">
            <Choix titre="Votre activité" options={SECTEURS} valeur={secteurId} onChange={setSecteur} />
            <Choix titre="L'ambiance" options={AMBIANCES} valeur={ambianceId} onChange={setAmbiance} />
            <Choix
              titre="La couleur"
              options={COULEURS}
              valeur={couleurId}
              onChange={setCouleur}
              pastille={(o) => o.hex}
            />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#reservation" onClick={demander} className="btn btn-primaire">
              Demander un site dans ce style
            </a>
            <a href="#demo" className="btn btn-ligne">
              Essayer une démo
            </a>
          </div>
        </motion.div>

        {/* L'aperçu : une fausse page d'accueil qui suit les trois choix. */}
        <motion.figure
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="min-w-0 max-lg:order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <div className="overflow-hidden rounded-2xl border border-trait bg-foret shadow-[0_40px_120px_-30px_rgb(11_127_99/0.55)]">
            <div className="flex items-center gap-2 border-b border-trait px-4 py-3">
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="ml-3 truncate rounded-full bg-encre px-3 py-1 text-sm text-brume">
                {s.marque.toLowerCase().replace(/[^a-zà-ÿ]+/g, "-")}.ma
              </span>
            </div>

            <div
              aria-live="polite"
              className="flex aspect-[4/3.3] flex-col p-5 transition-colors duration-500 sm:aspect-[4/3] sm:p-8"
              style={{ background: fond, color: texte }}
            >
              <div
                className={`flex items-center gap-4 text-[0.8rem] sm:text-[0.9rem] ${
                  a.centre ? "flex-col gap-2" : "justify-between"
                }`}
              >
                <span
                  className="text-[1.05rem] font-bold sm:text-[1.2rem]"
                  style={{
                    fontFamily: titrePolice,
                    letterSpacing: a.id === "luxe" ? "0.18em" : undefined,
                    textTransform: a.capitales || a.id === "luxe" ? "uppercase" : undefined,
                  }}
                >
                  {s.marque}
                </span>
                <span className="flex gap-4 opacity-75">
                  {s.menu.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </span>
              </div>

              <motion.div
                key={s.id + a.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className={`my-auto flex flex-col gap-3 py-4 sm:gap-4 ${
                  a.centre ? "items-center text-center" : "items-start"
                }`}
              >
                <p
                  className="max-w-[14ch] text-balance"
                  style={{
                    fontFamily: titrePolice,
                    fontSize: a.police === "affiche" ? "clamp(2.4rem,6.2vw,4.6rem)" : "clamp(1.8rem,4.4vw,3.3rem)",
                    lineHeight: a.police === "affiche" ? 0.9 : 1.05,
                    fontWeight: a.police === "affiche" ? 800 : a.police === "sans" ? 700 : 500,
                    fontStyle: a.italique ? "italic" : undefined,
                    textTransform: a.capitales ? "uppercase" : undefined,
                  }}
                >
                  {s.titre}
                </p>
                <p className="max-w-[34ch] text-[0.85rem] opacity-80 sm:text-[1rem]">{s.texte}</p>
                <span
                  className="mt-1 px-4 py-2 text-[0.8rem] font-bold transition-[background-color,border-radius] duration-500 sm:px-5 sm:py-2.5 sm:text-[0.95rem]"
                  style={{ background: accent, color: surAccent, borderRadius: a.rayon }}
                >
                  {s.bouton}
                </span>
              </motion.div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {s.tuiles.map((t, i) => (
                  <span
                    key={t}
                    className="flex h-12 items-end p-2 text-[0.72rem] font-semibold transition-[border-radius,background-color] duration-500 sm:h-16 sm:p-3 sm:text-[0.85rem]"
                    style={{
                      background: i === 1 && a.fond !== "couleur" ? `color-mix(in oklab, ${c.hex} 22%, ${fond})` : doux,
                      borderRadius: a.rayon === "999px" ? "18px" : a.rayon,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-[0.95rem] text-brume">
            Aperçu de direction artistique avec des contenus fictifs. Le site livré est conçu,
            développé et testé après votre brief.
          </figcaption>
        </motion.figure>
      </div>

      <dl className="wrap grid grid-cols-2 border-t border-trait md:grid-cols-4">
        {CHIFFRES.map((ch, i) => (
          <div
            key={ch.l}
            className={`flex flex-col-reverse py-6 md:py-8 ${i % 2 ? "pl-5" : ""} ${
              i > 0 ? "md:border-l md:border-trait md:pl-8" : ""
            } ${i % 2 ? "max-md:border-l max-md:border-trait" : ""} ${i > 1 ? "max-md:border-t max-md:border-trait" : ""}`}
          >
            <dt className="text-brume">{ch.l}</dt>
            <dd className="affiche text-[clamp(2.6rem,5vw,4rem)] text-or">{ch.n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
