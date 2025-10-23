<script setup lang="ts">
import AuthForm from '@/components/auth/auth-form.vue'
import type { RegisterValues } from '@/schemas/register'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async (values: RegisterValues) => {
  try {
    await authStore.register(values.email, values.password)
    toast.success('ثبت‌نام با موفقیت انجام شد ')
    router.push('/')
  } catch (err: unknown) {
    if (err instanceof Error) {
      const map: Record<string, string> = {
        'Firebase: Error (auth/email-already-in-use).': 'این ایمیل قبلاً ثبت شده است ',
        'Firebase: Error (auth/invalid-email).': 'فرمت ایمیل وارد شده معتبر نیست ',
        'Firebase: Error (auth/operation-not-allowed).': 'عملیات ثبت‌نام برای این حساب غیرفعال است',
        'Firebase: Error (auth/weak-password).': 'رمز عبور باید حداقل ۶ کاراکتر باشد',
      }

      const message = map[err.message] || 'خطایی در ثبت‌نام رخ داد، لطفاً دوباره تلاش کنید '
      toast.error(message)
    } else {
      toast.error('ثبت‌نام ناموفق بود')
    }
  }
}
</script>

<template>
  <AuthForm mode="register" :loading="authStore.loading" @submit="handleRegister as any" />
</template>
