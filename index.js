import clone from '@ianwalter/clone'
import merge from '@ianwalter/merge'

export default function VuexReset (opts = {}) {
  const { ssr, trigger } = merge({ trigger: 'reset' }, opts)

  return store => {
    // Extract the initial state from the store so that it can be used to reset
    // the store when a trigger mutation is executed.
    const initialState = clone(store.state)

    // If the Vuex store needs to be hydrated from SSR data, add it to the store
    // after the initialState is set so that initialState isn't polluted with
    // SSR data and the store can be reset cleanly.
    if (ssr) {
      store.replaceState(clone(merge('merge', store.state, ssr)))
    }

    store.subscribe((mutation, state) => {
      if (mutation.type === trigger) {
        const newState = clone(initialState)

        // Don't reset route module if set.
        if (state.route) {
          newState.route = clone(state.route)
        }

        // Reset the entire store state.
        store.replaceState(newState)
      } else {
        // Extract the name of the module and mutation.
        const [mod, mut] = mutation.type.split('/')

        if (mut === trigger) {
          // Reset the state for the module containing the mutation.
          const moduleState = { [mod]: initialState[mod] }
          store.replaceState(clone(merge('replace', state, moduleState)))
        }
      }
    })
  }
}
