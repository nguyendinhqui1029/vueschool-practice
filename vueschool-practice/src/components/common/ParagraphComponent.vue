<template>
   <div class="flex flex-col px-2 border-l-2 gap-2">
    <p v-if="content?.english"  :class="styleClass">
      {{ content.english }}
    </p>
    <p v-if="content?.vietnamese" class="text-md text-gray-400">
      {{ content.vietnamese }}
    </p>
   </div>
</template>
<script setup lang='ts'>
defineProps<{
  content: {vietnamese?: string; english?: string},
  styleClass?: string}>()
</script>