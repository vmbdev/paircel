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
  <ParkingSelectorMap
    :view-mode="true"
    :coords="props.coords"
  />

  <ButtonGroup class="flex flex-row justify-center mt-1">
    <Button
      icon="pi pi-google"
      severity="help"
      :label="$t('map-navigation.directions')"
      @click="openInGMaps()"
    />
    <Button
      icon="pi pi-share-alt"
      severity="help"
      :label="$t('map-navigation.share')"
      @click="shareUrl()"
    />
  </ButtonGroup>
</template>
