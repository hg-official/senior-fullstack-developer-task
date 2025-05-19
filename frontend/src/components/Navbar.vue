<template>
	<nav class="navbar">
		<router-link to="/" class="hover:text-gray-300">Login</router-link>
		<router-link to="/home" class="hover:text-gray-300">Home</router-link>
		<router-link v-if="user?.role?.includes('Admin')" to="/admin" class="hover:text-gray-300">Admin</router-link>
		<router-link v-if="user?.role?.some(role => role === 'Editor' || role === 'Admin')" to="/editor" class="hover:text-gray-300">Editor</router-link>
	</nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = ref(store.state.user);

</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-around;
	width: 250px;
	margin: 0 auto;
}
</style>
