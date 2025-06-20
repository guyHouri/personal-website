"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight, User, Sun, Moon, Sunrise } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import type { BlogPostWithCategory, BlogCategory } from "@/lib/db"

interface BlogSectionProps {
  posts: BlogPostWithCategory[]
  categories: BlogCategory[]
}

export function BlogSection({ posts, categories }: BlogSectionProps) {
  const { theme } = useTheme()
  const router = useRouter()
  const ThemeIcon = theme === "light" ? Sun : Moon
  const AccentIcon = theme === "light" ? Sunrise : Moon

  const handleBlogNavigation = () => {
    router.push("/blog")
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const handleAboutNavigation = () => {
    router.push("/about")
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <section className="py-16 lg:py-24 sunset-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <AccentIcon className="w-8 h-8 text-orange-500 dark:text-slate-400 sun-pulse" aria-hidden="true" />
              Explore & Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover practical strategies for maximizing your life and learn more about my journey toward
              decentralized living.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Blog Section */}
            <Card className="sunset-card border-orange-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 dark:from-slate-600 dark:to-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 sun-glow group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Maximizer Blog</h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Dive into practical guides for optimizing your health, environment, and technology. From EMF
                  mitigation to sleep optimization, discover strategies for peak performance and balanced living.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-slate-400">
                    <ThemeIcon className="w-4 h-4" />
                    <span>{posts.length} optimization guides</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-slate-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{categories.length} categories</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="sunset-primary hover:sunset-secondary text-white font-semibold group-hover:scale-105 transition-transform"
                  onClick={handleBlogNavigation}
                >
                  Explore Blog
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="sunset-card border-orange-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-slate-500 dark:to-slate-400 rounded-full flex items-center justify-center mx-auto mb-6 sun-glow group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Me</h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Learn about my journey as a Full-Stack Developer and life maximizer. Discover my hobbies like
                  sunshine, hiking, and learning through podcasts, plus get my top recommendations for optimal living.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-slate-400">
                    <ThemeIcon className="w-4 h-4" />
                    <span>{theme === "light" ? "Sunshine" : "Moonlight"} & outdoor enthusiast</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-slate-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Podcast & book recommendations</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-slate-600 dark:to-slate-500 hover:from-yellow-600 hover:to-orange-600 dark:hover:from-slate-500 dark:hover:to-slate-400 text-white font-semibold group-hover:scale-105 transition-transform"
                  onClick={handleAboutNavigation}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="sunset-card border-orange-200 dark:border-slate-600 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <ThemeIcon className="w-12 h-12 text-orange-500 dark:text-slate-400 sun-rotate" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to Maximize Your Life?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join me on the journey toward decentralized living and optimal health. Every day is an opportunity to
                  maximize your potential.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="sunset-primary hover:sunset-secondary text-white" onClick={handleBlogNavigation}>
                    Start Reading
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:guy.houri2024@gmail.com`, "_blank")}
                    className="border-orange-300 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-slate-800"
                  >
                    Get In Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
