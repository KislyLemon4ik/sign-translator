import { createApp } from 'vue'
import './shared/style.css'
import App from './app/App.vue'
import { router } from './app/router'

const app = createApp(App);
app.use(router);
app.mount('#app');