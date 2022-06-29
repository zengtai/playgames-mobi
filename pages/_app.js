import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { GA_ID } from "../lib/constants";
// import * as gtag from "../lib/gtag";
import NProgress from "nprogress";
import "../styles/globals.css";
import "../public/nprogress.css";
import Head from "next/head";

import favicon from "../public/brand/favicon.png";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url) => {
      NProgress.done();
    };
    const handleDone = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"
        />
        <link
          rel="icon"
          href="./brand/favicon.png"
          sizes="any"
          type="image/png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
