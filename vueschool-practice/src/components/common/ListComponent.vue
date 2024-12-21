<template>
  <div class="flex gap-4 flex-col">
   <template v-if="isEditMode">
     <div class="flex flex-col gap-4">
       <div class="flex flex-wrap gap-4 justify-between items-center">
         <span class="drag-handle flex gap-4 cursor-move">⋮⋮ <h3 class="font-bold text-2xl">List</h3></span>
         <div class="flex gap-3 items-center"> 
           <div class="flex justify-end gap-2 h-12 items-center">
             <template v-for="(item) of languages" :key="`header_${item}`">
                 <div v-if="item === LANGUAGE_CODE.EN" class="flex items-center gap-2">
                   <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="en" name="originLanguage" :value="LANGUAGE_CODE.EN" />
                   <label for="en"> <img class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" /> </label>
                 </div>
                 <div v-if="item === LANGUAGE_CODE.VI" class="flex items-center gap-2">
                   <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="vi" name="originLanguage" :value="LANGUAGE_CODE.VI"/>
                   <label for="vi"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="Vietnam Flag" /> </label>
                 </div>
                 <div  v-if="item === LANGUAGE_CODE.KO" class="flex items-center gap-2">
                   <RadioButton :disabled="isShowEditButton"  v-model="originLanguage" inputId="ko" name="originLanguage" :value="LANGUAGE_CODE.KO" />
                   <label for="ko"> <img class="min-w-8 w-8 h-6 cursor-pointer" src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="Korea Flag"/> </label>
                 </div>
             </template>
           </div>
           <Button v-if="!isShowEditButton" :disabled="!formValue[originLanguage]" icon="pi pi-save" severity="help" variant="text" rounded aria-label="Save" @click="handleSaveClick"/>
           <Button v-if="isShowEditButton" icon="pi pi-pencil" severity="contrast" variant="text" rounded aria-label="Edit" @click="handleEditClick"/>
           <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" @click="handleDeleteClick"/>
         </div>
       </div>
       
      <div class="flex flex-col gap-4">
        <div  v-for="(item) of languages" :key="`content_edit_${item}`" class="flex gap-4 items-center">
          <img v-if="item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
          <img v-if="item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
          <InputText :disabled="isShowEditButton" class="w-full" type="text" v-model="formValue[item]" placeholder="Enter header"/>
        </div>
        <div class="flex justify-end">
          <Select :disabled="isShowEditButton" v-model="listType" :options="listTypeOptions" optionLabel="label" optionValue="value" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <div class="flex ml-12 flex-col gap-4" v-for="(optionItem, index) of optionsValueForm" :key="`option_edit_${index}`">
          <div  v-for="(item) of languages" :key="`content_edit_${item}`" class="flex gap-4 items-center w-full">
            <img v-if="item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
            <img v-if="item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
            <img v-if="item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
            <InputText :disabled="isShowEditButton" class="w-full" type="text" v-model="optionItem[item]" placeholder="Enter item"/>
          </div>
          <div class="flex justify-end gap-4">
            <Button :disabled="isShowEditButton" v-if="index + 1 === optionsValueForm.length " icon="pi pi-plus" severity="contrast" variant="text" rounded aria-label="Add" @click="handleAddItemList"/>
            <Button :disabled="isShowEditButton" v-if="optionsValueForm.length > 1" icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Remove" @click="handleDeleteClickListItem(index)"/>
          </div>
         
        </div>
      </div>
      
     </div>
   </template>
   <template v-else>
     <div class="flex flex-col">
      <div class="flex flex-col gap-4 border-l-2 px-2">
        <div v-for="(item, index) of languages" :key="`content_display_${item}`" class="flex gap-6 items-start">
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.EN" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.VI" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
        <img v-if="languages.length > 1 && item === LANGUAGE_CODE.KO" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
        <h4 v-if="index !== 0" class="font-bold w-full text-2xl text-gray-500">{{ formValue?.[item] }}</h4>
        <h3 v-else  :class="styleClass" class="font-bold text-2xl">
          {{ formValue?.[item] }}
        </h3>
        </div>
      </div>
      <ul :class="listType" class="flex flex-col ml-4 mt-4 list-outside border-l-2 px-2 gap-6">
        <li v-for="(item) of optionsValueForm" :key="`content_list_display_${item}`" class="flex flex-col gap-3">
          <div v-if="languages.includes(LANGUAGE_CODE.EN)" class="flex gap-4 items-start">
            <img v-if="languages.length > 1" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/us.png" alt="United States Flag" />
            <span>{{ item.en }}</span>
          </div>
          <div v-if="languages.includes(LANGUAGE_CODE.VI)" class="flex gap-4 items-start">
            <img v-if="languages.length > 1" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/vn.png" alt="United States Flag" />
            <span>{{ item.vi }}</span>
          </div>
          <div v-if="languages.includes(LANGUAGE_CODE.KO)" class="flex gap-4 items-start">
            <img v-if="languages.length > 1" class="min-w-8 w-8 h-6 cursor-pointer"  src="https://www.flagpedia.net/data/flags/h80/kr.png" alt="United States Flag" />
            <span>{{ item.ko }}</span>
          </div>
        </li>
      </ul>
    </div>
   </template>
  </div>
