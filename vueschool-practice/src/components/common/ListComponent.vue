<template>
    <ul class="flex flex-col list-disc ml-8 gap-2">
      <li v-for="(content, index) of contents" :key="index" :class="styleClass">
        <div class="flex flex-col px-2 border-l-2">
          <p v-if="content?.english"  :class="styleClass">
          {{ content.english }}
          </p>
          <p v-if="content?.vietnamese" class="text-md text-gray-400">
            {{ content.vietnamese }}
          </p>
        </div>
      </li>
    </ul>
</template>
<script setup lang='ts'>
defineProps<{
  contents: {vietnamese?: string; english?: string}[],
  styleClass?: string}>()
</script>