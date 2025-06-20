"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 sunset-card border border-orange-200 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 sun-glow"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
      ) : (
        <Sun className="w-5 h-5 text-orange-400 sun-pulse" />
      )}
      <span className="ml-2 text-sm font-medium text-orange-700 dark:text-orange-300">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </Button>
  )
}
