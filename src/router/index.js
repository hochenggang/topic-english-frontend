import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import History from '../views/History.vue'
import StarSentence from '../views/StarSentence.vue'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),  
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/star-sentence',
      name: 'star-sentence',
      component: StarSentence
    },
    
  ]
})

export default router
