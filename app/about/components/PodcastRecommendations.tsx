import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";
import React from "react";

interface PodcastRecommendationsProps {
  podcasts: string[]; // Assuming format "Title - Author"
}

export default function PodcastRecommendations({ podcasts }: PodcastRecommendationsProps) {
  return (
    <Card className="shadow-lg border-0 sunset-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
          <Headphones className="w-6 h-6 text-orange-600 dark:text-slate-400" />
          Podcast Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {podcasts.map((podcast, index) => (
            <div key={index} className="p-4 bg-orange-50 dark:bg-slate-700 rounded-lg">
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">{podcast.split(" - ")[0]}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{podcast.split(" - ")[1]}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
