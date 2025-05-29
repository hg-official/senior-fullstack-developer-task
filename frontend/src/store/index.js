import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  state: {
    user: null,
  },
  getters: {
    username: (state) => state.user?.username || "",
    roles: (state) => state.user?.roles || [],
    isAdmin: (state, getters) => getters.roles.includes("Admin"),
    isEditor: (state, getters) =>
      getters.roles.includes("Editor") || getters.roles.includes("Admin"),
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },
    clearUser(state) {
      state.user = null
      localStorage.removeItem("user")
    },
    loadUserFromStorage(state) {
      const stored = localStorage.getItem("user")
      if (stored) {
        state.user = JSON.parse(stored)
      }
    },
  },
  actions: {
    async login({ commit }, username) {
      const response = await axios.post(`/api/users/login/${username}`)
      commit("setUser", response.data)
    },
    logout({ commit }) {
      commit("clearUser")
    },
    initialize({ commit }) {
      commit("loadUserFromStorage")
    },
  },
})