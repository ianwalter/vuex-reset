import Vue from 'vue'
import Vuex from 'vuex'

import VuexReset from '../'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [VuexReset()],
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    reset: () => {}
  },
  modules: {
    messages: {
      namespaced: true,
      state: {
        messages: []
      },
      mutations: {
        message (state, message) {
          state.messages.push(message)
        },
        reset: () => {}
      }
    }
  }
})
