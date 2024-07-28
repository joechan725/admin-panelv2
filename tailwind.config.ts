import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        heart: colors.pink[500],
        primary: {
          bg: colors.slate[700],
          text: colors.slate[600],
        },
        secondary: {
          bg: colors.sky[500],
          text: colors.slate[500],
        },
        tertiary: {
          bg: colors.slate[100],
          text: colors.gray[500],
        },
        admin: {
          bg: colors.slate[100],
        },
        link: colors.sky[500],
        danger: colors.red[500],
        success: colors.green[500],
        safe: colors.blue[500],
        scrollbar: colors.slate[500],
        warning: colors.amber[500],
        stripe: colors.indigo[500],
        paypal: '#006ab1',
        skeleton: 'rgb(156 163 175 / 0.1)',
        youtube: '#FF0000',
        facebook: '#4267B2',
        whatsapp: '#25D366',
        signal: '#3A76F0',
      },
      screens: {
        // prettier-ignore
        'xs': '480px',
        ...defaultTheme.screens,
        '3xl': '1600px',
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        bgGreenToWhite: {
          '0%': { backgroundColor: '#DCFCE7' },
          '100%': { backgroundColor: '#FFFFFF' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: '0%' },
          '100%': { transform: 'scale(1)', opacity: '100%' },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: '0%' },
          '100%': { transform: 'scale(0.9)', opacity: '100%' },
        },
      },
      animation: {
        bgGreenToWhite: 'bgGreenToWhite 6s ease-in-out',
        shimmer: 'shimmer 2.5s infinite',
        enter: 'enter 0.2s ease-out',
        leave: 'leave 0.4s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
