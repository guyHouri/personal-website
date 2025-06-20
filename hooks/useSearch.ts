"use client"

import { useState, useMemo } from "react"
import type { BlogPostWithCategory } from "@/lib/db"

interface SearchResult extends BlogPostWithCategory {
  searchContext?: string
  searchField?: string
}

export function useSearch(posts: BlogPostWithCategory[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSearchQuery, setActiveSearchQuery] = useState("")

  // Function to extract context around the search term
  const extractContext = (text: string, query: string, contextLength = 150) => {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerText.indexOf(lowerQuery)

    if (index === -1) return text.substring(0, contextLength) + "..."

    // Calculate start and end positions for context
    const start = Math.max(0, index - contextLength / 2)
    const end = Math.min(text.length, index + query.length + contextLength / 2)

    // Extract the context
    let context = text.substring(start, end)

    // Clean up markdown and formatting
    context = context
      .replace(/#{1,6}\s/g, "") // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markdown
      .replace(/\[(.*?)\]$$.*?$$/g, "$1") // Remove markdown links
      .replace(/`(.*?)`/g, "$1") // Remove inline code
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim()

    // Add ellipsis if we're not at the beginning/end
    if (start > 0) context = "..." + context
    if (end < text.length) context = context + "..."

    return context
  }

  const filteredPosts = useMemo(() => {
    if (!activeSearchQuery.trim()) {
      return posts
    }

    const query = activeSearchQuery.toLowerCase().trim()
    const results: SearchResult[] = []

    posts.forEach((post) => {
      let searchContext = ""
      let searchField = ""

      // Search in title
      if (post.title.toLowerCase().includes(query)) {
        searchContext = post.title
        searchField = "title"
        results.push({ ...post, searchContext, searchField })
        return
      }

      // Search in excerpt
      if (post.excerpt && post.excerpt.toLowerCase().includes(query)) {
        searchContext = extractContext(post.excerpt, query)
        searchField = "excerpt"
        results.push({ ...post, searchContext, searchField })
        return
      }

      // Search in content
      if (post.content.toLowerCase().includes(query)) {
        searchContext = extractContext(post.content, query)
        searchField = "content"
        results.push({ ...post, searchContext, searchField })
        return
      }

      // Search in tags
      if (post.tags && post.tags.length > 0) {
        const matchingTag = post.tags.find((tag) => tag.toLowerCase().includes(query))
        if (matchingTag) {
          searchContext = `Tagged with: ${matchingTag}`
          searchField = "tags"
          results.push({ ...post, searchContext, searchField })
          return
        }
      }

      // Search in category name
      if (post.category.name.toLowerCase().includes(query)) {
        searchContext = `Category: ${post.category.name}`
        searchField = "category"
        results.push({ ...post, searchContext, searchField })
        return
      }

      // Search in category path
      const matchingCategory = post.category_path.find((cat) => cat.name.toLowerCase().includes(query))
      if (matchingCategory) {
        searchContext = `Category: ${matchingCategory.name}`
        searchField = "category"
        results.push({ ...post, searchContext, searchField })
        return
      }

      // Search in author name
      if (post.author_name.toLowerCase().includes(query)) {
        searchContext = `By ${post.author_name}`
        searchField = "author"
        results.push({ ...post, searchContext, searchField })
        return
      }
    })

    return results
  }, [posts, activeSearchQuery])

  const performSearch = (query: string) => {
    setActiveSearchQuery(query)
    setSearchQuery(query)
  }

  return {
    searchQuery,
    setSearchQuery,
    activeSearchQuery,
    performSearch,
    filteredPosts,
    hasResults: filteredPosts.length > 0,
    isSearching: activeSearchQuery.trim().length > 0,
  }
}
