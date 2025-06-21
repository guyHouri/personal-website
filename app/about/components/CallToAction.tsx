import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CallToAction() {
  return (
    <Card className="shadow-lg border-0 sunset-card text-center">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Let&apos;s Connect & Maximize Together
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          I&apos;m always excited to connect with fellow optimizers and share insights about maximizing life. Whether
          you want to discuss tech, health protocols, or life optimization strategies, let&apos;s chat!
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
  );
}