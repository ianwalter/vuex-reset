# @ianwalter/vuex-reset
> A [Vuex](https://github.com/vuejs/vuex) plugin that makes restoring initial
> state to the store simple

## Installation

```
npm install @ianwalter/vuex-reset --save
```

## Usage

```js
import VuexReset from '@ianwalter/vuex-reset'

const store = new Vuex.Store({
  plugins: [VuexReset()],
  state: {
    message: 'Welcome!',
    mutations: {
      // A no-op mutation must be added to serve as a trigger for a reset. The
      // name of the trigger mutation defaults to 'reset' but can be specified
      // in options, e.g. VuexReset({ trigger: 'data' }).
      reset: () => {}
    }
  }
})

// Reset the store to it's initial state.
store.commit('reset')
```

You can also reset a namespaced module to it's initial state, for example:

```js
const store = new Vuex.Store({
  plugins: [VuexReset()],
  state: {
    message: 'Welcome!'
  },
  modules: {
    car: {
      namespaced: true,
      state: {
        brand: 'Honda'
      },
      mutations: {
        reset: () => {}
      }
    }
  }
})

// Reset the car module to it's initital state.
store.commit('car/reset')
```

&nbsp;

ISC &copy; [Ian Walter](https://iankwalter.com)

