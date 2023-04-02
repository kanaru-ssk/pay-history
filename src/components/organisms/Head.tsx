import NextHead from "next/head";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
};

const Head = ({ title }: Props) => {
  return (
    <NextHead>
      <title>{title ?? "Pay History"}</title>
      <meta
        name="description"
        content="With the budget management tool 'Pay History', you can manage your monthly budget, amount spent, and budget remaining in the simplest way."
      />
      <meta property="og:title" content="Pay History" />
      <meta
        property="og:description"
        content="With the budget management tool 'Pay History', you can manage your monthly budget, amount spent, and budget remaining in the simplest way."
      />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="theme-color" content="#fff" />
      <link rel="icon" href="/favicon.svg" />

      <meta name="application-name" content="Pay History" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Pay History" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#fff" />
      <meta name="msapplication-tap-highlight" content="no" />
      <link rel="apple-touch-icon" href="/icon-180.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width viewport-fit=cover"
      />
    </NextHead>
  );
};

export default Head;
