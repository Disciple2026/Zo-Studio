"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Booking } from "@/components/booking";
import { Contact, Footer } from "@/components/contact";
import { DemoPortant } from "@/components/demo-portant";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";
import { Timeline } from "@/components/timeline";
import { sb, type Media } from "@/lib/supabase";

export default function Accueil() {
  const [medias, setMedias] = useState<Media[] | null>(null);
  const [erreur, setErreur] = useState(false);

  const charger = useCallback(async () => {
    setErreur(false);
    setMedias(null);
    const { data, error } = await sb
      .from("galerie")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErreur(true);
      setMedias([]);
    } else setMedias((data as Media[]) ?? []);
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="contenu">
        <Hero />
        <DemoPortant />
        <Services />
        <Gallery medias={medias} erreur={erreur} recharger={charger} />
        <Reviews />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Timeline />
    </MotionConfig>
  );
}
