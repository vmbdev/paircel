<script setup lang="ts">
import AddEditVehicle from '@/components/AddEditVehicle.vue';
</script>

<template>
  <AddEditVehicle>
    <template #title>Add a new vehicle</template>
    <template #subtitle>
      Doesn't matter if its a car, a motorcycle, a truck or whatever. If it can
      be parked, it can be forgotten where.
    </template>
  </AddEditVehicle>
</template>
