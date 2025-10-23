import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { mapFirebaseAuthError } from '@/utils/firebaseError'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
    initialized: false,
    initPromise: null as Promise<void> | null,
    logoutTimer: null as ReturnType<typeof setTimeout> | null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    isReady: (state) => state.initialized,
  },

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await this.handleAuthenticatedUser(user)
        return true
      } catch (error) {
        this.error = mapFirebaseAuthError(error)
        return false
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        await this.handleAuthenticatedUser(user)
        return true
      } catch (error) {
        this.error = mapFirebaseAuthError(error)
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.clearLogoutTimer()
      try {
        await signOut(auth)
      } catch (error) {
        this.error = mapFirebaseAuthError(error)
      } finally {
        this.clearSession()
      }
    },

    initAuth() {
      if (this.initPromise) {
        return this.initPromise
      }

      this.initPromise = new Promise<void>((resolve) => {
        let resolved = false

        const finishInitialization = () => {
          if (!resolved) {
            resolved = true
            this.initialized = true
            resolve()
          }
        }

        onAuthStateChanged(
          auth,
          async (user) => {
            try {
              if (user) {
                await this.handleAuthenticatedUser(user)
              } else {
                this.clearSession()
              }
            } catch (error) {
              this.error = mapFirebaseAuthError(error)
              this.clearSession()
            } finally {
              finishInitialization()
            }
          },
          (error) => {
            this.error = mapFirebaseAuthError(error)
            this.clearSession()
            finishInitialization()
          }
        )
      })

      return this.initPromise
    },

    clearError() {
      this.error = null
    },

    clearSession() {
      this.user = null
      this.clearLogoutTimer()
    },

    clearLogoutTimer() {
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer)
        this.logoutTimer = null
      }
    },

    async handleAuthenticatedUser(user: User) {
      this.user = user
      this.error = null
      await this.scheduleTokenRefresh(user)
    },

    async scheduleTokenRefresh(user: User) {
      this.clearLogoutTimer()

      try {
        const tokenResult = await user.getIdTokenResult()
        const expirationTimestamp = new Date(tokenResult.expirationTime).getTime()
        const refreshDelay = Math.max(expirationTimestamp - Date.now() - 60 * 1000, 0)

        this.logoutTimer = setTimeout(async () => {
          try {
            await user.getIdToken(true)
            await this.scheduleTokenRefresh(user)
          } catch (error) {
            this.error = mapFirebaseAuthError(error)
            await this.logout()
          }
        }, refreshDelay)
      } catch (error) {
        this.error = mapFirebaseAuthError(error)
      }
    },
  },
})
