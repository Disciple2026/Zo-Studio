"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, MessageCircle, Trash2, Upload } from "lucide-react";
import { Chat } from "@/components/chat";
import { Onglets, Shell, Vide } from "@/components/shell";
import { CATEGORIES } from "@/lib/content";
import {
  checkAdminPassword,
  isAdminUnlocked,
  sb,
  setAdminUnlocked,
  type Livrable,
  type Media,
  type Message,
  type Reservation,
  type Statut,
} from "@/lib/supabase";

type Tab = "resa" | "chat" | "galerie" | "livrables" | "stats";
const BADGE: Record<Statut, string> = { new: "Nouvelle", confirmed: "Confirmée", done: "Terminée" };

export default function Admin() {
  const [ok, setOk] = useState<boolean | undefined>(undefined);
  useEffect(() => setOk(isAdminUnlocked()), []);
  if (ok === undefined) return <Shell><p className="text-brume">Vérification…</p></Shell>;
  if (!ok) return <Porte onOk={() => setOk(true)} />;
  return (
    <Panneau
      onLogout={() => {
        setAdminUnlocked(false);
        setOk(false);
      }}
    />
  );
}

function Porte({ onOk }: { onOk: () => void }) {
  const [erreur, setErreur] = useState(false);
  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <h1 className="titre">Administration</h1>
        <form
          className="panneau panneau-coin mt-8 grid gap-5 p-6 sm:p-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const pwd = String(new FormData(e.currentTarget).get("pwd"));
            if (await checkAdminPassword(pwd)) {
              setAdminUnlocked(true);
              onOk();
            } else setErreur(true);
          }}
        >
          <div>
            <label htmlFor="a-pwd" className="etiquette">Mot de passe</label>
            <input id="a-pwd" name="pwd" type="password" className="champ" autoComplete="current-password" required autoFocus />
          </div>
          {erreur && <p role="alert" className="rounded-lg border border-ruban/60 bg-ruban/10 px-4 py-3">Mot de passe incorrect.</p>}
          <button type="submit" className="btn btn-rouge">Ouvrir l'administration</button>
        </form>
      </div>
    </Shell>
  );
}

function Panneau({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("resa");
  const [resas, setResas] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [livrables, setLivrables] = useState<Livrable[]>([]);
  const [charge, setCharge] = useState(true);
  const [erreur, setErreur] = useState("");

  const lire = useCallback(async () => {
    const [r, m, g, l] = await Promise.all([
      sb.from("reservations").select("*").order("created_at", { ascending: false }),
      sb.from("messages").select("*").order("created_at", { ascending: true }),
      sb.from("galerie").select("*").order("created_at", { ascending: false }),
      sb.from("livrables").select("*").order("created_at", { ascending: false }),
    ]);
    const e = r.error || m.error || g.error || l.error;
    setErreur(e ? "Les données n'ont pas pu être chargées. Vérifiez la connexion puis rechargez la page." : "");
    setResas((r.data as Reservation[]) ?? []);
    setMessages((m.data as Message[]) ?? []);
    setMedias((g.data as Media[]) ?? []);
    setLivrables((l.data as Livrable[]) ?? []);
    setCharge(false);
  }, []);

  useEffect(() => {
    lire();
    const canal = sb
      .channel("admin")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, lire)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reservations" }, lire)
      .subscribe();
    return () => {
      sb.removeChannel(canal);
    };
  }, [lire]);

  const nonLus = messages.filter((m) => m.from_role === "client" && !m.lu).length;
  const nouvelles = resas.filter((r) => r.statut === "new").length;

  return (
    <Shell droite={<button type="button" onClick={onLogout} className="btn btn-ligne btn-sm">Verrouiller</button>}>
      <h1 className="titre mb-8">Administration</h1>
      {erreur && <p role="alert" className="mb-6 rounded-lg border border-ruban/60 bg-ruban/10 px-4 py-3">{erreur}</p>}
      <Onglets<Tab>
        actif={tab}
        onChange={setTab}
        onglets={[
          { id: "resa", label: "Réservations", badge: nouvelles },
          { id: "chat", label: "Discussions", badge: nonLus },
          { id: "galerie", label: "Galerie" },
          { id: "livrables", label: "Livrables" },
          { id: "stats", label: "Statistiques" },
        ]}
      />
      {charge ? (
        <p className="text-brume" aria-busy="true">Chargement…</p>
      ) : (
        <>
          {tab === "resa" && <Reservations resas={resas} lire={lire} />}
          {tab === "chat" && <Discussions messages={messages} lire={lire} />}
          {tab === "galerie" && <GalerieAdmin medias={medias} lire={lire} />}
          {tab === "livrables" && <Livrables livrables={livrables} lire={lire} />}
          {tab === "stats" && <Stats resas={resas} medias={medias} nonLus={nonLus} />}
        </>
      )}
    </Shell>
  );
}

