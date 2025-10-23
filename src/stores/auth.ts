// src/stores/auth.ts
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { auth } from '@/firebase/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    logoutTimer: null as ReturnType<typeof setTimeout> | null,
  }),

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        const token = await user.getIdToken()
        Cookies.set('token', token, { expires: 1 / 144 })
        this.user = user
        this.autoLogout()
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const token = await user.getIdToken()
        Cookies.set('token', token, { expires: 1 / 144 })
        this.user = user
        this.autoLogout()
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await signOut(auth)
      Cookies.remove('token')
      this.user = null
      if (this.logoutTimer) clearTimeout(this.logoutTimer)
    },

    async initAuth() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken()
          Cookies.set('token', token, { expires: 1 / 144 })
          this.user = user
          this.autoLogout()
        } else {
          this.user = null
          Cookies.remove('token')
        }
      })
    },

    autoLogout() {
      if (this.logoutTimer) clearTimeout(this.logoutTimer)
      this.logoutTimer = setTimeout(() => {
        this.logout()
      }, 10 * 60 * 1000)
    },
  },
})
