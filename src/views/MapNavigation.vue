<script setup lang="ts">
import { Share } from '@capacitor/share';
import ButtonGroup from 'primevue/buttongroup';
import Button from 'primevue/button';

import ParkingSelectorMap from '@/components/ParkingSelectorMap.vue';
import type { PaircelPosition } from '@/types/paircel-position';

const props = defineProps<{
  coords: PaircelPosition;
}>();
const url = `https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${props.coords.lat},${props.coords.lng}`;

const openInGMaps = () => {
  window.open(url);
};

const shareUrl = async () => {
  await Share.share({ url });
};
</script>

<template>
  <ParkingSelectorMap :viewMode="true" :coords="props.coords" />

  <ButtonGroup class="flex flex-row justify-content-center mt-1">
    <Button
      :label="$t('map-navigation.directions')"
      icon="pi pi-google"
      severity="help"
      @click="openInGMaps()"
    ></Button>
    <Button
      :label="$t('map-navigation.share')"
      icon="pi pi-share-alt"
      severity="help"
      @click="shareUrl()"
    ></Button>
  </ButtonGroup>
</template>
