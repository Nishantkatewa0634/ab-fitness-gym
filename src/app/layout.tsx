import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Fit-Track | All-India Premium Gym & Fitness Experience",
  description: "Join Fit-Track, India's premier high-tech gym network across 25+ cities. Access world-class workouts, certified trainers, digital membership cards, and real-time progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 400px)" }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
