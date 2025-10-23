import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const requiredFirebaseKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const

type FirebaseEnvKey = (typeof requiredFirebaseKeys)[number]

const resolveEnv = (key: FirebaseEnvKey): string => {
  const value = import.meta.env[key]

  if (!value) {
    const message = `Firebase configuration is incomplete. Missing environment variable: ${key}`
    console.error(message)
    throw new Error(message)
  }

  return value
}

const firebaseConfig = {
  apiKey: resolveEnv('VITE_FIREBASE_API_KEY'),
  authDomain: resolveEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: resolveEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: resolveEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: resolveEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: resolveEnv('VITE_FIREBASE_APP_ID'),
}

const app = initializeApp(firebaseConfig)

export const auth: Auth = getAuth(app)

export default app
