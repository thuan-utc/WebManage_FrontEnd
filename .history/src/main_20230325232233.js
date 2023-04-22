import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
var cors = require('cors')

app.use(cors()) // Use this after the variable declarationn
app.use(router)

app.mount('#app')
