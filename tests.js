const { test } = require('@ianwalter/bff')
const Vue = require('vue')
const Vuex = require('vuex')
const clone = require('@ianwalter/clone')
const merge = require('@ianwalter/merge')
const VuexReset = require('.')

Vue.use(Vuex)

test('state is reset when trigger mutation executed', t => {
  const state = { message: 'Hello!', with: { my: { e: 'yes', open: true } } }
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    mutations: {
      message: (state, message) => (state.message = message),
      data: (state, data) => merge(state, data),
      reset: () => {}
    }
  })
  store.commit('message', 'Greetings!')
  store.commit('reset')
  t.expect(store.state).toEqual(state)
  store.commit('message', 'Yo!')
  store.commit('reset')
  t.expect(store.state).toEqual(state)
  store.commit('data', { with: { my: { open: false } } })
  t.expect(store.state.with).toEqual({ my: { e: 'yes', open: false } })
  store.commit('reset')
  t.expect(store.state).toEqual(state)
})

test('only module state is reset when module mutation executed', t => {
  const rootMessage = 'Yo!'
  const songName = 'One Touch'
  const state = { message: 'Hello!' }
  const songState = { name: 'Messy Love', collections: [], map: {} }
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    mutations: {
      message: (state, message) => (state.message = message),
      reset: () => {}
    },
    modules: {
      'sample/song': {
        namespaced: true,
        state: clone(songState),
        mutations: {
          name: (state, name) => (state.name = name),
          collection: (state, collection) => {
            state.collections.push(collection)
            state.map[collection] = 1
          },
          reset: () => {}
        }
      }
    }
  })
  store.commit('message', rootMessage)
  store.commit('sample/song/name', songName)
  t.expect(store.state['sample/song'].name).toBe(songName)
  store.commit('sample/song/collection', 'Summer')
  t.expect(store.state['sample/song'].collections).toEqual(['Summer'])
  t.expect(store.state['sample/song'].map).toEqual({ Summer: 1 })
  store.commit('sample/song/reset')
  t.expect(store.state.message).toBe(rootMessage)
  t.expect(store.state['sample/song']).toEqual(songState)
  store.commit('sample/song/collection', 'Dance')
  store.commit('reset')
  t.expect(store.state['sample/song']).toEqual(songState)
})

test('module state can be reset when registered dynamically', t => {
  const rootMessage = 'Yo!'
  const songName = 'One Touch'
  const state = { message: 'Hello!' }
  const songState = { name: 'Messy Love', collections: [] }
  const song = {
    namespaced: true,
    state: clone(songState),
    mutations: {
      name: (state, name) => (state.name = name),
      collection: (state, collection) => state.collections.push(collection),
      reset: () => {}
    }
  }
  const store = new Vuex.Store({
    plugins: [VuexReset()],
    state: clone(state),
    mutations: {
      message: (state, message) => (state.message = message),
      reset: () => {}
    }
  })
  store.registerModuleState('song', song)
  store.commit('message', rootMessage)
  store.commit('song/name', songName)
  t.expect(store.state.song.name).toBe(songName)
  store.commit('song/collection', 'Summer')
  t.expect(store.state.song.collections).toEqual(['Summer'])
  store.commit('song/reset')
  t.expect(store.state.message).toEqual(rootMessage)
  t.expect(store.state.song).toEqual(songState)
})

test('ssr state is used but can reset to initial state', t => {
  const message = 'Yo!'
  const state = { message: 'Hello!', song: 'The Wheel' }
  const store = new Vuex.Store({
    plugins: [VuexReset({ ssr: { message, song: null } })],
    state: clone(state),
    mutations: {
      reset: () => true
    }
  })
  t.expect(store.state.message).toBe(message)
  store.commit('reset')
  t.expect(store.state).toEqual(state)
})

test('current route state is kept if it exists when reset', t => {
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
  t.expect(store.state.message).toBe(state.message)
  t.expect(store.state.route.path).toBe(path)
})
