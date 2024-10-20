<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
        <Select 
        v-model="selectedLanguage" 
        :options="languages" 
        optionLabel="label" 
        optionValue="value" 
        class="w-full md:w-56" />
        <Button :disabled="!code" label="Run" severity="success" class="min-w-20" @click="handleRun"/>
    </div>
    <Splitter class="mb-8">
      <SplitterPanel class="flex items-center justify-center">  
        <codemirror
        v-model="code"
        placeholder="Code goes here..." 
        :style="{ height: '100%', width: '100%' }" 
        :autofocus="true"
        :indent-with-tab="true" 
        :tab-size="2" 
        :extensions="[languagePlugin[selectedLanguage]]" 
        @ready="handleReady"
        @change="handleValueChange($event)" /> 
      </SplitterPanel>
      <SplitterPanel class="flex flex-col"> 
        <iframe ref="outputFrameRef" class="w-full h-full"></iframe>
        <div v-if="errors" class="text-red-500 text-sm p-2 border-t-2">
          {{ errors }}
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, toRefs } from 'vue';
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sql } from '@codemirror/lang-sql';
import { angular } from '@codemirror/lang-angular';
import { vue } from '@codemirror/lang-vue';
import { sass } from '@codemirror/lang-sass';
import { json } from '@codemirror/lang-json';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Select from 'primevue/select';
import Button from 'primevue/button';
import {HTML_TEMPLATE, LANGUAGE_CONSTANT} from '../../constants/common.constant';

const props = defineProps<{
  language?: string;
  initCode?: string;
}>();

const {language, initCode} = toRefs(props);
const languagePlugin: Record<string, any> = {
  [LANGUAGE_CONSTANT.JAVASCRIPT]: javascript({
    jsx: true,
    typescript: true
  }),
  [LANGUAGE_CONSTANT.HTML]: html({
    matchClosingTags: true,
    selfClosingTags: true,
    autoCloseTags: true,
  }),
  [LANGUAGE_CONSTANT.CSS]: css(),
  [LANGUAGE_CONSTANT.SQL]: sql(),
  [LANGUAGE_CONSTANT.ANGULAR]: angular(),
  [LANGUAGE_CONSTANT.VUE]: vue(),
  [LANGUAGE_CONSTANT.SASS]: sass({
    indented: true
  }),
  [LANGUAGE_CONSTANT.JSON]: json()
}
const languages = computed(()=>[
  {label: 'Javascript', value: LANGUAGE_CONSTANT.JAVASCRIPT},
  {label: 'HTML', value: LANGUAGE_CONSTANT.HTML},
  {label: 'Css', value: LANGUAGE_CONSTANT.CSS},
  {label: 'SQL', value: LANGUAGE_CONSTANT.SQL},
  {label: 'Angular', value: LANGUAGE_CONSTANT.ANGULAR},
  {label: 'Vue', value: LANGUAGE_CONSTANT.VUE},
  {label: 'Sass', value: LANGUAGE_CONSTANT.SASS},
  {label: 'Json', value: LANGUAGE_CONSTANT.JSON},
]);
const selectedLanguage = ref(language.value || LANGUAGE_CONSTANT.JAVASCRIPT);
const outputFrameRef = ref();
const code = ref(initCode.value);
const errors = ref('');
const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
}

const handleValueChange = (value: string) => {
  code.value = value;
}
const handleRun = async () => {
    errors.value = 'Error: ';
    if(selectedLanguage.value === LANGUAGE_CONSTANT.JAVASCRIPT) {
      const frameDoc = outputFrameRef.value.contentDocument || outputFrameRef.value.contentWindow.document;
      frameDoc.open();
      frameDoc.write(HTML_TEMPLATE);
      frameDoc.close();
      const scriptElement = frameDoc.createElement('script');
      try {
          new Function(code.value)();
          scriptElement.textContent = code.value;
          frameDoc.body.appendChild(scriptElement);
        } catch (error) {
          errors.value += error.message;
        }
        return;
    }
}
</script>