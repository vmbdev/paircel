<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Select from 'primevue/select';

import SVGColorSquare from '@/components/SVGColorSquare.vue';
import { type Vehicle, db } from '@/db/db';

const emit = defineEmits<{
  update: [vehicle: Vehicle];
}>();

const vehicles = ref<Vehicle[]>([]);
const selectedVehicle = ref<Vehicle>();

onMounted(async () => {
  await fetchVehicleList();
});

const fetchVehicleList = async () => {
  vehicles.value = await db.vehicles.toArray();

  if (vehicles.value?.[0]) {
    selectedVehicle.value = vehicles.value[0];

    emit('update', selectedVehicle.value);
  }
};

const bubbleUpdate = (value: Vehicle) => {
  emit('update', value);
};
</script>

<template>
  <Select
    v-model="selectedVehicle"
    option-label="name"
    filter
    class="w-full md:w-56 mb-6 mt-6"
    :options="vehicles"
    :placeholder="$t('vehicle-selector.select')"
    @update:model-value="bubbleUpdate"
  >
    <template #value="slotProps">
      <div
        v-if="slotProps.value"
        class="flex items-center gap-2"
      >
        <SVGColorSquare
          :size="25"
          :color="slotProps.value.color"
        />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>

    <template #option="slotProps">
      <div class="flex items-center gap-2">
        <SVGColorSquare
          :size="25"
          :color="slotProps.option.color"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Select>
</template>
