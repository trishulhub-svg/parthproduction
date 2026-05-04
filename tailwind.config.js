/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04050f',
          900: '#070916',
          800: '#0c0f22',
        },
        neon: {
          green: '#00ff87',
          teal: '#00d4ff',
        },
      },
    },
  },
  plugins: [],
};
