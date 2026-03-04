import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
    title: "Helios AI | Industrial Solar Intelligence",
    description: "Sistema di difesa attivo per asset solari industriali. Automazione RMA e monitoraggio termografico avanzato fondato da Francesco De Rienzo.",
    keywords: ["Solar AI", "RMA Automation", "Thermographic Monitoring", "Industrial Solar", "Helios AI"],
    authors: [{ name: "Francesco De Rienzo" }],
    openGraph: {
        title: "Helios AI | Industrial Solar Intelligence",
        description: "Sistemi di difesa attivi per asset solari industriali.",
        url: "https://heliosai.it",
        siteName: "Helios AI",
        images: [
            {
                url: "/logo.svg",
                width: 800,
                height: 600,
            },
        ],
        locale: "it_IT",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" className="dark scroll-smooth">
            <head>
                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body className={`${inter.variable} ${jetbrainsMono.variable} bg-zinc-950 text-white antialiased font-sans`}>
                {children}
            </body>
        </html>
    );
}
