import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pick User | Zepto",
  description: "Bootstrapped with nextjs & react",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("h-dvh bg-gradient-to-br from-neutral-900 to-neutral-950", inter.className)}>
        {children}
      </body>
    </html>
  );
}
