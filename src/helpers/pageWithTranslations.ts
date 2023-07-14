import directoryLoader from "teyfik-directory-loader";
import { pageWithTranslationsFactory } from "teyfik-i18n-next";
import { Translations } from "teyfik-i18n-next/dist/types/Translations";

const pageWithTranslations = pageWithTranslationsFactory(
  (locale) =>
    directoryLoader(
      "public",
      "locales",
      locale,
    ).load() as Promise<Translations>,
);

export default pageWithTranslations;
