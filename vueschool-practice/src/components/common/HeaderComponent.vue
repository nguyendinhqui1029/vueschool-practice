<template>
   <div class="flex flex-col px-2 border-l-2">
    <h3 v-if="content?.english"  :class="styleClass" class="font-bold text-2xl">
      {{ content.english }}
    </h3>
    <h4 v-if="content?.vietnamese" class="font-bold w-full text-md text-gray-400">
      {{ content.vietnamese }}
    </h4>
   </div>
</template>
<script setup lang='ts'>
defineProps<{
  content: {vietnamese?: string; english?: string},
  styleClass?: string}>();
</script>