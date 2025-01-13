import { Providers } from '../redux/provider';
import '../styles/globals.css';
// import '../styles/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
    );
}