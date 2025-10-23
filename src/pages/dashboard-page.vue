<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.success('با موفقیت از حساب خارج شدید')
    router.push('/')
  } catch (err) {
    console.error('Logout error:', err)
    toast.error('خروج از حساب ناموفق بود')
  }
}
</script>

<template>
  <div class="d-flex justify-content-center swish-wrapper text-center" id="auth-page">
    <div class="container-fluid form-container shadow rounded my-auto">
      <div class="row h-100">
        <div class="col-md-5 form-box bg-white rounded-left">
          <div class="d-flex flex-column sign-in-container h-100">
            <div class="align-items-center sign-in mx-auto my-auto px-4">
              <h2 class="text-black mb-4">
                سلام <span class="text-main h6">{{ user?.email }}</span>
              </h2>
              <button
                class="btn btn-main shadow-sm btn-block box-rounded box-shadow d-flex align-items-center justify-content-center"
                @click="handleLogout">
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-7 overlay-box bg-white rounded-right d-none d-md-block">
          <div class="overlay-background mx-auto rounded-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>
