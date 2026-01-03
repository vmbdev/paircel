<script setup lang="ts">
const props = defineProps<{
  color: number | string;
  size: number;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
  >
    <rect
      rx="5"
      ry="5"
      stroke-width="1"
      stroke="black"
      stroke-opacity="0.5"
      :width="props.size"
      :height="props.size"
      :fill="`#${props.color}`"
    />
  </svg>
</template>
