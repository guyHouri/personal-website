"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Sun, Mountain, Headphones, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"
import { aboutData } from "@/data/portfolio"

export default function AboutPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const hobbyIcons = {
    "☀️": Sun,
    "🥾": Mountain,
    "🎧": Headphones,
    "📚": BookOpen,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <section className="sunset-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Me</h1>
              <p className="text-xl text-orange-100 dark:text-slate-200 max-w-2xl mx-auto">
                Get to know the person behind The Maximizer - my journey, hobbies, and recommendations for optimal
                living.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Personal Introduction */}
          <Card className="shadow-lg border-0 sunset-card">
            <CardContent className="p-8">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="aspect-square bg-gradient-to-br from-orange-400 to-pink-500 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center mb-4">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Guy Houri - Professional headshot"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Guy Houri</h2>
                    <p className="text-orange-600 dark:text-slate-300 font-medium">
                      Full-Stack Developer & Life Maximizer
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h3>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      Welcome to The Maximizer! I'm Guy Houri, a Full-Stack Developer with a passion for optimization in
                      all aspects of life. My journey began in the tech world, but it quickly expanded into a holistic
                      approach to maximizing health, productivity, and well-being.
                    </p>
                    <p>
                      With 3 years of experience building robust applications in the IDF and currently pursuing my B.Sc.
                      in Computer Science with a focus on Data Science, I've learned that the same principles that make
                      great software also make great lives: optimization, testing, and continuous improvement.
                    </p>
                    <p>
                      My philosophy is simple: <strong>"Never trust, verify."</strong> Whether it's a new health
                      protocol, a productivity hack, or a technology solution, I believe in testing everything and
                      sharing what actually works for maximum results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hobbies Section */}
          <Card className="shadow-lg border-0 sunset-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">My Hobbies & Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {aboutData.hobbies.map((hobby, index) => {
                  const IconComponent = hobbyIcons[hobby.icon as keyof typeof hobbyIcons] || Sun
                  return (
                    <Card key={index} className="sunset-card border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-slate-600 dark:to-slate-500 rounded-full flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{hobby.name}</h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{hobby.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Images */}
          <Card className="shadow-lg border-0 sunset-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Life in Pictures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Guy enjoying sunshine outdoors"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Hiking in nature"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Reading and learning setup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Podcast Recommendations */}
            <Card className="shadow-lg border-0 sunset-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
                  <Headphones className="w-6 h-6 text-orange-600 dark:text-slate-400" />
                  Podcast Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aboutData.recommendations.podcasts.map((podcast, index) => (
                    <div key={index} className="p-4 bg-orange-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">{podcast.split(" - ")[0]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{podcast.split(" - ")[1]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book Recommendations */}
            <Card className="shadow-lg border-0 sunset-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
                  <BookOpen className="w-6 h-6 text-orange-600 dark:text-slate-400" />
                  Book Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aboutData.recommendations.books.map((book, index) => (
                    <div key={index} className="p-4 bg-pink-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">{book.split(" - ")[0]}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{book.split(" - ")[1]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="shadow-lg border-0 sunset-card text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect & Maximize Together
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always excited to connect with fellow optimizers and share insights about maximizing life. Whether
                you want to discuss tech, health protocols, or life optimization strategies, let's chat!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/blog">
                  <Button className="sunset-primary hover:sunset-secondary text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read My Blog
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:guy.houri2024@gmail.com`, "_blank")}
                  className="border-orange-300 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-slate-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
