import Vuex from 'vuex'
import Vue from 'vue'
import apiLinksUsers from '../services/apiLinks/users'

Vue.use(Vuex)

const state = {
    user: {}
}

const mutations = {
    SET_LOGGED_USER(state, { user }) {
        state.user = user
    },
    UNSET_LOGGED_USER(state) {
        state.user = {}
    }
}

const actions = {
    async login({ commit }, user) {
        try {
            const response = await apiLinksUsers.login(user.email, user.password)
            commit('SET_LOGGED_USER', {
                user: response.data.user
            })
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    },
    async logout({ commit }) {
        try {
            const response = await apiLinksUsers.logout()
            commit('UNSET_LOGGED_USER')
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

const getters = {
    loggedUser: state => Boolean(state.user.token)
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
