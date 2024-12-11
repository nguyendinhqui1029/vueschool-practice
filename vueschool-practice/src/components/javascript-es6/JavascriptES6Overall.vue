<template>
  <div class="flex flex-col gap-4">
    <template v-for="item of pages.contents" :key="item.id">
      <HeaderComponent v-if="item.componentType === COMPONENT_TYPE.HEADER" :isEditMode="isEditMode" :content="item.content" :defaultLanguage="item.defaultLanguage"/>
      <ParagraphComponent v-if="item.componentType === COMPONENT_TYPE.PARAGRAPH" :isEditMode="isEditMode" :content="item.content" :defaultLanguage="item.defaultLanguage"/>
      <!-- <ListComponent  v-if="item.componentType === COMPONENT_TYPE.LIST" :contents="content.sectionThree.contents"/> -->
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import ListComponent from '../common/ListComponent.vue';
import { COMPONENT_TYPE } from '../../constants/common.constant';
const isEditMode = ref<boolean>(false)
const pages = computed(()=>({
    id: '1232',
    contents: [
        {
          id: '1',
          componentType: COMPONENT_TYPE.HEADER,
          order: 1,
          defaultLanguage: 'en',
          content: {
              vi: '',
              ko: '',
              en: 'About the Modern JavaScript: ES6 and beyond!',
          }
        },
        {
          id: '2',
          componentType: COMPONENT_TYPE.PARAGRAPH,
          defaultLanguage: 'en',
          order: 2,
          content: {
              vi: '',
              ko: '',
              en: 'Mastering JavaScript is a fundamental prerequisite to creating good and efficient applications with the Vue.js framework. In this course, you\'ll learn how to master the new and essential features in what we call modern JavaScript. Modern JavaScript includes the new features and syntaxes introduced to JavaScript in ES6, ES7, ES8 and beyond.'
          }
        }
    ]
}));
</script>


