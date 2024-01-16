import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

/**
 * Configuration for the Poppins font
 */
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pick User | Zepto",
  description: "Bootstrapped with nextjs & react",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("h-dvh bg-gradient-to-br from-neutral-900 to-neutral-950", poppins.className)}>
        {children}
      </body>
    </html>
  );
}
