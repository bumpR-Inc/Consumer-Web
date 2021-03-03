import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import React from "react";
import { theme } from "./Theme";
import { CircularProgress, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles({
  
});

export default function Loading({ primary } : {primary: boolean}) {

  return (
    <ThemeProvider theme={theme}>
      <CircularProgress color={primary ? "primary" : "secondary"} />
    </ThemeProvider>
  );
}
