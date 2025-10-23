import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/login-page.vue'
import RegisterPage from '@/pages/register-page.vue'
import DashboardPage from '@/pages/dashboard-page.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
      meta: { title: 'ورود | لیدوچت', requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { title: 'ثبت‌نام | لیدوچت', requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { title: 'داشبورد | لیدوچت', requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initAuth()

  const isLoggedIn = authStore.isAuthenticated

  document.title = (to.meta.title as string) || 'لیدوچت'

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresGuest && isLoggedIn) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
