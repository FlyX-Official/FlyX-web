// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router/index'
import VCalendar from 'v-calendar'
import dotenv from 'dotenv'
import { store } from '../store' 
import './authentication/firebaseConn'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'v-calendar/lib/v-calendar.min.css'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

dotenv.config()
Vue.use(VCalendar);
Vue.use(router);
Vue.use(Buefy,{
  defaultIconPack: 'fas'
});

/*
***** Enable production mode *********
Vue.config.productionTip = false 
**************************************
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
