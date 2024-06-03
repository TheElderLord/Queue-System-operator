import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MainPage from '../views/MainPage.vue';
import SelectBranch from '../views/SelectBranchPage.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage,
    meta: { requiresAuth: true }, // This meta field indicates that the route requires authentication
  },
  {
    path: '/branch',
    name: 'branc',
    component: SelectBranch,
    meta: { requiresAuth: true }, // This meta field indicates that the route requires authentication
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Assume the auth token is stored in localStorage

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next({ name: 'login' }); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router;
