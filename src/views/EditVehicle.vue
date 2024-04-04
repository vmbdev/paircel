<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AddEditVehicle from '@/components/AddEditVehicle.vue';
import { db, type Vehicle } from '@/db/db';

const route = useRoute();
const vehicle = ref<Vehicle>();
const dbChecked = ref<boolean>(false);

onMounted(async () => {
  const id = +route.params.vehicleId;
  vehicle.value = await db.vehicles.get(id);
  dbChecked.value = true;
});
</script>

<template>
  <AddEditVehicle v-if="vehicle" :vehicle="vehicle">
    <template #title>
      {{ $t('edit-vehicle.title', { name: vehicle?.name }) }}
    </template>
  </AddEditVehicle>
  <div v-else-if="dbChecked">
    <div class="flex flex-column align-items-center gap-2">
      <strong>{{ $t('edit-vehicle.missing') }}</strong>
    </div>
  </div>
</template>
