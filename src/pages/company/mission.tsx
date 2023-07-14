import Layout from '@/components/Layout';
import pageWithTranslations from '@/helpers/pageWithTranslations';
import { Container } from '@mantine/core';
import { useTranslation } from 'teyfik-i18n-next';

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Container>
        <section className="flex mt-12 gap-8 justify-between">
          <div className="w-full md:max-w-xl">
            <header>
              <h2 className="text-3xl">{t('mission.title')}</h2>
            </header>

            <br />

            <main>
              <p className="whitespace-pre-wrap">{t('mission.description')}</p>
            </main>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getStaticProps = pageWithTranslations('common mission');
