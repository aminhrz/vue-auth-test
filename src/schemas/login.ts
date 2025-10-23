import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'ایمیل الزامی است' }).email('فرمت ایمیل معتبر نیست'),
  password: z.string({ required_error: 'رمز عبور الزامی است' }).min(6, 'رمز عبور میبایست بیشتر از 6 کاراکتر باشد'),
})

export type LoginValues = z.infer<typeof loginSchema>
