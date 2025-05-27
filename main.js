import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)

// Make axios available globally
app.config.globalProperties.$axios = axios

// Use router
app.use(router)

// Mount the app
app.mount('#app')
