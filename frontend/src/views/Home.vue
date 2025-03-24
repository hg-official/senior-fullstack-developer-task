<template>
	<div class="home">
		<h1>Home Page</h1>
		<p>Welcome {{ username }}!</p>
		<button @click="handleLogout">Logout</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref("")

onMounted(() => {
	// You might want to get this from a more persistent storage in a real app
	const user = router.currentRoute.value.query.username
	if (!user) {
		router.push("/")
	}
	username.value = user
})

const handleLogout = () => {
	router.push("/")
}
</script>

<style scoped>
.home {
	padding: 2rem;
	text-align: center;
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
