/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Questa riga è fondamentale per GitHub Pages
  images: {
    unoptimized: true, // Necessario se usi immagini Next.js su Pages
  },
};

export default nextConfig;
