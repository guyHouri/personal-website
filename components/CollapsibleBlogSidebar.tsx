"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BlogSidebar } from "./BlogSidebar"
import { Menu, BookOpen } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

interface CollapsibleBlogSidebarProps {
  categories: BlogCategory[]
  posts: BlogPostWithCategory[]
  onSearch?: (query: string) => void
  searchQuery?: string
}

export function CollapsibleBlogSidebar({ categories, posts, onSearch, searchQuery }: CollapsibleBlogSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-white/80 backdrop-blur border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Browse Blog Posts
          <Menu className="w-4 h-4 ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Blog Navigation
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <BlogSidebar categories={categories} posts={posts} onSearch={onSearch} searchQuery={searchQuery} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
