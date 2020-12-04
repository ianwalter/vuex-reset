# @ianwalter/vuex-reset
> A [Vuex][vuexUrl] plugin that makes restoring initial state to the store
> simple

[![npm page][npmImage]][npmUrl]
[![CI][ciImage]][ciUrl]

## Resources

* [Spotlight on vuex-reset blog post][postUrl]
* [Demo site][demoUrl]

## Installation

```console
pnpm add @ianwalter/vuex-reset
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

## Related

* [`vue-component-reset`][vueComponentResetUrl] - A Vue.js component mixin that
  makes restoring initial state to the component simple

## @ianwalter/vuex-reset for enterprise

Available as part of the Tidelift Subscription

The maintainers of @ianwalter/vuex-reset and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-ianwalter-vuex-reset?utm_source=npm-ianwalter-vuex-reset&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[vuexUrl]: https://github.com/vuejs/vuex
[npmImage]: https://img.shields.io/npm/v/@ianwalter/vuex-reset.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/vuex-reset
[ciImage]: https://github.com/ianwalter/vuex-reset/workflows/CI/badge.svg
[ciUrl]: https://github.com/ianwalter/vuex-reset/actions
[postUrl]: https://ianwalter.dev/spotlight-on-vuex-reset/
[demoUrl]: https://vuex-reset.ianwalter.dev
[vueComponentResetUrl]: https://github.com/ianwalter/vue-component-reset
[licenseUrl]: https://github.com/ianwalter/vuex-reset/blob/master/LICENSE
