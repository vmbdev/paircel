<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
</script>

<template>
  <Toolbar>
    <template #center>
      <div class="flex align-items-center gap-2 w-full justify-content-evenly">
        <RouterLink to="/create">
          <Button
            icon="pi pi-plus"
            severity="secondary"
            :aria-label="$t('general.create-vehicle')"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'history' }">
          <Button
            icon="pi pi-history"
            severity="secondary"
            :aria-label="$t('main-toolbar.history')"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'park' }">
          <Button
            icon="pi pi-map-marker"
            class="special-button m-2 w-3rem h-3rem"
            severity="primary"
            :aria-label="$t('main-toolbar.park')"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'list' }">
          <Button
            icon="pi pi-car"
            severity="secondary"
            :aria-label="$t('main-toolbar.list')"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'about' }">
          <Button
            icon="pi pi-cog"
            severity="secondary"
            :aria-label="$t('main-toolbar.about')"
          />
        </RouterLink>
      </div>
    </template>
  </Toolbar>
</template>

<style>
.router-link-active {
  button:not(.special-button) {
    background-color: #e4e4e4;
  }
}
</style>
