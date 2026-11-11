"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import logo from "@/public/logo.jpeg";
import { CHIFFRES, WHATSAPP } from "@/lib/content";
import type { Media } from "@/lib/supabase";

const LIGNES = ["Dans dix ans,", "vous aurez oublié", "des détails.", "La vidéo, non."];
const ease = [0.2, 0.7, 0.1, 1] as const;

function Coin({ className }: { className: string }) {
  return <span aria-hidden className={`absolute size-7 border-laiton ${className}`} />;
}

export function Hero({ une }: { une: Media | null }) {
  return (
    <section id="accueil" className="relative overflow-hidden pt-16">
      <div className="wrap grid items-end gap-x-12 gap-y-10 pb-14 pt-10 md:pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:pb-20">
        <div>
          <h1 className="affiche text-[clamp(3.4rem,8.2vw,8.75rem)] max-lg:text-[clamp(3.4rem,13vw,7rem)]">
            {LIGNES.map((l, i) => (
              <span key={l} className="-mt-[0.14em] block overflow-hidden pb-[0.05em] pt-[0.14em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.11, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <p className="mt-7 max-w-[34rem] text-[1.2rem] leading-relaxed text-brume">
              Zoé Studio filme et monte vos mariages, baptêmes, soutenances, publicités et
              événements, à Tanger et partout au Maroc. Votre vidéo est livrée sous 48 à 72 h.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reservation" className="btn btn-rouge">
                Réserver un tournage
              </a>
              <a href="#realisations" className="btn btn-ligne">
                Voir les réalisations
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-ligne">
                <MessageCircle size={18} aria-hidden />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Le viseur : la dernière réalisation publiée, ou le logo tant que la galerie est vide. */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[0.9rem] rounded-tl-[4.5rem] bg-ardoise">
            {une?.type === "video" ? (
              <video
                src={une.url}
                autoPlay
                muted
                loop
                playsInline
                className="size-full object-cover"
              />
            ) : une ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={une.url} alt={une.titre} className="size-full object-cover" />
            ) : (
              <Image
                src={logo}
                alt="Logo Zoé Studio : un Z en ruban rouge sur fond ardoise"
                priority
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="size-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-4">
              <Coin className="right-0 top-0 border-r-2 border-t-2" />
              <Coin className="bottom-0 left-0 border-b-2 border-l-2" />
              <Coin className="bottom-0 right-0 border-b-2 border-r-2" />
              <span className="absolute left-8 top-1 flex items-center gap-2 text-sm font-bold tracking-wider text-white drop-shadow">
                <span className="size-2.5 rounded-full bg-ruban motion-safe:animate-[clignote_1.6s_steps(2)_infinite]" />
                REC
              </span>
            </div>
          </div>
          <figcaption className="mt-3 text-[0.95rem] text-brume">
            {une ? `Dernière réalisation : ${une.titre}` : "Zoé Studio, production vidéo à Tanger"}
          </figcaption>
        </motion.figure>
      </div>

      <dl className="wrap grid grid-cols-2 border-t border-trait md:grid-cols-4">
        {CHIFFRES.map((c, i) => (
          <div
            key={c.l}
            className={`flex flex-col-reverse py-6 md:py-8 ${i % 2 ? "pl-5" : ""} ${
              i > 0 ? "md:border-l md:border-trait md:pl-8" : ""
            } ${i % 2 ? "max-md:border-l max-md:border-trait" : ""} ${i > 1 ? "max-md:border-t max-md:border-trait" : ""}`}
          >
            <dt className="text-brume">{c.l}</dt>
            <dd className="affiche text-[clamp(2.6rem,5vw,4rem)] text-laiton">{c.n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
