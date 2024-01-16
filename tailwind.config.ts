import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        glare:
          "linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(255, 255, 255, .8) 35%, #fff 50%, rgba(255, 255, 255, .8) 65%, rgba(0, 0, 0, 0) 95%)",
      },
      keyframes: {
        "skeleton-loading": {
          from: {
            backgroundPosition: "200% 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        skeleton: "skeleton-loading 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
