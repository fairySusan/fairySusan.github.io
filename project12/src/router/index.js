import Vue from 'vue'
import Router from 'vue-router'
import listPage from '../components/listPage'
import editPage from '../components/editPage'
import createPage from '../components/createPage'
import browserData from '../components/browserData'
import calander from '../components/calander'
 Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/listPage.vue',
      name: 'listPage',
      component: listPage
    },
    {
      path: '/createPage.vue',
      name: 'createPage',
      component: createPage,
    },
    {
      path: '/editPage.vue',
      name: 'editPage',
      component:editPage,
    },
    {
      path: '/browserData.vue',
      name: 'browserData',
      component:browserData,
    },
    {
      path: '/calander.vue',
      name: 'calander',
      component:calander,
    }

     ]
})