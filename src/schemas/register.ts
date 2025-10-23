import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string({ required_error: 'ایمیل الزامی است' }).email('فرمت ایمیل معتبر نیست'),
    password: z.string({ required_error: 'رمز عبور الزامی است' }).min(6, 'رمز عبور میبایست بیشتر از 6 کاراکتر باشد'),
    confirmPassword: z.string({ required_error: 'تکرار رمز عبور الزامی است' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'رمزها یکسان نمیباشند',
  })

export type RegisterValues = z.infer<typeof registerSchema>
