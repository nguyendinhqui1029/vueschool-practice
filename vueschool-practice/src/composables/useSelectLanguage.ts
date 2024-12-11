import { ref } from 'vue';
import { LANGUAGE_CODE } from '../constants/common.constant';
const languages = ref<string[]>([LANGUAGE_CODE.EN]);
export function useLanguages() {
    const setLanguages = (selectLanguages: string[]) => {
        languages.value = selectLanguages;
        localStorage?.setItem('languages', selectLanguages?.join(','))
    };
  
    const getLanguages = () => {
        languages.value = [...(localStorage?.getItem('languages')?.split(',') || languages.value)];
     return languages;
    };
  
    return {
        setLanguages,
        getLanguages
    };
  }