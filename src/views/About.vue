<script setup lang="ts">
import Avatar from 'primevue/avatar';
</script>

<template>
  <header class="flex justify-content-center">
    <img
      class="firststart__logo"
      src="@/assets/logo-256.png"
      alt="Paircel Logo"
    />
  </header>
  <section class="flex flex-column align-items-center gap-3">
    <h1>Paircel © 2024</h1>
    <strong class="text-center">
      Developed with the intention of never having to send yourself the location
      again!
    </strong>
    <a href="https://github.com/vmbdev/paircel">
      <Avatar icon="pi pi-github" class="mr-2" size="xlarge" />
    </a>
  </section>
</template>
