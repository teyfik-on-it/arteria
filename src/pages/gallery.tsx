import Layout from '@/components/Layout';
import pageWithTranslations from '@/helpers/pageWithTranslations';
import galleryImages from '@/images/gallery';
import { Container } from '@mantine/core';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lightgallery.scss';
import Image from 'next/image';
import { useTranslation } from 'teyfik-i18n-next';

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <Layout title="gallery.title">
      <Container>
        <section className="mt-12">
          <header className="text-center">
            <h2 className="text-3xl">{t('gallery.title')}</h2>
          </header>

          <br />

          <aside className=" flex justify-center">
            <p className="whitespace-pre-wrap max-w-md text-center">
              {t('gallery.description')}
            </p>
          </aside>

          <main className="mt-4">
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
            >
              {galleryImages.map(({ image, name }) => (
                <a key={image.src} href={image.src}>
                  <Image alt={name} src={image} className="h-40 object-cover" />
                </a>
              ))}
            </LightGallery>
          </main>
        </section>
      </Container>
    </Layout>
  );
}

export const getStaticProps = pageWithTranslations('common gallery');
