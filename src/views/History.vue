<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

import SVGColorSquare from '@/components/SVGColorSquare.vue';
import { db, type ParkLocation } from '@/db/db';
import { dateDiffToNow } from '@/helpers/date-diff';

const i18n = useI18n();
const route = useRoute();
const confirm = useConfirm();
const history = ref<ParkLocation[]>();
const dbChecked = ref<boolean>(false);

onMounted(async () => {
  await refresh();
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.vehicleId && to.params.vehicleId !== from.params.vehicleId) {
    await refresh(+to.params.vehicleId);
  }
});

const refresh = async (newId?: number) => {
  const vId = newId ?? +route.params.vehicleId;

  history.value = await db.getHistoryWithVehicles(vId ?? undefined);
  dbChecked.value = true;
};

const getTimeDistance = (date: Date): string => {
  const diff = dateDiffToNow(date);

  return i18n.t(
    `history.parked-${diff.unit}`,
    { time: diff.difference },
    diff.difference,
  );
};

const remove = (id: number) => {
  confirm.require({
    message: i18n.t('history.confirm-msg'),
    header: i18n.t('general.confirmation'),
    icon: 'pi pi-exclamation-triangle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    rejectClass: 'p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    rejectLabel: i18n.t('general.cancel'),
    acceptLabel: i18n.t('general.remove'),
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
        class="flex flex-row items-center w-full gap-6 border-b border-surface"
      >
        <i
          :class="slotProps.message.icon"
          class="text-6xl text-primary-500"
        ></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>

  <Timeline
    v-if="history && history.length > 0"
    align="left"
    :value="history"
    class="my-2 mx-2 md:w-80"
  >
    <template #marker="slotProps">
      <SVGColorSquare :size="20" :color="slotProps.item.vehicle.color" />
    </template>
    <template #content="slotProps">
      <div class="flex flex-row items-center">
        <RouterLink
          class="m-1 mr-6 flex-1 no-underline block"
          :to="{
            name: 'navigation',
            query: {
              lat: slotProps.item.lat,
              lng: slotProps.item.lng,
            },
          }"
        >
          <Card :pt="{ body: { class: ['p-3'] } }">
            <template #title>
              {{ slotProps.item.vehicle.name }}
            </template>
            <template #subtitle>
              {{ getTimeDistance(slotProps.item.date) }}
            </template>
          </Card>
        </RouterLink>
        <Button icon="pi pi-trash" @click="remove(slotProps.item.id)" />
      </div>
    </template>
  </Timeline>
  <div
    v-else-if="dbChecked"
    class="flex flex-col items-center justify-center h-full gap-2"
  >
    <strong>{{ $t('history.empty') }}</strong>
  </div>
</template>

<style>
.p-timeline-event-opposite {
  display: none;
}
</style>
