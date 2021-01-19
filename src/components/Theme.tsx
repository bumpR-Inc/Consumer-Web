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
    primary: { // orange
      main: '#C9512B',
      dark: '#B04A29'
    },
    secondary: { // grey
      main: '#545453',
    },
    error: { // red
      main: '#BC2F2F',
    },
    success: { // green
      main: '#428D36',
      dark: '#337129'
    },
    info: { // off-white 
      main: '#FFFBF5',
    }
    
  }
});