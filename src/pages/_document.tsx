import Document, { Html, Head, Main, NextScript } from "next/document";

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

          <meta name="theme-color" content="#C1C5FE" />
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
          <meta name="msapplication-TileColor" content="#232C93" />
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
            content="予算管理ツール「Pay History」なら、月の予算、使った金額、予算残高を最もシンプルに管理できます。"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="description"
            content="予算管理ツール「Pay History」なら、月の予算、使った金額、予算残高を最もシンプルに管理できます。"
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
