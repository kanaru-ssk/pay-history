import Document, { Html, Head, Main, NextScript } from "next/document";

import { colors } from "constants/colors";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/favicon.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            type="image/png"
            sizes="192x192"
            href="/favicon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon.png"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content={colors.SUB_COLOR} />
          <meta name="application-name" content="Pay History" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Pay History" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content={colors.MAIN_COLOR} />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
          />
          <meta property="og:title" content="Pay History" />
          <meta
            property="og:description"
            content="With the budget management tool 'Pay History', you can manage your monthly budget, amount spent, and budget remaining in the simplest way."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="description"
            content="With the budget management tool 'Pay History', you can manage your monthly budget, amount spent, and budget remaining in the simplest way."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
