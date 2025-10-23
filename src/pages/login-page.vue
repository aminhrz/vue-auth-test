<script setup lang="ts">
import AuthForm from '@/components/auth/auth-form.vue'
import type { LoginValues } from '@/schemas/login'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async (values: LoginValues) => {
  const success = await authStore.login(values.email, values.password)

  if (success) {
    toast.success('با موفقیت وارد شدید')
    router.push('/dashboard')
    return
  }

  toast.error(authStore.error || 'خطایی رخ داد، لطفاً دوباره تلاش کنید')
  authStore.clearError()
}
</script>

<template>
  <AuthForm :loading="authStore.loading" mode="login" @login="handleLogin" />
</template>
