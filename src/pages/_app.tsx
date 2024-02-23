import '~components/Layout/Layout.styles.scss';
import '~styles/globals.styles.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
