<template>
  <div class="flex gap-2 w-full">
    <Drawer :visible="isVisibleSelectComponent" @update:visible="emits('toggleVisibleSelectComponent')"
      header="Component">
      <div class="flex flex-col gap-4">
        <div v-for="item of componentList" :key="`component_${item.componentType}`"
          class="flex items-center justify-between rounded-xl border-2 p-2">
          <span class="font-bold">{{ item.name }}</span>
          <Button @click="addComponent(item.componentType)" class="cursor-pointer" icon="pi pi-plus" severity="contrast"
            variant="text" rounded aria-label="Add" />
        </div>
      </div>
    </Drawer>
    <div v-if="!contents.length" class="flex items-center justify-center w-full">
        <h3>Empty data</h3>
    </div>
    <draggable v-else v-model="contents" group="contents" item-key="id" :animation="150" handle=".drag-handle"
      class="flex flex-col gap-6 items-start w-full">
      <template #item="{ element: item }: { element: ComponentModel }">
        <div class="w-full" :key="item.id">
          <HeaderComponent class="mb-2" v-if="item.componentType === COMPONENT_TYPE.HEADER" :languagesList="languages" :id="item.id" :isEditMode="isEditMode"
            :content="item.content" :options="item.options" :defaultLanguage="item.defaultLanguage" @delete="handleDeleteComponent" />
          <ParagraphComponent class="mb-8" v-if="item.componentType === COMPONENT_TYPE.PARAGRAPH" :languagesList="languages" :id="item.id"
            :isEditMode="isEditMode" :content="item.content" :options="item.options" :defaultLanguage="item.defaultLanguage"
            @delete="handleDeleteComponent" />
          <ListComponent  class="mb-8" v-if="item.componentType === COMPONENT_TYPE.LIST" :languagesList="languages" :id="item.id"
            :isEditMode="isEditMode" :content="item.content" :options="item.options" :defaultLanguage="item.defaultLanguage"
            @delete="handleDeleteComponent"/>

          <!-- Custom component  -->
          <div v-if="item.componentType === COMPONENT_TYPE.TRELLO_BOARD" class="flex flex-col">
            <div class="flex w-full justify-end" v-if="isEditMode">
              <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" @click="handleDeleteComponent(item.id)"/>
            </div>
            <TrelloBoardComponent />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue';
import draggable from 'vuedraggable';
import { ComponentModel } from '../../models/ComponentModel';
import { COMPONENT_TYPE, LANGUAGE_CODE, OPTIONS_TYPE } from '../../constants/common.constant';
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import ListComponent from '../common/ListComponent.vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import { addPostSession, deletePostSession, getAllSessionOfPost, } from '../../services/PostService';
import TrelloBoardComponent from '../trello-board/TrelloBoardComponent.vue';
import { useLanguages } from '../../composables/useSelectLanguage';


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
const { getLanguages } = useLanguages();
const languages = computed(()=>getLanguages().value);
const componentList = computed<ComponentInfo[]>(() => [
  { componentType: COMPONENT_TYPE.HEADER, name: 'Header' },
  { componentType: COMPONENT_TYPE.PARAGRAPH, name: 'Paragraph' },
  { componentType: COMPONENT_TYPE.LIST, name: 'List' },
  { componentType: COMPONENT_TYPE.TRELLO_BOARD, name: 'Trello Board' }
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
      },
      options: [COMPONENT_TYPE.LIST].includes(item.componentType) ? item.options : []
    })).sort((firstItem: ComponentModel, secondItem: ComponentModel)=> firstItem.order - secondItem.order);
  }
}

async function addComponent(componentType: string) {
  console.log(componentType)
  const responseAddComponent = await addPostSession({
    idMenu: pageDataId.value,
    componentType: componentType,
    order: new Date().getTime(),
    defaultLanguage: LANGUAGE_CODE.EN,
    vi: '',
    ko: '',
    en: '',
    listType: OPTIONS_TYPE.DISC,
    options: [COMPONENT_TYPE.LIST].includes(componentType) ? [{vi: '', ko: '', en: ''}]: []
  })
  if (responseAddComponent?.statusCode === 200) {
    contents.value.push({
      id: responseAddComponent.data.id,
      componentType: responseAddComponent.data.componentType,
      order: responseAddComponent.data.order,
      defaultLanguage: responseAddComponent.data.defaultLanguage,
      content: {
        vi: responseAddComponent.data.vi,
        ko: responseAddComponent.data.ko,
        en: responseAddComponent.data.en
      },
      listType: OPTIONS_TYPE.DISC,
      options: [COMPONENT_TYPE.LIST].includes(componentType) ? responseAddComponent.data.options: []
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