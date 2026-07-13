/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          navy: '#071A2D',
          slate: '#102A43',
          slateLight: '#1b3c5e',
          cyan: '#00f0ff',
          purple: '#bd93f9',
          blue: '#1e90ff',
          darkBlue: '#0c2340',
        },
        risk: {
          safe: '#10b981',      // Green
          medium: '#f59e0b',    // Yellow
          high: '#f97316',      // Orange
          critical: '#ef4444',  // Red
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        cyber: '0 0 15px rgba(0, 240, 255, 0.15)',
        cyberGlow: '0 0 25px rgba(0, 240, 255, 0.25)',
        purpleGlow: '0 0 25px rgba(189, 147, 249, 0.25)',
        redGlow: '0 0 25px rgba(239, 68, 68, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-cyber': 'radial-gradient(circle at top, #102a43 0%, #071a2d 100%)',
        'grid-cyber': 'linear-gradient(rgba(16, 42, 67, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 42, 67, 0.1) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
