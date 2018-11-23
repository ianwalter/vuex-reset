import Vue from 'vue'

import App from './App'

// Turn off logging of production tip.
Vue.config.productionTip = false

// Create the Vue application instance.
const app = new Vue({ render: h => h(App) })

// Mount the application to the element on the page with id="app".
app.$mount('#app')
