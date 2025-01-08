/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        gradientLight: `linear-gradient(120deg, ${theme("colors.lightPink")}, ${theme("colors.lightPurple")})`,
        gradientDark: `linear-gradient(217deg, ${theme("colors.darkPink")}, ${theme("colors.darkPurple")})`,
      }),
      colors: {
        lightPink: "#FFE8E8",
        lightPurple: "f4ebfe",
        darkPink: "#FFD6E4",
        darkPurple: "#8E4585",
        accent: "#371a13",
        "card-bg": "#ebdcfd",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/*
Cotton Candy: #FFC4DA
Mimi Pink:  #FFD6E4
Misty Rose: #FFE8E8
Lavender Blush (lightest): #FFF0F0 
Piggy Pink: #FCE0E8

Light Purple: #dab1da
Light Violet: #d6b4fc, dec4fc
Faded Violet: ebdcfd
Faint Violet: f4ebfe

Plum: #8E4585
Nerolac Deep Plum: #51434a
Dulux 195 Soft Plum: #AE8F9A
Ace 1C-4D Rich Plum: #9A758E
*/
