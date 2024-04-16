import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProtectedLayout from "./protected-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedLayout>{children}</ProtectedLayout>
      </body>
    </html>
  );
}
