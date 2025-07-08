import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        myfont: ['Nunito', 'sans-serif'],
          sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
});