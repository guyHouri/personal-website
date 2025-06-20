"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Reply, Send } from "lucide-react"
import type { BlogCommentWithReplies } from "@/lib/db"

interface CommentSectionProps {
  postId: number
  initialComments: BlogCommentWithReplies[]
}

interface CommentFormData {
  authorName: string
  authorEmail: string
  content: string
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [formData, setFormData] = useState<CommentFormData>({
    authorName: "",
    authorEmail: "",
    content: "",
  })

  const handleSubmit = async (e: React.FormEvent, parentId?: number) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          parentId,
          ...formData,
        }),
      })

      if (response.ok) {
        // Reset form
        setFormData({ authorName: "", authorEmail: "", content: "" })
        setReplyingTo(null)

        // In a real app, you might want to refresh the comments or add optimistic updates
        window.location.reload()
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderComment = (comment: BlogCommentWithReplies, level = 0) => (
    <div key={comment.id} className={`${level > 0 ? "ml-8 mt-4" : "mb-6"}`}>
      <Card className="bg-white/60 backdrop-blur dark:bg-black/80 dark:backdrop-blur border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.author_name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-800"
          >
            <Reply className="w-4 h-4 mr-1" />
            Reply
          </Button>

          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Your name"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  required
                  className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.authorEmail}
                  onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                  required
                  className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              <Textarea
                placeholder="Write your reply..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? "Posting..." : "Post Reply"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                  className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {comment.replies.map((reply) => renderComment(reply, level + 1))}
    </div>
  )

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur dark:bg-black/90 dark:backdrop-blur border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <MessageCircle className="w-5 h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Comment Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              required
              className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={formData.authorEmail}
              onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
              required
              className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
          <Textarea
            placeholder="Share your thoughts..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>

        {/* Comments List */}
        <div>
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => renderComment(comment))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
