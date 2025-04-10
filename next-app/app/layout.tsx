"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthProvider from "./auth/Provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NotificationProvider } from "./contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Civic X Syllabus",
//   description: "Your go-to platform for building foundational civic innovation knowledge. ",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              {/* Default Layout */}
              <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="p-0 flex-1 text-base-content bg-base-300">
                  {children}
                </main>
                <Analytics />
                <Footer />
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
