import './assets/style/main.css'
import './assets/style/fonts.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore(pinia)

const bootstrap = async () => {
  await authStore.initAuth()
  await router.isReady()
  app.mount('#app')
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap the application', error)
})
