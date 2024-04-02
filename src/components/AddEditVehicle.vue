<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
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
      <h2>Name</h2>
      <p id="name-help">
        The brand, or the model, or just how you usually call it.
      </p>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-align-justify"></InputIcon>
        <InputText
          class="w-full"
          v-model="name"
          placeholder="Name"
          aria-describedby="name-help"
        />
      </IconField>

      <h2>Color</h2>
      <p id="color-help">
        Can be the color of the car or just a color you like to differentiate it
        from the others.
      </p>
      <InputGroup>
        <InputText
          v-model="color"
          aria-describedby="color-help"
          placeholder="Color"
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
      <div class="flex gap-3 mt-1 justify-content-center">
        <Button :label="vehicle ? 'Edit' : 'Create'" @click="submit()" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
.createvehicle {
  &__color {
    width: 24px;
    height: 24px;
  }
}
</style>
