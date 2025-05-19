import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import axios from "axios";
import Cookies from 'js-cookie';

export default createStore({
	state: {
		user: null
	},
	getters: {
		getUser: (state) => state.user
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		RESET_USER(state) {
			state.user = null;
		}
	},
	actions: {
		async fetchUsers({ commit }, username) {
			try {
				const response = await axios.post(`/api/users/login/${username}`);
				if (response.data) {
					commit("SET_USER", response.data);
					return true;
				}
			} catch (error) {
				alert(error?.response?.data?.message || "An error occurred");
				console.log(error);
				commit("RESET_USER");
				return false;
			}
		}
	},
	plugins: [
		createPersistedState({
			storage: {
				getItem: key => Cookies.get(key),
				setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
				removeItem: key => Cookies.remove(key)
			}
		})
	]
})
