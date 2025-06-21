import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Mountain, Headphones, BookOpen } from "lucide-react";
import React from "react";

// Define the type for a single hobby for better type safety
interface Hobby {
  icon: string; // This would typically be a specific type for your icons, or a direct Lucide icon component
  name: string;
  description: string;
}

interface HobbiesSectionProps {
  hobbies: Hobby[];
}

const hobbyIcons = {
  "☀️": Sun,
  "🥾": Mountain,
  "🎧": Headphones,
  "📚": BookOpen,
  // Add other icons as needed if your data uses them
};

export default function HobbiesSection({ hobbies }: HobbiesSectionProps) {
  return (
    <Card className="shadow-lg border-0 sunset-card">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 dark:text-white">My Hobbies & Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {hobbies.map((hobby, index) => {
            const IconComponent = hobbyIcons[hobby.icon as keyof typeof hobbyIcons] || Sun; // Default to Sun if icon not found
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
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}