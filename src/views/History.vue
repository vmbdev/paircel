<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { formatDistanceToNow } from 'date-fns';

import SVGColorSquare from '@/components/SVGColorSquare.vue';
import { db, type ParkLocation } from '@/db/db';

const route = useRoute();
const confirm = useConfirm();
const history = ref<ParkLocation[]>();

onMounted(async () => {
  await refresh();
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.vehicleId !== from.params.vehicleId) {
    await refresh(+to.params.vehicleId);
  }
});

const refresh = async (newId?: number) => {
  const vId = newId ?? +route.params.vehicleId;

  history.value = await db.getHistoryWithVehicles(vId ?? undefined);
};

const getTimeDistance = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

const remove = (id: number) => {
  confirm.require({
    message: 'Forget about this parking spot?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    rejectClass: 'p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    rejectLabel: 'Cancel',
    acceptLabel: 'Remove',
    accept: async () => {
      await db.history.delete(id);
      await refresh();
    },
  });
};
</script>

<template>
  <ConfirmDialog>
    <template #message="slotProps">
      <div
        class="flex flex-row align-items-center w-full gap-3 border-bottom-1 surface-border"
      >
        <i
          :class="slotProps.message.icon"
          class="text-6xl text-primary-500"
        ></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>

  <Timeline align="left" :value="history" class="w-full md:w-20rem">
    <template #marker="slotProps">
      <SVGColorSquare :size="20" :color="slotProps.item.vehicle.color" />
    </template>
    <template #content="slotProps">
      <div class="flex flex-row align-items-center">
        <Card class="m-1 mr-3 flex-1" :pt="{ body: { class: ['p-3'] } }">
          <template #title>
            {{ slotProps.item.vehicle.name }}
          </template>
          <template #subtitle>
            Parked {{ getTimeDistance(slotProps.item.date) }}
          </template>
        </Card>
        <Button icon="pi pi-trash" @click="remove(slotProps.item.id)" />
      </div>
    </template>
  </Timeline>
</template>

<style>
.p-timeline-event-opposite {
  display: none;
}
</style>
