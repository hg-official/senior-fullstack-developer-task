<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();
onMounted(() => {
  store.dispatch("initialize");
});
</script>

<template>
  <div>
    <h1>Admin Page</h1>
    <p>Welcome {{ store.getters.username }}!</p>
  </div>
</template>
