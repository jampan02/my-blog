import Head from "next/head";
import { createContext } from "react";
import Router from "next/router";
import "../styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { GA_TRACKING_ID, pageview } from "../lib/gtag";

if (GA_TRACKING_ID) {
  Router.events.on("routeChangeComplete", (url) => pageview(url));
}

export const PostsCotext = createContext({ count: 1 });

const App = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) => {
  return <Component {...pageProps} />;
};

export default App;
