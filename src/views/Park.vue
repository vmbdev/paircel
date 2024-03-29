<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Geolocation, type Position } from '@capacitor/geolocation';

const position = ref<Position | null>(null);

const getPosition = (newPosition: Position | null) => {
  position.value = newPosition;
};

onMounted(async () => {
  await Geolocation.watchPosition({}, getPosition);
});
</script>

<template>
  <p>acc: {{ position?.coords.accuracy }}</p>
  <p>lat: {{ position?.coords.latitude }}</p>
  <p>lon: {{ position?.coords.longitude }}</p>
</template>
