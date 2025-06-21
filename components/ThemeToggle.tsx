"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes" // Correct import from next-themes

export function ThemeToggle() {
  // CORRECT: Destructure 'setTheme' from useTheme()
  const { theme, setTheme } = useTheme()

  // Function to handle the theme toggle
  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle} // Use the new handleToggle function
      className="fixed top-4 right-4 z-50 bg-black text-white border-gray-600 hover:bg-gray-800 dark:bg-white dark:text-black dark:border-gray-300 dark:hover:bg-gray-100"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      <span className="ml-2 text-sm font-medium">{theme === "light" ? "Dark" : "Light"}</span>
    </Button>
  )
}
