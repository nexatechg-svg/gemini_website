export const colors = {
    primary: {
        blue: "#0047AB",
        orange: "#FF8C00",
    },
    neutral: {
        white: "#FFFFFF",
        light: "#F8F9FA",
        gray: "#6C757D",
        dark: "#2C3E50",
        black: "#000000",
    },
    hover: {
        blue: "#003580",
        orange: "#E67E00",
    },
} as const;

export type ColorTheme = typeof colors;
