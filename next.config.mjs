/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : déployable sur GitHub Pages, Vercel, Netlify…
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub Pages sert le site sous /<nom-du-dépôt> ; le workflow fournit ce préfixe.
  basePath: process.env.PAGES_BASE_PATH || "",
};

export default nextConfig;
