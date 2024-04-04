<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <header class="flex justify-content-center">
    <img
      class="firststart__logo"
      src="@/assets/logo-256.png"
      :alt="$t('general.paircel-logo')"
    />
  </header>

  <section class="flex flex-column align-items-center">
    <h1>{{ $t('first-start.title') }}</h1>
    <p class="text-center">
      {{ $t('first-start.desc') }}
    </p>
    <p class="text-center">{{ $t('first-start.first-step') }}</p>
    <RouterLink to="/create">
      <Button
        :label="$t('general.create-vehicle')"
        icon="pi pi-car"
        iconPos="right"
      />
    </RouterLink>
  </section>
</template>
