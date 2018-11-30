<template>
  <div>

    <h1>@ianwalter/vuex-reset</h1>

    Count: {{ count }}

    <button @click="increment">Increment Count</button>

    <button @click="resetAll">Reset All State</button>

    <button @click="resetMessages">Reset Messages Module</button>

    <input
      type="text"
      v-model="message" />

    <button @click="addMessage">Add Message</button>

    Messages:
    <div
      v-for="(message, index) of messages"
      :key="index">
      {{ message }}
    </div>

  </div>
</template>

<script>
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