</template>
<script setup lang='ts'>
import { ref, toRefs, computed } from 'vue';
import {generateText} from '../../services/GenerativeAIService';
import { MAPPING_LANGUAGE, LANGUAGE_CODE, OPTIONS_TYPE } from '../../constants/common.constant';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { updatePostSession } from '../../services/PostService';
import Select from 'primevue/select';

const props = defineProps<{
 id: string;
 content: Record<string, string>;
 options: Record<string, string>[];
 languagesList: string[];
 defaultLanguage: string;
 isEditMode: boolean;
 styleClass?: string;
}>();
const emits = defineEmits<{
 delete: [id: string]
}>();
const { defaultLanguage, content, isEditMode, languagesList, options } = toRefs(props);
const originLanguage = ref<string>(defaultLanguage.value || LANGUAGE_CODE.EN);
const languages = computed(()=> languagesList.value);
const formValue = ref<Record<string, string>>(content.value);
const optionsValueForm = ref<Record<string, string>[]>(options.value);
const listType = ref<string>(OPTIONS_TYPE.DISC);
const isShowEditButton = ref<boolean>(true);

const listTypeOptions = computed(()=>Object.entries(OPTIONS_TYPE).map(([key, value]: [string, string])=>({label: key, value: value})));

async function handleSaveClick() {
 const languagesString = Object.values(LANGUAGE_CODE).filter(item=>item !== originLanguage.value).map(item=>MAPPING_LANGUAGE[item]).join(', ');
 const responseObject = await generateText(`Dịch "${formValue.value[originLanguage.value]}" sang ngôn ngữ ${languagesString.toLowerCase()}. Theo cách dễ hiểu nhất. Trả về dạng json với cấu trúc {[languageCode]: value}`);
 formValue.value = {...responseObject, [originLanguage.value]: formValue.value[originLanguage.value]};
 optionsValueForm.value = await generateText(`Dịch "${JSON.stringify(optionsValueForm.value)}" sang ngôn ngữ ${languagesString.toLowerCase()} và giữ lại giá trị của ngôn ngữ ${MAPPING_LANGUAGE[originLanguage.value]}. Theo cách dễ hiểu nhất. Trả về dạng json với cấu trúc [{[languageCode]: value}]`);

 const updateResponse = await updatePostSession(props.id, {
   defaultLanguage: originLanguage.value,
   vi: formValue.value[LANGUAGE_CODE.VI],
   ko: formValue.value[LANGUAGE_CODE.KO],
   en: formValue.value[LANGUAGE_CODE.EN],
   listType: listType.value,
   options: optionsValueForm.value.map(item=>({ 
    vi: item[LANGUAGE_CODE.VI] || '', 
    ko: item[LANGUAGE_CODE.KO] || '', 
    en: item[LANGUAGE_CODE.EN] || ''
  }))
 });
 if(updateResponse?.statusCode === 200) {
     isShowEditButton.value = true;
 }
}

function handleAddItemList() {
  optionsValueForm.value.push({ 
    vi: '', 
    ko: '', 
    en: ''
  });
}

function handleDeleteClickListItem(index: number) {
  optionsValueForm.value.splice(index,1);
}

function handleDeleteClick() {
 emits('delete', props.id)
}

function handleEditClick() {
 isShowEditButton.value = false;
}
</script>