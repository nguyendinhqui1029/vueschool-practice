<template>
  <div class="flex gap-2 relative z-50" id="parentContainer">
    <Drawer apply-to="#parentContainer"  :modal="false" :visible="isVisibleSelectComponent" @update:visible="emits('toggleVisibleSelectComponent')" header="Component">
        <div class="flex flex-col gap-4">
          <div>322</div>
        </div>
    </Drawer>
    <draggable 
      v-model="contents"
      group="contents"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="flex gap-4 items-start"
      >
        <template #item="{element: item}: {element: ComponentModel}">
          <HeaderComponent v-if="item.componentType === COMPONENT_TYPE.HEADER" :isEditMode="isEditMode" :content="item.content" :defaultLanguage="item.defaultLanguage"/>
          <ParagraphComponent v-if="item.componentType === COMPONENT_TYPE.PARAGRAPH" :isEditMode="isEditMode" :content="item.content" :defaultLanguage="item.defaultLanguage"/>
          <!-- <ListComponent  v-if="item.componentType === COMPONENT_TYPE.LIST" :contents="content.sectionThree.contents"/> -->
        </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import draggable from 'vuedraggable';
import { ComponentModel } from '../../models/ComponentModel';
import { COMPONENT_TYPE } from '../../constants/common.constant';
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import Drawer from 'primevue/drawer';

const props = defineProps<{
  pageDataId: string;
  allowEdit: boolean;
  isVisibleSelectComponent: boolean;
}>();

const emits = defineEmits<{
  toggleVisibleSelectComponent: []
}>()
const { pageDataId, allowEdit, isVisibleSelectComponent } = toRefs(props);
const contents = ref<ComponentModel[]>([]);
const isEditMode = ref<boolean>(allowEdit.value);

const getPageDataById = async (id: string) => {
  console.log(id)
}

watch(()=> pageDataId.value, (id: string)=>{
  getPageDataById(id);
});
</script>