import AppLayout from '@layouts/appLayout';
import '@styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
      }}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SWRConfig>
  );
}

export default MyApp;
