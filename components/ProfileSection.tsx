"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";
import { profileText } from "@/data/portfolio"

export function ProfileSection() {
  const { theme } = useTheme()
  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <section className="py-16 lg:py-24 sunset-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <ThemeIcon className="w-8 h-8 text-orange-500 dark:text-slate-400 sun-pulse" />
            Profile
          </h2>
          <Card className="shadow-lg border-0 sunset-card border-orange-200 dark:border-slate-600">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {profileText.split("Full-Stack Developer with").map((part, index) => {
                  if (index === 0) return part
                  if (index === 1) {
                    return (
                      <span key={index}>
                        Full-Stack Developer with
                        <strong className="text-orange-600 dark:text-slate-300"> 3 years of experience</strong>
                        {part.split("B.Sc. in Computer Science")[0]}
                        <strong className="text-orange-600 dark:text-slate-300">B.Sc. in Computer Science</strong>
                        {part.split("B.Sc. in Computer Science")[1]}
                      </span>
                    )
                  }
                  return part
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
