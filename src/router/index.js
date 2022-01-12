import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Contacts from '@/components/ContactsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts
    }
  ]
})
