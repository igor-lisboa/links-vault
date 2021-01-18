import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'
import apiLinksUsers from '../services/apiLinks/users'

Vue.use(Vuex)

let vuexStore = null
let vuexLocalStorage = null

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
                user: response.data.data.user
            })
            return response
        } catch (e) {
            console.log(e)
            throw e
        }
    },
    async logout({ commit }) {
        try {
            const response = await apiLinksUsers.logout()
            commit('UNSET_LOGGED_USER')
            return response
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

const getters = {
    loggedUser: state => Boolean(state.user.token)
}

const cookieEnabled = navigator.cookieEnabled

if (cookieEnabled) {
    vuexLocalStorage = new VuexPersist({
        key: 'vuex',
        storage: window.sessionStorage,
        reducer: state => ({
            user: state.user
        })
    })
} else {
    vuexLocalStorage = new VuexPersist({
        key: 'vuex', // The key to store the state on in the storage provider.
        storage: window.localStorage, // or window.sessionStorage or localForage
        // Function that passes the state and returns the state with only the objects you want to store.
        // reducer: state => state,
        // Function that passes a mutation and lets you decide if it should update the state in localStorage.
        // filter: mutation => (true)
    })


}

vuexStore = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    state,
    mutations,
    actions,
    getters
})

export default vuexStore
