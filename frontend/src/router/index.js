import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue";
import store from '../store/index.js';

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
		meta: { roles: ['Admin', 'Editor', 'User'] }
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { roles: ['Admin'] }
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { roles: ['Editor', 'Admin'] }
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const user = store?.state?.user;
	if (!to.meta?.roles || (user && to.meta?.roles?.some(role => user.role.find(r => r === role)))) {
		next();
	} else {
		next({ name: 'Login' });
	}
});

export default router
