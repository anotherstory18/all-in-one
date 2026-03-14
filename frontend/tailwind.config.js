/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hospitalBlue: '#1e40af',
        lightGray: '#f3f4f6'
      }
    }
  },
  plugins: []
};
