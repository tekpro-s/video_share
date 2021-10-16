import Vue from 'vue'
import VueRouter from 'vue-router'
import Videos from '../views/Videos.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Thanks from '../views/Thanks.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Videos',
    component: Videos,
  }, 
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: "/detail/:video_id",
    name: "Detail",
    component: Detail,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
