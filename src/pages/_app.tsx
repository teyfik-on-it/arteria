import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { I18nProvider } from "teyfik-i18n-next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider i18n={pageProps.i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
