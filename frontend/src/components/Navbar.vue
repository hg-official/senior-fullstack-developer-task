<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <router-link class="navbar-brand" to="/">Vue App</router-link>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li class="nav-item" v-if="isEditor">
          <router-link class="nav-link" to="/editor">Editor</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link class="nav-link" to="/admin">Admin</router-link>
        </li>
      </ul>

      <div class="d-flex align-items-center gap-3" v-if="username">
        <span class="text-white">{{ username }}</span>
        <button class="btn btn-outline-light btn-sm" @click="handleLogout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch("initialize");
});

const isAdmin = computed(() => store.getters.isAdmin);
const isEditor = computed(() => store.getters.isEditor);
const username = computed(() => store.getters.username);

const handleLogout = () => {
  store.dispatch("logout");
  router.push("/");
};
</script>
