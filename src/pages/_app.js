import "@/css/toggle.css";
import "@/css/tailwind.css";
import Head from "next/head";
import Header from "@/components/header/Header";
import SectionContainer from "@/components/SectionContainer";
import ThemeContext, { ThemeProvider } from "@/css/theme";
import classNames from "classnames";
import defaultTheme from "tailwindcss/defaultTheme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <div
            className={classNames("antialiased", {
              "bg-gray-900 text-white": isDarkMode,
            })}
          >
            <Head>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#696969"
              />
              <meta name="msapplication-TileColor" content="#ffffff" />
              <meta
                name="theme-color"
                content={
                  isDarkMode
                    ? defaultTheme.colors.gray["900"]
                    : defaultTheme.colors.pink["200"]
                }
              />
            </Head>
            <SectionContainer>
              <Header />
            </SectionContainer>
            <SectionContainer>
              <main>
                <Component {...pageProps} />
              </main>
            </SectionContainer>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
