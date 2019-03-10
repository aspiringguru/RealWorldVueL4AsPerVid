import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'

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
      props: true
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
