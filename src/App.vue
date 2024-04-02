<script setup lang="ts">
import { useRoute } from 'vue-router';
import Toast from 'primevue/toast';

import { useDatabaseStore } from '@/stores/database';
import { useMapsStore } from '@/stores/maps';
import { db } from '@/db/db';
import FirstStart from '@/components/FirstStart.vue';
import MainToolbar from '@/components/MainToolbar.vue';

const route = useRoute();
const databaseStore = useDatabaseStore();
const mapsStore = useMapsStore();

(async () => {
  const res = await db.vehicles.count();
  databaseStore.setEmpty(!res);
})();
</script>

<template>
  <FirstStart v-if="databaseStore.empty && route.path === '/'" />

  <template v-else>
    <div class="main-container p-2" :class="{ transparent: mapsStore.enabled }">
      <MainToolbar />
      <div class="m-3">
        <RouterView />
      </div>
    </div>
  </template>
  <Toast position="bottom-center" />
</template>

<style>
.main-container {
  min-height: 100vh;
  background-color: white;
}

.transparent {
  background-color: transparent !important;
}
</style>
