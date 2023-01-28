/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        monterey:
          "url(https://dockhunt-images.nyc3.cdn.digitaloceanspaces.com/monterey.jpg)",
      },
    },
  },
  plugins: [],
};
