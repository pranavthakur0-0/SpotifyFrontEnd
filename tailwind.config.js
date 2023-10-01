/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--green)',
      },
      fontFamily : {
        spotifyLight : "spotify-light",
        spotifyBook  : "spotify-book",
        spotifyBold : "spotify-bold",
        spotifyBlack : "spotify-black"
      },
      'peer-invalid': {
         backgroundColor: 'red',
       },
    }
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
}