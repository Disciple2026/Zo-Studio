import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./logo";

/* Cadre commun aux pages « Mon espace » et « Administration ». */
export function Shell({
  children,
  droite,
}: {
  children: React.ReactNode;
  droite?: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-trait">
        <div className="wrap flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
          <Logo />
          <div className="flex items-center gap-3">
            {droite}
            <Link href="/" className="btn btn-ligne btn-sm">
              <ArrowLeft size={16} aria-hidden />
              <span className="max-sm:sr-only">Retour au site</span>
            </Link>
          </div>
        </div>
      </header>
      <main id="contenu" className="wrap pb-20 pt-10">
        {children}
      </main>
    </>
  );
}

export function Onglets<T extends string>({
  onglets,
  actif,
  onChange,
}: {
  onglets: { id: T; label: string; badge?: number }[];
  actif: T;
  onChange: (id: T) => void;
}) {
  return (
    <div role="tablist" className="mb-8 flex overflow-x-auto border-b border-trait [scrollbar-width:none]">
      {onglets.map((o) => (
        <button
          key={o.id}
          role="tab"
          type="button"
          aria-selected={actif === o.id}
          onClick={() => onChange(o.id)}
          className="onglet"
        >
          {o.label}
          {!!o.badge && (
            <span className="ml-2 rounded-full bg-ruban px-2 py-0.5 text-xs text-white">{o.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Vide({ children }: { children: React.ReactNode }) {
  return <div className="panneau px-6 py-12 text-center text-[1.1rem] text-brume">{children}</div>;
}
