import Image from "next/image";
import Link from "next/link";
import mark from "@/public/mark.png";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="Zoé Studio, accueil">
      <Image
        src={mark}
        alt=""
        width={40}
        height={40}
        priority
        className="size-10 rounded-lg ring-1 ring-trait"
      />
      <span className="font-serif text-[1.35rem] leading-none tracking-wide text-laiton">
        Zoé Studio
      </span>
    </Link>
  );
}
