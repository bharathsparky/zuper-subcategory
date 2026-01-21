/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary colors from Figma
        'primary-blue': '#3b82f6',
        'active-bg': '#dbeafe',
        
        // Border colors
        'border-main': '#e2e8f0',
        'border-input': '#cbd5e1',
        'border-table': '#e4e4e7',
        
        // Text colors
        'text-primary': '#252a31',
        'text-dark': '#1e293b',
        'text-secondary': '#475569',
        'text-muted': '#697d95',
        'text-light': '#4f5e71',
        'placeholder': '#94a3b8',
        'breadcrumb': '#475467',
        'heading-dark': '#11344d',
        
        // Background colors
        'bg-sidebar': '#f8fafc',
        'bg-modules': '#f1f5f9',
        'bg-avatar': '#e2e8f0',
      },
      fontSize: {
        '10.5': '10.5px',
        '12.6': '12.6px',
        '14': '14px',
        '17.5': '17.5px',
        '28': '28px',
      },
      lineHeight: {
        '17.5': '17.5px',
        '21': '21px',
        '24.5': '24.5px',
        '28': '28px',
      },
      borderRadius: {
        '5.25': '5.25px',
        '7': '7px',
      },
      spacing: {
        '7': '7px',
        '10.5': '10.5px',
        '14': '14px',
        '21': '21px',
        '35': '35px',
        '49': '49px',
        '252': '252px',
      }
    },
  },
  plugins: [],
}
