<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <header class="flex justify-center">
    <img
      class="firststart__logo"
      src="@/assets/logo-256.png"
      :alt="$t('general.paircel-logo')"
    />
  </header>

  <section class="flex flex-col items-center">
    <h1>{{ $t('first-start.title') }}</h1>
    <p class="text-center">
      {{ $t('first-start.desc') }}
    </p>
    <p class="text-center">{{ $t('first-start.first-step') }}</p>
    <RouterLink to="/create">
      <Button
        icon="pi pi-car"
        icon-pos="right"
        :label="$t('general.create-vehicle')"
      />
    </RouterLink>
  </section>
</template>
