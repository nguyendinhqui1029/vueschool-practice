<template>
  <router-view />
</template>

<script setup lang="ts">
import { useLanguages } from './composables/useSelectLanguage';
import { LANGUAGE_CODE } from './constants/common.constant';

  const { setLanguages } = useLanguages();
  const language = localStorage?.getItem('languages')?.split(',') || [LANGUAGE_CODE.EN];
  setLanguages(language);
</script>
