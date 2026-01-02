import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CardDetail from "../views/CardDetail.vue";
import QuizView from "../views/QuizView.vue";
import Model3DView from "../views/Model3DView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/card/:id", name: "card-detail", component: CardDetail },
    { path: "/quiz/:id", name: "quiz-view", component: QuizView },

    {
      path: "/model3d/:id",
      name: "model-3d-view",
      component: Model3DView,
    },
  ],
});

export default router;
