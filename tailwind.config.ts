// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Extend colors
      colors: {
        purple: {
          "951": "rgba(79,70,229,1)",
        },
        gray: {
          // "950": "rgba(89,80,229,1)",
          // below is not applied but used deifined inside global.css in side @themes
          "950": "hsla(0,0%,100%,0.7);",
          "951": "hsla(0,0%,100%,0.4);",
          "952": "#373b64",
        },
      },
      backgroundImage: {
        gradientImg: "url('/static/background.png')",
      },
      // Extend spacing
      //   spacing: {
      //     "128": "32rem",
      //     "144": "36rem",
      //   },
      // Extend screens (breakpoints)
      //   screens: {
      //     tablet: "640px",
      //     laptop: "1024px",
      //     desktop: "1280px",
      //   },
      // Extend font families
      //   fontFamily: {
      //     heading: ["Montserrat", "sans-serif"],
      //     body: ["Open Sans", "sans-serif"],
      //   },

      // *** ADD THIS block to define your custom fonts for Tailwind utilities ***
      fontFamily: {
        // Use the actual name "IBM Plex Sans" first, then the CSS variable for fallbacks
        // 'sans' is the default Tailwind utility name
        sans: ["var(--font-ibmplexsans)", "Arial", "Helvetica", "sans-serif"],

        // 'inter' is a custom utility name you could use as `font-inter`
        inter: ["var(--font-inter)", "sans-serif"],

        // // 'sans' is the default Tailwind utility name
        // sans: ["var(--font-ibmplexsans)"],
        // // 'inter' is a custom utility name you could use as `font-inter`
        // inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config;
