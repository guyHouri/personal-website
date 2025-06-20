import { type NextRequest, NextResponse } from "next/server"
import { addComment } from "@/lib/blog"

export async function POST(request: NextRequest) {
  try {
    const { postId, parentId, authorName, authorEmail, content } = await request.json()

    // Basic validation
    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add the comment (currently just simulated with JSON data)
    const comment = await addComment(postId, authorName, authorEmail, content, parentId)

    // Note: In the JSON version, comments won't persist between page reloads
    // This is expected behavior until we migrate to the database
    return NextResponse.json({
      success: true,
      comment,
      note: "Comment submitted successfully! Note: Comments are currently simulated and won't persist between page reloads. Database integration coming soon.",
    })
  } catch (error) {
    console.error("Error adding comment:", error)
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
  }
}
