import clsx from "clsx";
import { Open_Sans } from "next/font/google";
import Head from "next/head";
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { useTranslation } from "teyfik-i18n-next";

const openSans = Open_Sans({ subsets: ["latin-ext"] });

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export default function Layout({
  title,
  description,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const { t } = useTranslation();
  const appTitle = t("common.title");
  const pageTitle = useMemo(
    () => (title ? t(title) + " • " + appTitle : appTitle),
    [appTitle, t, title],
  );
  const pageDescription = useMemo(
    () => (description ? t(description) : t("common.description")),
    [t, description],
  );

  return (
    <section {...props} className={clsx(openSans.className, className)}>
      <Head>
        <title>{pageTitle}</title>

        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={pageTitle} />
        <meta name="og:description" content={pageDescription} />
      </Head>

      <header></header>

      <main>{children}</main>

      <footer></footer>
    </section>
  );
}
