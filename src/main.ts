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

app.use(createPinia())
app.use(router)
const authStore = useAuthStore()
authStore.initAuth()
app.mount('#app')
