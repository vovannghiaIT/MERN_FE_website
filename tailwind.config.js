module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        sm: "300px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary1: "#1266dd",
        secondary2: "#f73859",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
        slider2: "rgba(29,37,49,.5)",
      },
      maxWidth: {
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        300: "300px",
        200: "200px",
      },
      cursor: {
        pointer: "pointer",
      },
      boxShadow: {
        "10%": "0 0px 2px 0 rgb(60 64 67 / 10%)",
        "4md": "0 1px 3px 2px rgba(0, 0, 0, 0.1)",
        "25%": "0 0px 6px 0px rgb(60 64 67 / 25%)",
      },
      flex: {
        3: "3 3 0%",
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        " slide-right ": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
          "100%": {
            "-webkit-transform": "translateX(100px)",
            transform: "translateX(100px)",
          },
        },
      },
    },
  },
  plugins: [],
};
