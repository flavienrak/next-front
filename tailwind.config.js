/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "var(--bg-gradient)",
      },
      backgroundColor: {
        primary: "var(--primary-color)",
        bgRed: "var(--red)",
        bgGreen: "var(--green)",
        bgYelloW: "var(--yellow)",
      },
      textColor: {
        primaryColor: "var(--primary-color)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        textRed: "var(--red)",
        textGreen: "var(--green)",
        textYelloW: "var(--yellow)",
        textWhite: "var(--text-white)",
        textBlack: "var(--text-black)",
      },
      borderColor: {
        primaryColor: "var(--primary-color)",
      },
    },
  },
  plugins: [],
};
