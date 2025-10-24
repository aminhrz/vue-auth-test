import { ref, computed } from 'vue'
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

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  let initPromise: Promise<void> | null = null
  let logoutTimer: ReturnType<typeof setTimeout> | null = null

  const isAuthenticated = computed(() => Boolean(user.value))
  const isReady = computed(() => initialized.value)

  async function register(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { user: u } = await createUserWithEmailAndPassword(auth, email, password)
      await handleAuthenticatedUser(u)
      return true
    } catch (err: unknown) {
      error.value = mapFirebaseAuthError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { user: u } = await signInWithEmailAndPassword(auth, email, password)
      await handleAuthenticatedUser(u)
      return true
    } catch (err: unknown) {
      error.value = mapFirebaseAuthError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    clearLogoutTimer()
    try {
      await signOut(auth)
    } catch (err: unknown) {
      error.value = mapFirebaseAuthError(err)
    } finally {
      clearSession()
    }
  }

  function initAuth() {
    if (initPromise) return initPromise

    initPromise = new Promise<void>((resolve) => {
      let resolved = false
      const finishInitialization = () => {
        if (!resolved) {
          resolved = true
          initialized.value = true
          resolve()
        }
      }

      onAuthStateChanged(
        auth,
        async (u) => {
          try {
            if (u) await handleAuthenticatedUser(u)
            else clearSession()
          } catch (err: unknown) {
            error.value = mapFirebaseAuthError(err)
            clearSession()
          } finally {
            finishInitialization()
          }
        },
        (err) => {
          error.value = mapFirebaseAuthError(err)
          clearSession()
          finishInitialization()
        }
      )
    })

    return initPromise
  }

  function clearError() {
    error.value = null
  }

  function clearSession() {
    user.value = null
    clearLogoutTimer()
  }

  function clearLogoutTimer() {
    if (logoutTimer) {
      clearTimeout(logoutTimer)
      logoutTimer = null
    }
  }

  async function handleAuthenticatedUser(u: User) {
    user.value = u
    error.value = null
    await scheduleTokenRefresh(u)
  }

  async function scheduleTokenRefresh(u: User) {
    clearLogoutTimer()
    try {
      const tokenResult = await u.getIdTokenResult()
      const expirationTimestamp = new Date(tokenResult.expirationTime).getTime()
      const refreshDelay = Math.max(expirationTimestamp - Date.now() - 60 * 1000, 0)

      logoutTimer = setTimeout(async () => {
        try {
          await u.getIdToken(true)
          await scheduleTokenRefresh(u)
        } catch (err: unknown) {
          error.value = mapFirebaseAuthError(err)
          await logout()
        }
      }, refreshDelay)
    } catch (err: unknown) {
      error.value = mapFirebaseAuthError(err)
    }
  }
  return {
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    isReady,
    register,
    login,
    logout,
    initAuth,
    clearError,
  }
})
