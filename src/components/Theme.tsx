"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors, responsiveFontSizes } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: colors.blue[600],
      },
      secondary: {
        main: colors.purple[600],
      },
    },
  })
);

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

type ThemeType = {
  children: ReactNode;
};

const Theme = ({ children }: ThemeType) => {
  const clientSideEmotionCache = createEmotionCache();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </CacheProvider>
  );
};

export default Theme;
