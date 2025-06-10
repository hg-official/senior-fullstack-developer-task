<template>
	<div>
    <div v-if="username">
      Welcome, {{username}}!
    </div>
		<Navbar v-if="showNavbar" />
		<router-view />
		<button v-if="showNavbar" @click="handleLogout">Logout</button>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import Navbar from "./components/Navbar.vue"
import store from "./store/";

const route = useRoute()
const router = useRouter()

// Vue route guard (e.g., router.js)
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    try {
      const username = store.getters.getUsername;
      const res = await fetch('/api' + to.path, {
        credentials: 'include', // include cookies
        headers: {"token": username},
      });

      if (!res.ok) throw new Error();
      next();
    } catch {
      next('/');
    }
  } else {
    next();
  }
});

const showNavbar = computed(() => route.path !== "/")

const handleLogout = () => {
	router.push("/")
}

</script>
<script>
export default {
  computed: {
    username() {
      return this.$store.getters.getUsername;
    }
  },
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

button {
	padding: 0.5rem 1rem;
	font-size: 1rem;
	background-color: #dc3545;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 1rem;
}

button:hover {
	background-color: #c82333;
}
</style>
