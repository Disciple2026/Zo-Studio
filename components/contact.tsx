import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP } from "@/lib/content";
import { Logo } from "./logo";

export function Contact() {
  return (
    <section id="contact" className="bg-emeraude-fonce text-white">
      <div className="wrap bloc grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <h2 className="affiche text-[clamp(3.2rem,10vw,8rem)]">Parlons de votre projet</h2>
          <p className="mt-5 max-w-lg text-[1.2rem] text-white/85">
            Une date en tête, ou seulement une idée ? Écrivez-nous, nous répondons sous 24 h.
          </p>
        </div>
        <ul className="grid gap-3 text-[1.1rem] font-bold">
          <li>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-clair w-full justify-start">
              <MessageCircle size={20} aria-hidden />
              Écrire sur WhatsApp
            </a>
          </li>
          <li>
            <a href={PHONE_HREF} className="btn w-full justify-start border-white/40 hover:border-white">
              <Phone size={20} aria-hidden />
              Appeler le {PHONE}
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className="btn w-full justify-start border-white/40 hover:border-white">
              <Mail size={20} aria-hidden />
              <span className="truncate">{EMAIL}</span>
            </a>
          </li>
          <li className="flex items-center gap-2.5 px-[1.4rem] pt-2 font-normal text-white/85">
            <MapPin size={20} aria-hidden />
            Tanger, Maroc. Déplacements dans tout le pays.
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-trait pb-24 pt-10">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
        <Logo />
        <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-brume">
          <a href="#univers" className="hover:text-papier">Nos métiers</a>
          <a href="#realisations" className="hover:text-papier">Réalisations</a>
          <a href="#brief" className="hover:text-papier">Projet de site</a>
          <a href="#reservation" className="hover:text-papier">Réserver un tournage</a>
          <Link href="/espace/" className="hover:text-papier">Mon espace client</Link>
          <Link href="/admin/" className="hover:text-papier">Administration</Link>
        </nav>
      </div>
      <p className="wrap mt-8 text-[0.95rem] text-brume">
        © 2026 Zoé Studio. Tous droits réservés. Site développé par Jaurès Yomi.
      </p>
    </footer>
  );
}
