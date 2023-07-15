import clsx from 'clsx';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'teyfik-i18n-next';
import HeaderMenu from './Layout/HeaderMenu';
import FooterLinks from './Layout/FooterMenu';

const links: Parameters<typeof HeaderMenu>[0]['items'] = [
  {
    href: '/',
    label: 'common.nav.home',
  },
  {
    href: '/gallery',
    label: 'common.nav.gallery',
  },

  {
    href: '#company',
    label: 'common.nav.company.label',
    children: [
      { href: '/company/about', label: 'common.nav.company.about' },
      { href: '/company/mission', label: 'common.nav.company.mission' },
      { href: '/company/vision', label: 'common.nav.company.vision' },
    ],
  },
  { href: '/contact', label: 'common.nav.contact' },
  {
    label: 'common.nav.language.label',
    children: [
      { href: '', locale: 'en', label: 'common.nav.language.en' },
      { href: '', locale: 'tr', label: 'common.nav.language.tr' },
    ],
  },
];

const openSans = Open_Sans({ subsets: ['latin-ext'] });

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
  const appTitle = t('common.title');
  const pageTitle = useMemo(
    () => (title ? t(title) + ' • ' + appTitle : appTitle),
    [appTitle, t, title],
  );
  const pageDescription = useMemo(
    () => (description ? t(description) : t('common.description')),
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

      <HeaderMenu items={links} />

      <main>{children}</main>

      <FooterLinks data={links} />
    </section>
  );
}
