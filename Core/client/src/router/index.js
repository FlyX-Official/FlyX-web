import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/routes/LandingPage'
import AppPage from '@/routes/AppPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: {
        title: 'FlyX - Home',
        metaTags: [
          {
            name: 'description',
            content: 'FlyX Home Page'
          },
        ]
      },
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/app',
      meta: {
        title: 'FlyX - App',
        metaTags: [
          {
            name: 'description',
            content: 'FlyX Home Page'
          },
        ]
      },
      name: 'AppPage',
      component: AppPage
    },

  ]
})
