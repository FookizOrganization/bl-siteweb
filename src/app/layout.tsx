import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B & L - Portes et fenêtres",
  description: "Bastien Letouq - Portes et fenêtres",
};

import localFont from 'next/font/local';

const geist = localFont({
    src: [
        {
            path: '/fonts/GeistVF.woff',
            weight: '100 900', // Variable font
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-geist-regular',
});

const geistMono = localFont({
    src: [
        {
            path: '/fonts/GeistMonoVF.woff',
            weight: '100 900', // Variable font
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-geist-mono',
});

const magraRegular = localFont({
    src: [
        {
            path: '/fonts/Magra-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-magra-regular',
});

const magraBold = localFont({
    src: [
        {
            path: '/fonts/Magra-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-magra-bold',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
          className={`${geist.variable} ${geistMono.variable} ${magraRegular.variable} ${magraBold.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
