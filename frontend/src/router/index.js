import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true }
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
