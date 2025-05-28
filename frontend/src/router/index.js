import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import Login from "../views/Login.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
		meta: { requiresAuth: false }
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true, roles: ['Admin'] }
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true, roles: ['Admin', 'Editor'] }
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters.isAuthenticated
	const userRole = store.getters.userRole

	if (to.meta.requiresAuth && !isAuthenticated) {
		next('/')
		return
	}

	if (to.meta.roles && !to.meta.roles.includes(userRole)) {
		next('/home')
		return
	}

	next()
})

export default router
