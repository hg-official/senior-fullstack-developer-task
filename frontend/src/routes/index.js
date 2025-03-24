import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Forbidden from '../views/Forbidden.vue';
import UserManagement from '../components/UserManagement.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/forbidden', component: Forbidden },
  {
    path: '/admin',
    component: Admin,
    meta: { roles: ['Admin'] },  // ✅ Requires Admin role
  },
  {
    path: '/users',
    component: UserManagement,
    meta: { roles: ['Admin', 'Manager'] },  // ✅ Requires Admin or Manager role
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userRoles = authStore.user?.roles || [];

  if (to.meta.roles) {
    const hasAccess = userRoles.some(role => to.meta.roles.includes(role));
    if (!hasAccess) return next('/forbidden');
  }

  next();
});

export default router;
