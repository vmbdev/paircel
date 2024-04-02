<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
</script>

<template>
  <Toolbar class="main-toolbar">
    <template #center>
      <div class="flex align-items-center gap-2 w-full justify-content-evenly">
        <RouterLink to="/create">
          <Button
            icon="pi pi-plus"
            severity="secondary"
            aria-label="Create vehicle"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'history' }">
          <Button
            icon="pi pi-history"
            severity="secondary"
            aria-label="Parking history"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'park' }">
          <Button
            icon="pi pi-map-marker"
            class="special-button m-2 w-3rem h-3rem"
            severity="primary"
            aria-label="Park your vehicle"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'list' }">
          <Button
            icon="pi pi-car"
            severity="secondary"
            aria-label="Vehicle list"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'about' }">
          <Button
            icon="pi pi-question"
            severity="secondary"
            aria-label="About Paircel"
          />
        </RouterLink>
      </div>
    </template>
  </Toolbar>
</template>

<style>
.main-toolbar {
  max-height: 13vh;
}
.router-link-active {
  button:not(.special-button) {
    background-color: #e4e4e4;
  }
}
</style>
