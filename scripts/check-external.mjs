#!/usr/bin/env node
/* Garde-fou : le site ne doit dépendre d'aucun hébergeur tiers pour s'afficher.
   Parcourt le code et échoue si une URL pointe vers un hôte absent de la liste autorisée. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const DOSSIERS = ["app", "components", "lib", "lab", "public"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".html", ".json", ".svg"]);

// Hôtes acceptés : services que le site appelle volontairement, jamais des fichiers à afficher.
const AUTORISES = [
  "dhunruqyilhazdaarkwn.supabase.co", // base de données et stockage du studio
  "wa.me", // lien WhatsApp
  "api.web3forms.com", // copie e-mail des demandes
  "www.w3.org", // espaces de noms SVG/XML, jamais téléchargés
  "drive.google.com", // texte d'exemple dans un champ de formulaire
];

const fichiers = [];
const parcourir = (d) => {
  let entrees;
  try { entrees = readdirSync(d); } catch { return; }
  for (const e of entrees) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) parcourir(p);
    else if (EXTENSIONS.has(extname(p))) fichiers.push(p);
  }
};
DOSSIERS.forEach(parcourir);

const erreurs = [];
for (const f of fichiers) {
  readFileSync(f, "utf8").split("\n").forEach((ligne, i) => {
    for (const m of ligne.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)) {
      const hote = m[1].toLowerCase();
      if (!AUTORISES.includes(hote)) erreurs.push(`${f}:${i + 1}  ${hote}`);
    }
  });
}

if (erreurs.length) {
  console.error(`Ressources externes non autorisées (${erreurs.length}) :\n` + erreurs.join("\n"));
  console.error("\nAuto-hébergez le fichier, installez la bibliothèque par npm, ou ajoutez l'hôte à AUTORISES en le justifiant.");
  process.exit(1);
}
console.log(`OK : ${fichiers.length} fichiers analysés, aucune dépendance externe non autorisée.`);
