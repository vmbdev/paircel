<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Toast from 'primevue/toast';
import { App } from '@capacitor/app';

import { useDatabaseStore } from '@/stores/database';
import { useMapsStore } from '@/stores/maps';
import { db } from '@/db/db';
import FirstStart from '@/components/FirstStart.vue';
import MainToolbar from '@/components/MainToolbar.vue';

const route = useRoute();
const router = useRouter();
const databaseStore = useDatabaseStore();
const mapsStore = useMapsStore();

(async () => {
  const res = await db.vehicles.count();
  databaseStore.setEmpty(!res);

  App.addListener('backButton', async ({ canGoBack }) => {
    if (canGoBack) router.back();
    else await App.exitApp();
  });
})();
</script>

<template>
  <FirstStart v-if="databaseStore.empty && route.path === '/'" />

  <!-- background transparent when gmaps is active, necessary on Android -->
  <div
    v-else
    class="main-container flex flex-column"
    :class="{ transparent: mapsStore.enabled }"
  >
    <main role="main" class="main-content p-2">
      <RouterView />
    </main>
    <footer>
      <MainToolbar />
    </footer>
  </div>
  <Toast position="bottom-center" />
</template>

<style>
.main-container {
  background-color: white;
}

.main-content {
  height: 87vh;
  overflow-y: scroll;
}

.transparent {
  background-color: transparent !important;
}
</style>
