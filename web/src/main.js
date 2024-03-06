import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import installElementPlus from './plugins/element'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(router).mount('#app')