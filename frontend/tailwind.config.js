/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          800: '#1c1917',
          900: '#0c0a09',
        },
        accent: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          cobalt: '#0047AB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 30px 60px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
