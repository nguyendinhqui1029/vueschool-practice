<template>
    <div class="flex h-screen w-screen p-2 gap-4 border-e-2">
      <div class="flex flex-col h-full min-w-80 max-w-96">
        <h3 class="font-bold text-2xl">Topic</h3>
        <ul class="flex flex-col gap-2 mt-2 ml-2">
          <li v-for="item of topicList" :key="item.id">
            <h3 class="font-bold line-clamp-1 leading-8">
              {{ item.groupName }}
            </h3>
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="post of item.posts" :key="post.id" :class="{'bg-gray-200':post.id === selectedItem.id}" class="px-2 cursor-pointer line-clamp-1 leading-8" @click="handleSelectMenu(post)">
                  {{ post.title }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="grow h-screen overflow-y-auto p-4">
        <component :is="selectedItem.component" :key="selectedItem.component"></component>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, defineAsyncComponent, ref} from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  interface Post {
    id: string;
    title: string;
    component: ReturnType<typeof defineAsyncComponent>;
  }
  interface Topic {
    id: string;
    groupName: string;
    posts: Post[];
  };
  const topicList = computed<Topic[]>(()=>[
    {
      id: 'TOPIC-001',
      groupName: 'Modern JavaScript: ES6 and beyond!',
      posts: [
        {
          id: 'POST-0001',
          title: 'Overall Javascript ES6',
          component:  defineAsyncComponent(()=>import('../components/javascript-es6/JavascriptES6Overall.vue'))
        },
        {
          id: 'POST-0002',
          title: 'What is the difference between var, let and const?',
          component:  defineAsyncComponent(()=>import('../components/javascript-es6/DifferenceVarLetAndConst.vue'))
        },
        {
          id: 'POST-0003',
          title: 'How to use arrow functions in JavaScript ES6?',
          component:  defineAsyncComponent(()=>import('../components/javascript-es6/HowToUseArrowFunction.vue'))
        }
      ]
    },
    {
      id: 'TOPIC-002',
      groupName: 'Exercise',
      posts: [
        {
          id: 'POST-0004',
          title: 'Clone trello board',
          component:  defineAsyncComponent(()=>import('../components/trello-board/TrelloBoardComponent.vue'))
        }
      ]
    }
  ]);
  const selectedItem = ref<Post>(topicList.value[0].posts[0]);
  const router = useRouter();
  const route = useRoute();
  function handleSelectMenu(post: Post) {
    selectedItem.value = post;
    router.replace({ path: '/', query: { id: post.id } });
  }
  function init() {
    topicList.value.some(value=>{
      const item = value.posts.find(item=>item.id === route.query['id']);
        if(item) {
          selectedItem.value = item;
          return;
        }
    });
  }
  init();
  </script>
  