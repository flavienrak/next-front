import "./globals.css";
import { Inter } from "next/font/google";

import UidProvider from "@/providers/UidProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Equipements",
  description: "Application de gestion des equipements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <UidProvider>{children}</UidProvider>
      </body>
    </html>
  );
}
