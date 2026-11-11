"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Chat } from "@/components/chat";
import { Onglets, Shell, Vide } from "@/components/shell";
import { STATUT_LABEL } from "@/lib/content";
import {
  ADMIN_EMAIL,
  checkAdminPassword,
  sb,
  setAdminUnlocked,
  type Livrable,
  type Message,
  type Reservation,
} from "@/lib/supabase";

type Client = { email: string; nom: string };
type Tab = "resa" | "livrables" | "chat";

export default function Espace() {
  const [client, setClient] = useState<Client | null | undefined>(undefined); // undefined = vérification

  const ouvrir = useCallback(async (email: string, nomConnu?: string) => {
    let nom = nomConnu;
    if (!nom) {
      const { data } = await sb.from("profiles").select("nom").eq("email", email).maybeSingle();
      nom = data?.nom || email.split("@")[0];
    }
    setClient({ email, nom: nom as string });
  }, []);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      const email = data.session?.user.email;
      if (email) ouvrir(email.toLowerCase());
      else setClient(null);
    });
  }, [ouvrir]);

  if (client === undefined)
    return (
      <Shell>
        <p className="text-brume" aria-busy="true">Ouverture de votre espace…</p>
      </Shell>
    );
  if (client === null) return <Connexion onOk={ouvrir} />;
  return (
    <Tableau
      client={client}
      onLogout={async () => {
        await sb.auth.signOut();
        setClient(null);
      }}
    />
  );
}

/* ───────── Connexion / création de compte ───────── */

