"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";

export function Footer() {
  const { theme } = useTheme()
  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <footer className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-slate-900 dark:to-black text-center text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ThemeIcon className="w-4 h-4 text-orange-500 dark:text-slate-400 sun-pulse" />
          <span className="text-orange-400 dark:text-slate-300">The Maximizer</span>
        </div>
        <p>&copy; 2024 The Maximizer - Guy Houri. All rights reserved.</p>
      </div>
    </footer>
  )
}
