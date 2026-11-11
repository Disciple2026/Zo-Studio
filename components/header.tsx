"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { Logo } from "./logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-trait bg-encre/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Compte et réservation" className="flex items-center gap-2 sm:gap-3">
          <Link href="/espace/" className="btn btn-ligne btn-sm" aria-label="Mon espace client">
            <UserRound size={16} aria-hidden />
            <span className="max-sm:hidden">Mon espace</span>
          </Link>
          <a href="#reservation" className="btn btn-primaire btn-sm">
            Réserver
          </a>
        </nav>
      </div>
    </header>
  );
}
