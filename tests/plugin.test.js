const Vue = require('vue')
const Vuex = require('vuex')
const clone = require('@ianwalter/clone')

const VuexReset = require('../')

Vue.use(Vuex)

test('plugin resets state when trigger mutation executed', () => {
  const state = { message: 'Hello!' }
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    mutations: {
      message: (state, message) => (state.message = message),
      reset: () => {}
    }
  })
  store.commit('message', 'Greetings!')
  store.commit('reset')
  expect(store.state).toEqual(state)
  store.commit('message', 'Yo!')
  store.commit('reset')
  expect(store.state).toEqual(state)
})

test('plugin resets only module state when module mutation executed', () => {
  const rootMessage = 'Yo!'
  const songName = 'One Touch'
  const state = { message: 'Hello!' }
  const songState = { name: 'Messy Love' }
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    mutations: {
      message: (state, message) => (state.message = message),
      reset: () => {}
    },
    modules: {
      song: {
        namespaced: true,
        state: clone(songState),
        mutations: {
          name: (state, name) => (state.name = name),
          reset: () => {}
        }
      }
    }
  })
  store.commit('message', rootMessage)
  store.commit('song/name', songName)
  expect(store.state.song.name).toEqual(songName)
  store.commit('song/reset')
  expect(store.state.message).toEqual(rootMessage)
  expect(store.state.song).toEqual(songState)
})

test('plugin uses ssr state but can reset to initial state', () => {
  const message = 'Yo!'
  const state = { message: 'Hello!' }
  const store = new Vuex.Store({
    plugins: [VuexReset({ ssr: { message } })],
    state: clone(state),
    mutations: {
      reset: () => true
    }
  })
  expect(store.state.message).toBe(message)
  store.commit('reset')
  expect(store.state).toEqual(state)
})

test('plugin keeps current route state if it exists when reset', () => {
  const state = { message: 'Hello!' }
  const route = { path: '/' }
  const path = '/welcome'
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    modules: {
      route: {
        namespaced: true,
        state: clone(route),
        mutations: {
          path: (state, path) => (state.path = path)
        }
      }
    },
    mutations: {
      message: (state, message) => (state.message = message),
      reset: () => {}
    }
  })
  store.commit('route/path', path)
  store.commit('message', 'Greetings!')
  store.commit('reset')
  expect(store.state.message).toEqual(state.message)
  expect(store.state.route.path).toEqual(path)
})
