"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Server, Globe, GitBranch, Users, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";
import { skillsData } from "@/data/portfolio"

interface SkillCategoryProps {
  title: string
  icon: React.ReactNode
  skills: string[]
  colorClass: string
}

// Enhanced technology icon mapping with correct icons
const techIcons: { [key: string]: string } = {
  // Programming Languages
  Java: "☕",
  "JavaScript (ES6+)": "🟨",
  TypeScript: "🔷",
  Python: "🐍",
  C: "⚙️",

  // Frontend
  "React.js": "⚛️",
  "React Native": "📱",
  Redux: "🔄",
  HTML5: "🌐",
  CSS3: "🎨",
  MUI: "🎭",

  // Backend
  "Node.js (Express.js, NestJS)": "🟢",
  "Spring Boot": "🍃",

  // Databases
  MongoDB: "🍃",
  PostgreSQL: "🐘",

  // Big Data
  "Apache NiFi": "🌊",
  Kafka: "📡",

  // DevOps
  "Kubernetes (k8s)": "☸️",
  Docker: "🐳",
  "GitLab CI": "🦊",
  OpenShift: "🔴",

  // Tools
  Git: "📝",
  TFS: "📋",
  Kibana: "📊",
  Elastic: "🔍",
  "Agile (Scrum)": "🏃‍♂️",

  // Soft Skills
  Teamwork: "🤝",
  Collaboration: "👥",
  Communication: "💬",

  // Languages
  English: "🇺🇸",
  Hebrew: "🇮🇱",
}

function SkillCategory({ title, icon, skills, colorClass }: SkillCategoryProps) {
  return (
    <Card className="shadow-lg border-0 sunset-card border-orange-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-orange-800 dark:text-slate-200 text-xl">
          <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className={`${colorClass} flex items-center gap-2 px-3 py-2 text-sm font-medium hover:scale-105 transition-transform cursor-default`}
            >
              {techIcons[skill] && (
                <span className="text-lg" role="img" aria-label={skill}>
                  {techIcons[skill]}
                </span>
              )}
              <span>{skill}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function SkillsSection() {
  const { theme } = useTheme()
  const ThemeIcon = theme === "light" ? Sun : Moon

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6 text-orange-500 dark:text-slate-400" aria-hidden="true" />,
      skills: skillsData.programming,
      colorClass:
        "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-slate-700 dark:text-slate-200 border border-orange-200 dark:border-slate-600",
    },
    {
      title: "Frontend Development",
      icon: <Globe className="w-6 h-6 text-yellow-500 dark:text-slate-400" aria-hidden="true" />,
      skills: skillsData.frontend,
      colorClass:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-slate-700 dark:text-slate-200 border border-yellow-200 dark:border-slate-600",
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6 text-pink-500 dark:text-slate-400" aria-hidden="true" />,
      skills: skillsData.backend,
      colorClass:
        "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-slate-700 dark:text-slate-200 border border-pink-200 dark:border-slate-600",
    },
    {
      title: "Databases & Big Data",
      icon: <Database className="w-6 h-6 text-purple-500 dark:text-slate-400" aria-hidden="true" />,
      skills: [...skillsData.databases, ...skillsData.bigData],
      colorClass:
        "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-slate-700 dark:text-slate-200 border border-purple-200 dark:border-slate-600",
    },
    {
      title: "DevOps & Tools",
      icon: <GitBranch className="w-6 h-6 text-red-500 dark:text-slate-400" aria-hidden="true" />,
      skills: [...skillsData.devOps, ...skillsData.tools],
      colorClass:
        "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-slate-700 dark:text-slate-200 border border-red-200 dark:border-slate-600",
    },
    {
      title: "Soft Skills & Languages",
      icon: <Users className="w-6 h-6 text-green-500 dark:text-slate-400" aria-hidden="true" />,
      skills: [...skillsData.softSkills, ...skillsData.languages],
      colorClass:
        "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-slate-700 dark:text-slate-200 border border-green-200 dark:border-slate-600",
    },
  ]

  return (
    <section className="py-16 lg:py-24 sunset-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <ThemeIcon className="w-8 h-8 text-orange-500 dark:text-slate-400 sun-pulse" aria-hidden="true" />
            Technical Skills
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {skillCategories.map((category) => (
              <SkillCategory
                key={category.title}
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                colorClass={category.colorClass}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
