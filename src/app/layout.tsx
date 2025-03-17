import type {Metadata, Viewport} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B & L - Portes et fenêtres",
  description: "Bastien Letouq - Portes et fenêtres",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // Also supported but less commonly used
    // interactiveWidget: 'resizes-visual',
}

import localFont from 'next/font/local';
import {AntdRegistry} from "@ant-design/nextjs-registry";

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
            <AntdRegistry>{children}</AntdRegistry>
          </body>
      </html>
  );
}
