import React, { useEffect } from 'react';
import client from "@/src/apollo/client";
import { ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style/style.css";
import "../src/style/responsive.css";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    document.body.className = pageProps.uniqueClass ? pageProps.uniqueClass : '';
  });
  return (
    <ApolloProvider client={client}>
      <div key={router.route}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}
