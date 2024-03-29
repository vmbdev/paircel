<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

import { type Vehicle, db } from '@/db/db';

const confirm = useConfirm();
const list = ref<Vehicle[]>([]);

onMounted(async () => {
  list.value = await db.vehicles.toArray();
});

const confirmRemove = (vehicle: Vehicle) => {
  confirm.require({
    message: `Remove ${vehicle.name}?`,
    header: 'Confirmation',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Remove',
    accept: async () => {
      await db.vehicles.delete(vehicle.id);
      list.value = await db.vehicles.toArray();
    },
    reject: () => {},
  });
};
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <DataView :value="list" dataKey="id">
    <template #list="slotProps">
      <div class="grid grid-nogutter">
        <div
          v-for="(item, index) in slotProps.items"
          :key="item.id"
          class="col-12"
        >
          <div
            class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
            :class="{ 'border-top-1 surface-border': index !== 0 }"
          >
            <div
              class="flex flex-column justify-content-between md:align-items-center flex-1 gap-4"
            >
              <div
                class="flex flex-row justify-content-between align-items-start gap-2"
              >
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    width="40"
                    height="40"
                    rx="5"
                    ry="5"
                    :fill="`#${item.color}`"
                  />
                </svg>
                <div class="text-lg font-medium text-900 mt-2 flex-1">
                  {{ item.name }}
                </div>

                <div class="flex flex-row md:flex-row gap-2">
                  <RouterLink :to="`/history/${item.id}`">
                    <Button icon="pi pi-history" outlined></Button>
                  </RouterLink>
                  <RouterLink :to="`/edit/${item.id}`">
                    <Button icon="pi pi-file-edit" outlined></Button>
                  </RouterLink>
                  <Button
                    icon="pi pi-trash"
                    outlined
                    @click="confirmRemove(item)"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style></style>
