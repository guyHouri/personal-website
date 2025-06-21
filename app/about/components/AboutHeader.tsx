import { Button } from "@/components/ui/button";
import { Home, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AboutHeader() {
  return (
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
  );
}