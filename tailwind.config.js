/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        romantic: ['"Dancing Script"', 'cursive'],
        soft: ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'float': 'float 25s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      boxShadow: {
        'glow-soft': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-strong': '0 0 40px rgba(236, 72, 153, 0.6)',
      },
    },
  },
  plugins: [],
}