/* ───────── Réservations ───────── */

function exporterCSV(resas: Reservation[]) {
  const lignes = [["Nom", "Email", "Téléphone", "Service", "Date", "Heure", "Lieu", "Jours", "Budget", "Attentes", "Statut", "Créé le"]];
  resas.forEach((o) =>
    lignes.push([o.client_nom, o.client_email, o.telephone ?? "", o.service, o.date_evenement ?? "", o.heure_evenement ?? "", o.lieu ?? "", o.nb_jours ?? "", o.budget ?? "", o.attentes ?? "", o.statut, new Date(o.created_at).toLocaleDateString("fr-FR")]),
  );
  const csv = lignes.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = "reservations-zoe-studio.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function Reservations({ resas, lire }: { resas: Reservation[]; lire: () => Promise<void> }) {
  const statut = async (id: string, s: Statut) => {
    await sb.from("reservations").update({ statut: s }).eq("id", id);
    lire();
  };
  const supprimer = async (r: Reservation) => {
    if (!confirm(`Supprimer la réservation de ${r.client_nom} ? Cette action est définitive.`)) return;
    await sb.from("reservations").delete().eq("id", r.id);
    lire();
  };

  if (!resas.length) return <Vide>Aucune réservation reçue pour l'instant.</Vide>;
  return (
    <>
      <div className="mb-5 flex justify-end">
        <button type="button" className="btn btn-ligne btn-sm" onClick={() => exporterCSV(resas)}>
          <Download size={16} aria-hidden />
          Exporter en CSV
        </button>
      </div>
      <ul className="grid gap-4">
        {resas.map((r) => (
          <li key={r.id} className={`panneau p-5 sm:p-6 ${r.statut === "new" ? "border-l-4 border-l-laiton" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[1.25rem] font-bold">{r.client_nom}</h2>
                <p className="text-laiton">{r.service}{r.budget ? `, ${r.budget}` : ""}</p>
              </div>
              <span className={`pastille pastille-${r.statut}`}>{BADGE[r.statut] ?? r.statut}</span>
            </div>
            <dl className="mt-4 grid gap-x-8 gap-y-2 text-[0.98rem] sm:grid-cols-2 lg:grid-cols-3">
              <Ligne t="Date" v={[r.date_evenement, r.heure_evenement].filter(Boolean).join(" à ")} />
              <Ligne t="Durée" v={r.nb_jours} />
              <Ligne t="Lieu" v={r.lieu} />
              <Ligne t="Téléphone" v={r.telephone} />
              <Ligne t="E-mail" v={r.client_email} />
            </dl>
            {r.attentes && <p className="mt-4 whitespace-pre-wrap border-l-2 border-trait pl-4 text-brume">{r.attentes}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {r.statut === "new" && <button type="button" className="btn btn-clair btn-sm" onClick={() => statut(r.id, "confirmed")}>Confirmer</button>}
              {r.statut === "confirmed" && <button type="button" className="btn btn-clair btn-sm" onClick={() => statut(r.id, "done")}>Marquer terminée</button>}
              {r.telephone && (
                <a
                  className="btn btn-ligne btn-sm"
                  target="_blank"
                  rel="noopener"
                  href={`https://wa.me/${r.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${r.client_nom}, Zoé Studio vous contacte au sujet de votre réservation.`)}`}
                >
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp
                </a>
              )}
              <button type="button" className="btn btn-ligne btn-sm" onClick={() => supprimer(r)}>
                <Trash2 size={16} aria-hidden />
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Ligne({ t, v }: { t: string; v: string | null }) {
  return (
    <div className="flex gap-2">
      <dt className="text-brume">{t} :</dt>
      <dd className="min-w-0 break-words font-semibold">{v || "Non précisé"}</dd>
    </div>
  );
}

/* ───────── Discussions ───────── */

function Discussions({ messages, lire }: { messages: Message[]; lire: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const convs = useMemo(() => {
    const map = new Map<string, { dernier: Message; nonLus: number }>();
    for (const m of messages) {
      const c = map.get(m.conversation_email) ?? { dernier: m, nonLus: 0 };
      c.dernier = m;
      if (m.from_role === "client" && !m.lu) c.nonLus++;
      map.set(m.conversation_email, c);
    }
    return [...map.entries()].sort((a, b) => b[1].dernier.created_at.localeCompare(a[1].dernier.created_at));
  }, [messages]);

  const fil = messages.filter((m) => m.conversation_email === email);
  const aLire = fil.some((m) => m.from_role === "client" && !m.lu);
  useEffect(() => {
    if (!email || !aLire) return;
    sb.from("messages").update({ lu: true }).eq("conversation_email", email).eq("from_role", "client").then(() => lire());
  }, [email, aLire, lire]);

  if (!convs.length) return <Vide>Aucune discussion pour l'instant.</Vide>;
  return (
    <div className="grid gap-5 lg:grid-cols-[20rem_1fr]">
      <ul className="panneau max-h-[32rem] divide-y divide-trait overflow-y-auto">
        {convs.map(([e, c]) => (
          <li key={e}>
            <button
              type="button"
              onClick={() => setEmail(e)}
              aria-current={e === email ? "true" : undefined}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-ardoise-2 ${e === email ? "bg-ardoise-2" : ""}`}
            >
              <span className="min-w-0">
                <span className={`block truncate ${c.nonLus ? "font-bold" : ""}`}>{e}</span>
                <span className="block truncate text-sm text-brume">{c.dernier.contenu}</span>
              </span>
              {c.nonLus > 0 && <span className="rounded-full bg-ruban px-2 py-0.5 text-xs font-bold text-white">{c.nonLus}</span>}
            </button>
          </li>
        ))}
      </ul>
      {email ? (
        <div>
          <p className="mb-3 font-bold">{email}</p>
          <Chat
            messages={fil}
            moi="admin"
            vide="Aucun message."
            onSend={async (t) => {
              await sb.from("messages").insert({ conversation_email: email, from_role: "admin", contenu: t, lu: false });
              await lire();
            }}
          />
        </div>
      ) : (
        <Vide>Choisissez une discussion dans la liste pour y répondre.</Vide>
      )}
    </div>
  );
}

/* ───────── Galerie ───────── */

const CATS = CATEGORIES.filter((c) => c.id !== "all");

function GalerieAdmin({ medias, lire }: { medias: Media[]; lire: () => Promise<void> }) {
  const [etat, setEtat] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const fichier = useRef<HTMLInputElement>(null);

  async function publier(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const titre = String(f.get("titre")).trim();
    const categorie = String(f.get("categorie"));
    const file = fichier.current?.files?.[0];
    let url = String(f.get("url")).trim();
    let type = String(f.get("type"));

    if (!file && !url) {
      setEtat("Ajoutez un fichier ou collez une adresse (URL).");
      return;
    }
    if (file) {
      setEtat("Envoi du fichier…");
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const chemin = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await sb.storage.from("galerie").upload(chemin, file, { cacheControl: "3600", upsert: false });
      if (error) {
        setEtat(`Le fichier n'a pas pu être envoyé : ${error.message}`);
        return;
      }
      url = sb.storage.from("galerie").getPublicUrl(chemin).data.publicUrl;
      type = file.type.startsWith("video") ? "video" : "image";
    }
    const { error } = await sb.from("galerie").insert({ titre: titre || file?.name.split(".")[0] || "Sans titre", categorie, type, url });
    if (error) {
      setEtat(`La publication a échoué : ${error.message}`);
      return;
    }
    setEtat("Publié dans la galerie.");
    form.current?.reset();
    lire();
  }

  const supprimer = async (m: Media) => {
    if (!confirm(`Retirer « ${m.titre} » de la galerie ?`)) return;
    await sb.from("galerie").delete().eq("id", m.id);
    lire();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[24rem_1fr]">
      <form ref={form} onSubmit={publier} className="panneau grid gap-4 self-start p-5 sm:p-6">
        <h2 className="affiche text-[2rem]">Publier un média</h2>
        <div>
          <label htmlFor="g-titre" className="etiquette">Titre</label>
          <input id="g-titre" name="titre" className="champ" placeholder="Mariage de Sara et Khalid" />
        </div>
        <div>
          <label htmlFor="g-cat" className="etiquette">Catégorie</label>
          <select id="g-cat" name="categorie" className="champ">
            {CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="g-file" className="etiquette">Fichier photo ou vidéo</label>
          <input ref={fichier} id="g-file" type="file" accept="image/*,video/*" className="champ file:mr-3 file:rounded-full file:border-0 file:bg-ardoise-2 file:px-3 file:py-1 file:text-papier" />
        </div>
        <p className="text-center text-brume">ou</p>
        <div className="grid grid-cols-[7.5rem_1fr] gap-3">
          <div>
            <label htmlFor="g-type" className="etiquette">Type</label>
            <select id="g-type" name="type" className="champ">
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
            </select>
          </div>
          <div>
            <label htmlFor="g-url" className="etiquette">Adresse (URL)</label>
            <input id="g-url" name="url" type="url" className="champ" placeholder="https://" />
          </div>
        </div>
        <button type="submit" className="btn btn-rouge">
          <Upload size={18} aria-hidden />
          Publier dans la galerie
        </button>
        {etat && <p role="status" className="text-brume">{etat}</p>}
      </form>

      {medias.length === 0 ? (
        <Vide>La galerie est vide. Publiez un premier média : il s'affichera aussi en tête de la page d'accueil.</Vide>
      ) : (
        <ul className="grid grid-cols-2 gap-3 self-start md:grid-cols-3">
          {medias.map((m) => (
            <li key={m.id} className="panneau overflow-hidden">
              {m.type === "video" ? (
                <video src={`${m.url}#t=0.5`} muted preload="metadata" className="aspect-[4/3] w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              )}
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="min-w-0 truncate text-[0.95rem] font-bold">{m.titre}</p>
                <button type="button" onClick={() => supprimer(m)} className="grid size-9 shrink-0 place-items-center rounded-full text-brume hover:bg-ruban hover:text-white">
                  <Trash2 size={16} aria-hidden />
                  <span className="sr-only">Retirer {m.titre}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────── Livrables ───────── */

function Livrables({ livrables, lire }: { livrables: Livrable[]; lire: () => Promise<void> }) {
  const [etat, setEtat] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const f = new FormData(el);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const email = v("email").toLowerCase();
    const { error } = await sb.from("livrables").insert({ client_email: email, nom: v("nom"), type: v("type"), url: v("url"), note: v("note") });
    if (error) {
      setEtat(`Le livrable n'a pas pu être envoyé : ${error.message}`);
      return;
    }
    await sb.from("messages").insert({
      conversation_email: email,
      from_role: "admin",
      contenu: `Votre fichier « ${v("nom")} » est disponible dans votre espace client, onglet « Mes films ».`,
      lu: false,
    });
    setEtat(`Livrable envoyé à ${email}. Le client est prévenu dans sa discussion.`);
    el.reset();
    lire();
  }

  const supprimer = async (l: Livrable) => {
    if (!confirm(`Supprimer le livrable « ${l.nom} » ?`)) return;
    await sb.from("livrables").delete().eq("id", l.id);
    lire();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[24rem_1fr]">
      <form onSubmit={envoyer} className="panneau grid gap-4 self-start p-5 sm:p-6">
        <h2 className="affiche text-[2rem]">Envoyer un livrable</h2>
        <div>
          <label htmlFor="l-email" className="etiquette">E-mail du client</label>
          <input id="l-email" name="email" type="email" className="champ" required />
        </div>
        <div>
          <label htmlFor="l-nom" className="etiquette">Nom du fichier</label>
          <input id="l-nom" name="nom" className="champ" placeholder="Mariage_Final_4K.mp4" required />
        </div>
        <div>
          <label htmlFor="l-type" className="etiquette">Type</label>
          <select id="l-type" name="type" className="champ">
            <option>Vidéo</option><option>Photos</option><option>Montage</option><option>Autre</option>
          </select>
        </div>
        <div>
          <label htmlFor="l-url" className="etiquette">Lien de téléchargement</label>
          <input id="l-url" name="url" type="url" className="champ" placeholder="https://drive.google.com/…" required />
        </div>
        <div>
          <label htmlFor="l-note" className="etiquette">Note pour le client (facultatif)</label>
          <input id="l-note" name="note" className="champ" />
        </div>
        <button type="submit" className="btn btn-rouge">Envoyer au client</button>
        {etat && <p role="status" className="text-brume">{etat}</p>}
      </form>

      {livrables.length === 0 ? (
        <Vide>Aucun livrable envoyé pour l'instant.</Vide>
      ) : (
        <ul className="grid gap-3 self-start">
          {livrables.map((l) => (
            <li key={l.id} className="panneau flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="break-words font-bold">{l.nom}</p>
                <p className="break-words text-[0.95rem] text-brume">{[l.client_email, l.type, l.note].filter(Boolean).join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <a href={l.url} target="_blank" rel="noopener" className="btn btn-ligne btn-sm">Ouvrir</a>
                <button type="button" onClick={() => supprimer(l)} className="btn btn-ligne btn-sm">
                  <Trash2 size={16} aria-hidden />
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────── Statistiques ───────── */

function Stats({ resas, medias, nonLus }: { resas: Reservation[]; medias: Media[]; nonLus: number }) {
  const now = new Date();
  const ceMois = resas.filter((r) => {
    const d = new Date(r.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const tuiles = [
    { n: resas.length, l: "réservations au total" },
    { n: resas.filter((r) => r.statut === "new").length, l: "en attente de confirmation" },
    { n: ceMois, l: "reçues ce mois-ci" },
    { n: nonLus, l: "messages non lus" },
    { n: medias.length, l: "médias dans la galerie" },
  ];
  const parService = Object.entries(
    resas.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.service]: (acc[r.service] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1]);
  const max = parService[0]?.[1] ?? 1;

  return (
    <>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {tuiles.map((t) => (
          <div key={t.l} className="panneau flex flex-col-reverse p-5">
            <dt className="text-brume">{t.l}</dt>
            <dd className="affiche text-[3.2rem] text-laiton">{t.n}</dd>
          </div>
        ))}
      </dl>
      <h2 className="affiche mb-5 mt-12 text-[2rem]">Services les plus demandés</h2>
      {parService.length === 0 ? (
        <Vide>Les chiffres apparaîtront avec les premières réservations.</Vide>
      ) : (
        <ul className="grid max-w-3xl gap-3">
          {parService.map(([s, n]) => (
            <li key={s} className="grid grid-cols-[minmax(0,14rem)_1fr_2rem] items-center gap-4">
              <span className="truncate">{s}</span>
              <span className="h-3 rounded-full bg-ardoise-2">
                <span className="block h-full rounded-full bg-laiton" style={{ width: `${(n / max) * 100}%` }} />
              </span>
              <span className="text-right font-bold tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
