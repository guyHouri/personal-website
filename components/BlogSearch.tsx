"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  value?: string
}

export function BlogSearch({ onSearch, placeholder = "Search articles...", value = "" }: BlogSearchProps) {
  const [query, setQuery] = useState(value)

  // Update local state when value prop changes
  useEffect(() => {
    setQuery(value)
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  const handleSearchClick = () => {
    onSearch(query.trim())
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-20 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 pointer-events-none" />

      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          onClick={handleSearchClick}
          className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-emerald-600 dark:text-emerald-400"
        >
          <Search className="w-3 h-3" />
        </Button>
      </div>
    </form>
  )
}
