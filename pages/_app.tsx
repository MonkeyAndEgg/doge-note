import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
