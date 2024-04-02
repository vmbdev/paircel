import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMapsStore = defineStore('maps', () => {
  const enabled = ref<boolean>(false);

  function enable(val: boolean = true) {
    enabled.value = val;
  }

  return { enabled, enable };
});
