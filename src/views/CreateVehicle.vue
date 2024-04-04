<script setup lang="ts">
import AddEditVehicle from '@/components/AddEditVehicle.vue';
</script>

<template>
  <AddEditVehicle>
    <template #title>{{ $t('create-vehicle.title') }}</template>
    <template #subtitle>
      {{ $t('create-vehicle.subtitle') }}
    </template>
  </AddEditVehicle>
</template>
