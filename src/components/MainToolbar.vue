<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
</script>

<template>
  <Toolbar>
    <template #center>
      <div class="flex align-items-center gap-2 w-full justify-content-evenly">
        <RouterLink to="/create">
          <Button icon="pi pi-plus" severity="secondary" />
        </RouterLink>

        <RouterLink :to="{ name: 'history' }">
          <Button icon="pi pi-history" severity="secondary" />
        </RouterLink>

        <RouterLink :to="{ name: 'park' }">
          <Button
            icon="pi pi-map-marker"
            class="m-2 w-3rem h-3rem"
            severity="primary"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'list' }">
          <Button icon="pi pi-car" severity="secondary" />
        </RouterLink>

        <RouterLink :to="{ name: 'about' }">
          <Button icon="pi pi-question" severity="secondary" />
        </RouterLink>
      </div>
    </template>
  </Toolbar>
</template>
