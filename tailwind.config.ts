import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ben-primary': '#00ff7f',
        'ben-secondary': '#0a0e27',
        'ben-accent': '#00ff7f',
        'ben-background': '#050811',
        'ben-text': '#ffffff',
        'ben-muted': '#888888',
      },
    },
  },
  plugins: [],
}
export default config
