<template>
  <div class="flex flex-col gap-4">
    <HeaderComponent :content="content.arrowFunctions.header" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import ListComponent from '../common/ListComponent.vue';
import CodeEditorComponent from '../common/CodeEditorComponent.vue';
import { LANGUAGE_CONSTANT } from '../../constants/common.constant';

const content = ref({
  arrowFunctions: {
    header: {
      vietnamese: '',
      english: 'How to use arrow functions in JavaScript ES6?'
    }
  }
})
</script>
