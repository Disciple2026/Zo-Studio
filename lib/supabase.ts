import { createClient } from "@supabase/supabase-js";

// Clé « anon » : publique par conception, la sécurité repose sur les règles RLS côté Supabase.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dhunruqyilhazdaarkwn.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodW5ydXF5aWxoYXpkYWFya3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTg0NzMsImV4cCI6MjA5MjY3NDQ3M30.4O34mhbbLe18qmy-PExgiMNMNKIejFaoXTipwVsXz5E";

export const sb = createClient(url, anonKey);

export type Media = {
  id: string;
  titre: string;
  categorie: string;
  type: "image" | "video";
  url: string;
  created_at: string;
};

export type Statut = "new" | "confirmed" | "done";

export type Reservation = {
  id: string;
  client_email: string;
  client_nom: string;
  telephone: string | null;
  service: string;
  date_evenement: string | null;
  heure_evenement: string | null;
  lieu: string | null;
  nb_jours: string | null;
  budget: string | null;
  attentes: string | null;
  statut: Statut;
  created_at: string;
};

export type Livrable = {
  id: string;
  client_email: string;
  nom: string;
  type: string | null;
  url: string;
  note: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  conversation_email: string;
  from_role: "admin" | "client";
  contenu: string;
  lu: boolean;
  created_at: string;
};

/* ── Accès administration ──
   Le mot de passe n'est plus écrit en clair : seule son empreinte SHA-256 est comparée.
   Cela reste un contrôle côté navigateur ; voir le README pour le sécuriser vraiment. */
export const ADMIN_EMAIL = "jauresulriche@gmail.com";
const ADMIN_HASH = "f401980a11ea3d5fc86ad8039f4ecaf5a01daaa2ece274c90ff0ef898172c4be";
const ADMIN_FLAG = "zoe-admin";

export async function checkAdminPassword(pwd: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pwd));
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === ADMIN_HASH;
}
export const isAdminUnlocked = () =>
  typeof window !== "undefined" && sessionStorage.getItem(ADMIN_FLAG) === "1";
export const setAdminUnlocked = (on: boolean) =>
  on ? sessionStorage.setItem(ADMIN_FLAG, "1") : sessionStorage.removeItem(ADMIN_FLAG);
