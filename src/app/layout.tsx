import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthModal from "@/components/auth/AuthModal";
import ChatBotModal from "@/components/chat/ChatBotModal";
import ToastProvider from "./providers/ToastProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProfileMenuProvider } from "@/context/ProfileMenuContext";
import FacebookSDKLoader from "@/components/auth/forms/social/FacebookSDKLoader";
import TelegramSDKLoader from "@/components/auth/forms/social/TelegramSDKLoader";
import { SearchModalProvider } from "@/context/SearchModalContext";
import GlobalSearchModal from "@/components/search/GlobalSearchModal";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Playvium",
  description: "Experience the thrill of Playvium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
    >
      <body className="antialiased">
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <FacebookSDKLoader />
          <TelegramSDKLoader />
          <ProfileMenuProvider>
            <SearchModalProvider>{children}<GlobalSearchModal /></SearchModalProvider></ProfileMenuProvider>
          <AuthModal />
          <ChatBotModal />
          <ToastProvider />
        </GoogleOAuthProvider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
