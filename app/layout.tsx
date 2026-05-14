import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ZapReply AI — Atendimento WhatsApp com IA",
  description: "Configure em 5 minutos. Sem código. Sem complicação.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
