"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar, Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { educationData } from "@/data/portfolio"

export function EducationSection() {
  const { theme } = useTheme()
  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <section className="py-16 lg:py-24 sunset-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <GraduationCap className="w-8 h-8 text-orange-500 dark:text-slate-400" aria-hidden="true" />
            Education
          </h2>

          <div className="grid gap-6 lg:gap-8">
            {educationData.map((edu) => (
              <Card key={edu.id} className="shadow-lg border-0 sunset-card border-orange-200 dark:border-slate-600">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span className="font-medium">{edu.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
