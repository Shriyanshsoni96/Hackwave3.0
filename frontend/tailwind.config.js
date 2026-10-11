/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ReviveAI Design System Tokens from PRD v2.0 Section 13
        navy: {
          DEFAULT: '#14213D',
          50: '#F0F4FA',
          100: '#D9E2EC',
          200: '#BCCCDC',
          700: '#1F325C',
          800: '#182747',
          900: '#14213D',
          950: '#0C1426',
        },
        indigo: {
          DEFAULT: '#4F46E5',
          soft: '#EEF2FF',
          hover: '#4338CA',
          light: '#6366F1',
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        teal: {
          DEFAULT: '#0F766E',
          soft: '#F0FDFA',
          50: '#F0FDFA',
          100: '#CCFBF1',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
        },
        surface: {
          page: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        brandText: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        risk: {
          high: '#DC2626',
          'high-bg': '#FEF2F2',
          'high-border': '#FECACA',
          medium: '#D97706',
          'medium-bg': '#FFFBEB',
          'medium-border': '#FDE68A',
          low: '#15803D',
          'low-bg': '#F0FDF4',
          'low-border': '#BBF7D0',
        },
        status: {
          success: '#15803D',
          warning: '#B45309',
          error: '#B91C1C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 4px 12px 0 rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
        'modal': '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
