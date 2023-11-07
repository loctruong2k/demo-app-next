import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "slide-show": {
          '0%': { transform: 'translateX(20vw)' },
          '100%': { transform: 'translateX(0px)' },
        },
        "slide-hide": {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-120vh)' },
        }
      },
      animation: {
        "slide-show": 'slide-show 0.5s ease-in-out',
        "slide-hide": 'slide-hide 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}
export default config
