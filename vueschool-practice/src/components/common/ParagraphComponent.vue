<template>
    <div class="flex gap-4 ml-4 flex-col px-2 border-l-2">
    <template v-if="isEditMode">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-3 justify-between items-center">
          <span class="flex items-center gap-4 drag-handle cursor-move">⋮⋮ <h3 class="font-bold text-2xl">Paragraph</h3></span>
          <div class="flex gap-2 items-center"> 
            <div class="flex justify-end gap-2 h-12 items-center">
              <template v-for="(item) of languages" :key="item">
                <div v-if="item === LANGUAGE_CODE.EN" class="flex items-center gap-2">
                  <RadioButton  v-model="originLanguage" :disabled="isShowEditButton" inputId="en" name="originLanguage" :value="LANGUAGE_CODE.EN" />
                  <label for="en"> <img class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" /> </label>
                  </div>
                  <div v-if="item === LANGUAGE_CODE.VI" class="flex items-center gap-2">
                      <RadioButton v-model="originLanguage" :disabled="isShowEditButton" inputId="vi" name="originLanguage" :value="LANGUAGE_CODE.VI"/>
                      <label for="vi"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="Vietnam Flag" /> </label>
                  </div>
                  <div v-if="item === LANGUAGE_CODE.KO" class="flex items-center gap-2">
                      <RadioButton :disabled="isShowEditButton" v-model="originLanguage" inputId="ko" name="originLanguage" :value="LANGUAGE_CODE.KO" />
                      <label for="ko"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="Korea Flag"/> </label>
                  </div>
              </template>
          </div>
          <Button v-if="!isShowEditButton" :disabled="!formValue[originLanguage]"  icon="pi pi-save" severity="help" variant="text" rounded aria-label="Save" @click="handleSaveClick"/>
          <Button v-if="isShowEditButton" icon="pi pi-pencil" severity="contrast" variant="text" rounded aria-label="Edit" @click="handleEditClick"/>
          <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" @click="handleDeleteClick"/>
          </div>
        </div>
        <div  v-for="(item) of languages" class="flex gap-4 items-center">
          <img v-if="item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
          <Textarea :disabled="isShowEditButton || item !== originLanguage"  class="w-full" v-model="formValue[item]" rows="5" />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) of languages" :key="item" class="flex gap-4 items-start">
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
        <p v-if="index !== 0" class="w-full text-gray-500">{{ formValue?.[item] }}</p>
        <p v-else  :class="styleClass" class="w-full">
          {{ formValue?.[item] }}
        </p>
      </div>
    </template>
   </div>
</template>
<script setup lang='ts'>
import { ref, toRefs, computed } from 'vue';
import { LANGUAGE_CODE, MAPPING_LANGUAGE } from '../../constants/common.constant';
import { generateText } from '../../services/GenerativeAIService';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { updatePostSession } from '../../services/PostService';

const props = defineProps<{
  id: string;
  content: Record<string, string>,
  defaultLanguage: string,
  isEditMode: boolean;
  styleClass?: string;
  languagesList: string[]}>();

const emits = defineEmits<{
  delete: [id: string]
}>();

const {defaultLanguage, content, languagesList} = toRefs(props);
const originLanguage = ref<string>(defaultLanguage.value || LANGUAGE_CODE.EN);
const languages = computed(()=> languagesList.value);
const formValue = ref<Record<string, string>>(content.value);
const isShowEditButton = ref<boolean>(true);

async function handleSaveClick() {
  isShowEditButton.value = true;
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