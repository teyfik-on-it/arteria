import Layout from '@/components/Layout';
import pageWithTranslations from '@/helpers/pageWithTranslations';
import { Container } from '@mantine/core';
import { useTranslation } from 'teyfik-i18n-next';
import Image from 'next/image';
import image from '@/images/about/image-004.jpg';

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout title="about.title">
      <Container>
        <section className="flex mt-12 gap-8 justify-between">
          <div className="w-full md:max-w-md">
            <header>
              <h2 className="text-xl">{t('about.title')}</h2>
              <h3 className="text-2xl mt-2">{t('about.subTitle')}</h3>
            </header>

            <br />

            <main>
              <p className="whitespace-pre-wrap">{t('about.description')}</p>
            </main>
          </div>

          <div className="flex-1 mt-4 max-w-sm hidden md:block">
            <Image src={image} alt={t('common.title')} className="w-full" />
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getStaticProps = pageWithTranslations('common about');
