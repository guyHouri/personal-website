"use client"

import { Button } from "@/components/ui/button"
import { Mail, MapPin, Linkedin, Download, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";
import { contactInfo } from "@/data/portfolio"
import { downloadCV } from "@/utils/cv-generator"

export function HeroSection() {
  const { theme } = useTheme()

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, "_blank")
  }

  const handleLinkedInClick = () => {
    window.open(contactInfo.linkedinUrl, "_blank", "noopener,noreferrer")
  }

  const handleDownloadCV = () => {
    downloadCV()
  }

  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <section className="relative overflow-hidden sunset-primary text-white min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full sun-pulse opacity-60"></div>
            <div className="absolute top-32 right-32 w-16 h-16 bg-orange-300 rounded-full sun-pulse opacity-40"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300 rounded-full sun-pulse opacity-50"></div>
          </>
        ) : (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-slate-300 rounded-full sun-pulse opacity-30"></div>
            <div className="absolute top-32 right-32 w-16 h-16 bg-slate-400 rounded-full sun-pulse opacity-20"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-slate-500 rounded-full sun-pulse opacity-25"></div>
          </>
        )}
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 ${theme === "light" ? "bg-yellow-400" : "bg-slate-400"} rounded-full flex items-center justify-center sun-glow`}
              >
                <ThemeIcon
                  className={`w-12 h-12 ${theme === "light" ? "text-orange-600 sun-rotate" : "text-slate-700 sun-pulse"}`}
                />
              </div>
            </div>

            <h1
              className={`text-5xl lg:text-7xl font-bold mb-4 ${theme === "light" ? "bg-gradient-to-r from-yellow-200 to-orange-100" : "bg-gradient-to-r from-slate-200 to-slate-100"} bg-clip-text text-transparent`}
            >
              The Maximizer
            </h1>
            <div
              className={`w-32 h-1 ${theme === "light" ? "bg-gradient-to-r from-yellow-300 to-orange-300" : "bg-gradient-to-r from-slate-300 to-slate-400"} mx-auto mb-8`}
            ></div>
            <p className={`text-lg lg:text-xl ${theme === "light" ? "text-yellow-100" : "text-slate-200"} italic mb-6`}>
              "maximizer blog for decentralized living"
            </p>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Guy Houri</h2>
          <p className={`text-xl lg:text-2xl ${theme === "light" ? "text-orange-100" : "text-slate-200"} mb-8`}>
            Full-Stack Developer & Life Maximizer
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm lg:text-base">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur">
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              <span>LinkedIn</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
              onClick={handleEmailClick}
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
              onClick={handleDownloadCV}
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
