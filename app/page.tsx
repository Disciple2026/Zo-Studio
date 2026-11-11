"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Booking } from "@/components/booking";
import { Brief } from "@/components/brief";
import { Univers } from "@/components/univers";
import { Contact, Footer } from "@/components/contact";
import { DemoPortant } from "@/components/demo-portant";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";
import { Timeline } from "@/components/timeline";
import { avecDelai, sb, type Media } from "@/lib/supabase";

export default function Accueil() {
  const [medias, setMedias] = useState<Media[] | null>(null);
  const [erreur, setErreur] = useState(false);

  const charger = useCallback(async () => {
    setErreur(false);
    setMedias(null);
    const { data, error } = await avecDelai(
      sb.from("galerie").select("*").order("created_at", { ascending: false }),
      10000,
    );
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
        <Univers />
        <Brief />
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
