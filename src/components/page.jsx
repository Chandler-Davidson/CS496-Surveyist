import React from 'react';
import Head from 'next/head';

import Header from './header';

export default function Page({ children }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      {children}
      <style jsx global>{`
        body {
          background: #f8f9fc;
          font: 11px menlo;
          margin: 1%;
        }
      `}</style>
    </div>
  );
}
