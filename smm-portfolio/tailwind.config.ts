import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Нежная розово-персиковая палитра
        primary: {
          50: '#fff5f7',
          100: '#ffe8f0',
          200: '#ffd1e3',
          300: '#ffb3d1',
          400: '#ff8fb8',
          500: '#ff6b9d',
          600: '#ff4d89',
          700: '#eb3d7a',
          800: '#d63570',
          900: '#c22d65',
        },
        // Лавандово-сиреневая палитра
        secondary: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e8dbff',
          300: '#d9c2ff',
          400: '#c7a1ff',
          500: '#b57fff',
          600: '#a35eff',
          700: '#9247ea',
          800: '#813ad1',
          900: '#7030b8',
        },
        // Персиково-абрикосовый
        peach: {
          50: '#fff9f5',
          100: '#fff0e6',
          200: '#ffe0cc',
          300: '#ffccb3',
          400: '#ffb399',
          500: '#ff9980',
          600: '#ff7f66',
          700: '#ff654d',
          800: '#f54d3b',
          900: '#e03828',
        },
        // Мягкий серо-лавандовый (вместо черного)
        soft: {
          50: '#fdfcfd',
          100: '#f9f8fa',
          200: '#f1eff3',
          300: '#e5e2ea',
          400: '#d3cdd9',
          500: '#b8afc3',
          600: '#9a8faa',
          700: '#7d7390',
          800: '#625876',
          900: '#4a3f5c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-soft': 'linear-gradient(135deg, #fff5f7 0%, #faf7ff 100%)',
        'gradient-pastel': 'linear-gradient(135deg, #ffe8f0 0%, #f3edff 50%, #fff0e6 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(255, 107, 157, 0.25), 0 10px 20px -2px rgba(255, 107, 157, 0.1)',
        'soft-lg': '0 10px 40px -10px rgba(255, 107, 157, 0.3)',
        'glow': '0 0 20px rgba(255, 107, 157, 0.4)',
        'glow-purple': '0 0 20px rgba(181, 127, 255, 0.4)',
        'glow-peach': '0 0 20px rgba(255, 153, 128, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
