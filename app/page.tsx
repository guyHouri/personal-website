"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { HeroSection } from "@/components/HeroSection"
import { ProfileSection } from "@/components/ProfileSection"
import { SkillsSection } from "@/components/SkillsSection"
import { WorkExperienceSection } from "@/components/WorkExperienceSection"
import { EducationSection } from "@/components/EducationSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { BlogSection } from "@/components/BlogSection"
import { ThemeToggle } from "@/components/ThemeToggle"
import { PermanentSidebarButton } from "@/components/PermanentSidebarButton"
import type { BlogCategory, BlogPostWithCategory } from "@/lib/db"

// Import the data
import blogCategoriesData from "@/data/blog-categories.json"
import blogPostsData from "@/data/blog-posts.json"

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithCategory[]>([])
  const [categories] = useState(blogCategoriesData as BlogCategory[])

  useEffect(() => {
    // Process blog posts with category information
    const processedPosts = blogPostsData
      .filter((post: any) => post.published)
      .map((post: any) => {
        const category = categories.find((cat) => cat.id === post.category_id)
        if (!category) return null

        // Build category path
        const getCategoryPath = (categoryId: number): BlogCategory[] => {
          const path: BlogCategory[] = []
          let currentId: number | null = categoryId

          while (currentId !== null) {
            const cat = categories.find((c) => c.id === currentId)
            if (!cat) break
            path.unshift(cat)
            currentId = cat.parent_id
          }
          return path
        }

        return {
          ...post,
          category,
          category_path: getCategoryPath(post.category_id),
        }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => {
        const aDate = new Date(a.published_at || a.created_at)
        const bDate = new Date(b.published_at || b.created_at)
        return bDate.getTime() - aDate.getTime()
      }) as BlogPostWithCategory[]

    setBlogPosts(processedPosts)
  }, [categories])

  return (
    <>
      <Head>
        <title>The Maximizer - Guy Houri | Full-Stack Developer & Life Maximizer</title>
        <meta
          name="description"
          content="The Maximizer - Guy Houri is a Full-Stack Developer with 3 years of experience in building robust and scalable applications, specializing in React, Node.js, Spring Boot, and life optimization strategies. Maximizer blog for decentralized living."
        />
        <meta
          name="keywords"
          content="Full-Stack Developer, React, Node.js, Spring Boot, MongoDB, PostgreSQL, Kubernetes, Docker, Portfolio, Guy Houri, Software Engineer, Tel Aviv, EMF, Optimization, Health, Life Maximizer, Decentralized Living"
        />
        <meta name="author" content="Guy Houri" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://the-maximizer.vercel.app/" />
        <meta property="og:title" content="The Maximizer - Guy Houri | Full-Stack Developer" />
        <meta
          property="og:description"
          content="The Maximizer - Maximizer blog for decentralized living. Guy Houri is a Full-Stack Developer specializing in life optimization strategies."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://the-maximizer.vercel.app/" />
        <meta property="twitter:title" content="The Maximizer - Guy Houri | Full-Stack Developer" />
        <meta
          property="twitter:description"
          content="The Maximizer - Maximizer blog for decentralized living. Guy Houri is a Full-Stack Developer specializing in life optimization strategies."
        />
        <meta property="twitter:image" content="/og-image.jpg" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" content="https://the-maximizer.vercel.app/" />
      </Head>

      <div className="min-h-screen">
        <ThemeToggle />
        <PermanentSidebarButton categories={categories} posts={blogPosts} />

        <HeroSection />
        <ProfileSection />
        <SkillsSection />
        <WorkExperienceSection />
        <EducationSection />
        <BlogSection posts={blogPosts} categories={categories} />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}
