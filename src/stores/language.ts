import { ref } from 'vue';
import { defineStore } from 'pinia';

import { type Language } from '@/types/language';

export const useLanguageStore = defineStore('language', () => {
  const current = ref<string>();
  const available = ref<Language[]>();

  async function setCurrentLanguage(val: string) {
    current.value = val;
  }

  function setAvailableLanguages(val: Language[]) {
    available.value = val;
  }

  return { current, available, setCurrentLanguage, setAvailableLanguages };
});
