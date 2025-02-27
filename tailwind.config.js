module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#de1b25",
        secondary: "#1c1c1e",
        dark: "#121214",
        light: "#f8f8f8",
        accent: "#B91C1C",
        darkred: "#7f1d1d",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      height: {
        128: "32rem",
        144: "36rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      screens: {
        "3xl": "1920px",
      },
      animation: {
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
};
