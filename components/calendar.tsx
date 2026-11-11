"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const JOURS = ["lu", "ma", "me", "je", "ve", "sa", "di"];

const minuit = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function Calendar({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const auj = minuit(new Date());
  const [vue, setVue] = useState(() => new Date(auj.getFullYear(), auj.getMonth(), 1));
  const y = vue.getFullYear();
  const m = vue.getMonth();
  const decalage = (new Date(y, m, 1).getDay() + 6) % 7; // semaine qui commence le lundi
  const nb = new Date(y, m + 1, 0).getDate();
  const moisPasse = y === auj.getFullYear() && m === auj.getMonth();

  return (
    <div className="rounded-[0.6rem] border border-papier/15 bg-nuit p-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={moisPasse}
          onClick={() => setVue(new Date(y, m - 1, 1))}
          className="grid size-10 place-items-center rounded-full text-laiton hover:bg-ardoise-2 disabled:opacity-30"
        >
          <ChevronLeft size={20} aria-hidden />
          <span className="sr-only">Mois précédent</span>
        </button>
        <p className="font-bold" aria-live="polite">
          {MOIS[m]} {y}
        </p>
        <button
          type="button"
          onClick={() => setVue(new Date(y, m + 1, 1))}
          className="grid size-10 place-items-center rounded-full text-laiton hover:bg-ardoise-2"
        >
          <ChevronRight size={20} aria-hidden />
          <span className="sr-only">Mois suivant</span>
        </button>
      </div>

      <div className="mt-1 grid grid-cols-7 text-center text-sm text-brume" aria-hidden>
        {JOURS.map((j) => (
          <span key={j} className="py-1.5">
            {j}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: decalage }, (_, i) => (
          <span key={`v${i}`} />
        ))}
        {Array.from({ length: nb }, (_, i) => {
          const d = new Date(y, m, i + 1);
          const passe = d < auj;
          const choisi = value?.getTime() === d.getTime();
          const estAuj = d.getTime() === auj.getTime();
          return (
            <button
              key={i}
              type="button"
              disabled={passe}
              aria-pressed={choisi}
              aria-label={`${i + 1} ${MOIS[m]} ${y}`}
              onClick={() => onChange(d)}
              className={`mx-auto grid aspect-square w-full max-w-11 place-items-center rounded-full text-[0.95rem] tabular-nums transition-colors ${
                choisi
                  ? "bg-ruban font-bold text-white"
                  : passe
                    ? "text-brume/35"
                    : `hover:bg-ardoise-2 ${estAuj ? "font-bold text-laiton ring-1 ring-inset ring-trait" : ""}`
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
