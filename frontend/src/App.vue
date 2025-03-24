<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/users">User Management</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav { display: flex; gap: 10px; margin-bottom: 20px; }
</style>
  