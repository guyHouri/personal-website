import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import React from "react";

interface BookRecommendationsProps {
  books: string[]; // Assuming format "Title - Author"
}

export default function BookRecommendations({ books }: BookRecommendationsProps) {
  return (
    <Card className="shadow-lg border-0 sunset-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
          <BookOpen className="w-6 h-6 text-orange-600 dark:text-slate-400" />
          Book Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {books.map((book, index) => (
            <div key={index} className="p-4 bg-pink-50 dark:bg-slate-700 rounded-lg">
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">{book.split(" - ")[0]}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{book.split(" - ")[1]}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}