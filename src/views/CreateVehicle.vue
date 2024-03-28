<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import ColorPicker from 'primevue/colorpicker';

import { db } from '@/db/db';

const router = useRouter();
const name = ref<string>('');
const color = ref<string>('000000');

const submit = () => {
  if (name.value && color.value) {
    db.vehicles.put({
      name: name.value,
      color: color.value,
    });

    router.push('/');
  }
};
</script>

<template>
  <Card>
    <template #title>Add a new vehicle</template>
    <template #content>
      <h4>Name</h4>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-align-justify"></InputIcon>
        <InputText
          v-model="name"
          placeholder="Name"
          aria-describedby="name-help"
        />
      </IconField>
      <small id="name-help"
        >The brand, or the model, or just how you usually call it.</small
      >

      <h4>Color</h4>
      <InputGroup>
        <InputText placeholder="Color" v-model="color" />
        <InputGroupAddon>
          <ColorPicker
            v-model="color"
            :pt="{ input: { class: ['createvehicle__color'] } }"
          />
        </InputGroupAddon>
      </InputGroup>
    </template>

    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Create" @click="submit()" />
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
