import Vue from 'vue'
import VueRouter from 'vue-router'
import blogList from '../views/blogList.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/blogList',
    name: 'blogList',
    component: blogList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
