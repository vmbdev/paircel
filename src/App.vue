<script setup lang="ts">
import { useRoute } from 'vue-router';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';

import { useDatabaseStore } from '@/stores/database';
import { db } from '@/db/db';
import FirstStart from '@/components/FirstStart.vue';

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
    <Toolbar>
      <template #start>
        <div class="flex align-items-center gap-2">
          <RouterLink to="/create">
            <Button label="New" text plain />
          </RouterLink>

          <RouterLink to="/history">
            <Button label="History" text plain />
          </RouterLink>
        </div>
      </template>

      <template #center>
        <RouterLink to="/park">
          <Button icon="pi pi-map-marker" class="mr-2" severity="primary" />
        </RouterLink>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <RouterLink to="/">
            <Button label="List" text plain />
          </RouterLink>

          <RouterLink to="/about">
            <Button label="About" text plain />
          </RouterLink>
        </div>
      </template>
    </Toolbar>
    <RouterView />
  </template>
</template>
