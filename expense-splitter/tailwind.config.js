/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(to right, ${theme("colors.primary")}, ${theme("colors.secondary")})`,
        "gradient2": `linear-gradient(to right, ${theme("colors.tertiary")}, ${theme("colors.quaternary")})`,
        "gradient3": `linear-gradient(to right, ${theme("colors.quinary")}, ${theme("colors.senary")})`,
        "gradient4": `linear-gradient(to right, ${theme("colors.septenary")}, ${theme("colors.octonary")})`,
      }),
      colors:  {
        primary: "#FFF0F0",
        secondary: "f4ebfe",
        tertiary: "#FFC4DA",
        quaternary: "#d6b4fc",
        quinary: "#FFD6E4",
        senary: "#8E4585",
        septenary: "#FCE0E8", 
        octonary: "#9A758E",
        accent: "#51434a",
        "card-bg": "#D4E2F7",
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
