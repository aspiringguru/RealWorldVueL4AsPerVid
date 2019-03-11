import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      //nb: because props set to true, parameter that matches name set as a prop,
      //    it is sent in as a prop.
      beforeEnter(routeTo, routeFrom, next) {
        //this runs after the global beforeEach
        //starts the progress bar.
        //fetchEvent module in event.js must return a promise
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          //event received from action
          routeTo.params.event = event
          next()
        })
      }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  //start the progress bar when routing begins.
  NProgress.start()
  next()
})

router.afterEach(() => {
  //finish the routing bar when progress is done
  NProgress.done()
})

export default router
