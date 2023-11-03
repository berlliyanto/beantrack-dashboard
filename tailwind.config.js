/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      // => @media (min-width: 480px) { ... } 

      'sm' : '640px',
      // => @media (min-width: 640px) { ... }

      'md' : '768px',
      // => @media (min-width: 768px) { ... }

      'lg' : '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl' : '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl' : '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'primary' : '#3A7358',
        'secondary' : '#ECEDEF',
        'secondary2': '#F6F6F6'
      },
      backgroundImage: {
        'auth-bg': "url(images/bg-auth.png)"
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}

