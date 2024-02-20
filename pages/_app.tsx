import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/styles";
import customTheme from "@/styles/theme";
import { NoSsr } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Poppins } from "next/font/google";
import createEmotionCache from "@/utils/createEmotionCache";
import ErrorBoundary from "@/utils/errorBoundary";
import { Theme } from "@mui/material/styles";
import { UserContextProvider } from "@/context/UserContext";
import { PageContextProvider } from "@/context/PageContext";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={customTheme}>
        <CacheProvider value={emotionCache}>
          <QueryClientProvider client={queryClient}>
            <main className={poppins.className}>
              <PageContextProvider>
                <UserContextProvider>
                  <NoSsr>
                    {" "}
                    <Component {...pageProps} />
                  </NoSsr>
                </UserContextProvider>
              </PageContextProvider>
            </main>
          </QueryClientProvider>
        </CacheProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// recommendation -> chips as
// return report
// social media like follow and user profiles-> see what the did in the app
// book comments as feedback reports from users
// search should work for both users and books
// sort by in transactions page
