import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>{`
        * {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
