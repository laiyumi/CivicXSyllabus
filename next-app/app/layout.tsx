import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthProvider from "./auth/Provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic X Syllabus",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthProvider>
          {/* Default Layout */}
          <div className="default-layout">
            <NavBar />
            <main className="p-0">{children}</main>
            <Analytics />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
