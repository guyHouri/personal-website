"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogSearch } from "./BlogSearch"
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  FileText,
  Home,
  Search,
  User,
  BookOpen,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes";
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

interface NavigationSidebarProps {
  categories: BlogCategory[]
  posts: BlogPostWithCategory[]
  onNavigate?: () => void
}

interface CategoryWithChildren extends BlogCategory {
  children: CategoryWithChildren[]
  postCount: number
}

export function NavigationSidebar({ categories, posts, onNavigate }: NavigationSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([1, 2, 3]))

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query)}`)
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    } else {
      router.push("/blog")
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    }
    onNavigate?.()
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    onNavigate?.()
  }

  // Build category tree with post counts
  const buildCategoryTree = (parentId: number | null = null): CategoryWithChildren[] => {
    return categories
      .filter((cat) => cat.parent_id === parentId)
      .map((cat) => {
        const children = buildCategoryTree(cat.id)
        const directPosts = posts.filter((post) => post.category_id === cat.id).length
        const childrenPosts = children.reduce((sum, child) => sum + child.postCount, 0)

        return {
          ...cat,
          children,
          postCount: directPosts + childrenPosts,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  const categoryTree = buildCategoryTree()

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const renderCategoryTree = (categories: CategoryWithChildren[], level = 0) => {
    return categories.map((category) => {
      const isExpanded = expandedCategories.has(category.id)
      const hasChildren = category.children.length > 0
      const isActive = pathname === `/blog/category/${category.slug}`
      const categoryPosts = posts.filter((post) => post.category_id === category.id)

      return (
        <div key={category.id} className={`${level > 0 ? "ml-4" : ""}`}>
          <div className="flex items-center gap-1 group">
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCategory(category.id)}
                className="h-6 w-6 p-0 hover:bg-orange-100 dark:hover:bg-gray-800"
              >
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </Button>
            )}

            <button
              onClick={() => handleNavigation(`/blog/category/${category.slug}`)}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors flex-1 text-left ${
                isActive ? "bg-orange-100 dark:bg-gray-800 text-orange-700 dark:text-gray-200" : ""
              }`}
            >
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-orange-600 dark:text-gray-400" />
                ) : (
                  <Folder className="w-4 h-4 text-orange-600 dark:text-gray-400" />
                )
              ) : (
                <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
              <span className="font-medium text-sm">{category.name}</span>
              {category.postCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs bg-orange-100 dark:bg-gray-700 dark:text-gray-300"
                >
                  {category.postCount}
                </Badge>
              )}
            </button>
          </div>

          {/* Show posts directly in this category when expanded */}
          {isExpanded && categoryPosts.length > 0 && (
            <div className="ml-8 mt-1 space-y-1">
              {categoryPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleNavigation(`/blog/${post.slug}`)}
                  className={`flex items-center gap-2 p-2 rounded-md hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors text-sm w-full text-left ${
                    pathname === `/blog/${post.slug}`
                      ? "bg-orange-100 dark:bg-gray-800 text-orange-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span className="truncate">{post.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Render children */}
          {isExpanded && hasChildren && <div className="mt-1">{renderCategoryTree(category.children, level + 1)}</div>}
        </div>
      )
    })
  }

  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <div className="space-y-6">
      {/* Main Navigation */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-800 dark:text-gray-200">
            <Home className="w-5 h-5" />
            Main Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation("/")}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors w-full text-left ${
                pathname === "/" ? "bg-orange-100 dark:bg-gray-800 text-orange-700 dark:text-gray-200" : ""
              }`}
            >
              <Home className="w-4 h-4 text-orange-600 dark:text-gray-400" />
              <span className="font-medium text-sm">Home</span>
            </button>

            <button
              onClick={() => handleNavigation("/about")}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors w-full text-left ${
                pathname === "/about" ? "bg-orange-100 dark:bg-gray-800 text-orange-700 dark:text-gray-200" : ""
              }`}
            >
              <User className="w-4 h-4 text-orange-600 dark:text-gray-400" />
              <span className="font-medium text-sm">About Me</span>
            </button>

            <button
              onClick={() => handleNavigation("/blog")}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors w-full text-left ${
                pathname === "/blog" ? "bg-orange-100 dark:bg-gray-800 text-orange-700 dark:text-gray-200" : ""
              }`}
            >
              <BookOpen className="w-4 h-4 text-orange-600 dark:text-gray-400" />
              <span className="font-medium text-sm">Blog</span>
              <Badge variant="secondary" className="ml-auto text-xs bg-orange-100 dark:bg-gray-700 dark:text-gray-300">
                {posts.length}
              </Badge>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-800 dark:text-gray-200">
            <Search className="w-5 h-5" />
            Search Blog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BlogSearch onSearch={handleSearch} placeholder="Search blog posts..." />
        </CardContent>
      </Card>

      {/* Blog Categories */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-800 dark:text-gray-200">
            <Folder className="w-5 h-5" />
            Blog Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto p-4">
            <div className="space-y-1">
              {/* Category Tree */}
              {renderCategoryTree(categoryTree)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
