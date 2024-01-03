import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-nunito)',
      },

      gridTemplateColumns: {
        signIn: '404px 1fr',
        sideBar: '180px 1fr',
        pages: '1fr 224px',
      },
      gridTemplateRows: {
        pages: '100px 1fr',
      },
      colors: {
        Mll_green_100: '#50B2C0',
        Mll_green_200: '#255D6A',
        Mll_green_300: '#0A313C',

        Mll_purple_100: '#8381D9',
        Mll_purple_200: '#2A2879',

        Mll_gray_100: '#F8F9FC',
        Mll_gray_200: '#E6E8F2',
        Mll_gray_300: '#D1D6E4',
        Mll_gray_400: '#8D95AF',
        Mll_gray_500: '#303F73',
        Mll_gray_600: '#252D4A',
        Mll_gray_700: '#181C2A',
        Mll_gray_800: '#0E1116',
      },
      backgroundImage: {
        Gradient_vertical: 'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
        Gradient_horizontal:
          'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      },
      keyframes: {
        sideBarBookIn: {
          '0%': { transform: 'translateX(560px)', opacity: '0' },
          '100%': { transform: 'translateX(0px)', opacity: '1' },
        },
        sideBarBookOut: {
          '0%': { transform: 'translateX(0px)', opacity: '1' },
          '100%': { transform: 'translateX(560px)', opacity: '0' },
        },
      },
      animation: {
        sideBarBookIn: 'sideBarBookIn 700ms ease-in-out',
        sideBarBookOut: 'sideBarBookOut 700ms ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
