import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router/routes';
import { db } from './db/db';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);

app.mount('#app');

db.open().catch(function (e) {
  console.error('Open failed: ' + e.stack);
});
