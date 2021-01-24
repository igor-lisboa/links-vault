import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersist from 'vuex-persist'

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
    login({ commit }, user) {
        commit('SET_LOGGED_USER', {
            user
        })
    },
    logout({ commit }) {
        commit('UNSET_LOGGED_USER')
    }
}

const getters = {
    loggedUser: state => Boolean(state?.user?.token)
}

vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
})

vuexStore = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    state,
    mutations,
    actions,
    getters
})

export default vuexStore
