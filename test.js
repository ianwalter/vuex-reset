import test from 'ava'
import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@ianwalter/clone'
import VuexReset from '.'

Vue.use(Vuex)

test('state is reset when trigger mutation executed', t => {
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
  t.deepEqual(store.state, state)
  store.commit('message', 'Yo!')
  store.commit('reset')
  t.deepEqual(store.state, state)
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
      song: {
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
  store.commit('song/name', songName)
  t.is(store.state.song.name, songName)
  store.commit('song/collection', 'Summer')
  t.deepEqual(store.state.song.collections, ['Summer'])
  t.deepEqual(store.state.song.map, { 'Summer': 1 })
  store.commit('song/reset')
  t.is(store.state.message, rootMessage)
  t.deepEqual(store.state.song, songState)
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
  t.is(store.state.song.name, songName)
  store.commit('song/collection', 'Summer')
  t.deepEqual(store.state.song.collections, ['Summer'])
  store.commit('song/reset')
  t.is(store.state.message, rootMessage)
  t.deepEqual(store.state.song, songState)
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
  t.is(store.state.message, message)
  store.commit('reset')
  t.deepEqual(store.state, state)
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
  t.is(store.state.message, state.message)
  t.is(store.state.route.path, path)
})
