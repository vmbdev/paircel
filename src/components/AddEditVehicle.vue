<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import ColorPicker from 'primevue/colorpicker';

import { db, type Vehicle } from '@/db/db';
import { useDatabaseStore } from '@/stores/database';

const props = defineProps<{
  vehicle?: Vehicle;
}>();
const store = useDatabaseStore();
const router = useRouter();
const name = ref<string>('');
const color = ref<string>('000000');
const id = ref<number>();

watchEffect(() => {
  if (props.vehicle) {
    name.value = props.vehicle.name;
    color.value = props.vehicle.color;
    id.value = props.vehicle.id;
  }
});

const submit = async () => {
  if (name.value && color.value) {
    await db.vehicles.put({
      name: name.value,
      color: color.value,
      id: id.value ?? undefined,
    });

    router.push({ name: 'list' });
    store.setEmpty(false);
  }
};
</script>

<template>
  <Card>
    <template #title>
      <h1>
        <slot name="title" />
      </h1>
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <h2>{{ $t('add-edit-vehicle.name') }}</h2>
      <p id="name-help">
        {{ $t('add-edit-vehicle.name-help') }}
      </p>
      <IconField icon-position="left">
        <InputIcon class="pi pi-align-justify"></InputIcon>
        <InputText
          v-model="name"
          aria-describedby="name-help"
          class="w-full"
          :placeholder="$t('add-edit-vehicle.name')"
        />
      </IconField>

      <h2>{{ $t('add-edit-vehicle.color') }}</h2>
      <p id="color-help">
        {{ $t('add-edit-vehicle.color-help') }}
      </p>
      <InputGroup>
        <InputText
          v-model="color"
          aria-describedby="color-help"
          :placeholder="$t('add-edit-vehicle.color')"
        />
        <InputGroupAddon>
          <ColorPicker
            v-model="color"
            :pt="{ input: { class: ['createvehicle__color'] } }"
          />
        </InputGroupAddon>
      </InputGroup>
    </template>

    <template #footer>
      <div class="flex gap-6 mt-1 justify-center">
        <Button
          :label="vehicle ? $t('add-edit-vehicle.edit') : $t('add-edit-vehicle.create')"
          @click="submit()"
        />
      </div>
    </template>
  </Card>
</template>

<style>
.createvehicle__color {
  width: 24px;
  height: 24px;
}
</style>
