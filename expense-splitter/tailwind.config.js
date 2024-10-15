/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      primary: "#FFC4DA",
      secondary: "#070d0d",
      accent: "#51434a",
      "card-bg": "#D4E2F7",
    }),
    extend: {
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(to right, ${theme("colors.pink")}, ${theme("colors.orange")})`,
      }),
      colors: {
        primary: "#FFC4DA",
        secondary: "#070d0d",
        accent: "#51434a",
        "card-bg": "#D4E2F7",
      },
      gradientColorStops: ["active", "group-hover"],
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   // ...
  //  gradientColorStops: false,
  // }
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
