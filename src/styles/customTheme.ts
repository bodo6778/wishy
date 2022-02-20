import { theme, extendTheme } from "@chakra-ui/react";

import type { Styles } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

// setup light/dark mode global defaults
const styles: Styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("#F0EDEA", "gray.900")(props),
    },
  }),
};

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    body: "Lexend, sans-serif",
    heading: "Lexend, serif",
  },
  styles,
  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
  components: {
    /** Example */
    // Button: {
    //   baseStyle: {
    //     borderRadius: 24,
    //   },
    // },
  },
});

export default customTheme;
