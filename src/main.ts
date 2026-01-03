import './assets/main.css';
import Aura from '@primeuix/themes/aura';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { Preferences } from '@capacitor/preferences';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';

import App from '@/App.vue';
import router from '@/router/routes';
import { useLanguageStore } from '@/stores/language';
import { db } from '@/db/db';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config';

const app = createApp(App);

const getStartingLanguage = async (): Promise<string> => {
  let language: string;
  const storedLanguage = await Preferences.get({ key: 'language' });

  if (storedLanguage.value) {
    language = storedLanguage.value;
  } else language = DEFAULT_LANGUAGE;

  return language;
};

app.use(createPinia());
app.use(router);

/** Vue I18n */
const language = await getStartingLanguage();
const { default: messages } = await import(`./locales/${language}.json`);
const languageStore = useLanguageStore();

languageStore.setCurrentLanguage(language);
languageStore.setAvailableLanguages(LANGUAGES);

app.use(
  createI18n({
    legacy: false,
    locale: language,
    fallbackLocale: 'en',
    messages: { [language]: messages },
  }),
);

/** PrimeVue */
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});
app.use(ConfirmationService);
app.use(ToastService);

app.mount('#app');

db.open().catch(function (e) {
  console.error('Open failed: ' + e.stack);
});
