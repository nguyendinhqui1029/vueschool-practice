<template>
  <div class="flex flex-col gap-4">
    <HeaderComponent :content="content.sectionOne.header"/>
    <ParagraphComponent :content="content.sectionOne.content"/>

    <HeaderComponent styleClass="font-bold text-xl" :content="content.sectionThree.header"/>
    <ListComponent :contents="content.sectionThree.contents"/>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import ListComponent from '../common/ListComponent.vue';

const content = computed(()=>({
  sectionOne: {
    header: {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo!',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    },
    content: {
      vietnamese: 'Việc thành thạo JavaScript là điều kiện tiên quyết để tạo ra các ứng dụng tốt và hiệu quả với framework Vue.js. Trong khóa học này, bạn sẽ học cách nắm vững những tính năng mới và thiết yếu trong những gì chúng ta gọi là JavaScript hiện đại. JavaScript hiện đại bao gồm các tính năng và cú pháp mới được giới thiệu trong ES6, ES7, ES8 và các phiên bản tiếp theo.',
      english: 'Mastering JavaScript is a fundamental prerequisite to creating good and efficient applications with the Vue.js framework. In this course, you\'ll learn how to master the new and essential features in what we call modern JavaScript. Modern JavaScript includes the new features and syntaxes introduced to JavaScript in ES6, ES7, ES8 and beyond.'
    }
  },
  sectionThree: {
    header: {
      vietnamese: 'Cuối khóa học này, bạn sẽ củng cố kỹ năng JavaScript cốt lõi của mình và học',
      english: 'By the end of this course, you will strengthen your core JavaScript skills and learn'
    },
    contents: [
  {
    vietnamese: 'ES6, ES7, và các phiên bản tiếp theo là gì?',
    english: 'What does ES6, ES7, etc. mean?'
  },
  {
    vietnamese: 'Sự khác biệt giữa var, let và const là gì?',
    english: 'What is the difference between var, let and const?'
  },
  {
    vietnamese: 'Cách làm chủ hàm mũi tên (arrow functions)?',
    english: 'How to master arrow functions?'
  },
  {
    vietnamese: 'Promises là gì và cách làm việc với chúng?',
    english: 'What promises are and how to work with them?'
  },
  {
    vietnamese: 'Các hàm mảng và đối tượng thiết yếu giúp cải thiện cuộc sống hàng ngày của bạn?',
    english: 'Essential Array and Object functions that will improve your daily life?'
  },
  {
    vietnamese: 'Các câu lệnh nhập và xuất (import/export).',
    english: 'Import and export.'
  },
  {
    vietnamese: 'Template literals.',
    english: 'Template literals.'
  }]
  }
}));
</script>


