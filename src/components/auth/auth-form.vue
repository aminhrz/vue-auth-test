<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginValues } from '@/schemas/login'
import { registerSchema, type RegisterValues } from '@/schemas/register'

const props = defineProps<{
  mode: 'login' | 'register'
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: LoginValues | RegisterValues): void
}>()

const activeSchema = computed(() => (props.mode === 'login' ? loginSchema : registerSchema))

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(activeSchema.value),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const needConfirm = computed(() => props.mode === 'register')

const onSubmit = handleSubmit((values) => {
  if (props.mode === 'register') {
    emit('submit', values as RegisterValues)
  } else {
    emit('submit', values as LoginValues)
  }
})
</script>

<template>
  <div class="d-flex justify-content-center swish-wrapper text-center" id="auth-page">
    <div class="container-fluid form-container shadow rounded my-auto">
      <div class="row h-100">
        <div class="col-md-5 form-box bg-white rounded-left">
          <div class="d-flex flex-column sign-in-container h-100">
            <div class="align-items-center sign-in mx-auto my-auto px-4">
              <form class="sign-in-form box-rounded" @submit.prevent="onSubmit" novalidate autocomplete="off">
                <div class="py-3">
                  <a class="logo-link" href="#">
                    <img class="logo-image" alt="Logo" src="/images/logo.png" />
                  </a>
                </div>

                <h4 class="text-main font-weight-bold">
                  <span class="text-neutral">{{ mode === 'login' ? 'ورود' : 'ثبت نام' }}</span>
                  به حساب شما
                </h4>

                <span class="text-main py-2 font-weight-light">
                  {{ mode === 'login' ? 'به لیدوچت خوش آمدید !' : 'خوشحالیم که می‌خوای عضو ما بشی!' }}
                </span>

                <!-- ایمیل -->
                <div class="form-group mt-4">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text box-rounded-left">
                        <i class="fa-solid fa-envelope"></i>
                      </span>
                    </div>
                    <input v-model="email" v-bind="emailAttrs" class="form-control form-control-lg box-rounded-right"
                      type="email" placeholder="ایمیل" />
                  </div>
                  <small v-if="errors.email" class="text-danger d-block mt-1 text-right font-12">
                    <i class="fa-solid fa-exclamation font-10"></i>
                    {{ errors.email }}
                  </small>
                </div>

                <!-- رمز عبور -->
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text box-rounded-left">
                        <i class="fa-solid fa-lock"></i>
                      </span>
                    </div>
                    <input v-model="password" v-bind="passwordAttrs"
                      class="form-control form-control-lg box-rounded-right" type="password" placeholder="رمز عبور" />
                  </div>
                  <small v-if="errors.password" class="text-danger d-block mt-1 text-right font-12">
                    <i class="fa-solid fa-exclamation font-10"></i>
                    {{ errors.password }}
                  </small>
                </div>

                <!-- تکرار رمز (فقط برای ثبت نام) -->
                <div v-if="needConfirm" class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text box-rounded-left">
                        <i class="fa-solid fa-repeat"></i>
                      </span>
                    </div>
                    <input v-model="confirmPassword" v-bind="confirmPasswordAttrs"
                      class="form-control form-control-lg box-rounded-right" type="password"
                      placeholder="تکرار رمز عبور" />
                  </div>
                  <small v-if="errors.confirmPassword" class="text-danger d-block mt-1 text-right font-12">
                    <i class="fa-solid fa-exclamation font-10"></i>
                    {{ errors.confirmPassword }}
                  </small>
                </div>

                <button
                  class="btn btn-main shadow-sm btn-block box-rounded box-shadow d-flex align-items-center justify-content-center"
                  type="submit" :disabled="props.loading">
                  <template v-if="props.loading">
                    <div class="spinner-border spinner-border-sm me-2" role="status">
                      <span class="visually-hidden"></span>
                    </div>
                    {{ props.mode === 'login' ? 'در حال ورود...' : 'در حال ثبت نام...' }}
                  </template>
                  <template v-else>
                    {{ props.mode === 'login' ? 'ورود' : 'ثبت نام' }}
                  </template>
                </button>

                <div class="mt-4">
                  <p class="font-weight-light mr-2">
                    {{ mode === 'login' ? 'حساب ندارید؟' : 'قبلاً حساب دارید؟' }}
                    <RouterLink :to="mode === 'login' ? '/register' : '/'" class="text-dark font-weight-bold ml-2">
                      {{ mode === 'login' ? 'ثبت نام' : 'ورود' }}
                    </RouterLink>
                  </p>
                </div>
              </form>
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
