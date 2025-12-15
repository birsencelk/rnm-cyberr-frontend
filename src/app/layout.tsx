"use client";
import "./globals.css";

import { HeroUIProvider } from "@heroui/react";
import { ApolloClientProvider } from "./providers/ApolloClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Rick and Morty Cyberr Frontend</title>
      <link
        rel="icon"
        href="https://app.cyberr.ai/my-favicon/web-app-manifest-192x192.png"
        sizes="48x48"
        type="image/x-icon"
      ></link>
      <body>
        <HeroUIProvider>
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
