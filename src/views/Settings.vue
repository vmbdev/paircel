<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Preferences } from '@capacitor/preferences';
import Avatar from 'primevue/avatar';
import Select from 'primevue/select';
import Divider from 'primevue/divider';

import { useLanguageStore } from '@/stores/language';

const i18n = useI18n();
const languageStore = useLanguageStore();
const selectedLang = ref<string>();

onMounted(() => {
  selectedLang.value = languageStore.current;
});

watch(selectedLang, async () => {
  if (selectedLang.value && selectedLang.value !== languageStore.current) {
    Preferences.set({ key: 'language', value: selectedLang.value });
    languageStore.setCurrentLanguage(selectedLang.value);

    // load if it isn't yet available
    if (!i18n.availableLocales.includes(selectedLang.value)) {
      const { default: messages } = await import(
        `../locales/${selectedLang.value}.json`
      );

      i18n.setLocaleMessage(selectedLang.value, messages);
    }

    i18n.locale.value = selectedLang.value;
  }
});
</script>

<template>
  <article class="flex flex-col h-full">
    <header class="flex justify-center">
      <h1>{{ $t('settings.title') }}</h1>
    </header>
    <section class="flex flex-1 flex-col p-6 gap-6 mb-20">
      <h2>{{ $t('settings.selector') }}</h2>
      <Select
        v-model="selectedLang"
        :options="languageStore.available"
        optionLabel="label"
        optionValue="locale"
        :placeholder="$t('settings.language')"
        class="w-full md:w-56"
      />
    </section>
    <Divider />
    <section class="flex flex-col items-center">
      <strong class="text-center">
        {{ $t('settings.footer') }}
      </strong>
      <a href="https://github.com/vmbdev/paircel">
        <Avatar icon="pi pi-github" class="mr-2" size="xlarge" />
      </a>
    </section>
  </article>
</template>
