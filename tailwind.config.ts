import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#233D4D', // Deep Sapphire Blue
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#00C6A7', // Mint Green
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#58C1E2', // Electric Sky Blue
          foreground: '#FFFFFF',
        },
        highlight: {
          DEFAULT: '#F4A300', // Sunstone Gold
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#E5E9F0', // Soft Zen Gray
          foreground: '#233D4D',
        },
        success: {
          DEFAULT: '#00B23B',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F4B8C2',
          foreground: '#1C1C22',
        },
        error: {
          DEFAULT: '#FF4C61',
          foreground: '#FFFFFF',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#2B2C34',
        },
        text: {
          primary: '#233D4D',
          secondary: '#5A5A67',
          inverse: '#FFFFFF',
          muted: '#8D62D4',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
