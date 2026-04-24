import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToastProvider from "../providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Playvium",
  description: "Experience the thrill of Playvium.",
};

export default function LandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased">
        {children}

        <ToastProvider />
        <div id="portal-root" />
      </body>
    </html>
  );
}
