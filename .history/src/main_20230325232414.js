import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
// var cors = require('cors')

// app.use(cors()) 
app.use(router)

app.mount('#app')
