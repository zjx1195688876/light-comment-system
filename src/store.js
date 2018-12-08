import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: () => ({
            count: 0
        }),
        actions: {
            inc: ({ commit }) => commit('inc')
        },
        mutations: {
            inc: state => state.count++
        }
    })
}