"use client"; // Still needs to be a client component because of useEffect and potential interactions within children

import { useEffect } from "react";
import { aboutData } from "@/data/portfolio"; // Assuming aboutData contains all necessary data

// Import your new components
import AboutHeader from "./components/AboutHeader";
import PersonalIntroduction from "./components/PersonalIntroduction";
import HobbiesSection from "./components/HobbiesSection";
import LifestyleImages from "./components/LifestyleImages";
import PodcastRecommendations from "./components/PodcastRecommendations";
import BookRecommendations from "./components/BookRecommendations";
import CallToAction from "./components/CallToAction";

export default function AboutPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pass necessary parts of aboutData as props
  const { hobbies, recommendations } = aboutData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <AboutHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <PersonalIntroduction />
          <HobbiesSection hobbies={hobbies} />
          <LifestyleImages />
          <div className="grid gap-8 lg:grid-cols-2">
            <PodcastRecommendations podcasts={recommendations.podcasts} />
            <BookRecommendations books={recommendations.books} />
          </div>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
