import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // "class" means dark mode is activated when the "dark" class is present

  // Specifies which files Tailwind CSS should scan for class names.
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 'extend' is used to *add* to or *override* specific parts of the default theme without replacing it entirely.
  theme: {
    extend: {
      // Custom Color Palette using defined using CSS variables (e.g., `--background`). from globals.css
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))", // The text color to be used on top of the card background
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Sidebar specific colorst with its own color scheme.
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      // Consistent rounding across components and easy adjustment from CSS.
      borderRadius: {
        lg: "var(--radius)", // Large radius, typically the base radius
        md: "calc(var(--radius) - 2px)", // Medium radius, slightly smaller
        sm: "calc(var(--radius) - 4px)", // Small radius, even smaller
      },

      // Custom CSS Keyframes for animations. These define the 'steps' of an animation (e.g., from height 0 to a dynamic height).
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)", // css variable defined by Radix UI to dynamically set the height
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },

      // Custom Animation utilities.
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  // Tailwind Plugins:
  plugins: [
    // This plugin provides animation utilities that can be used directly in Tailwind classes.
    require("tailwindcss-animate"),
  ],
};

export default config;
