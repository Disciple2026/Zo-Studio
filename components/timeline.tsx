"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { List, X } from "lucide-react";

/* La navigation du site est une timeline de montage : chaque section est un clip,
   la tête de lecture suit le défilement et le timecode avance avec elle. */

const CLIPS = [
  { id: "accueil", label: "Simulateur" },
  { id: "demo", label: "Démo" },
  { id: "services", label: "Services" },
  { id: "realisations", label: "Réalisations" },
  { id: "avis", label: "Avis" },
  { id: "reservation", label: "Réservation" },
  { id: "questions", label: "Questions" },
  { id: "contact", label: "Contact" },
];

const FPS = 25;
const DUREE = 150; // secondes « de film » pour toute la page

const pad = (n: number) => String(n).padStart(2, "0");
function timecode(ratio: number) {
  const f = Math.round(ratio * DUREE * FPS);
  const s = Math.floor(f / FPS);
  return `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f % FPS)}`;
}

export function Timeline() {
  const [poids, setPoids] = useState<number[]>(CLIPS.map(() => 1));
  const [actif, setActif] = useState(0);
  const [menu, setMenu] = useState(false);
  const bornes = useRef<number[]>([]);
  const tete = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);

  const mesurer = useCallback(() => {
    const total = document.documentElement.scrollHeight;
    const tops = CLIPS.map((c) => {
      const el = document.getElementById(c.id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
    tops[0] = 0;
    bornes.current = [...tops, total];
    setPoids(tops.map((t, i) => Math.max(1, (i < tops.length - 1 ? tops[i + 1] : total) - t)));
  }, []);

  const suivre = useCallback(() => {
    const total = document.documentElement.scrollHeight;
    const max = total - window.innerHeight;
    const progres = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    // Position « lue » : va de 0 (haut) à la hauteur totale (bas), comme une tête de lecture.
    const pos = window.scrollY + window.innerHeight * progres;
    const ratio = total > 0 ? pos / total : 0;
    if (tete.current) tete.current.style.left = `${ratio * 100}%`;
    if (tc.current) tc.current.textContent = timecode(ratio);
    const b = bornes.current;
    let i = 0;
    while (i < CLIPS.length - 1 && pos >= b[i + 1]) i++;
    setActif(i);
  }, []);

  useEffect(() => {
    const tout = () => {
      mesurer();
      suivre();
    };
    tout();
    const ro = new ResizeObserver(tout);
    ro.observe(document.body);
    window.addEventListener("scroll", suivre, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", suivre);
    };
  }, [mesurer, suivre]);

  return (
    <nav
      aria-label="Sections de la page"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-trait bg-encre/92 backdrop-blur-md"
    >
      {menu && (
        <ul className="wrap grid gap-1 border-b border-trait py-3 md:hidden">
          {CLIPS.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={() => setMenu(false)}
                aria-current={i === actif ? "true" : undefined}
                className={`flex min-h-11 items-center justify-between rounded-lg px-3 font-bold ${
                  i === actif ? "bg-foret-2 text-papier" : "text-brume"
                }`}
              >
                {c.label}
                {i === actif && <span className="size-2 rounded-full bg-emeraude" aria-hidden />}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="wrap flex h-14 items-center gap-3 md:gap-4">
        <span
          ref={tc}
          aria-hidden
          className="w-[5.6rem] shrink-0 text-[0.86rem] md:w-[6.2rem] md:text-[0.95rem] font-semibold tabular-nums tracking-wide text-jade"
        >
          00:00:00:00
        </span>

        <div className="relative flex h-8 min-w-0 flex-1 gap-[3px]">
          {CLIPS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              style={{ flexGrow: poids[i], flexBasis: 0 }}
              aria-current={i === actif ? "true" : undefined}
              className={`group flex min-w-0 items-center overflow-hidden rounded-[5px] border text-[0.82rem] md:px-2 font-bold transition-colors max-md:pointer-events-none ${
                i === actif
                  ? "border-jade/70 bg-foret-2 text-papier"
                  : "border-papier/10 bg-foret text-brume hover:border-jade/50 hover:text-papier"
              }`}
            >
              <span className="truncate max-md:sr-only">{c.label}</span>
            </a>
          ))}
          <div
            ref={tete}
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -top-2 w-0.5 -translate-x-1/2 bg-emeraude"
            style={{ left: 0 }}
          >
            <span className="absolute -top-0.5 left-1/2 size-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-emeraude" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-expanded={menu}
          className="btn btn-ligne btn-sm shrink-0 md:hidden"
        >
          {menu ? <X size={16} aria-hidden /> : <List size={16} aria-hidden />}
          {CLIPS[actif].label}
        </button>
      </div>
    </nav>
  );
}
