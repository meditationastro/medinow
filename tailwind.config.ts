import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',   // blue-50
          100: '#dbeafe',  // blue-100
          600: '#d97706',  // amber-600
          700: '#000000',  // amber-700
          800: '#1e40af',  // blue-800
          900: '#1e3a8a',  // blue-900
        },
        secondary: {
          50: '#fffbeb',   // amber-50
          100: '#fef3c7',  // amber-100
          600: '#d97706',  // amber-600
          700: '#b45309',  // amber-700
        },
        neutral: {
          50: '#f8fafc',   // slate-50
          300: '#cbd5e1',  // slate-300
          600: '#475569',  // slate-600
          700: '#334155',  // slate-700
          900: '#0f172a',  // slate-900
        },
        success: {
          500: '#10b981',  // green-500
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #fffbeb)',
        'text-gradient': 'linear-gradient(to right, #1e40af, #d97706)',
        'button-gradient': 'linear-gradient(to right, #1e40af, #1e3a8a)',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',    /* 2px */
        DEFAULT: '0.25rem', /* 4px */
        md: '0.375rem',    /* 6px */
        lg: '0.5rem',      /* 8px */
        xl: '0.75rem',     /* 12px */
        '2xl': '1rem',     /* 16px */
        '3xl': '1.5rem',   /* 24px */
        full: '9999px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, typography],
};

export default config; 