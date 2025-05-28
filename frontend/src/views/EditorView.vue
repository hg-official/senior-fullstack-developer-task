<template>
	<div class="editor">
		<h1>Editor Page</h1>
		<p>Welcome {{ username }}!</p>
		<div class="navigation">
			<button @click="$router.push('/home')">Back to Home</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = computed(() => store.getters.username)
</script>

<style scoped>
.editor {
	padding: 2rem;
	text-align: center;
}

.navigation {
	margin-top: 2rem;
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
