import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDatabaseStore = defineStore('database', () => {
  const empty = ref<boolean>(false);

  function setEmpty(val: boolean = true) {
    empty.value = val;
  }

  return { empty, setEmpty };
});
