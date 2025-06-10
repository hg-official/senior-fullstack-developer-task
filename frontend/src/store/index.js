import { createStore } from "vuex"

export default createStore({
	state: {
		// Define your state here
		username: "",
	},
	getters: {
		// Define your getters here
		getUsername(state) {
			return state.username;
		},
	},
	mutations: {
		// Define your mutations here
		setUsername(state, username) {
			state.username = username;
		},
	},
	actions: {
		// Define your actions here
	},
	modules: {
		// Define your modules here
	},
})
