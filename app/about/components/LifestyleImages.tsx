import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image"; 
import React from "react";

export default function LifestyleImages() {
  return (
    <Card className="shadow-lg border-0 sunset-card">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 dark:text-white">Life in Pictures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="aspect-square bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
            <Image
              src="/about/lifestyle/am-israel.jpg?height=300&width=300" // Update this to your actual image path
              alt="Guy enjoying sunshine outdoors"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
            <Image
              src="/about/lifestyle/backpack-method.jpg??height=300&width=300" // Update this to your actual image path
              alt="Hiking in nature"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 dark:from-slate-600 dark:to-slate-500 rounded-lg overflow-hidden">
            <Image
              src="/about/lifestyle/restaurant.jpg??height=300&width=300" // Update this to your actual image path
              alt="Reading and learning setup"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
