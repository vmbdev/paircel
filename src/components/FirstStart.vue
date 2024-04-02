<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <header class="flex justify-content-center">
    <img
      class="firststart__logo"
      src="@/assets/logo-256.png"
      alt="Paircel Logo"
    />
  </header>

  <section class="flex flex-column align-items-center">
    <h1>Welcome to Paircel!</h1>
    <p class="text-center">
      Never again circle your whole neighbourhood looking for your car!
    </p>
    <p class="text-center">To start, let's create our first vehicle.</p>
    <RouterLink to="/create">
      <Button label="Add vehicle" icon="pi pi-car" iconPos="right" />
    </RouterLink>
  </section>
</template>
