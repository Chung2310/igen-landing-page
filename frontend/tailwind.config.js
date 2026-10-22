/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent (kept teal)
        "primary": "#00adfc",
        "primary-hover": "#0095d9",
        "primary-light": "#e0f2fe",
        // Stripe-style neutrals
        "ink": "#071629",        // headings / dark ink
        "body": "#475569",       // body copy
        "muted": "#64748b",      // muted / captions
        "surface": "#ffffff",    // primary surface
        "surface-alt": "#f6f8fd",// alternating section bg
        "navy": "#0f172a",       // dark accent section
        "line": "#d8e2f0",       // hairline borders
      },
      fontFamily: {
        "display": ["Inter", "Be Vietnam Pro", "Segoe UI", "sans-serif"],
        "sans": ["Inter", "Be Vietnam Pro", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        // Signature multi-hue Stripe-style hero gradient (teal -> indigo -> pink -> orange)
        'hero-stripe': 'linear-gradient(100deg, #007db8 0%, #00adfc 48%, #7567ff 100%)',
        'hero-soft': 'radial-gradient(60% 80% at 30% 20%, rgba(0,173,252,0.10) 0%, transparent 60%), radial-gradient(50% 70% at 80% 10%, rgba(117,103,255,0.10) 0%, transparent 60%)',
      },
      boxShadow: {
        'card': '0 15px 35px rgba(20,68,108,0.08), 0 5px 15px rgba(0,0,0,0.04)',
        'card-hover': '0 30px 60px rgba(20,68,108,0.14)',
        'button': '0 4px 6px rgba(0,0,0,0.06)',
        'button-primary': '0 4px 14px rgba(0,173,252,0.24)',
      },
      borderRadius: {
        'card': '16px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
