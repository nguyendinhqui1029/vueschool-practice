<template>
  <div class="flex gap-2 w-full">
    <Drawer :visible="isVisibleSelectComponent" @update:visible="emits('toggleVisibleSelectComponent')"
      header="Component">
      <div class="flex flex-col gap-4">
        <div v-for="item of componentList" :key="item.componentType"
          class="flex items-center justify-between rounded-xl border-2 p-2">
          <span class="font-bold">{{ item.name }}</span>
          <Button @click="addComponent(item.componentType)" class="cursor-pointer" icon="pi pi-plus" severity="contrast"
            variant="text" rounded aria-label="Add" />
        </div>
      </div>
    </Drawer>
    <draggable v-model="contents" group="contents" item-key="id" :animation="150" handle=".drag-handle"
      class="flex flex-col gap-6 items-start w-full">
      <template #item="{ element: item }: { element: ComponentModel }">
        <div class="w-full">
          <HeaderComponent v-if="item.componentType === COMPONENT_TYPE.HEADER" :id="item.id" :isEditMode="isEditMode"
            :content="item.content" :defaultLanguage="item.defaultLanguage" @delete="handleDeleteComponent" />
          <ParagraphComponent v-if="item.componentType === COMPONENT_TYPE.PARAGRAPH" :id="item.id"
            :isEditMode="isEditMode" :content="item.content" :defaultLanguage="item.defaultLanguage"
            @delete="handleDeleteComponent" />
          <!-- <ListComponent  v-if="item.componentType === COMPONENT_TYPE.LIST" :contents="content.sectionThree.contents"/> -->
        </div>

      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue';
import draggable from 'vuedraggable';
import { ComponentModel } from '../../models/ComponentModel';
import { COMPONENT_TYPE, LANGUAGE_CODE } from '../../constants/common.constant';
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import { addPostSession, deletePostSession, getAllSessionOfPost, } from '../../services/PostService';

interface ComponentInfo {
  componentType: string;
  name: string;
}

const props = defineProps<{
  pageDataId: string;
  allowEdit: boolean;
  isVisibleSelectComponent: boolean;
}>();

const emits = defineEmits<{
  toggleVisibleSelectComponent: []
}>();
const { pageDataId, allowEdit, isVisibleSelectComponent } = toRefs(props);
const contents = ref<ComponentModel[]>([]);
const isEditMode = computed(() => allowEdit.value);
const componentList = computed<ComponentInfo[]>(() => [
  { componentType: COMPONENT_TYPE.HEADER, name: 'Header' },
  { componentType: COMPONENT_TYPE.PARAGRAPH, name: 'Paragraph' },
  { componentType: COMPONENT_TYPE.LIST, name: 'List' }
])

const handleDeleteComponent = async (id: string) => {
  const response = await deletePostSession(id);
  if(response?.statusCode === 200) {
    contents.value = contents.value.filter(item=>item.id !== id);
  }
}

const getPageDataById = async (id: string) => {
  const responsePostSession = await getAllSessionOfPost(id);
  if(responsePostSession?.statusCode === 200) {
    contents.value = responsePostSession.data.map(item=>({
      id: item.id,
      componentType: item.componentType,
      order: item.order,
      defaultLanguage: item.defaultLanguage,
      content: {
          vi: item.vi,
          ko: item.ko,
          en: item.en
      }
    })).sort((firstItem: ComponentModel, secondItem: ComponentModel)=> firstItem.order - secondItem.order);
  }
}

async function addComponent(componentType: string) {
  const responseAddComponent = await addPostSession({
    idMenu: pageDataId.value,
    componentType: componentType,
    order: new Date().getTime(),
    defaultLanguage: LANGUAGE_CODE.EN,
    vi: '',
    ko: '',
    en: ''
  })
  if (responseAddComponent?.statusCode === 200) {
    contents.value.unshift({
      id: responseAddComponent.data.id,
      componentType: responseAddComponent.data.componentType,
      order: responseAddComponent.data.order,
      defaultLanguage: responseAddComponent.data.defaultLanguage,
      content: {
        vi: responseAddComponent.data.vi,
        ko: responseAddComponent.data.ko,
        en: responseAddComponent.data.en
      }
    });
  }
}

watch(() => pageDataId.value, (id: string) => {
  getPageDataById(id);
});

const init = () => {
  getPageDataById(props.pageDataId);
}

init();
</script>