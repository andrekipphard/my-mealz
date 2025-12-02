import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/playground', component: () => import('./views/Playground.vue') },
  { path: '/recipes', component: () => import('./views/Recipes.vue') },
  { path: '/recipes/add', component: () => import('./views/RecipeAdd.vue') },
  { path: '/recipes/:id/edit', component: () => import('./views/RecipeEdit.vue') },
  { path: '/recipes/:id', component: () => import('./views/RecipeDetail.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
