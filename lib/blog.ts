import type { BlogCategory, BlogPostWithCategory, BlogComment, BlogCommentWithReplies } from "./db"
import blogCategoriesData from "@/data/blog-categories.json"
import blogPostsData from "@/data/blog-posts.json"
import blogCommentsData from "@/data/blog-comments.json"

// Type the imported JSON data
const categories = blogCategoriesData as BlogCategory[]
const posts = blogPostsData as any[]
const comments = blogCommentsData as BlogComment[]

// Get all categories with their hierarchy
export async function getCategories(): Promise<BlogCategory[]> {
  return categories.sort((a, b) => {
    // Sort by parent_id (nulls first), then by name
    if (a.parent_id === null && b.parent_id !== null) return -1
    if (a.parent_id !== null && b.parent_id === null) return 1
    if (a.parent_id === b.parent_id) return a.name.localeCompare(b.name)
    return (a.parent_id || 0) - (b.parent_id || 0)
  })
}

// Get category hierarchy path
export async function getCategoryPath(categoryId: number): Promise<BlogCategory[]> {
  const path: BlogCategory[] = []
  let currentId: number | null = categoryId

  while (currentId !== null) {
    const category = categories.find((cat) => cat.id === currentId)
    if (!category) break

    path.unshift(category) // Add to beginning of array
    currentId = category.parent_id
  }

  return path
}

// Get all published blog posts with category info
export async function getBlogPosts(): Promise<BlogPostWithCategory[]> {
  const publishedPosts = posts.filter((post) => post.published)

  const postsWithCategories: BlogPostWithCategory[] = []

  for (const post of publishedPosts) {
    const category = categories.find((cat) => cat.id === post.category_id)
    if (!category) continue

    const categoryPath = await getCategoryPath(post.category_id)

    postsWithCategories.push({
      ...post,
      category,
      category_path: categoryPath,
    })
  }

  // Sort by published_at desc, then created_at desc
  return postsWithCategories.sort((a, b) => {
    const aDate = new Date(a.published_at || a.created_at)
    const bDate = new Date(b.published_at || b.created_at)
    return bDate.getTime() - aDate.getTime()
  })
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPostWithCategory | null> {
  const post = posts.find((p) => p.slug === slug && p.published)
  if (!post) return null

  const category = categories.find((cat) => cat.id === post.category_id)
  if (!category) return null

  const categoryPath = await getCategoryPath(post.category_id)

  return {
    ...post,
    category,
    category_path: categoryPath,
  }
}

// Get posts by category
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithCategory[]> {
  const category = categories.find((cat) => cat.slug === categorySlug)
  if (!category) return []

  // Get all posts in this category and its subcategories
  const getAllSubcategoryIds = (parentId: number): number[] => {
    const subcategories = categories.filter((cat) => cat.parent_id === parentId)
    const ids = [parentId]

    for (const subcat of subcategories) {
      ids.push(...getAllSubcategoryIds(subcat.id))
    }

    return ids
  }

  const categoryIds = getAllSubcategoryIds(category.id)
  const categoryPosts = posts.filter((post) => post.published && categoryIds.includes(post.category_id))

  const postsWithCategories: BlogPostWithCategory[] = []

  for (const post of categoryPosts) {
    const postCategory = categories.find((cat) => cat.id === post.category_id)
    if (!postCategory) continue

    const categoryPath = await getCategoryPath(post.category_id)

    postsWithCategories.push({
      ...post,
      category: postCategory,
      category_path: categoryPath,
    })
  }

  // Sort by published_at desc, then created_at desc
  return postsWithCategories.sort((a, b) => {
    const aDate = new Date(a.published_at || a.created_at)
    const bDate = new Date(b.published_at || b.created_at)
    return bDate.getTime() - aDate.getTime()
  })
}

// Get comments for a post (with nested replies)
export async function getPostComments(postId: number): Promise<BlogCommentWithReplies[]> {
  const postComments = comments.filter((comment) => comment.post_id === postId && comment.approved)

  // Sort by created_at ASC
  postComments.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  // Build nested comment structure
  const commentMap = new Map<number, BlogCommentWithReplies>()
  const rootComments: BlogCommentWithReplies[] = []

  for (const comment of postComments) {
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
  }

  return rootComments
}

// Add a new comment (for now, just simulate - in real app this would update the JSON or database)
export async function addComment(
  postId: number,
  authorName: string,
  authorEmail: string,
  content: string,
  parentId?: number,
): Promise<BlogComment> {
  // Generate a new ID (in real implementation, this would be handled by the database)
  const newId = Math.max(...comments.map((c) => c.id)) + 1

  const newComment: BlogComment = {
    id: newId,
    post_id: postId,
    parent_id: parentId || null,
    author_name: authorName,
    author_email: authorEmail,
    content,
    approved: true, // Auto-approve for demo purposes
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // In a real app, you would save this to the database
  // For now, we'll just return the comment (it won't persist)
  console.log("New comment would be saved:", newComment)

  return newComment
}
