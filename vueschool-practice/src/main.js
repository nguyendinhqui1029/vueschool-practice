import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './style.css'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'

createApp(App).use(PrimeVue,{
  theme: {
      preset: Aura
  }
}).use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
  }).mount('#app')
