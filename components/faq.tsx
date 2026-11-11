import { Plus } from "lucide-react";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="questions" className="bloc border-t border-trait">
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="titre">Questions fréquentes</h2>
        <div className="border-t border-trait">
          {FAQ.map((f) => (
            <details key={f.q} name="faq" className="group border-b border-trait">
              <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-4 text-[1.2rem] font-bold transition-colors hover:text-laiton [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={22}
                  aria-hidden
                  className="shrink-0 text-laiton transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-[1.1rem] text-brume">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
