/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#201c20',
          900: '#2a2428',
          800: '#352e33',
          700: '#433a40',
          600: '#564b52',
        },
        gold: {
          DEFAULT: '#fcbc10',
          dim: '#e0a40e',
        },
        brand: {
          red: '#ec2424',
        },
        mute: {
          DEFAULT: '#787c7c',
          strong: '#c8c4c0',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Copperplate', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'Avenir', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(252, 188, 16, 0.22)',
      },
    },
  },
  plugins: [],
}
