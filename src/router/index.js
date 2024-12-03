import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sentences from '@/views/Sentences.vue'

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
      path: '/sentences',
      name: 'sentences',
      component: Sentences
    },
    // {
    //   path: '/history',
    //   name: 'history',
    //   component: History
    // },
    // {
    //   path: '/star-sentence',
    //   name: 'star-sentence',
    //   component: StarSentence
    // },
    
  ]
})

export default router
