import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		// Lazy loading for better performance
		component: () => import("../views/About.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
