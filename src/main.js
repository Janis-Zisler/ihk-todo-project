import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import vuetify from '@/plugins/vuetify'

// Setup
import App from '@/App.vue'
import router from '@/router'
const pinia = createPinia();

const app = createApp(App);

app.use(vuetify)
app.use(router);
app.use(pinia);

app.mount('#app')
