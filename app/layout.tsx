import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { larsseit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro[0],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${larsseit.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
