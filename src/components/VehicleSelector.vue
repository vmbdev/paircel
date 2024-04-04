<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Dropdown from 'primevue/dropdown';

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
};

const bubbleUpdate = (value: Vehicle) => {
  emit('update', value);
};
</script>

<template>
  <Dropdown
    v-model="selectedVehicle"
    :options="vehicles"
    filter
    optionLabel="name"
    :placeholder="$t('vehicle-selector.select')"
    class="w-full md:w-14rem mb-3 mt-3"
    @update:modelValue="bubbleUpdate"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center gap-2">
        <SVGColorSquare :size="25" :color="slotProps.value.color" />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>

    <template #option="slotProps">
      <div class="flex align-items-center gap-2">
        <SVGColorSquare :size="25" :color="slotProps.option.color" />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>
