import "./globals.css";
import { Inter } from "next/font/google";

import UidProvider from "@/providers/UidProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import ToastProvider from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Equipements",
  description: "Application de gestion des equipements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ReduxProvider>
          <ToastProvider>
            <UidProvider>{children}</UidProvider>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
