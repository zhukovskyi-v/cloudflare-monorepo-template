import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";
import {Providers} from "@/app/providers";

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
    title: "Cloudflare Stack Template — Next.js, TypeScript API & Terraform",
    description:
        "Production-ready monorepo template for building full-stack apps on Cloudflare. Next.js frontend, TypeScript API, Terraform infrastructure — all wired up and ready to deploy.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("font-sans antialiased", inter.variable)}>
        <body className="bg-[#0a0a0a]">
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
