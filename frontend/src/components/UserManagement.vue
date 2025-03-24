<template>
  <div>
    <h2>User Management</h2>
    <table>
      <tr>
        <th>Username</th>
        <th>Roles</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.roles.map(r => r.name).join(', ') }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);

onMounted(async () => {
  const response = await axios.get('/api/users');
  users.value = response.data;
});
</script>
