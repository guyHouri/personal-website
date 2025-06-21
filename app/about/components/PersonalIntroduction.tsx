import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image"; // Remember to use next/image

export default function PersonalIntroduction() {
  return (
    <Card className="shadow-lg border-0 sunset-card">
      <CardContent className="p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-pink-500 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center mb-4">
              <Image
                src="/linkedin-headshot.jpg?height=300&width=300" // Update this to your actual image path
                alt="Guy Houri - Professional headshot"
                width={300} // Specify intrinsic width
                height={300} // Specify intrinsic height
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Guy Houri</h2>
              <p className="text-orange-600 dark:text-slate-300 font-medium">
                Full-Stack Developer & Life Maximizer
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Welcome to The Maximizer! I'm Guy Houri, a Full-Stack Developer with a passion for optimization in
                all aspects of life. My journey began in the tech world, but it quickly expanded into a holistic
                approach to maximizing health, productivity, and well-being.
              </p>
              <p>
                With 3 years of experience building robust applications in the IDF and currently pursuing my B.Sc.
                in Computer Science with a focus on Data Science, I've learned that the same principles that make
                great software also make great lives: optimization, testing, and continuous improvement.
              </p>
              <p>
                My philosophy is simple: <strong>&quot;Never trust, verify.&quot;</strong> Whether it&apos;s a new health
                protocol, a productivity hack, or a technology solution, I believe in testing everything and
                sharing what actually works for maximum results.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}