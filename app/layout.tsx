import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import EnhancedGrid from "@/components/styled/EnhancedGrid";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CourseFlow",
  description: "Seamless learning, seamless billing - powered by Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-900 text-white`}>
        <ConvexClientProvider>
          <EnhancedGrid />
          <Navbar />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
