<template>
  <div class="flex flex-col gap-4">
    <HeaderComponent :content="content.sectionOne.header"/>
    <ParagraphComponent :content="content.sectionOne.content"/>

    <HeaderComponent styleClass="font-bold text-xl" :content="content.sectionTwo.header"/>
    <ParagraphComponent :content="content.sectionTwo.content"/>

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
  sectionTwo: {
    header: {
      vietnamese: 'Tại sao ES6 và các phiên bản tiếp theo được coi là JavaScript hiện đại?',
      english: 'Why is ES6 and beyond considered to be modern JavaScript?'
    },
    content: {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    }
  },
  sectionThree: {
    header: {
      vietnamese: 'Cuối khóa học này, bạn sẽ củng cố kỹ năng JavaScript cốt lõi của mình và học',
      english: 'By the end of this course, you will strengthen your core JavaScript skills and learn'
    },
    contents: [{
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    },
    {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    },
    {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    },
    {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    },
    {
      vietnamese: 'Về khóa học JavaScript hiện đại: ES6 và các phiên bản tiếp theo',
      english: 'About the Modern JavaScript: ES6 and beyond!'
    }]
  }
}));
</script>


