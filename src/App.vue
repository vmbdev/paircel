<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useDatabaseStore } from '@/stores/database';
import { db } from '@/db/db';
import FirstStart from '@/components/FirstStart.vue';
import MainToolbar from '@/components/MainToolbar.vue';

const route = useRoute();
const store = useDatabaseStore();

(async () => {
  const res = await db.vehicles.count();
  store.setEmpty(!!!res);
})();
</script>

<template>
  <FirstStart v-if="store.empty && route.path === '/'" />

  <template v-else>
    <MainToolbar />
    <RouterView />
  </template>
</template>
