import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import store from "../store"; //

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("../views/EditorView.vue"),
    meta: { requiresEditor: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("initialize");

  const isAdmin = store.getters.isAdmin;
  const isEditor = store.getters.isEditor;

  if (to.meta.requiresAdmin && !isAdmin) {
    return next("/home");
  }

  if (to.meta.requiresEditor && !isEditor) {
    return next("/home");
  }

  next();
});

export default router;
