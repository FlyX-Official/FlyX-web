// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router/index'
import VCalendar from 'v-calendar'
import dotenv from 'dotenv'
import { store } from '../store' 
import './authentication/firebaseConn'
import Snackbar from 'buefy/dist/components/snackbar'

import 'v-calendar/lib/v-calendar.min.css'
import 'buefy/dist/buefy.css'

dotenv.config()
Vue.use(VCalendar);
Vue.use(router);
Vue.use(Snackbar);

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
