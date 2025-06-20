"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BlogSidebar } from "@/components/BlogSidebar"
import { CommentSection } from "@/components/CommentSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, User, Share2, Home, Search } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { BlogCategory, BlogPostWithCategory, BlogCommentWithReplies } from "@/lib/db"

// Import the data
import blogCategoriesData from "@/data/blog-categories.json"
import blogPostsData from "@/data/blog-posts.json"
import blogCommentsData from "@/data/blog-comments.json"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get("search") || ""

  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [comments, setComments] = useState<BlogCommentWithReplies[]>([])
  const [categories] = useState(blogCategoriesData as BlogCategory[])
  const [allPosts, setAllPosts] = useState<BlogPostWithCategory[]>([])

  useEffect(() => {
    // Process all posts
    const processedPosts = blogPostsData
      .filter((p: any) => p.published)
      .map((p: any) => {
        const category = categories.find((cat) => cat.id === p.category_id)
        if (!category) return null

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
          ...p,
          category,
          category_path: getCategoryPath(p.category_id),
        }
      })
      .filter(Boolean) as BlogPostWithCategory[]

    setAllPosts(processedPosts)

    // Find the specific post
    const foundPost = processedPosts.find((p) => p.slug === params.slug)
    if (!foundPost) {
      notFound()
      return
    }
    setPost(foundPost)

    // Process comments
    const postComments = blogCommentsData.filter((comment: any) => comment.post_id === foundPost.id && comment.approved)

    // Build nested comment structure
    const commentMap = new Map<number, BlogCommentWithReplies>()
    const rootComments: BlogCommentWithReplies[] = []

    postComments
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .forEach((comment: any) => {
        const commentWithReplies: BlogCommentWithReplies = {
          ...comment,
          replies: [],
        }
        commentMap.set(comment.id, commentWithReplies)

        if (comment.parent_id === null) {
          rootComments.push(commentWithReplies)
        } else {
          const parent = commentMap.get(comment.parent_id)
          if (parent) {
            parent.replies.push(commentWithReplies)
          }
        }
      })

    setComments(rootComments)
  }, [params.slug, categories])

  // Function to highlight search terms in bold
  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return text.replace(
      regex,
      '<strong class="font-bold bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 px-1 rounded">$1</strong>',
    )
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-black dark:via-gray-900 dark:to-black transition-all duration-500">
      {/* Header */}
      <section className="sunset-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/blog">
                <Button variant="ghost" className="text-white hover:bg-white/10 transition-colors duration-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 transition-colors duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Search Context Display */}
            {searchQuery && (
              <div className="mb-4 p-3 bg-white/10 backdrop-blur rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <Search className="w-4 h-4" />
                  <span>Viewing search result for</span>
                  <span className="font-semibold text-yellow-300">{searchQuery}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              {post.category_path.map((category, index) => (
                <span key={category.id} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">→</span>}
                  <Link href={`/blog/category/${category.slug}`}>
                    <Badge
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10 cursor-pointer transition-colors duration-300"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                </span>
              ))}
              {post.featured && <Badge className="bg-emerald-600 text-white ml-2">Featured</Badge>}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300">
              {searchQuery ? (
                <span dangerouslySetInnerHTML={{ __html: highlightSearchTerms(post.title, searchQuery) }} />
              ) : (
                post.title
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors duration-300">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
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
              <article className="blog-content sunset-card rounded-lg shadow-lg p-8 mb-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 transition-all duration-300">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {searchQuery ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerms(post.content, searchQuery)
                          .split("\n")
                          .map((line) => line.trim())
                          .join("\n"),
                      }}
                    />
                  ) : (
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="dark:bg-gray-800 dark:text-gray-300 transition-colors duration-300"
                        >
                          #
                          {searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <span dangerouslySetInnerHTML={{ __html: highlightSearchTerms(tag, searchQuery) }} />
                          ) : (
                            tag
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Comments Section */}
              <CommentSection postId={post.id} initialComments={comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
