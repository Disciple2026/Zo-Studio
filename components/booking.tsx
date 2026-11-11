"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { BUDGETS, ETAPES, JOURS, SERVICES, WHATSAPP } from "@/lib/content";
import { sb } from "@/lib/supabase";
import { Calendar } from "./calendar";

const HEURES = Array.from({ length: 36 }, (_, i) => {
  const h = 6 + Math.floor(i / 2);
  return `${String(h).padStart(2, "0")}:${i % 2 ? "30" : "00"}`;
});

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

type Etat = "saisie" | "envoi" | "envoye";

export function Booking() {
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [etat, setEtat] = useState<Etat>("saisie");
  const [erreur, setErreur] = useState("");

  // Un clic sur un service plus haut dans la page pré-sélectionne ce service ici.
  useEffect(() => {
    const on = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener("zoe:service", on);
    return () => window.removeEventListener("zoe:service", on);
  }, []);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    if (!date) {
      setErreur("Choisissez la date du tournage dans le calendrier.");
      return;
    }
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const email = v("email").toLowerCase();
    const nom = v("nom");
    setEtat("envoi");

    const { error } = await sb.from("reservations").insert({
      client_email: email,
      client_nom: nom,
      telephone: v("tel"),
      service,
      date_evenement: fmt(date),
      heure_evenement: v("heure"),
      lieu: v("lieu"),
      nb_jours: v("jours"),
      budget: v("budget"),
      attentes: v("attentes"),
      statut: "new",
    });
    if (error) {
      setEtat("saisie");
      setErreur(
        "La demande n'a pas été envoyée. Vérifiez votre connexion et renvoyez-la, ou écrivez-nous sur WhatsApp.",
      );
      return;
    }

    // Premier message dans le chat de l'espace client + copie par e-mail au studio.
    const { data: deja } = await sb.from("messages").select("id").eq("conversation_email", email).limit(1);
    if (!deja?.length) {
      await sb.from("messages").insert({
        conversation_email: email,
        from_role: "admin",
        contenu: `Bonjour ${nom} ! Merci pour votre réservation « ${service} ». Nous vous contactons dans les 24 h. Vous pouvez nous écrire ici à tout moment.`,
        lu: false,
      });
    }
    try {
      const fd = new FormData();
      fd.append("access_key", "40008284-53ab-4aea-ab6c-84769b2a4a44");
      fd.append("subject", "Nouvelle réservation — Zoé Studio");
      fd.append("from_name", nom);
      fd.append("email", email);
      fd.append("message", `Service : ${service}\nDate : ${fmt(date)} à ${v("heure")}\nLieu : ${v("lieu")}\nTéléphone : ${v("tel")}`);
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
    } catch {
      /* la réservation est déjà enregistrée ; l'e-mail n'est qu'une copie */
    }
    setEtat("envoye");
  }

  return (
    <section id="reservation" className="bloc border-t border-trait bg-foret/40">
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="titre">Réserver un tournage</h2>
          <p className="mt-5 max-w-md text-[1.1rem] text-brume">
            La demande est gratuite et ne vous engage à rien. Voici ce qui se passe ensuite.
          </p>
          <ol className="mt-9 max-w-md">
            {ETAPES.map((e, i) => (
              <li key={e.t} className="grid grid-cols-[3.2rem_1fr] border-t border-trait py-4 last:border-b">
                <span className="affiche text-[2.4rem] text-jade">{i + 1}</span>
                <p>
                  <span className="block font-bold">{e.t}</span>
                  <span className="text-brume">{e.d}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>

        {etat === "envoye" ? (
          <div className="panneau panneau-coin self-start p-8 md:p-12" role="status">
            <CircleCheck size={44} className="text-jade" aria-hidden />
            <h3 className="affiche mt-5 text-[clamp(2.2rem,5vw,3.5rem)]">Demande envoyée</h3>
            <p className="mt-4 max-w-lg text-[1.1rem] text-brume">
              Nous vous rappelons sous 24 h pour préciser les détails. Créez votre espace client
              avec le même e-mail pour suivre la réservation et discuter avec l'équipe.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/espace/" className="btn btn-primaire">
                Ouvrir mon espace
              </Link>
              <button
                type="button"
                className="btn btn-ligne"
                onClick={() => {
                  setDate(null);
                  setService("");
                  setEtat("saisie");
                }}
              >
                Faire une autre demande
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={envoyer} className="panneau panneau-coin grid gap-5 p-5 sm:p-8 md:p-10">
            <div>
              <label htmlFor="f-nom" className="etiquette">Nom complet</label>
              <input id="f-nom" name="nom" className="champ" autoComplete="name" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-tel" className="etiquette">Téléphone</label>
                <input id="f-tel" name="tel" type="tel" className="champ" autoComplete="tel" placeholder="+212 6 00 00 00 00" required />
              </div>
              <div>
                <label htmlFor="f-email" className="etiquette">E-mail</label>
                <input id="f-email" name="email" type="email" className="champ" autoComplete="email" required />
              </div>
            </div>
            <div>
              <label htmlFor="f-service" className="etiquette">Type de tournage</label>
              <select
                id="f-service"
                className="champ"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="" disabled>Choisir un service</option>
                {SERVICES.map((s) => (
                  <option key={s.option} value={s.option}>{s.nom}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.25fr_1fr]">
              <fieldset>
                <legend className="etiquette">
                  Date du tournage
                  <span className="ml-2 font-normal text-jade">{date ? fmt(date) : ""}</span>
                </legend>
                <Calendar value={date} onChange={(d) => { setDate(d); setErreur(""); }} />
              </fieldset>
              <div className="grid content-start gap-5">
                <div>
                  <label htmlFor="f-heure" className="etiquette">Heure de début</label>
                  <select id="f-heure" name="heure" className="champ" defaultValue="10:00">
                    {HEURES.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-jours" className="etiquette">Durée</label>
                  <select id="f-jours" name="jours" className="champ">
                    {JOURS.map((j) => <option key={j}>{j}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-budget" className="etiquette">Budget estimé</label>
                  <select id="f-budget" name="budget" className="champ">
                    <option value="">À discuter</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="f-lieu" className="etiquette">Lieu</label>
              <input id="f-lieu" name="lieu" className="champ" placeholder="Adresse, salle ou ville" required />
            </div>
            <div>
              <label htmlFor="f-attentes" className="etiquette">Votre projet</label>
              <textarea
                id="f-attentes"
                name="attentes"
                className="champ"
                placeholder="L'événement, le style de film que vous aimez, ce que vous souhaitez recevoir…"
                required
              />
            </div>

            {erreur && (
              <p role="alert" className="rounded-lg border border-emeraude/60 bg-emeraude/10 px-4 py-3">
                {erreur}{" "}
                {erreur.includes("WhatsApp") && (
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="font-bold underline">
                    Ouvrir WhatsApp
                  </a>
                )}
              </p>
            )}
            <button type="submit" className="btn btn-primaire min-h-14 text-[1.1rem]" disabled={etat === "envoi"}>
              {etat === "envoi" ? "Envoi de la demande…" : "Envoyer la demande"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
