import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import router from './router'
import './assets/index.css'
import './assets/notification.css'
import './assets/register_login.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
