// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
// import SweetModal from 'sweet-modal-vue/src/plugin.js'

Vue.use(VCalendar);
// Vue.use(SweetModal)

// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Vue.use(Vuetify)

/*
***** Enable production mode *********
Vue.config.productionTip = false 
**************************************
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
