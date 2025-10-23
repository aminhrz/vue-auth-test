<script setup lang="ts">
import 'vue-sonner/style.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BApp } from 'bootstrap-vue-next'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster richColors position="bottom-right" closeButton closeButtonPosition="top-left" />
  <RouterView v-slot="{ Component: ViewComponent }">
    <transition name="slide" mode="out-in" appear>
      <component :is="ViewComponent" />
    </transition>
  </RouterView>
</template>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
