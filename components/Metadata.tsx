import Script from 'next/script';

export const Metadata = () => {
  return (
    <>
      <meta name="description" content="Get the latest PATH train times" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="theme-color" content="black" />
      <meta property="og:title" content="PATH Live Schedule" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.pathschedule.live" />
      <meta property="og:image" content="/ogimage.png" />
      <meta
        property="og:description"
        content="Live board showing PATH train arrivals"
      />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-BM6ZJN3E07"
      ></Script>
      <Script id="gas">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BM6ZJN3E07');`}
      </Script>
    </>
  );
};
