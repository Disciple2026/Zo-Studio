"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { WHATSAPP } from "@/lib/content";
import { decrire, useSimulation } from "@/lib/simulation";
import { avecDelai, sb } from "@/lib/supabase";

const OBJECTIFS = ["Présenter mon activité", "Vendre des produits", "Recevoir des réservations", "Montrer mes réalisations", "Recevoir des demandes de contact", "Partager un événement", "Autre"];
const DELAIS = ["Dès que possible", "Dans 1 à 3 mois", "Dans plus de 3 mois", "Pas encore décidé"];

type Etat = "saisie" | "envoi" | "envoye";

/* Brief d'un projet de site, prérempli avec les choix du simulateur.
   En attendant la table `project_briefs` (phase 4-5), la demande est enregistrée dans la table
   `reservations` existante, avec un service « Site web » : elle arrive donc dans l'administration. */
export function Brief() {
  const sim = useSimulation();
  const { secteur, ambiance, couleur } = decrire(sim);
  const [etat, setEtat] = useState<Etat>("saisie");
  const [erreur, setErreur] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (v("site")) return; // champ piège : rempli seulement par un robot
    setEtat("envoi");

    const recap = [
      `Projet de site : ${secteur.label}`,
      sim.touche ? `Simulation : ambiance ${ambiance.label}, couleur ${couleur.label} (${couleur.hex})` : "Simulation : non utilisée",
      `Objectif : ${v("objectif")}`,
      `Délai souhaité : ${v("delai")}`,
      ...(v("marque") ? [`Entreprise ou marque : ${v("marque")}`] : []),
      "",
      v("description"),
    ].join("\n");

    const { error } = await avecDelai(
      sb.from("reservations").insert({
        client_email: v("email").toLowerCase(),
        client_nom: v("nom"),
        telephone: v("tel"),
        service: `Site web · ${secteur.label}`,
        date_evenement: "",
        heure_evenement: "",
        lieu: v("ville"),
        nb_jours: "",
        budget: "",
        attentes: recap,
        statut: "new",
      }),
    );
    const echec = !!error;
    if (echec) {
      setEtat("saisie");
      setErreur("Le brief n'a pas été envoyé. Vérifiez votre connexion et renvoyez-le, ou écrivez-nous sur WhatsApp.");
      return;
    }
    setEtat("envoye");
  }

  return (
    <section id="brief" className="bloc border-t border-trait">
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="titre">Décrivez votre projet de site</h2>
          <p className="mt-5 max-w-md text-[1.1rem] text-brume">
            Le brief est gratuit et sans engagement. Nous revenons vers vous sous 24 h avec des
            questions, puis un devis. Aucun prix ni délai n'est fixé avant cet échange.
          </p>

          <div className="panneau mt-8 max-w-md p-5">
            <h3 className="font-bold">Votre simulation</h3>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5">
              <dt className="text-brume">Activité</dt>
              <dd className="font-semibold">{secteur.label}</dd>
              <dt className="text-brume">Ambiance</dt>
              <dd className="font-semibold">{ambiance.label}</dd>
              <dt className="text-brume">Couleur</dt>
              <dd className="flex items-center gap-2 font-semibold">
                <span aria-hidden className="size-4 rounded-full ring-1 ring-papier/30" style={{ background: couleur.hex }} />
                {couleur.label}
              </dd>
            </dl>
            <a href="#accueil" className="mt-4 inline-block font-bold text-jade underline underline-offset-4 hover:text-papier">
              Modifier la simulation
            </a>
          </div>
        </div>

        {etat === "envoye" ? (
          <div className="panneau panneau-coin self-start p-8 md:p-12" role="status">
            <CircleCheck size={44} className="text-jade" aria-hidden />
            <h3 className="affiche mt-5 text-[clamp(2.2rem,5vw,3.5rem)]">Brief envoyé</h3>
            <p className="mt-4 max-w-lg text-[1.1rem] text-brume">
              Nous avons reçu votre projet de site {secteur.label.toLowerCase()} avec votre
              simulation. Nous vous recontactons sous 24 h.
            </p>
            <button type="button" className="btn btn-ligne mt-7" onClick={() => setEtat("saisie")}>
              Envoyer un autre brief
            </button>
          </div>
        ) : (
          <form onSubmit={envoyer} className="panneau panneau-coin grid gap-5 p-5 sm:p-8 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="b-nom" className="etiquette">Nom complet</label>
                <input id="b-nom" name="nom" className="champ" autoComplete="name" required />
              </div>
              <div>
                <label htmlFor="b-marque" className="etiquette">Entreprise ou marque (facultatif)</label>
                <input id="b-marque" name="marque" className="champ" autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="b-email" className="etiquette">E-mail</label>
                <input id="b-email" name="email" type="email" className="champ" autoComplete="email" required />
              </div>
              <div>
                <label htmlFor="b-tel" className="etiquette">Téléphone (facultatif)</label>
                <input id="b-tel" name="tel" type="tel" className="champ" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="b-objectif" className="etiquette">Objectif du site</label>
                <select id="b-objectif" name="objectif" className="champ">
                  {OBJECTIFS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="b-delai" className="etiquette">Délai souhaité</label>
                <select id="b-delai" name="delai" className="champ">
                  {DELAIS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="b-ville" className="etiquette">Ville et pays</label>
              <input id="b-ville" name="ville" className="champ" placeholder="Tanger, Maroc" required />
            </div>
            <div>
              <label htmlFor="b-description" className="etiquette">Votre projet</label>
              <textarea id="b-description" name="description" className="champ" required placeholder="Votre activité, ce que le site doit permettre, des sites que vous aimez…" />
            </div>
            <div aria-hidden className="absolute -left-[200vw]">
              <label htmlFor="b-site">Ne pas remplir</label>
              <input id="b-site" name="site" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="flex items-start gap-3 text-[0.98rem] text-brume">
              <input type="checkbox" required className="mt-1 size-5 shrink-0 accent-[var(--color-emeraude)]" />
              <span>J'accepte que Zoé Studio utilise ces informations pour répondre à ma demande.</span>
            </label>
            {erreur && (
              <p role="alert" className="rounded-lg border border-[#e2725b]/60 bg-[#e2725b]/10 px-4 py-3">
                {erreur}{" "}
                <a href={WHATSAPP} target="_blank" rel="noopener" className="font-bold underline">Ouvrir WhatsApp</a>
              </p>
            )}
            <button type="submit" className="btn btn-primaire min-h-14 text-[1.1rem]" disabled={etat === "envoi"}>
              {etat === "envoi" ? "Envoi du brief…" : "Envoyer mon brief"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
