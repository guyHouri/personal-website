"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogSearch } from "./BlogSearch"
import { Folder, FolderOpen, ChevronRight, ChevronDown, FileText, Home, Search } from "lucide-react"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

interface BlogSidebarProps {
  categories: BlogCategory[]
  posts: BlogPostWithCategory[]
  onSearch?: (query: string) => void
  searchQuery?: string
}

interface CategoryWithChildren extends BlogCategory {
  children: CategoryWithChildren[]
  postCount: number
}

export function BlogSidebar({ categories, posts, onSearch, searchQuery }: BlogSidebarProps) {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([1, 2, 3])) // Expand top-level by default

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
                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </Button>
            )}

            <Link
              href={`/blog/category/${category.slug}`}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-1 ${
                isActive ? "bg-emerald-50 text-emerald-700 dark:bg-gray-800 dark:text-emerald-400" : ""
              }`}
            >
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Folder className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )
              ) : (
                <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
              <span className="font-medium text-sm">{category.name}</span>
              {category.postCount > 0 && (
                <Badge variant="secondary" className="ml-auto text-xs dark:bg-gray-700 dark:text-gray-300">
                  {category.postCount}
                </Badge>
              )}
            </Link>
          </div>

          {/* Show posts directly in this category when expanded */}
          {isExpanded && categoryPosts.length > 0 && (
            <div className="ml-8 mt-1 space-y-1">
              {categoryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm ${
                    pathname === `/blog/${post.slug}`
                      ? "bg-emerald-50 text-emerald-700 dark:bg-gray-800 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span className="truncate">{post.title}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Render children */}
          {isExpanded && hasChildren && <div className="mt-1">{renderCategoryTree(category.children, level + 1)}</div>}
        </div>
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
            <Search className="w-5 h-5" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BlogSearch onSearch={onSearch || (() => {})} placeholder="Search blog posts..." value={searchQuery || ""} />
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Press Enter or click search button to search
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
            <Folder className="w-5 h-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto p-4">
            <div className="space-y-1">
              {/* All Posts Link */}
              <Link
                href="/blog"
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  pathname === "/blog" ? "bg-emerald-50 text-emerald-700 dark:bg-gray-800 dark:text-emerald-400" : ""
                }`}
              >
                <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-sm">All Blog Posts</span>
                <Badge variant="secondary" className="ml-auto text-xs dark:bg-gray-700 dark:text-gray-300">
                  {posts.length}
                </Badge>
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {/* Category Tree */}
              {renderCategoryTree(categoryTree)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="shadow-lg border-0 sunset-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Blog Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Blog Posts:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{posts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Categories:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{categories.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Featured:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {posts.filter((p) => p.featured).length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
