import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "decentralized maxi",
  description: "Personal portfolio and blog focused on decentralization, blockchain, and technology",
  keywords: ["decentralization", "blockchain", "cryptocurrency", "web3", "portfolio", "blog"],
  authors: [{ name: "Guy Houri" }],
  openGraph: {
    title: "decentralized maxi",
    description: "Personal portfolio and blog focused on decentralization, blockchain, and technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "decentralized maxi",
    description: "Personal portfolio and blog focused on decentralization, blockchain, and technology",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
