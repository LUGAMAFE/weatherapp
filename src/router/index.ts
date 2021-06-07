import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import WeatherDay from '@/views/WeatherDay.vue'
import NotFound404 from '@/views/NotFound404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/day/:id',
    name: 'WeatherDay', 
    component: WeatherDay,
    props: true 
  },
  { 
    path: "/:catchAll(.*)",
    name: 'NotFound404',
    component: NotFound404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
