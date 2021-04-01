import { theme } from "./Theme";
import { CircularProgress, ThemeProvider } from "@material-ui/core";

export default function Loading({ primary } : {primary: boolean}) {

  return (
    <ThemeProvider theme={theme}>
      <CircularProgress color={primary ? "primary" : "secondary"} />
    </ThemeProvider>
  );
}
