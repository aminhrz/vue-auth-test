<script setup lang="ts">
import AuthForm from '@/components/auth/auth-form.vue'
import type { RegisterValues } from '@/schemas/register'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async (values: RegisterValues) => {
  const success = await authStore.register(values.email, values.password)

  if (success) {
    toast.success('ثبت‌نام با موفقیت انجام شد ')
    router.push('/')
    return
  }

  toast.error(authStore.error || 'خطایی در ثبت‌نام رخ داد، لطفاً دوباره تلاش کنید ')
  authStore.clearError()
}
</script>

<template>
  <AuthForm mode="register" :loading="authStore.loading" @register="handleRegister" />
</template>
