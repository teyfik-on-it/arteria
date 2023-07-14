import '@/styles/globals.css';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import type { AppProps } from 'next/app';
import { I18nProvider } from 'teyfik-i18n-next';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <I18nProvider i18n={pageProps.i18n}>
        <Component {...pageProps} />
      </I18nProvider>
    </MantineProvider>
  );
}
