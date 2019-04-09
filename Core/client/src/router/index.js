import Vue from 'vue'
import Router from 'vue-router'
import AppPage from '@/routes/AppPage'
import LandingPage from '@/routes/LandingPage'
import { store } from '../../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      meta: {
        title: 'FlyX - Home',
        requiresAuth: false
      },
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/app',
      meta: {
        title: 'FlyX - App',
        requiresAuth: true
      },
      name: 'AppPage',
      component: AppPage
    },

  ],

})

export default router;

router.beforeEach(async (to, from, next) => {
  let currentUser = store.state.USER;
  let requriesAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requriesAuth && !currentUser) {
    console.log('App Guard Case 1');
    next('/');
  } else if (!requriesAuth && !currentUser) {
    console.log('App Guard Case 2');
    next();
  }else if (!requriesAuth && currentUser){
    console.log('App Guard Case 3');
    next('/app');
  }else if (requriesAuth && currentUser){
    console.log('App Guard Case 4');
    next();
  }else{
    console.log('App Guard Case 5');
    next(Error);
  }
});