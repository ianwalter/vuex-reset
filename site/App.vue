<template lang="html">
  <div>

    <header>
      <div class="container py-4">

        <h1 class="mb-3">@ianwalter/vuex-reset</h1>

        <blockquote class="description p-3">
          A <a href="https://vuex.vuejs.org/">Vuex</a> plugin that makes
          restoring initial state to the store simple
        </blockquote>

        <a
          class="mr-2"
          href="https://github.com/ianwalter/vuex-reset">
          <img
            src="https://img.shields.io/github/stars/ianwalter/vuex-reset.svg?style=plastic&amp;label=GitHub"
            alt="github">
        </a>

        <a
          class="mr-2"
          href="https://www.npmjs.com/package/@ianwalter/vuex-reset">
          <img
            src="https://img.shields.io/npm/v/@ianwalter/vuex-reset.svg"
            alt="npm">
        </a>

        <a href="https://dev.azure.com/ianwalter/vuex-reset/_build">
          <img
            src="https://dev.azure.com/ianwalter/vuex-reset/_apis/build/status/ianwalter.vuex-reset"
            alt="build status">
        </a>

      </div>
    </header>

    <main>

      <section class="pt-3 pb-2">

        <div class="container pb-3">
          <h2>Demo</h2>
        </div>

        <div class="container">

          <div class="mb-3">

            <button
              class="btn btn-sm btn-danger"
              @click="resetAll">
              Reset All State
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="resetMessages">
              Reset Messages Module
            </button>

          </div>

          <div class="card">
            <div class="card-body">
              <div class="row align-items-center mb-3">
                <div class="col-6">
                  <strong>root/count: {{ count }}</strong>
                </div>

                <div class="col-6 text-right">
                  <button
                    class="btn btn-sm btn-primary"
                    @click="increment">
                    Increment Count
                  </button>
                </div>
              </div>

              <div class="card">
                <div class="card-body">

                  <div
                    :class="{ 'mb-3': messages.length }"
                    class="row align-items-center">
                    <div class="col-6">
                      <strong>messages/messages:</strong>
                    </div>

                    <form
                      class="col-6 form-inline"
                      @submit.prevent="addMessage">

                      <input
                        type="text"
                        placeholder="Enter a message..."
                        class="form-control form-control-sm ml-auto mr-3"
                        v-model="message" />

                      <button
                        type="submit"
                        class="btn btn-sm btn-primary">
                        Add Message
                      </button>

                    </form>
                  </div>

                  <table
                    v-show="messages.length"
                    class="table table-bordered table-striped mb-0">
                    <tbody>
                      <tr
                        v-for="(message, index) of messages"
                        :key="index">
                        <td>{{ message }}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section class="pt-3 pb-2">

        <div class="container pb-3">
          <h2>Installation</h2>
        </div>

        <pre><!--
       --><code class="container d-block py-4"><!--
            -->yarn add @ianwalter/vuex-reset<!--
       --></code><!--
     --></pre>

      </section>

      <section class="pt-3 pb-2">

        <div class="container pb-3">
          <h2>Usage</h2>
        </div>

        <pre><!--
       --><code class="language-javascript container d-block py-4"><!--
         -->import VuexReset from '@ianwalter/vuex-reset'

<!--     -->const store = new Vuex.Store({
<!--     -->  plugins: [VuexReset()],
<!--     -->  state: {
<!--     -->    message: 'Welcome!',
<!--     -->    mutations: {
<!--     -->      // A no-op mutation must be added to serve as a trigger for a reset. The
<!--     -->      // name of the trigger mutation defaults to 'reset' but can be specified
<!--     -->      // in options, e.g. VuexReset({ trigger: 'data' }).
<!--     -->      reset: () => {}
<!--     -->    }
<!--     -->  }
<!--     -->})

<!--     -->// Reset the store to it's initial state.
<!--     -->store.commit('reset')<!--
       --></code><!--
     --></pre>

      </section>

      <section class="pt-3 pb-2 container">

        <h2>License</h2>

        <p>
          Apache 2.0 with Commons Clause - See
          <a href="https://github.com/ianwalter/vuex-reset/blob/master/LICENSE">
            LICENSE
          </a>
        </p>

      </section>

    </main>

    <footer class="container py-5">
      <strong class="text-secondary">
        Created by <a href="https://iankwalter.com">Ian Walter</a>
      </strong>
    </footer>

  </div>
</template>

<script>
import { stripIndent } from 'common-tags'
import { mapState } from 'vuex'

export default {
  data: () => ({ message: null }),
  computed: {
    ...mapState(['count']),
    ...mapState('messages', ['messages'])
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    addMessage () {
      this.$store.commit('messages/message', this.message)
      this.message = null
    },
    resetAll () {
      this.$store.commit('reset')
    },
    resetMessages () {
      this.$store.commit('messages/reset')
    }
  }
}
</script>
