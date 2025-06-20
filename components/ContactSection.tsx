"use client"

import { Button } from "@/components/ui/button"
import { Mail, Linkedin, ExternalLink, Sun, Moon } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { contactInfo } from "@/data/portfolio"

export function ContactSection() {
  const { theme } = useTheme()

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, "_blank")
  }

  const handleLinkedInClick = () => {
    window.open(contactInfo.linkedinUrl, "_blank", "noopener,noreferrer")
  }

  const ThemeIcon = theme === "light" ? Sun : Moon

  return (
    <section className="py-16 lg:py-24 sunset-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {theme === "light" ? (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full sun-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-300 rounded-full sun-pulse"></div>
          </>
        ) : (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-slate-300 rounded-full sun-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-slate-400 rounded-full sun-pulse"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ThemeIcon
              className={`w-12 h-12 ${theme === "light" ? "text-yellow-300 sun-rotate" : "text-slate-300 sun-pulse"}`}
            />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className={`text-xl ${theme === "light" ? "text-orange-100" : "text-slate-200"} mb-12`}>
            Ready to collaborate on meaningful projects and maximize life through technology and decentralized living.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
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
              onClick={handleLinkedInClick}
            >
              <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
              LinkedIn Profile
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>

          <div className={`${theme === "light" ? "text-orange-200" : "text-slate-300"}`}>
            <p className="flex items-center justify-center gap-2">
              <ThemeIcon className="w-4 h-4" />
              {contactInfo.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
