<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

import SVGColorSquare from '@/components/SVGColorSquare.vue';
import { type Vehicle, db } from '@/db/db';
import { useDatabaseStore } from '@/stores/database';

const store = useDatabaseStore();
const confirm = useConfirm();
const list = ref<Vehicle[]>([]);

onMounted(async () => {
  await fetchVehicleList();
});

const fetchVehicleList = async () => {
  list.value = await db.vehicles.toArray();

  if (list.value.length === 0) store.setEmpty(true);
};

const confirmRemove = (vehicle: Vehicle) => {
  confirm.require({
    message: `Remove ${vehicle.name}?`,
    header: 'Confirmation',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Remove',
    accept: async () => {
      await db.vehicles.delete(vehicle.id);
      await fetchVehicleList();
    },
    reject: () => {},
  });
};
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Card>
    <template #title>
      <h1>Vehicle list</h1>
    </template>
    <template #subtitle>
      Click on your vehicle to see its parking history.
    </template>
  </Card>
  <DataView :value="list" dataKey="id">
    <template #list="slotProps">
      <ul class="grid grid-nogutter p-0 m-0">
        <li
          v-for="(item, index) in slotProps.items"
          :key="item.id"
          class="col-12 flex flex-column sm:align-items-center p-4"
          :class="{ 'border-top-1 surface-border': index !== 0 }"
        >
          <div
            class="flex flex-row justify-content-between align-items-start gap-2 md:w-6"
          >
            <div class="flex-1 flex flex-row gap-2">
              <RouterLink
                :to="{ name: 'history', params: { vehicleId: item.id } }"
              >
                <Chip class="py-0 pl-0 pr-3">
                  <span
                    class="w-2rem h-2rem flex align-items-center justify-content-center"
                  >
                    <SVGColorSquare :size="30" :color="item.color" />
                  </span>
                  <span class="ml-2 font-medium">{{ item.name }}</span>
                </Chip>
              </RouterLink>
            </div>

            <div class="flex flex-row md:flex-row gap-2">
              <RouterLink
                :to="{ name: 'edit', params: { vehicleId: item.id } }"
              >
                <Button icon="pi pi-file-edit" severity="info"></Button>
              </RouterLink>
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="confirmRemove(item)"
              ></Button>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </DataView>
</template>

<style></style>
