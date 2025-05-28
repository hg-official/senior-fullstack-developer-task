<template>
	<div class="home">
		<h1>Home Page</h1>
		<p>Welcome {{ username }}!</p>
		<div class="navigation">
			<button v-if="canAccessEditor" @click="$router.push('/editor')">Go to Editor Page</button>
			<button v-if="canAccessAdmin" @click="$router.push('/admin')">Go to Admin Page</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = computed(() => store.getters.username)
const userRole = computed(() => store.getters.userRole)

const canAccessEditor = computed(() => ['Admin', 'Editor'].includes(userRole.value))
const canAccessAdmin = computed(() => userRole.value === 'Admin')
</script>

<style scoped>
.home {
	padding: 2rem;
	text-align: center;
}

.navigation {
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
	justify-content: center;
}

button {
	padding: 0.5rem 1rem;
	background-color: #42b983;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #3aa876;
}
</style>
