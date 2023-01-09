import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    white: "#FFFFFF",
    gray: {
      100: "#E1E1E6",
      200: "#C4C4CC",
      500: "#7C7C8A",
      700: "#202024",
      900: "#121214"
    },
    green: {
      500: "#04D361"
    },
    orange: {
      500: "#FBA94C"
    }
  },
  fonts: {
    bold: 'Roboto_700Bold',
    regular: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
})