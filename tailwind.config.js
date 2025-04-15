/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        // Add custom blur values if needed
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive', 'hover', 'focus'], // Ensure variants for backdrop filter
    },
  },
  plugins: [],
}