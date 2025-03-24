import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Login.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Home,
	},
	{
		path: "/Home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
