import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `"Albert Sans", sans-serif`,
    body: `"Albert Sans", sans-serif`,
  },
  semanticTokens: {
    colors: {
      title: {
        default: "gray.600",
        _dark: "gray.100",
      },
      description: {
        default: "gray.500",
        _dark: "gray.300",
      },
      bg: {
        default: "white",
        _dark: "bg.900",
      },
      float: {
        default: "whiteAlpha.600",
        _dark: "blackAlpha.600",
      },
      panel: {
        default: "white",
        _dark: "#202020",
      },
      border: {
        default: "gray.100",
        _dark: "transparent",
      },
      hover: {
        default: "blackAlpha.100",
        _dark: "whiteAlpha.100",
      },
    },
  },
});
