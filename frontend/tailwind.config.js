/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0097b2",
        "primary-hover": "#008199",
        "primary-light": "#e0f7fa",
        "background-light": "#ffffff",
        "background-alt": "#0f172a",
        "background-dark": "#050505",
        "text-main": "#f8fafc",
        "text-secondary": "#94a3b8",
        "accent": "#f59e0b",
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        "sans": ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'conic-gradient': 'conic-gradient(from 0deg, transparent 0 340deg, #0097b2 360deg)',
        'scan-grid': 'linear-gradient(90deg, rgba(0,151,178,0.1) 1px, transparent 1px), linear-gradient(rgba(0,151,178,0.1) 1px, transparent 1px)',
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 25px rgba(0, 151, 178, 0.3)',
        'glow-strong': '0 0 50px rgba(0, 151, 178, 0.5)',
        'card': '0 20px 40px -10px rgba(0,0,0,0.5)',
        'neon': '0 0 10px rgba(0, 151, 178, 0.5), 0 0 20px rgba(0, 151, 178, 0.3)',
        'core-glow': '0 0 30px rgba(0, 151, 178, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.5)',
        'laser-point': '0 0 10px #0097b2, 0 0 20px #0097b2, 0 0 40px #00ffff',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'float-reverse': 'float-reverse 9s ease-in-out 1s infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'scan-vertical': 'scanVertical 3s ease-in-out infinite',
        'robot-hover': 'robotHover 4s ease-in-out infinite',
        'core-pulse': 'corePulse 3s ease-in-out infinite',
        'plate-rotate': 'plateRotate 12s linear infinite',
        'fiber-flow': 'fiberFlow 1s linear infinite',
        'micro-shake': 'microShake 0.2s linear infinite',
        'lens-glint': 'lensGlint 4s ease-in-out infinite',
        'laser-flicker': 'laserFlicker 0.1s infinite alternate',
        'scan-grid-move': 'scanGridMove 2s linear infinite',
        'blueprint-reveal': 'blueprintReveal 1.5s ease-out forwards',
        'sound-wave': 'soundWave 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'equalizer': 'equalizer 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'border-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scanVertical: {
          '0%, 100%': { top: '0%', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { top: '100%', opacity: 0 }
        },
        robotHover: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' }
        },
        corePulse: {
          '0%, 100%': { transform: 'scale(0.95)', boxShadow: '0 0 20px rgba(0, 151, 178, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 50px rgba(0, 151, 178, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.6)' }
        },
        plateRotate: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)' }
        },
        fiberFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 200%' }
        },
        microShake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1px, 1px)' },
          '50%': { transform: 'translate(-1px, -1px)' },
          '75%': { transform: 'translate(1px, -1px)' }
        },
        lensGlint: {
          '0%, 100%': { opacity: 0, left: '-50%', transform: 'rotate(45deg)' },
          '50%': { opacity: 0.8, left: '150%', transform: 'rotate(45deg)' }
        },
        laserFlicker: {
          '0%': { opacity: 0.8, height: '1px' },
          '100%': { opacity: 1, height: '2px' }
        },
        scanGridMove: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' }
        },
        blueprintReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: 1 }
        },
        soundWave: {
          '0%': { width: '0px', height: '0px', opacity: 0.8, borderWidth: '2px' },
          '100%': { width: '100px', height: '100px', opacity: 0, borderWidth: '0px' }
        },
        equalizer: {
          '0%': { height: '2px' },
          '100%': { height: '100%' }
        }
      }
    },
  },
  plugins: [],
}
