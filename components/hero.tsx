"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Monitor, Smartphone } from "lucide-react";
import { AMBIANCES, COULEURS, POLICES, SECTEURS, assombrir, eclaircir, texteSur, type Secteur } from "@/lib/simulateur";
import { choisir, decrire, useSimulation } from "@/lib/simulation";

const ease = [0.2, 0.7, 0.1, 1] as const;

function Choix<T extends { id: string; label: string }>({
  titre,
  options,
  valeur,
  onChange,
  pastille,
}: {
  titre: string;
  options: readonly T[];
  valeur: string;
  onChange: (id: string) => void;
  pastille?: (o: T) => string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-[0.95rem] font-semibold text-brume">{titre}</legend>
      <div className="flex flex-wrap gap-2 py-1">
        {options.map((o) => {
          const actif = o.id === valeur;
          return (
            <label
              key={o.id}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-[0.95rem] font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-jade ${
                actif ? "border-papier bg-papier text-encre" : "border-trait text-papier hover:border-papier/60"
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
                <span aria-hidden className="size-4 rounded-full ring-1 ring-black/20" style={{ background: pastille(o) }} />
              )}
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* Faux visuels sans fichier : paysages composés en dégradés, teintés par la couleur choisie. */
const PHOTOS = [
  (c: string) => `linear-gradient(to top, #0b1a26 0 34%, transparent 34%), radial-gradient(circle at 70% 38%, #ffd9a0 0 9%, transparent 10%), linear-gradient(to top, ${c}, #f3b77a 60%, #2b3a67)`,
  (c: string) => `linear-gradient(115deg, transparent 0 46%, #f4ead8 46% 54%, transparent 54%), linear-gradient(to bottom, #e9dcc3, ${c})`,
  (c: string) => `radial-gradient(ellipse 34% 44% at 50% 46%, #e8c3a0 0 60%, transparent 62%), radial-gradient(ellipse 60% 50% at 50% 100%, ${c} 0 70%, transparent 72%), linear-gradient(#2a2622, #4a4038)`,
  (c: string) => `radial-gradient(circle at 30% 30%, #fff 0 4%, transparent 5%), radial-gradient(circle at 62% 55%, #fff 0 3%, transparent 4%), linear-gradient(160deg, ${c}, #1b1420)`,
];

function Bloc({ s, hex, fond, texte, rayon }: { s: Secteur; hex: string; fond: string; texte: string; rayon: string }) {
  const doux = `color-mix(in oklab, ${texte} 9%, ${fond})`;
  const r = rayon === "999px" ? "16px" : rayon;
  const [maintenant, setMaintenant] = useState<number | null>(null);
  useEffect(() => {
    if (s.bloc.type !== "compte") return;
    setMaintenant(Date.now());
    const t = window.setInterval(() => setMaintenant(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [s.bloc.type]);

  if (s.bloc.type === "carte")
    return (
      <ul className="grid gap-1.5 text-[0.8rem] @md:text-[0.95rem]">
        {s.bloc.plats.map(([nom, prix]) => (
          <li key={nom} className="flex items-baseline gap-2">
            <span>{nom}</span>
            <span aria-hidden className="flex-1 border-b border-dotted" style={{ borderColor: `color-mix(in oklab, ${texte} 40%, transparent)` }} />
            <span className="font-bold tabular-nums">{prix} MAD</span>
          </li>
        ))}
      </ul>
    );

  if (s.bloc.type === "produits")
    return (
      <ul className="grid grid-cols-3 gap-2 @md:gap-3">
        {s.bloc.articles.map(([nom, prix, teinte]) => (
          <li key={nom} className="text-[0.72rem] @md:text-[0.85rem]">
            <span className="mb-1.5 grid aspect-[4/5] place-items-center" style={{ background: doux, borderRadius: r }}>
              <svg viewBox="0 0 200 250" className="h-[78%]" aria-hidden>
                <path d="M80,34 C88,45 112,45 120,34 L158,46 L182,96 L156,108 L152,98 L153,226 L47,226 L48,98 L44,108 L18,96 L42,46 Z" fill={teinte} />
              </svg>
            </span>
            <span className="block font-semibold leading-tight">{nom}</span>
            <span className="opacity-75">{prix} MAD</span>
          </li>
        ))}
      </ul>
    );

  if (s.bloc.type === "compte") {
    const reste = maintenant === null ? null : Math.max(0, new Date(s.bloc.date).getTime() - maintenant);
    const parts =
      reste === null
        ? ["–", "–", "–", "–"]
        : [Math.floor(reste / 864e5), Math.floor(reste / 36e5) % 24, Math.floor(reste / 6e4) % 60, Math.floor(reste / 1e3) % 60];
    return (
      <div>
        <ul className="grid grid-cols-4 gap-2">
          {["jours", "heures", "minutes", "secondes"].map((u, i) => (
            <li key={u} className="py-2 text-center" style={{ background: doux, borderRadius: r }}>
              <span className="block text-[1.2rem] font-bold tabular-nums @md:text-[1.7rem]">{parts[i]}</span>
              <span className="text-[0.65rem] opacity-75 @md:text-[0.8rem]">{u}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-center text-[0.75rem] opacity-80 @md:text-[0.9rem]">{s.bloc.lieu}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-4 gap-1.5 @md:gap-2">
      {s.bloc.series.map((nom, i) => (
        <li key={nom} className="relative aspect-[3/4] overflow-hidden" style={{ background: PHOTOS[i](hex), borderRadius: r }}>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 text-[0.62rem] font-semibold text-white @md:text-[0.78rem]">
            {nom}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const sim = useSimulation();
  const { secteur: s, ambiance: a, couleur: c } = decrire(sim);
  const [ecran, setEcran] = useState<"ordinateur" | "mobile">("ordinateur");

  // La palette de l'aperçu se déduit de l'ambiance et de la couleur choisies.
  const fond = a.id === "minimal" ? "#FFFFFF" : a.fond === "clair" ? "#F4EEE1" : a.fond === "sombre" ? "#0C0C0D" : c.hex;
  const texte = a.fond === "couleur" ? texteSur(c.hex) : a.fond === "clair" ? "#161714" : "#F1ECE1";
  // Couleur ajustée au fond : éclaircie sur sombre, assombrie sur clair si elle est trop pâle.
  const vif =
    a.fond === "sombre"
      ? eclaircir(c.hex, 0.45)
      : a.fond === "clair" && texteSur(c.hex) !== "#ffffff"
        ? assombrir(c.hex, 0.32)
        : c.hex;
  const accent = a.fond === "couleur" ? texte : vif;
  const surAccent = a.fond === "couleur" ? c.hex : texteSur(vif);
  const titrePolice = POLICES[a.police];

  return (
    <section id="accueil" className="relative overflow-hidden pt-16">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-7 pb-16 pt-8 md:pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="min-w-0 lg:self-end"
        >
          <h1 className="affiche text-[clamp(2.7rem,4.9vw,4.7rem)]">
            Voyez votre futur site avant de le commander
          </h1>
          <p className="mb-5 mt-4 max-w-[33rem] text-[1.1rem] leading-relaxed text-brume">
            Trois choix, et l'aperçu se refait sous vos yeux. Zoé Studio conçoit ensuite le vrai
            site, à Tanger et partout au Maroc.
          </p>
          <Choix titre="Votre activité" options={SECTEURS} valeur={s.id} onChange={(id) => choisir({ secteur: id })} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="min-w-0 max-lg:order-3 lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <div className="grid gap-3">
            <Choix titre="L'ambiance" options={AMBIANCES} valeur={a.id} onChange={(id) => choisir({ ambiance: id })} />
            <Choix titre="La couleur" options={COULEURS} valeur={c.id} onChange={(id) => choisir({ couleur: id })} pastille={(o) => o.hex} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#brief" className="btn btn-primaire">Demander ce site</a>
            <a href="bibliotheque/" className="btn btn-ligne">Essayer des démos</a>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="min-w-0 max-lg:order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <div className="overflow-hidden rounded-2xl border border-trait bg-foret shadow-[0_40px_120px_-30px_rgb(11_127_99/0.55)]">
            <div className="flex items-center gap-2 border-b border-trait px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="size-2.5 rounded-full bg-papier/25" />
              <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-encre px-3 py-1 text-sm text-brume">
                {s.marque.toLowerCase().replace(/[^a-zà-ÿ]+/g, "-")}.ma
              </span>
              <div role="group" aria-label="Taille de l'aperçu" className="flex gap-1">
                {(["ordinateur", "mobile"] as const).map((e) => (
                  <button
                    key={e}
                    type="button"
                    aria-pressed={ecran === e}
                    onClick={() => setEcran(e)}
                    className={`grid size-9 place-items-center rounded-full ${ecran === e ? "bg-papier text-encre" : "text-brume hover:text-papier"}`}
                  >
                    {e === "mobile" ? <Smartphone size={16} aria-hidden /> : <Monitor size={16} aria-hidden />}
                    <span className="sr-only">Aperçu {e}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-encre/60 transition-[padding] duration-500" style={{ paddingInline: ecran === "mobile" ? "max(0px, calc(50% - 9.5rem))" : 0 }}>
              <div
                className="@container flex min-h-[26rem] flex-col gap-5 p-5 transition-colors duration-500 @md:min-h-[30rem] @md:p-8"
                style={{ background: fond, color: texte }}
              >
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] @md:text-[0.9rem] ${a.centre ? "flex-col" : "justify-between"}`}>
                  <span
                    className="text-[1.05rem] font-bold @md:text-[1.2rem]"
                    style={{
                      fontFamily: titrePolice,
                      letterSpacing: a.id === "luxe" ? "0.18em" : undefined,
                      textTransform: a.capitales || a.id === "luxe" ? "uppercase" : undefined,
                    }}
                  >
                    {s.marque}
                  </span>
                  <span className="flex gap-3 @md:gap-4">
                    {s.menu.map((m) => <span key={m}>{m}</span>)}
                  </span>
                </div>

                <motion.div
                  key={s.id + a.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className={`my-auto flex flex-col gap-3 ${a.centre ? "items-center text-center" : "items-start"} ${
                    a.id === "editorial" ? "border-y py-4" : ""
                  }`}
                  style={{ borderColor: `color-mix(in oklab, ${texte} 25%, transparent)` }}
                >
                  <p
                    className="max-w-[14ch] text-balance"
                    style={{
                      fontFamily: titrePolice,
                      fontSize: a.police === "affiche" ? "clamp(2.2rem,13cqi,4.4rem)" : a.id === "minimal" ? "clamp(1.5rem,7cqi,2.4rem)" : "clamp(1.8rem,9.5cqi,3.3rem)",
                      lineHeight: a.police === "affiche" ? 0.9 : 1.05,
                      fontWeight: a.police === "affiche" ? 800 : a.police === "sans" ? 600 : 500,
                      fontStyle: a.italique ? "italic" : undefined,
                      textTransform: a.capitales ? "uppercase" : undefined,
                    }}
                  >
                    {s.titre}
                  </p>
                  <p className="max-w-[34ch] text-[0.85rem] @md:text-[1rem]">{s.texte}</p>
                  <span
                    className="mt-1 px-4 py-2 text-[0.8rem] font-bold transition-[background-color,border-radius] duration-500 @md:px-5 @md:py-2.5 @md:text-[0.95rem]"
                    style={{ background: accent, color: surAccent, borderRadius: a.rayon }}
                  >
                    {s.bouton}
                  </span>
                </motion.div>

                <Bloc s={s} hex={vif} fond={fond} texte={texte} rayon={a.rayon} />
              </div>
            </div>
          </div>
          <p className="sr-only" role="status">
            Aperçu affiché : {s.label}, ambiance {a.label}, couleur {c.label}.
          </p>
          <figcaption className="mt-3 text-[0.95rem] text-brume">
            Aperçu de direction artistique, contenus fictifs. Le site livré est conçu, développé et
            testé après votre brief.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
