<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

onMounted(() => {
  store.dispatch("initialize");
});

const isAdmin = computed(() => store.getters.isAdmin);
const isEditor = computed(() => store.getters.isEditor);
const username = computed(() => store.getters.username);
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="hover:text-gray-300">Login</router-link>
    <router-link to="/home" class="hover:text-gray-300">Home</router-link>
    <router-link v-if="isAdmin" to="/admin" class="hover:text-gray-300"
      >Admin</router-link
    >
    <router-link v-if="isEditor" to="/editor" class="hover:text-gray-300"
      >Editor</router-link
    >
    <span v-if="username">| {{ username }}</span>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;
  align-items: center;
}
</style>
