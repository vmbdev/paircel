<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex align-items-center gap-2">
        <RouterLink to="/create">
          <Button label="New" text plain />
        </RouterLink>

        <RouterLink :to="{ name: 'history' }">
          <Button label="History" text plain />
        </RouterLink>
      </div>
    </template>

    <template #center>
      <RouterLink :to="{ name: 'park' }">
        <Button icon="pi pi-map-marker" class="mr-2" severity="primary" />
      </RouterLink>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <RouterLink :to="{ name: 'list' }">
          <Button label="List" text plain />
        </RouterLink>

        <RouterLink :to="{ name: 'about' }">
          <Button label="About" text plain />
        </RouterLink>
      </div>
    </template>
  </Toolbar>
</template>
