"use client";

import { useEffect, useState } from "react";

/* Ressources hébergées chez un tiers, avec repli.
   Le site s'affiche toujours d'abord avec sa version locale. Si toutes les ressources distantes
   répondent dans le délai, la version enrichie prend le relais ; sinon rien ne change.
   Une panne, un fichier supprimé ou un réseau lent laissent donc le site intact. */
export function useRessourcesDistantes(urls: string[], delaiMs = 6000): boolean {
  const [pretes, setPretes] = useState(false);
  const cle = urls.join("|");

  useEffect(() => {
    if (!urls.length) return;
    let vivant = true;
    const images = urls.map(
      (src) =>
        new Promise<void>((ok, echec) => {
          const img = new Image();
          img.onload = () => (img.naturalWidth > 0 ? ok() : echec(new Error(src)));
          img.onerror = () => echec(new Error(src));
          img.src = src;
        }),
    );
    const delai = new Promise<never>((_, echec) =>
      window.setTimeout(() => echec(new Error("délai dépassé")), delaiMs),
    );
    Promise.race([Promise.all(images), delai])
      .then(() => vivant && setPretes(true))
      .catch(() => vivant && setPretes(false));
    return () => {
      vivant = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle, delaiMs]);

  return pretes;
}
