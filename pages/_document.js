import Document, { Html, Head, Main, NextScript } from "next/document";
import { ADSENSE_ID } from "../lib/constants";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        </Head>
        <body className="bg-[#FFF9DB] md:bg-transparent md:bg-gradient-to-tl md:from-[#ff8921] md:to-[#FF5321] md:bg-scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
