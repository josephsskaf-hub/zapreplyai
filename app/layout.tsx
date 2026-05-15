import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ZapReply AI | Funcionário IA para WhatsApp",
  description:
    "Automatize o atendimento do seu WhatsApp com Inteligência Artificial. Responde clientes, agenda consultas e qualifica leads 24h por dia.",
  openGraph: {
    title: "ZapReply AI | Funcionário IA para WhatsApp",
    description:
      "Automatize o atendimento do seu WhatsApp com Inteligência Artificial. Responde clientes, agenda consultas e qualifica leads 24h por dia.",
    url: "https://zapreplyai.vercel.app",
    siteName: "ZapReply AI",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZapReply AI | Funcionário IA para WhatsApp",
    description:
      "Automatize o atendimento do seu WhatsApp com Inteligência Artificial. Responde clientes, agenda consultas e qualifica leads 24h por dia.",
  },
  metadataBase: new URL("https://zapreplyai.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
