/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Include Flowbite's JavaScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin, // Include Flowbite plugin using ES Modules syntax
  ],
};
