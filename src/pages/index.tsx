import Layout from '@/components/Layout';
import pageWithTranslations from '@/helpers/pageWithTranslations';

export default function Home() {
  return (
    <Layout title="index.title">
      <section>
        <header></header>

        <main></main>
      </section>
    </Layout>
  );
}

export const getStaticProps = pageWithTranslations('common index');
