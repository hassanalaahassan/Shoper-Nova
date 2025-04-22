/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'hover-color': 'var(--hover-color)',
        'secondry-text-color': 'var(--secondry-text-color)',
        'btn-color': 'var(--btn-color)',
        'gray-color': 'var(--gray-color)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
