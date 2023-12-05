import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown, faArrowUp, faCheck, faCoffee, faList, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faCoffee, faArrowDown, faList, faCheck, faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
