import { FirebaseError } from 'firebase/app'

const firebaseAuthErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'این ایمیل قبلاً ثبت شده است.',
  'auth/invalid-credential': 'نام کاربری یا رمز عبور اشتباه است.',
  'auth/invalid-email': 'فرمت ایمیل وارد شده معتبر نیست.',
  'auth/operation-not-allowed': 'عملیات در حال حاضر فعال نیست.',
  'auth/too-many-requests': 'تعداد تلاش‌های ورود زیاد است، کمی بعد امتحان کنید.',
  'auth/user-not-found': 'کاربری با این ایمیل یافت نشد.',
  'auth/weak-password': 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
  'auth/wrong-password': 'رمز عبور نادرست است.',
}

const DEFAULT_AUTH_ERROR_MESSAGE = 'خطایی رخ داد، لطفاً دوباره تلاش کنید.'

export const mapFirebaseAuthError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return firebaseAuthErrorMessages[error.code] || DEFAULT_AUTH_ERROR_MESSAGE
  }

  if (error instanceof Error) {
    return error.message
  }

  return DEFAULT_AUTH_ERROR_MESSAGE
}
