import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    react: {
      wait: true,
    },
  });


export default i18n;
