import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SegurosPro — Proteção Inteligente para si e para a sua Empresa",
  description: "A plataforma digital de seguros. Obtenha uma simulação gratuita, fale com o nosso assistente virtual e encontre o melhor plano para o seu perfil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
