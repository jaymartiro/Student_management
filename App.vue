<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Student Management</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/students">Students</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const isAuthenticated = ref(false)

    const checkAuth = () => {
      const token = localStorage.getItem('token')
      isAuthenticated.value = !!token
    }

    const logout = async () => {
      try {
        localStorage.removeItem('token')
        isAuthenticated.value = false
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
