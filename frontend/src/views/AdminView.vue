<template>
	<div>
		<h1>Admins Page</h1>
		<p>Welcome {{ user.username }}!</p>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = ref(store.state.user);

</script>