function Connexion({ onOk }: { onOk: (email: string, nom?: string) => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<"connexion" | "creation">("connexion");
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [charge, setCharge] = useState(false);

  async function soumettre(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    setInfo("");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim().toLowerCase();
    const pwd = String(f.get("pwd"));
    const nom = String(f.get("nom") ?? "").trim();
    setCharge(true);
    try {
      if (mode === "connexion") {
        if (email === ADMIN_EMAIL && (await checkAdminPassword(pwd))) {
          setAdminUnlocked(true);
          router.push("/admin/");
          return;
        }
        const { error } = await sb.auth.signInWithPassword({ email, password: pwd });
        if (error) {
          setErreur("E-mail ou mot de passe incorrect. Vérifiez-les, ou créez un compte.");
          return;
        }
        onOk(email);
      } else {
        if (pwd.length < 6) {
          setErreur("Le mot de passe doit contenir au moins 6 caractères.");
          return;
        }
        const { data, error } = await sb.auth.signUp({ email, password: pwd });
        if (error) {
          setErreur(
            /registered/i.test(error.message)
              ? "Un compte existe déjà avec cet e-mail. Connectez-vous."
              : "Le compte n'a pas pu être créé. Réessayez dans un instant.",
          );
          return;
        }
        await sb.from("profiles").insert({ email, nom, role: "client" });
        await sb.from("messages").insert({
          conversation_email: email,
          from_role: "admin",
          contenu: `Bonjour ${nom} ! Bienvenue dans votre espace Zoé Studio. Écrivez-nous ici dès que vous avez une question.`,
          lu: false,
        });
        if (data.session) onOk(email, nom);
        else {
          setMode("connexion");
          setInfo("Compte créé. Confirmez votre e-mail avec le lien reçu, puis connectez-vous.");
        }
      }
    } finally {
      setCharge(false);
    }
  }

  const creation = mode === "creation";
  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <h1 className="titre">{creation ? "Créer mon compte" : "Mon espace"}</h1>
        <p className="mt-4 text-[1.1rem] text-brume">
          Suivez vos réservations, téléchargez vos films et discutez avec l'équipe.
        </p>
        <form onSubmit={soumettre} className="panneau panneau-coin mt-8 grid gap-5 p-6 sm:p-8">
          {creation && (
            <div>
              <label htmlFor="c-nom" className="etiquette">Nom complet</label>
              <input id="c-nom" name="nom" className="champ" autoComplete="name" required />
            </div>
          )}
          <div>
            <label htmlFor="c-email" className="etiquette">E-mail</label>
            <input id="c-email" name="email" type="email" className="champ" autoComplete="email" required />
            {creation && (
              <p className="mt-1.5 text-sm text-brume">
                Utilisez l'e-mail de votre réservation pour la retrouver ici.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="c-pwd" className="etiquette">Mot de passe</label>
            <input
              id="c-pwd"
              name="pwd"
              type="password"
              className="champ"
              autoComplete={creation ? "new-password" : "current-password"}
              required
            />
            {creation && <p className="mt-1.5 text-sm text-brume">6 caractères au minimum.</p>}
          </div>
          {erreur && <p role="alert" className="rounded-lg border border-ruban/60 bg-ruban/10 px-4 py-3">{erreur}</p>}
          {info && <p role="status" className="rounded-lg border border-trait bg-laiton/10 px-4 py-3">{info}</p>}
          <button type="submit" className="btn btn-rouge" disabled={charge}>
            {charge ? "Un instant…" : creation ? "Créer mon compte" : "Me connecter"}
          </button>
          <button
            type="button"
            className="text-laiton underline underline-offset-4"
            onClick={() => {
              setMode(creation ? "connexion" : "creation");
              setErreur("");
            }}
          >
            {creation ? "J'ai déjà un compte" : "Créer un compte"}
          </button>
        </form>
      </div>
    </Shell>
  );
}

/* ───────── Tableau de bord client ───────── */

function Tableau({ client, onLogout }: { client: Client; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("resa");
  const [resas, setResas] = useState<Reservation[] | null>(null);
  const [livrables, setLivrables] = useState<Livrable[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const chargerChat = useCallback(async () => {
    const { data } = await sb
      .from("messages")
      .select("*")
      .eq("conversation_email", client.email)
      .order("created_at", { ascending: true });
    setMessages((data as Message[]) ?? []);
  }, [client.email]);

  useEffect(() => {
    sb.from("reservations").select("*").eq("client_email", client.email)
      .order("created_at", { ascending: false })
      .then(({ data }) => setResas((data as Reservation[]) ?? []));
    sb.from("livrables").select("*").eq("client_email", client.email)
      .order("created_at", { ascending: false })
      .then(({ data }) => setLivrables((data as Livrable[]) ?? []));
    chargerChat();
    const canal = sb
      .channel(`chat-${client.email}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_email=eq.${client.email}` },
        chargerChat,
      )
      .subscribe();
    return () => {
      sb.removeChannel(canal);
    };
  }, [client.email, chargerChat]);

  const nonLus = messages.filter((m) => m.from_role === "admin" && !m.lu).length;

  // Ouvrir le chat marque les messages du studio comme lus.
  useEffect(() => {
    if (tab !== "chat" || nonLus === 0) return;
    sb.from("messages").update({ lu: true })
      .eq("conversation_email", client.email).eq("from_role", "admin")
      .then(() => setMessages((ms) => ms.map((m) => ({ ...m, lu: true }))));
  }, [tab, nonLus, client.email]);

  return (
    <Shell
      droite={
        <button type="button" onClick={onLogout} className="btn btn-ligne btn-sm">
          Me déconnecter
        </button>
      }
    >
      <h1 className="titre">Bonjour, {client.nom}</h1>
      <p className="mb-8 mt-3 text-brume">{client.email}</p>

      <Onglets<Tab>
        actif={tab}
        onChange={setTab}
        onglets={[
          { id: "resa", label: "Mes réservations", badge: resas?.length },
          { id: "livrables", label: "Mes films", badge: livrables?.length },
          { id: "chat", label: "Discussion", badge: nonLus },
        ]}
      />

      {tab === "resa" &&
        (resas === null ? (
          <p className="text-brume" aria-busy="true">Chargement de vos réservations…</p>
        ) : resas.length === 0 ? (
          <Vide>
            <p>Vous n'avez pas encore de réservation avec cet e-mail.</p>
            <Link href="/#reservation" className="btn btn-rouge mt-5">Réserver un tournage</Link>
          </Vide>
        ) : (
          <ul className="grid gap-4">
            {resas.map((r) => (
              <li key={r.id} className="panneau p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="affiche text-[2rem]">{r.service}</h2>
                  <span className={`pastille pastille-${r.statut}`}>{STATUT_LABEL[r.statut] ?? r.statut}</span>
                </div>
                <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Info t="Date" v={r.date_evenement} />
                  <Info t="Heure" v={r.heure_evenement} />
                  <Info t="Lieu" v={r.lieu} />
                  <Info t="Budget" v={r.budget || "À discuter"} />
                </dl>
              </li>
            ))}
          </ul>
        ))}

      {tab === "livrables" &&
        (livrables === null ? (
          <p className="text-brume" aria-busy="true">Chargement de vos films…</p>
        ) : livrables.length === 0 ? (
          <Vide>Vos fichiers apparaîtront ici dès que le montage sera terminé.</Vide>
        ) : (
          <ul className="grid gap-3">
            {livrables.map((l) => (
              <li key={l.id} className="panneau flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="break-words text-[1.1rem] font-bold">{l.nom}</p>
                  <p className="text-brume">{[l.type, l.note].filter(Boolean).join(", ")}</p>
                </div>
                <a href={l.url} target="_blank" rel="noopener" className="btn btn-rouge">
                  <Download size={18} aria-hidden />
                  Télécharger
                </a>
              </li>
            ))}
          </ul>
        ))}

      {tab === "chat" && (
        <div className="max-w-3xl">
          <Chat
            messages={messages}
            moi="client"
            vide="Aucun message pour l'instant. Écrivez à l'équipe, elle vous répond ici."
            onSend={async (t) => {
              await sb.from("messages").insert({
                conversation_email: client.email,
                from_role: "client",
                contenu: t,
                lu: false,
              });
              await chargerChat();
            }}
          />
        </div>
      )}
    </Shell>
  );
}

function Info({ t, v }: { t: string; v: string | null }) {
  return (
    <div>
      <dt className="text-sm text-brume">{t}</dt>
      <dd className="font-bold">{v || "Non précisé"}</dd>
    </div>
  );
}
