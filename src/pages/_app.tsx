import '~components/Layout/Layout.styles.scss';
import '~components/UsersList/UsersList.styles.scss';
import '~components/UserForm/UserForm.styles.scss';
import '~styles/globals.styles.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
