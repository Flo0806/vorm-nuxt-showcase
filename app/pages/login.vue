<script setup lang="ts">
// Import validation functions
import { minLength } from 'vorm-vue'

const schema: VormSchema = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validation: [
      { rule: 'required', message: 'Email is required' },
      { rule: 'email', message: 'Please enter a valid email' }
    ]
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: [
      { rule: 'required', message: 'Password is required' },
      { rule: minLength(8), message: 'Password must be at least 8 characters' }
    ]
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
  }
]

const { formData, validate, resetForm } = useVorm(schema, {
  validationMode: 'onInput'
})

const isSubmitting = ref(false)
const submitMessage = ref('')

async function handleSubmit(evt: SubmitEvent) {
  console.log("Submit Event", evt)
  submitMessage.value = ''

  const isValid = await validate()

  if (!isValid) {
    submitMessage.value = 'Please fix the errors above'
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  submitMessage.value = `✅ Login successful! Welcome ${formData.email}`
  isSubmitting.value = false

  console.log('Login data:', formData)
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
        <div class="text-5xl mb-4">🔐</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">
          Login Demo
        </h1>
        <p class="text-slate-600">
          Simple login form with real-time validation
        </p>
      </div>

      <!-- Form with auto-registered components -->
        <div class="space-y-6">
          <AutoVorm as="form" @submit="handleSubmit" >

          <template #after-password>
            <div v-if="submitMessage" class="p-4 rounded-lg mt-4" :class="submitMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
              {{ submitMessage }}
            </div>

            <div class="flex gap-3 mt-4">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {{ isSubmitting ? 'Logging in...' : 'Login' }}
              </button>
              <button
                type="button"
                @click="resetForm"
                class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </template>
          </AutoVorm>
        </div>

      <!-- Code Example -->
      <details class="mt-8">
        <summary class="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
          View Code
        </summary>
        <pre class="mt-4 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">const schema: VormSchema = [
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
      { rule: 'min', value: 8 }
    ]
  }
]

const { formData, validate } = useVorm(schema)</pre>
      </details>
    </div>

    <!-- Form Data Preview -->
    <div class="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-sm font-semibold text-slate-700 mb-3">Form Data (Live)</h3>
      <pre class="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
:deep(input), :deep(select), :deep(textarea) {
  @apply w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all;
}

:deep(input[type="checkbox"]) {
  @apply w-4 h-4 text-blue-600 !w-auto;
}

:deep(.vorm-help) {
  @apply text-red-600 text-sm mt-1;
}

:deep(label) {
  @apply block text-sm font-medium text-slate-700 mb-1.5;
}
</style>
