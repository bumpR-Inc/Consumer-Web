import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1080,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#C9512B',
      dark: '#B04A29'
    },
    secondary: {
      main: '#545453',
    },
    error: {
      main: '#BC2F2F',
    },
    success: {
      main: '#428D36',
    },
    info: {
      main: '#FFFBF5',
    }
    
  }
});