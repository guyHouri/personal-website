"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogSidebar } from "@/components/BlogSidebar"
import Link from "next/link"
import { ArrowLeft, Folder, Clock, Calendar, User, Home } from "lucide-react"
import { notFound } from "next/navigation"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

// Import the data
import blogCategoriesData from "@/data/blog-categories.json"
import blogPostsData from "@/data/blog-posts.json"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([])
  const [category, setCategory] = useState<BlogCategory | null>(null)
  const [categoryPath, setCategoryPath] = useState<BlogCategory[]>([])
  const [categories] = useState(blogCategoriesData as BlogCategory[])
  const [allPosts, setAllPosts] = useState<BlogPostWithCategory[]>([])

  useEffect(() => {
    // Find the category
    const foundCategory = categories.find((cat) => cat.slug === params.slug)
    if (!foundCategory) {
      notFound()
      return
    }
    setCategory(foundCategory)

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

    setCategoryPath(getCategoryPath(foundCategory.id))

    // Get all subcategory IDs
    const getAllSubcategoryIds = (parentId: number): number[] => {
      const subcategories = categories.filter((cat) => cat.parent_id === parentId)
      const ids = [parentId]

      for (const subcat of subcategories) {
        ids.push(...getAllSubcategoryIds(subcat.id))
      }

      return ids
    }

    const categoryIds = getAllSubcategoryIds(foundCategory.id)

    // Process all posts
    const processedPosts = blogPostsData
      .filter((p: any) => p.published)
      .map((p: any) => {
        const postCategory = categories.find((cat) => cat.id === p.category_id)
        if (!postCategory) return null

        return {
          ...p,
          category: postCategory,
          category_path: getCategoryPath(p.category_id),
        }
      })
      .filter(Boolean) as BlogPostWithCategory[]

    setAllPosts(processedPosts)

    // Filter posts for this category
    const categoryPosts = processedPosts
      .filter((post) => categoryIds.includes(post.category_id))
      .sort((a, b) => {
        const aDate = new Date(a.published_at || a.created_at)
        const bDate = new Date(b.published_at || b.created_at)
        return bDate.getTime() - aDate.getTime()
      })

    setPosts(categoryPosts)
  }, [params.slug, categories])

  if (!category) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <section className="sunset-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/blog">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-4">
              {categoryPath.map((cat, index) => (
                <span key={cat.id} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">→</span>}
                  <Link href={`/blog/category/${cat.slug}`}>
                    <Badge variant="outline" className="text-white border-white/20 hover:bg-white/10 cursor-pointer">
                      {cat.name}
                    </Badge>
                  </Link>
                </span>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 flex items-center gap-3">
              <Folder className="w-10 h-10" />
              {category.name}
            </h1>

            {category.description && <p className="text-xl text-gray-300">{category.description}</p>}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BlogSidebar categories={categories} posts={allPosts} />
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Blog Posts in {category.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {posts.length} article{posts.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {posts.length === 0 ? (
                <Card className="shadow-lg border-0 sunset-card text-center p-12">
                  <CardContent>
                    <Folder className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No posts yet</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      There are no published blog posts in this category yet. Check back soon!
                    </p>
                    <Link href="/blog">
                      <Button>Browse All Posts</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="shadow-lg border-0 sunset-card hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          {post.category_path.map((cat, index) => (
                            <span key={cat.id} className="flex items-center gap-2">
                              {index > 0 && <span className="text-gray-400">→</span>}
                              <Link href={`/blog/category/${cat.slug}`}>
                                <Badge
                                  variant="outline"
                                  className="text-xs hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                                >
                                  {cat.name}
                                </Badge>
                              </Link>
                            </span>
                          ))}
                          {post.featured && <Badge className="bg-emerald-600 text-white text-xs ml-2">Featured</Badge>}
                        </div>

                        <CardTitle className="text-2xl">
                          <Link href={`/blog/${post.slug}`} className="hover:text-emerald-600 transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
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
