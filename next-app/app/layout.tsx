"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import UserInitializer from "./components/UserInitializer";
import { NotificationProvider } from "./contexts/NotificationContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme="winter">
      <head>
        <meta
          property="og:image"
          content="https://www.civicxsyllabus.org/favicon-for-public/web-app-manifest-512x512.png"
        />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserInitializer />
            <NotificationProvider>
              {/* Default Layout */}
              <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-grow text-base-content bg-base-300">
                  {children}
                </main>
                <Footer />
                <Analytics />
              </div>
            </NotificationProvider>
          </AuthProvider>
          <SpeedInsights />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
