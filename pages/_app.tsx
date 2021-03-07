import Head from "next/head";
import { createContext } from "react";
import "../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";

export const PostsCotext = createContext({ count: 1 });

const App = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
