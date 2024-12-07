<template>
    <div class="flex flex-col px-2 border-l-2">
    <template v-if="!isEditMode">
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 justify-end items-center">
          <div class="flex justify-end gap-4 h-12 items-center">
              <div>Origin Language:</div>
              <div class="flex items-center gap-2">
                  <RadioButton v-model="originLanguage" inputId="en" name="originLanguage" :value="LANGUAGE_CODE.EN" />
                  <label for="en"> <img class="w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" /> </label>
              </div>
              <div class="flex items-center gap-2">
                  <RadioButton v-model="originLanguage" inputId="vi" name="originLanguage" :value="LANGUAGE_CODE.VI"/>
                  <label for="vi"> <img class="w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="Vietnam Flag" /> </label>
              </div>
              <div class="flex items-center gap-2">
                  <RadioButton v-model="originLanguage" inputId="ko" name="originLanguage" :value="LANGUAGE_CODE.KO" />
                  <label for="ko"> <img class="h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="Korea Flag"/> </label>
              </div>
          </div>
          <Button v-if="!isShowEditButton" icon="pi pi-save" severity="help" variant="text" rounded aria-label="Save" @click="handleSaveClick"/>
          <Button v-if="isShowEditButton" icon="pi pi-pencil" severity="contrast" variant="text" rounded aria-label="Edit" @click="handleEditClick"/>
          <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" />
        </div>
        <div  v-for="(item) of languages" class="flex gap-4 items-center">
          <img v-if="item === LANGUAGE_CODE.EN" class="w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.VI" class="w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.KO" class="w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
          <Textarea :disabled="isShowEditButton"  class="w-full" v-model="formValue[item]" rows="5" />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) of languages" :key="item" >
        <h4 v-if="index !== 0" class="font-bold w-full text-md text-gray-400">{{ dataByLanguage?.[item] }}</h4>
        <h3 v-else  :class="styleClass" class="font-bold text-2xl">
          {{ dataByLanguage?.[item] }}
        </h3>
      </div>
    </template>
   </div>
</template>
<script setup lang='ts'>
import { ref, toRefs } from 'vue';
import { useLanguages } from '../../composables/useSelectLanguage';
import { LANGUAGE_CODE, MAPPING_LANGUAGE } from '../../constants/common.constant';
import { generateText } from '../../services/GenerativeAIService';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';

const props = defineProps<{
  content: Record<string, string>,
  defaultLanguage: string,
  isEditMode: boolean;
  styleClass?: string}>()

  const { getLanguages } = useLanguages();
const {defaultLanguage, content} = toRefs(props);
const originLanguage = ref<string>(defaultLanguage.value || LANGUAGE_CODE.EN);
const dataByLanguage = ref<Record<string, string>>();
const languages = ref<string[]>([]);
const formValue = ref<Record<string, string>>(content.value);
const isShowEditButton = ref<boolean>(true);

async function handleSaveClick() {
  isShowEditButton.value = true;
  const languagesString = languages.value.filter(item=>item !== originLanguage.value).map(item=>MAPPING_LANGUAGE[item]).join(', ');
  const responseObject = await generateText(`Dịch "${props.content[originLanguage.value]}" sang ngôn ngữ ${languagesString.toLowerCase()}. Theo cách dễ hiểu nhất. Trả về dạng json với cấu trúc {[languageCode]: value}`);
  formValue.value = {...responseObject, [originLanguage.value]: formValue.value[originLanguage.value]}
}

function handleEditClick() {
  isShowEditButton.value = false;
}
const init = async () => {
  languages.value = getLanguages().value || [LANGUAGE_CODE.EN];
}
init();
</script>