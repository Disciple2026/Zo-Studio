"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import type { Message } from "@/lib/supabase";

/* Fil de discussion partagé par l'espace client et l'administration. */
export function Chat({
  messages,
  moi,
  onSend,
  vide,
}: {
  messages: Message[];
  moi: "admin" | "client";
  onSend: (texte: string) => Promise<void>;
  vide: string;
}) {
  const [texte, setTexte] = useState("");
  const fin = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fin.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  return (
    <div className="panneau flex h-[min(32rem,65dvh)] flex-col overflow-hidden">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 sm:p-5" aria-live="polite">
        {messages.length === 0 && <p className="m-auto max-w-xs text-center text-brume">{vide}</p>}
        {messages.map((m) => {
          const mien = m.from_role === moi;
          return (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                mien ? "self-end rounded-br-sm bg-emeraude text-white" : "self-start rounded-bl-sm bg-foret-2"
              }`}
            >
              {!mien && (
                <p className="text-sm font-bold text-jade">
                  {m.from_role === "admin" ? "Zoé Studio" : "Client"}
                </p>
              )}
              <p className="whitespace-pre-wrap break-words">{m.contenu}</p>
              <p className={`mt-0.5 text-right text-xs ${mien ? "text-white/70" : "text-brume"}`}>
                {new Date(m.created_at).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          );
        })}
        <div ref={fin} />
      </div>
      <form
        className="flex gap-2 border-t border-trait p-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const t = texte.trim();
          if (!t) return;
          setTexte("");
          await onSend(t);
        }}
      >
        <label htmlFor="chat-texte" className="sr-only">Votre message</label>
        <input
          id="chat-texte"
          className="champ"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Écrire un message"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primaire shrink-0" disabled={!texte.trim()}>
          <Send size={18} aria-hidden />
          <span className="max-sm:sr-only">Envoyer</span>
        </button>
      </form>
    </div>
  );
}
