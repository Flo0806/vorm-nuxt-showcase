<script setup lang="ts">
import { min, max, matchField, minLength, maxLength } from 'vorm-vue'

const schema: VormSchema = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validation: [
      { rule: 'required' },
      { rule: minLength(3), message: 'Username must be at least 3 characters' }
    ]
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validation: [
      { rule: 'required' },
      { rule: 'email' }
    ]
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: [
      { rule: 'required' },
      { rule: minLength(8), message: 'Password must be at least 8 characters' },
      { rule: maxLength(50), message: 'Password must be at most 50 characters' }
    ]
  },
  {
    name: 'passwordConfirm',
    label: 'Confirm Password',
    type: 'password',
    validation: [
      { rule: 'required' },
      { rule: matchField('password'), message: 'Passwords must match' }
    ]
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validation: [
      { rule: 'required' },
      { rule: min(18), message: 'You must be at least 18 years old' }
    ]
  },
  {
    name: 'terms',
    label: 'I accept the terms and conditions',
    type: 'checkbox',
    validation: [
      { rule: 'required', message: 'You must accept the terms' }
    ]
  }
]

const { formData, validate, resetForm } = useVorm(schema, {
  validationMode: 'onInput'
})

const submitMessage = ref('')

async function handleSubmit() {
  const isValid = await validate()
  if (isValid) {
    submitMessage.value = '✅ Registration successful!'
    console.log('Registration data:', formData)
  } else {
    submitMessage.value = 'Please fix validation errors'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-md">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Home
    </NuxtLink>

    <div class="bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <div class="text-5xl mb-4">📝</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">
          Registration Demo
        </h1>
        <p class="text-slate-600">
          Advanced validation with password matching
        </p>
      </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <AutoVorm />

          <div v-if="submitMessage" class="p-4 rounded-lg" :class="submitMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            {{ submitMessage }}
          </div>

          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Register
            </button>
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

      <details class="mt-8">
        <summary class="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
          View Code
        </summary>
        <pre class="mt-4 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">{
  name: 'passwordConfirm',
  type: 'password',
  validation: [
    { rule: 'matchField', field: 'password' }
  ]
}</pre>
      </details>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-sm font-semibold text-slate-700 mb-3">Form Data (Live)</h3>
      <pre class="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
:deep(input), :deep(select), :deep(textarea) {
  @apply w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all;
}

:deep(input[type="checkbox"]) {
  @apply w-4 h-4 text-green-600 !w-auto;
}

:deep(.vorm-help) {
  @apply text-red-600 text-sm mt-1;
}

:deep(label) {
  @apply block text-sm font-medium text-slate-700 mb-1.5;
}
</style>
