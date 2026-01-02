<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import Panel from 'primevue/panel';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import ParkingSelectorMap from '@/components/ParkingSelectorMap.vue';
import VehicleSelector from '@/components/VehicleSelector.vue';
import { type PaircelPosition } from '@/types/paircel-position';
import { db, type Vehicle } from '@/db/db';

const i18n = useI18n();
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const selectedVehicle = ref<Vehicle>();
const position = ref<PaircelPosition>();

const positionChanged = (newPosition: PaircelPosition) => {
  position.value = newPosition;
};

const vehicleChanged = (vehicle: Vehicle) => {
  selectedVehicle.value = vehicle;
};

const savePosition = async () => {
  confirm.require({
    group: 'carparking',
    header: i18n.t('park.confirm-title'),
    message: i18n.t('park.confirm-msg'),
    icon: 'pi pi-question-circle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    rejectClass: 'p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    rejectLabel: i18n.t('general.cancel'),
    acceptLabel: i18n.t('park.park'),
    accept: async () => {
      if (position.value && selectedVehicle.value?.id) {
        await db.history.put({
          vehicleId: selectedVehicle.value.id,
          date: new Date(),
          lng: position.value.lng,
          lat: position.value.lat,
        });
        toast.add({
          severity: 'info',
          summary: selectedVehicle.value.name,
          detail: `${selectedVehicle.value.name} just parked!`,
          life: 5000,
        });

        router.push({ name: 'history' });
      }
    },
  });
};
</script>

<template>
  <ConfirmDialog group="carparking">
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

  <Panel class="mb-2" :header="i18n.t('park.panel-title')">
    <VehicleSelector @update="vehicleChanged" />
  </Panel>
  <ParkingSelectorMap @change="positionChanged" />
  <div class="relative flex flex-col w-full items-center gap-6 m-2">
    <Button
      icon="pi pi-map-marker"
      class="w-6/12 h-12"
      :label="$t('park.park')"
      severity="warning"
      @click="savePosition()"
      :disabled="!position || !selectedVehicle"
    />
  </div>
</template>
