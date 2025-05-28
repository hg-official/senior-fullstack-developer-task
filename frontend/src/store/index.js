import { createStore } from "vuex"
import axios from "axios"
import { API_URL } from "../config/config"

export default createStore({
	state: {
		user: null,
		isAuthenticated: false
	},
	getters: {
		currentUser: (state) => state.user,
		isAuthenticated: (state) => state.isAuthenticated,
		userRole: (state) => state.user?.role || null,
		username: (state) => state.user?.username || null
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
			state.isAuthenticated = !!user
		},
		CLEAR_USER(state) {
			state.user = null
			state.isAuthenticated = false
		}
	},
	actions: {
		async login({ commit }, username) {
			try {
				const response = await axios.post(`${API_URL}/users/login/${username}`)
				commit('SET_USER', response.data)
				return response.data
			} catch (error) {
				throw error
			}
		},
		logout({ commit }) {
			commit('CLEAR_USER')
		}
	},
	modules: {
		// Define your modules here
	},
})
