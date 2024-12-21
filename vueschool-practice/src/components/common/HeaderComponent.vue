<template>
   <div class="flex gap-4 flex-col px-2 border-l-2">
    <template v-if="isEditMode">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 justify-between items-center">
          <span class="drag-handle flex gap-4 cursor-move">⋮⋮ <h3 class="font-bold text-2xl">Header</h3></span>
          <div class="flex gap-4 items-center w-full"> 
            <div class="flex justify-end gap-4 h-12 items-center">
              <template v-for="(item) of languages" :key="`header_${item}`">
                  <div v-if="item === LANGUAGE_CODE.EN" class="flex items-center gap-2">
                    <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="en" name="originLanguage" :value="LANGUAGE_CODE.EN" />
                    <label for="en"> <img class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" /></label>
                  </div>
                  <div v-if="item === LANGUAGE_CODE.VI" class="flex items-center gap-2">
                    <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="vi" name="originLanguage" :value="LANGUAGE_CODE.VI"/>
                    <label for="vi"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="Vietnam Flag" /></label>
                  </div>
                  <div  v-if="item === LANGUAGE_CODE.KO" class="flex items-center gap-2">
                    <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="ko" name="originLanguage" :value="LANGUAGE_CODE.KO" />
                    <label for="ko"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="Korea Flag"/></label>
                  </div>
              </template>
            </div>
            <Button v-if="!isShowEditButton" :disabled="!formValue[originLanguage]" icon="pi pi-save" severity="help" variant="text" rounded aria-label="Save" @click="handleSaveClick"/>
            <Button v-if="isShowEditButton" icon="pi pi-pencil" severity="contrast" variant="text" rounded aria-label="Edit" @click="handleEditClick"/>
            <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" @click="handleDeleteClick"/>
          </div>
        </div>
        <div  v-for="(item) of languages" :key="`content_edit_${item}`" class="flex gap-4 items-center">
          <img v-if="item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
          <InputText :disabled="isShowEditButton || item !== originLanguage" class="w-full" type="text" v-model="formValue[item]" />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) of languages" :key="`content_display_${item}`" class="flex gap-4 items-start">
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
        <h4 v-if="index !== 0" class="font-bold w-full text-2xl text-gray-500">{{ formValue?.[item] }}</h4>
        <h3 v-else  :class="styleClass" class="font-bold text-2xl">
          {{ formValue?.[item] }}
        </h3>
      </div>
    </template>
   </div>
</template>
<script setup lang='ts'>
import { ref, toRefs, computed } from 'vue';
import {generateText} from '../../services/GenerativeAIService';
import { MAPPING_LANGUAGE, LANGUAGE_CODE } from '../../constants/common.constant';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { updatePostSession } from '../../services/PostService';

const props = defineProps<{
  id: string;
  content: Record<string, string>,
  languagesList: string[],
  defaultLanguage: string,
  isEditMode: boolean;
  styleClass?: string
}>();
const emits = defineEmits<{
  delete: [id: string]
}>();
const { defaultLanguage, content, isEditMode, languagesList } = toRefs(props);
const originLanguage = ref<string>(defaultLanguage.value || LANGUAGE_CODE.EN);
const languages = computed(()=> languagesList.value);
const formValue = ref<Record<string, string>>(content.value);
const isShowEditButton = ref<boolean>(true);

async function handleSaveClick() {
  const languagesString = Object.values(LANGUAGE_CODE).filter(item=>item !== originLanguage.value).map(item=>MAPPING_LANGUAGE[item]).join(', ');
  const responseObject = await generateText(`Dịch "${formValue.value[originLanguage.value]}" sang ngôn ngữ ${languagesString.toLowerCase()}. Theo cách dễ hiểu nhất. Trả về dạng json với cấu trúc {[languageCode]: value}`);
  formValue.value = {...responseObject, [originLanguage.value]: formValue.value[originLanguage.value]};
  const updateResponse = await updatePostSession(props.id, {
    defaultLanguage: originLanguage.value,
    vi: formValue.value[LANGUAGE_CODE.VI],
    ko: formValue.value[LANGUAGE_CODE.KO],
    en: formValue.value[LANGUAGE_CODE.EN],
    options: []
  });
  if(updateResponse?.statusCode === 200) {
      isShowEditButton.value = true;
  }
}

function handleDeleteClick() {
  emits('delete', props.id)
}

function handleEditClick() {
  isShowEditButton.value = false;
}
</script>