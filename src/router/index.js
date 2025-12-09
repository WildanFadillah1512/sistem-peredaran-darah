import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardDetail from '../views/CardDetail.vue'
import QuizView from '../views/QuizView.vue' // 1. Import Halaman Quiz

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/card/:id', name: 'card-detail', component: CardDetail },
    
    // 2. Tambahkan Route Quiz
    {
      path: '/quiz/:id',
      name: 'quiz-view',
      component: QuizView
    }
  ]
})

export default router