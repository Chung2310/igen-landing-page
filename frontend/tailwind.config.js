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
        "primary": "#0097b2",
        "primary-hover": "#008199",
        "primary-light": "#e6f6f9",
        // Stripe-style neutrals
        "ink": "#0a2540",        // headings / dark ink
        "body": "#425466",       // body copy
        "muted": "#697386",      // muted / captions
        "surface": "#ffffff",    // primary surface
        "surface-alt": "#f6f9fc",// alternating section bg
        "navy": "#0a2540",       // dark accent section
        "line": "#e3e8ee",       // hairline borders
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
      },
      backgroundImage: {
        // Signature multi-hue Stripe-style hero gradient (teal -> indigo -> pink -> orange)
        'hero-stripe': 'linear-gradient(100deg, #0097b2 0%, #4f7fff 28%, #7a5cff 48%, #ff6b9d 72%, #ff8a3d 100%)',
        'hero-soft': 'radial-gradient(60% 80% at 30% 20%, rgba(0,151,178,0.10) 0%, transparent 60%), radial-gradient(50% 70% at 80% 10%, rgba(122,92,255,0.10) 0%, transparent 60%)',
      },
      boxShadow: {
        'card': '0 15px 35px rgba(60,66,87,0.08), 0 5px 15px rgba(0,0,0,0.04)',
        'card-hover': '0 30px 60px rgba(60,66,87,0.12)',
        'button': '0 4px 6px rgba(0,0,0,0.06)',
        'button-primary': '0 4px 14px rgba(0,151,178,0.30)',
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
