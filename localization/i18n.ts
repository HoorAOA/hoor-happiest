import { I18n } from 'i18n-js';

const translations = {
  en: {
    home: 'Home',
  },
  ar: {
    home: 'الرئيسية',
  }
};

const i18n = new I18n(translations);

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;