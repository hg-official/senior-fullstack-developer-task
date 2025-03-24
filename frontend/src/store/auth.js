import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const response = await axios.get('/api/users/me');
      this.user = response.data;
    },
  },
  getters: {
    hasRole: (state) => (roles) => {
      return state.user?.roles.some(role => roles.includes(role.name));
    },
  },
});
