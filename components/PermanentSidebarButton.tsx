"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { NavigationSidebar } from "./NavigationSidebar"
import { useTheme } from "./ThemeProvider"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

interface PermanentSidebarButtonProps {
  categories: BlogCategory[]
  posts: BlogPostWithCategory[]
}

export function PermanentSidebarButton({ categories, posts }: PermanentSidebarButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 sunset-primary hover:sunset-secondary text-white shadow-lg sun-glow rounded-lg px-4 py-2 h-auto flex items-center gap-2"
        size="sm"
      >
        {theme === "light" ? <Sun className="w-5 h-5 sun-rotate" /> : <Moon className="w-5 h-5 sun-pulse" />}
        <Menu className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Navigation</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          className="w-80 sm:w-96 overflow-y-auto sunset-card border-orange-200 dark:border-slate-600"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-orange-800 dark:text-slate-200">
              {theme === "light" ? <Sun className="w-5 h-5 sun-pulse" /> : <Moon className="w-5 h-5 sun-pulse" />}
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <NavigationSidebar categories={categories} posts={posts} onNavigate={() => setIsOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
