<template>
    <div class="flex h-screen max-h-screen w-screen border-e-2">
      <div class="flex flex-col h-full min-w-80 max-w-80 border-r-2 p-2">
        <h3 class="font-bold text-2xl flex justify-between items-center">
          Topic
          <Button :disabled="!isAllowAddParentMenu" @click="addParentMenu" v-if="isEditModel" class="cursor-pointer" icon="pi pi-plus" severity="contrast" variant="text" rounded aria-label="Add" />
        </h3>
        <ul class="flex flex-col gap-2 mt-2 ml-2">
          <li v-for="item of topicList" :key="item.id">
            <div class="flex items-center justify-between">
              <h3 v-if="!item.isEdit" class="font-bold line-clamp-1 leading-8" :fitContent="true" v-tooltip.bottom="item.groupName">
                {{ item.groupName }}
              </h3>
              <InputText v-if="item.isEdit" class="w-full" type="text" v-model="item.groupName" />
              <div v-if="isEditModel" class="flex items-center justify-center">
                <Button v-if="!item.isEdit" @click="handleAddChildMenu(item)" class="cursor-pointer" icon="pi pi-plus" severity="contrast" variant="text" rounded aria-label="Add" />
                <Button @click="handleEditOrSaveParentMenu(item)" :disabled="!item.groupName" class="cursor-pointer" :icon="!item.isEdit ? 'pi pi-pencil' : 'pi pi-save'" severity="contrast" variant="text" rounded aria-label="Edit and Save" />
                <Button v-if="!item.posts.length" @click="handleDeleteParentMenu(item)" class="cursor-pointer" icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Delete" />
              </div>
            </div>
           
            <ul class="flex flex-col gap-1 mt-1">
              <li v-for="post of item.posts" :key="post.id" :class="{'bg-gray-200':post.id === selectedItem?.id}" class="pl-2 flex items-center justify-between" @click="handleSelectMenu(post)">
                  <span v-if="!post.isEdit" class="cursor-pointer line-clamp-1 leading-8 w-full" v-tooltip.bottom="post.title">{{ post.title }}</span>
                  <InputText v-if="post.isEdit" class="w-full" type="text" v-model="post.title" />
                  <div v-if="isEditModel" class="flex items-center justify-center">
                    <Button @click="handleEditOrSaveChildMenu(post, item.id!)" :disabled="!post.title" class="cursor-pointer" :icon="!post.isEdit ? 'pi pi-pencil' : 'pi pi-save'" severity="contrast" variant="text" rounded aria-label="save and edit" />
                    <Button @click="handleDeleteChildMenu(item, post)" class="cursor-pointer" icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Add" />
                  </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="flex flex-col max-h-screen w-full p-4">
        <div class="flex items-center justify-end gap-4 h-12 border-b-2 mb-5">
          <div class="flex items-center gap-2">
              <Checkbox :disabled="selectedLanguages.length === 1 && selectedLanguages.includes(LANGUAGE_CODE.EN)" inputId="en" value="en" v-model="selectedLanguages"/>
              <label for="en"> <img class="w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" /> </label>
          </div>
          <div class="flex items-center gap-2">
              <Checkbox :disabled="selectedLanguages.length === 1 && selectedLanguages.includes(LANGUAGE_CODE.VI)" inputId="vi" value="vi" v-model="selectedLanguages"/>
              <label for="vi"> <img class="w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="Vietnam Flag" /> </label>
          </div>
          <div class="flex items-center gap-2">
              <Checkbox :disabled="selectedLanguages.length === 1 && selectedLanguages.includes(LANGUAGE_CODE.KO)" inputId="ko" value="ko" v-model="selectedLanguages"/>
              <label for="ko"> <img class="h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="Korea Flag"/> </label>
          </div>
          <Button v-if="isEditModel && selectedItem?.id" @click="handleAddContentComponent" class="cursor-pointer" icon="pi pi-bars" severity="contrast" variant="text" rounded aria-label="Add" />
          <ToggleSwitch :value="isEditModel" @change="handleLoginForEdit">
              <template #handle="{ checked }">
                  <i :class="['!text-xs pi', { 'pi-eye': !checked, 'pi-pencil': checked }]" />
              </template>
          </ToggleSwitch>
        </div>
        <div class="flex grow overflow-y-auto">
          <PageWrapperComponent 
          v-if="selectedItem?.id"
          :pageDataId="selectedItem.id"
          :allowEdit="isEditModel"
          :isVisibleSelectComponent="isVisibleSelectComponent"
          @toggleVisibleSelectComponent="isVisibleSelectComponent = !isVisibleSelectComponent"/>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch} from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Checkbox from 'primevue/checkbox';
  import { useLanguages } from '../composables/useSelectLanguage';
  import { LANGUAGE_CODE } from '../constants/common.constant';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import  PageWrapperComponent  from '../components/common/PageWrapperComponent.vue';
  import { addMenu, deleteMenu, getAllMenu, updateMenu } from '../services/MenuService';
  import { Post, Topic } from '../models/MenuModel';
  import ToggleSwitch from 'primevue/toggleswitch';

  const {getLanguages, setLanguages} = useLanguages();
  const router = useRouter();
  const route = useRoute();

  const topicList = ref<Topic[]>([]);
  const selectedItem = ref<Post>(topicList.value?.[0]?.posts?.[0]);
  const selectedLanguages = ref<string[]>([]);
  const isEditModel = ref<boolean>(false);
  const isAllowAddParentMenu = computed(()=> !topicList.value.filter(item=>item.isEdit).length);
  const isVisibleSelectComponent = ref<boolean>(false);

  function addParentMenu() {
    topicList.value.push({
      groupName: '',
      isEdit: true,
      posts: []
    });
  }

  async function handleEditOrSaveParentMenu(item: Topic) {
    if(item.isEdit) {
      const responseAddParent = await (!item?.id ? addMenu({
        title: item.groupName,
        parentId: null
      }) : updateMenu({
        id: item.id,
        title: item.groupName,
        parentId: null
      }));
      if(responseAddParent?.statusCode === 200) {
        item.isEdit = false;
        item.id = responseAddParent.data.id;
      }
      return;
    }
    item.isEdit = true;
  }

  async function handleDeleteParentMenu(item: Topic) {
    const deleteResult = await deleteMenu(item.id!);
    if(deleteResult?.statusCode === 200) {
      topicList.value = topicList.value.filter((topicItem: Topic)=>topicItem.id !== item.id);
    }
  }

 
  async function handleDeleteChildMenu(item: Topic, postSelect: Post) {
    const deleteResult = await deleteMenu(postSelect.id!);
    if(deleteResult?.statusCode === 200) {
      item.posts = item.posts.filter((post: Post)=>post.id !== postSelect.id);
    }
  }

  function handleAddChildMenu(item: Topic) {
    item.posts.push( {
          title: '',
          isEdit: true,
      });
  }

  async function handleEditOrSaveChildMenu(item: Post, parentId: string) {
    if(item.isEdit) {
      item.isEdit = false;
      const responseAddChild = await (!item?.id ? addMenu({
        title: item.title,
        parentId: parentId
      }) : updateMenu({
        id: item.id,
        title: item.title,
        parentId: parentId
      }));
      if(responseAddChild?.statusCode === 200) {
        item.isEdit = false;
        item.id = responseAddChild.data.id;
      }
      return;
    }
    item.isEdit = true;
  }

  function handleSelectMenu(post: Post) {
    selectedItem.value = post;
    router.replace({ path: '/', query: { id: post.id } });
  }

  function handleAddContentComponent() {
    isVisibleSelectComponent.value = !isVisibleSelectComponent.value;
  }

  function handleLoginForEdit() {
    // TODO: handle login
    let isLogin = true;
    if(!isLogin) {
      isEditModel.value = true;
      return;
    }
    if(isEditModel.value) {
      isEditModel.value = false;
      console.log(isEditModel.value);
      // TODO call api save
      return;
    }
    isEditModel.value = true;
  }

  watch(()=> selectedLanguages.value, (value: string[]) => {
    setLanguages(value);
  })

  async function init() {
    const menuResponse = await getAllMenu();
    if(menuResponse?.statusCode === 200) {
      const rootMenuList = menuResponse.data.filter(item=>!item.parentId);
      rootMenuList.forEach(item=> {
        const childrenMenuList = menuResponse.data.filter(childItem=>childItem.parentId && childItem.parentId === item.id);
        topicList.value.push({
          id: item.id,
          groupName: item.title,
          isEdit: false,
          posts: childrenMenuList.map(childItem=>({
            id: childItem.id,
            title: childItem.title,
            isEdit: false
          }))
        });
      });
    }
    topicList.value.some(value=>{
      const item = value.posts.find(item=>item.id === route.query['id']);
        if(item) {
          selectedItem.value = item;
          return;
        }
    });
    selectedLanguages.value = getLanguages().value;
  }

  init();
  </script>
  