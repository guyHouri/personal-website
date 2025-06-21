import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decentralized Maxi",
  description:
    "Personal portfolio and blog focused on decentralization and life maximization",
  icons: {
    icon: "/logo.jpg",
  },
  keywords: [
    "decentralization",
    "circadian biology",
    "EMF",
    "portfolio",
    "blog",
  ],
  authors: [{ name: "Guy Houri" }],
  openGraph: {
    title: "Decentralized Maxi",
    description:
      "Personal portfolio and blog focused on decentralization and life maximization",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decentralized Maxi",
    description:
      "Personal portfolio and blog focused on decentralization and life maximization",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return (
  //   <html lang="en">
  //     <body className={inter.className}>
  //       <ThemeProvider>{children}</ThemeProvider>
  //     </body>
  //   </html>
  // );
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem           
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
