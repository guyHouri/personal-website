// Types for our database entities
export interface BlogCategory {
  id: number
  name: string
  slug: string
  parent_id: number | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  category_id: number
  author_name: string
  author_email: string
  published: boolean
  featured: boolean
  reading_time: number | null
  tags: string[] | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface BlogComment {
  id: number
  post_id: number
  parent_id: number | null
  author_name: string
  author_email: string
  content: string
  approved: boolean
  created_at: string
  updated_at: string
}

// Extended types with relations
export interface BlogPostWithCategory extends BlogPost {
  category: BlogCategory
  category_path: BlogCategory[]
}

export interface BlogCommentWithReplies extends BlogComment {
  replies: BlogCommentWithReplies[]
}

// TODO: When ready to migrate to database, uncomment the following:
// import { neon } from "@neondatabase/serverless"
//
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is not set")
// }
//
// export const sql = neon(process.env.DATABASE_URL)
