import { CssBaseline } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: blueGrey["50"],
      main: blueGrey["200"],
      dark: blueGrey["500"],
    },
  },
});

export const MuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
