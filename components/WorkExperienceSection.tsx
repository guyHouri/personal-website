"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { workExperienceData } from "@/data/portfolio"

export function WorkExperienceSection() {
  const { theme } = useTheme()
  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <section className="py-16 lg:py-24 sunset-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Briefcase className="w-8 h-8 text-orange-500 dark:text-slate-400" aria-hidden="true" />
            Work Experience
          </h2>

          {workExperienceData.map((job) => (
            <Card key={job.id} className="shadow-lg border-0 sunset-card border-orange-200 dark:border-slate-600">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl lg:text-2xl text-gray-900 dark:text-white">{job.company}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-orange-600 dark:text-slate-300">
                      {job.position}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span className="font-medium">{job.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" role="list">
                  {job.achievements.map((achievement, achievementIndex) => (
                    <li key={`${job.id}-achievement-${achievementIndex}`} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 bg-orange-500 dark:bg-slate-400 rounded-full mt-2 flex-shrink-0 sun-pulse"
                        aria-hidden="true"
                      ></div>
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
