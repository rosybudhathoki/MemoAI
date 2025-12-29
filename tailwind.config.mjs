import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
  safelist: [
    'prose',
    'prose-sm',
    'prose-lg',
    'sm:prose',
    'lg:prose',
  ],
};
