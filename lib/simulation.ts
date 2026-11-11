"use client";

import { useSyncExternalStore } from "react";
import { AMBIANCES, COULEURS, SECTEURS } from "./simulateur";

/* État du simulateur, partagé entre l'aperçu (hero) et le brief (formulaire).
   Conservé pendant la session : un retour en arrière ou un rechargement ne perd pas les choix. */
export type Simulation = { secteur: string; ambiance: string; couleur: string; touche: boolean };

const CLE = "zoe-simulation-v1";
const DEFAUT: Simulation = { secteur: "restaurant", ambiance: "editorial", couleur: "emeraude", touche: false };

let etat: Simulation = DEFAUT;
let charge = false;
const abonnes = new Set<() => void>();

function valide(s: Partial<Simulation>): s is Simulation {
  return (
    SECTEURS.some((x) => x.id === s.secteur) &&
    AMBIANCES.some((x) => x.id === s.ambiance) &&
    COULEURS.some((x) => x.id === s.couleur)
  );
}

function charger() {
  if (charge || typeof window === "undefined") return;
  charge = true;
  try {
    const brut = JSON.parse(sessionStorage.getItem(CLE) ?? "null");
    if (brut && valide(brut)) etat = { ...brut, touche: !!brut.touche };
  } catch {
    /* stockage indisponible : on garde les valeurs par défaut */
  }
}

export function choisir(partiel: Partial<Omit<Simulation, "touche">>) {
  etat = { ...etat, ...partiel, touche: true };
  try {
    sessionStorage.setItem(CLE, JSON.stringify(etat));
  } catch {
    /* idem */
  }
  abonnes.forEach((f) => f());
}

export function useSimulation(): Simulation {
  return useSyncExternalStore(
    (f) => {
      charger();
      abonnes.add(f);
      queueMicrotask(f); // applique l'état restauré après l'hydratation
      return () => abonnes.delete(f);
    },
    () => etat,
    () => DEFAUT,
  );
}

export function decrire(s: Simulation) {
  return {
    secteur: SECTEURS.find((x) => x.id === s.secteur)!,
    ambiance: AMBIANCES.find((x) => x.id === s.ambiance)!,
    couleur: COULEURS.find((x) => x.id === s.couleur)!,
  };
}
