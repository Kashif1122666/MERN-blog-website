// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // ✅ THIS LINE
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // ✅ REQUIRED
  ],
}
