"use client";

import { useEffect, useState } from "react";

/* Ressources hébergées chez un tiers, avec repli.
   Le site s'affiche toujours d'abord avec sa version locale. Si toutes les ressources distantes
   répondent dans le délai, la version enrichie peut prendre le relais ; sinon rien ne change.
   Une panne, un fichier supprimé ou un réseau lent laissent donc le site intact.
   Une liste vide ne déclenche rien : l'appelant décide quand commencer. */
export function useRessourcesDistantes(urls: string[], delaiMs = 6000): boolean {
  const [pretes, setPretes] = useState(false);
  const cle = urls.join("|");

  useEffect(() => {
    setPretes(false);
    if (!urls.length) return;
    let vivant = true;
    const images: HTMLImageElement[] = [];
    const chargements = urls.map(
      (src) =>
        new Promise<void>((ok, echec) => {
          const img = new Image();
          images.push(img);
          img.onload = () => (img.naturalWidth > 0 ? ok() : echec(new Error(src)));
          img.onerror = () => echec(new Error(src));
          img.src = src;
        }),
    );
    let minuterie = 0;
    const delai = new Promise<never>((_, echec) => {
      minuterie = window.setTimeout(() => echec(new Error("délai dépassé")), delaiMs);
    });
    Promise.race([Promise.all(chargements), delai])
      .then(() => vivant && setPretes(true))
      .catch(() => vivant && setPretes(false))
      .finally(() => window.clearTimeout(minuterie));
    return () => {
      vivant = false;
      window.clearTimeout(minuterie);
      // Interrompt les téléchargements encore en cours.
      images.forEach((img) => {
        img.onload = img.onerror = null;
        if (!img.complete) img.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle, delaiMs]);

  return pretes;
}
