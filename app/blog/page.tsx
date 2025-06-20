"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogSidebar } from "@/components/BlogSidebar"
import { useSearch } from "@/hooks/useSearch"
import Link from "next/link"
import { Clock, Calendar, User, BookOpen, Home, Search, Quote } from "lucide-react"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

// Import the data directly since we're using client-side filtering
import blogCategoriesData from "@/data/blog-categories.json"
import blogPostsData from "@/data/blog-posts.json"

export default function BlogPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams?.get("search") || ""

  const [categories] = useState(blogCategoriesData as BlogCategory[])
  const [allPosts, setAllPosts] = useState<BlogPostWithCategory[]>([])
  const { searchQuery, setSearchQuery, activeSearchQuery, performSearch, filteredPosts, hasResults, isSearching } =
    useSearch(allPosts)

  // Process posts with category information
  useEffect(() => {
    const processedPosts = blogPostsData
      .filter((post: any) => post.published)
      .map((post: any) => {
        const category = categories.find((cat) => cat.id === post.category_id)
        if (!category) return null

        // Build category path
        const getCategoryPath = (categoryId: number): BlogCategory[] => {
          const path: BlogCategory[] = []
          let currentId: number | null = categoryId

          while (currentId !== null) {
            const cat = categories.find((c) => c.id === currentId)
            if (!cat) break
            path.unshift(cat)
            currentId = cat.parent_id
          }
          return path
        }

        return {
          ...post,
          category,
          category_path: getCategoryPath(post.category_id),
        }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => {
        const aDate = new Date(a.published_at || a.created_at)
        const bDate = new Date(b.published_at || b.created_at)
        return bDate.getTime() - aDate.getTime()
      }) as BlogPostWithCategory[]

    setAllPosts(processedPosts)
  }, [categories])

  // Set initial search query from URL params
  useEffect(() => {
    if (initialSearch && initialSearch !== activeSearchQuery) {
      performSearch(initialSearch)
    }
  }, [initialSearch, activeSearchQuery, performSearch])

  // Handle search
  const handleSearch = (query: string) => {
    performSearch(query)
    // Update URL without causing a page reload
    const url = new URL(window.location.href)
    if (query.trim()) {
      url.searchParams.set("search", query)
    } else {
      url.searchParams.delete("search")
    }
    window.history.replaceState({}, "", url.toString())
  }

  // Function to highlight search terms in bold
  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return text.replace(regex, '<strong class="font-bold text-emerald-600 dark:text-emerald-400">$1</strong>')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-black dark:via-gray-900 dark:to-black transition-all duration-500">
      {/* Header - Only show full header when not searching */}
      {!isSearching ? (
        <section className="sunset-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 mb-6 transition-colors duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <BookOpen className="w-10 h-10" />
                  The Optimization Blog
                </h1>
                <p className="text-xl text-gray-300 dark:text-gray-400 mb-6">
                  Practical guides for optimizing your health, environment, and technology
                </p>

                {/* Author Quote */}
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-lg p-6">
                  <p className="text-lg italic text-gray-200 dark:text-gray-300 mb-2">
                    "Never trust, verify. Full decentralization starts with taking control of your own optimization."
                  </p>
                  <p className="text-emerald-300 dark:text-gray-200 font-medium">— Guy Houri</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="sunset-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 mb-4 transition-colors duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-lg">
                <Search className="w-5 h-5" />
                <span>Search results for</span>
                <span className="font-semibold text-yellow-300">"{activeSearchQuery}"</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BlogSidebar
                  categories={categories}
                  posts={allPosts}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                  {isSearching ? `Search Results` : "All Blog Posts"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {filteredPosts.length} blog post{filteredPosts.length !== 1 ? "s" : ""} found
                  {isSearching && ` matching "${activeSearchQuery}"`}
                </p>
              </div>

              {!hasResults && isSearching ? (
                <Card className="shadow-lg border-0 sunset-card text-center p-12 bg-white dark:bg-black border-gray-200 dark:border-gray-800 transition-all duration-300">
                  <CardContent>
                    <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No blog posts found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      No posts match your search for "{activeSearchQuery}". Try different keywords or browse by
                      category.
                    </p>
                    <Button
                      onClick={() => handleSearch("")}
                      variant="outline"
                      className="dark:border-gray-600 dark:text-gray-300 transition-colors duration-300"
                    >
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              ) : filteredPosts.length === 0 ? (
                <Card className="shadow-lg border-0 sunset-card text-center p-12 bg-white dark:bg-black border-gray-200 dark:border-gray-800 transition-all duration-300">
                  <CardContent>
                    <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No blog posts yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Check back soon for new content!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="shadow-lg border-0 sunset-card hover:shadow-xl bg-white dark:bg-black border-gray-200 dark:border-gray-800 transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          {post.category_path.map((category, index) => (
                            <span key={category.id} className="flex items-center gap-2">
                              {index > 0 && <span className="text-gray-400 dark:text-gray-500">→</span>}
                              <Link href={`/blog/category/${category.slug}`}>
                                <Badge
                                  variant="outline"
                                  className="text-xs hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-700 dark:hover:text-emerald-400 cursor-pointer transition-colors duration-300"
                                >
                                  {category.name}
                                </Badge>
                              </Link>
                            </span>
                          ))}
                          {post.featured && <Badge className="bg-emerald-600 text-white text-xs ml-2">Featured</Badge>}
                        </div>

                        <CardTitle className="text-2xl">
                          <Link
                            href={`/blog/${post.slug}${isSearching ? `?search=${encodeURIComponent(activeSearchQuery)}` : ""}`}
                            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                          {post.reading_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.reading_time} min read</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        {/* Show search context if searching */}
                        {isSearching && (post as any).searchContext && (
                          <div className="mb-4 p-3 bg-emerald-50 dark:bg-gray-800 rounded-lg border-l-4 border-emerald-500">
                            <div className="flex items-start gap-2">
                              <Quote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium mb-1">
                                  Found in {(post as any).searchField}:
                                </p>
                                <p
                                  className="text-sm text-gray-700 dark:text-gray-300 italic"
                                  dangerouslySetInnerHTML={{
                                    __html: highlightSearchTerms((post as any).searchContext, activeSearchQuery),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300">
                          {post.excerpt}
                        </p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs dark:bg-gray-800 dark:text-gray-300 transition-colors duration-300"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
