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
    body: "Lexend, sans-serif, Grape Nuts",
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
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "black.300",
            _placeholder: {
              color: "inherit",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderColor: "black.300",
            _placeholder: {
              color: "inherit",
            },
          },
        },
      },
    },
  },
});

export default customTheme;
