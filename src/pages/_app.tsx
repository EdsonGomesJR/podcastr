import { AppProps } from "next/app";

import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import { Header } from "../components/Header";
import { Player } from "../components/Player";
import "../styles/global.scss";
import styles from "../styles/app.module.scss";
import { useState } from "react";
import { PlayerContextProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </div>
      </PlayerContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
