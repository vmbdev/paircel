<script setup lang="ts">
import ParkingSelectorMap from '@/components/ParkingSelectorMap.vue';
import type { PaircelPosition } from '@/types/paircel-position';

const props = defineProps<{
  coords: PaircelPosition;
}>();
</script>

<template>
  <ParkingSelectorMap :viewMode="true" :coords="props.coords" />
</template>
