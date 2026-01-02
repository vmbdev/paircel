<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Geolocation, type Position } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

import { useMapsStore } from '@/stores/maps';
import { type PaircelPosition } from '@/types/paircel-position';
import { GMAPS_API_KEY } from '@/config';

const props = defineProps<{
  viewMode?: boolean;
  coords?: PaircelPosition;
}>();
const emit = defineEmits<{
  change: [position: PaircelPosition];
}>();

const mapsStore = useMapsStore();
const mapRef = ref<HTMLElement>();
const currentMarker = ref<string | null>(null);
const currentCoords = ref<PaircelPosition>({ lat: 0, lng: 0 });
let map: GoogleMap;
let positionWatcher: string;

// We watch for the geoposition to change up to 3 times to improve accuracy.
let positionWatcherCount: number = 0;

watch(currentCoords, async () => {
  if (!props.viewMode) {
    currentMarker.value = await setMarker(
      currentCoords.value.lat,
      currentCoords.value.lng,
    );

    emit('change', currentCoords.value);
  }
});

onMounted(async () => {
  mapsStore.enable();
  await createMap();
  await map.enableCurrentLocation(true);

  if (!props.viewMode) {
    await map.setOnMapClickListener(async (data) => {
      if (positionWatcher) {
        await Geolocation.clearWatch({ id: positionWatcher });
      }

      currentCoords.value = { lat: data.latitude, lng: data.longitude };
    });
  } else if (props.coords) {
    await Promise.all([
      setMarker(props.coords.lat, props.coords.lng),
      map.setCamera({
        coordinate: { lat: props.coords.lat, lng: props.coords.lng },
        animate: true,
      }),
    ]);
  }

  positionWatcher = await Geolocation.watchPosition(
    { enableHighAccuracy: true },
    updatePosition,
  );
});

onUnmounted(async () => {
  mapsStore.enable(false);

  if (positionWatcher) {
    await Geolocation.clearWatch({ id: positionWatcher });
  }

  await map.destroy();
});

const createMap = async () => {
  if (!mapRef.value) return;

  map = await GoogleMap.create({
    id: 'parking-map',
    element: mapRef.value,
    apiKey: GMAPS_API_KEY,
    config: {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 18,
    },
  });
};

const updatePosition = async (position: Position | null) => {
  if (!position) return;

  const coords = position.coords;

  if (coords) {
    if (!props.viewMode) {
      await map.setCamera({
        coordinate: { lat: coords.latitude, lng: coords.longitude },
        animate: true,
      });
    }

    currentCoords.value = { lat: coords.latitude, lng: coords.longitude };

    if (positionWatcherCount === 3) {
      await Geolocation.clearWatch({ id: positionWatcher });
    } else positionWatcherCount++;
  }
};

const setMarker = async (lat: number, lng: number): Promise<string | null> => {
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) return null;
  if (currentMarker.value) await map.removeMarker(currentMarker.value);

  return map.addMarker({
    coordinate: {
      lat,
      lng,
    },
  });
};
</script>

<template>
  <capacitor-google-map
    ref="mapRef"
    class="relative block"
    :class="{
      'h-[25rem]': !props.viewMode,
    }"
    :style="{ height: '80vh' }"
  />
</template>
