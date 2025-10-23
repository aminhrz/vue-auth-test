<script setup lang="ts">
import AuthForm from '@/components/auth/auth-form.vue'
import type { LoginValues } from '@/schemas/login'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async (values: LoginValues) => {
  try {
    await authStore.login(values.email, values.password)
    toast.success('با موفقیت وارد شدید')
    router.push('/dashboard')
  } catch (err: unknown) {
    if (err instanceof Error) {
      const map: Record<string, string> = {
        'Firebase: Error (auth/invalid-credential).': 'نام کاربری یا رمز عبور اشتباه است ',
        'Firebase: Error (auth/user-not-found).': 'کاربری با این ایمیل یافت نشد',
        'Firebase: Error (auth/wrong-password).': 'رمز عبور نادرست است',
        'Firebase: Error (auth/too-many-requests).': 'تعداد تلاش‌های ورود زیاد است، کمی بعد امتحان کنید',
      }

      const message = map[err.message] || 'خطایی رخ داد، لطفاً دوباره تلاش کنید'
      toast.error(message)
    } else {
      toast.error('خطایی رخ داد')
    }
  }
}
</script>

<template>
  <AuthForm :loading="authStore.loading" mode="login" @submit="handleLogin" />
</template>
