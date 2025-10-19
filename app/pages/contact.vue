<script setup lang="ts">
import { minLength } from 'vorm-vue'

const schema: VormSchema = [
  {
    name: 'name',
    label: 'Your Name',
    type: 'text',
    validation: [{ rule: 'required' }]
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
    name: 'subject',
    label: 'Subject',
    type: 'select',
    validation: [{ rule: 'required' }]
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    validation: [
      { rule: 'required' },
      { rule: minLength(10), message: 'Message must be at least 10 characters' }
    ]
  },
  {
    name: 'urgent',
    label: 'This is urgent',
    type: 'checkbox'
  }
]

const { formData, validate, resetForm, updateField } = useVorm(schema, {
  validationMode: 'onInput'
})

// Set select options on mount
onMounted(() => {
  updateField('subject', '', {
    fieldOptions: [
      { label: 'Select a subject...', value: '' },
      { label: 'General Inquiry', value: 'general' },
      { label: 'Technical Support', value: 'support' },
      { label: 'Bug Report', value: 'bug' },
      { label: 'Feature Request', value: 'feature' }
    ]
  })
})

const submitMessage = ref('')

async function handleSubmit() {
  const isValid = await validate()
  if (isValid) {
    submitMessage.value = '✅ Message sent successfully!'
    console.log('Contact form data:', formData)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-2xl">
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
        <div class="text-5xl mb-4">✉️</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">
          Contact Form Demo
        </h1>
        <p class="text-slate-600">
          Textarea, select dropdown, and optional fields
        </p>
      </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <AutoVorm />

          <div v-if="submitMessage" class="p-4 rounded-lg bg-green-50 text-green-800">
            {{ submitMessage }}
          </div>

          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Send Message
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
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-sm font-semibold text-slate-700 mb-3">Form Data (Live)</h3>
      <pre class="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
:deep(input), :deep(select), :deep(textarea) {
  @apply w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all;
}

:deep(textarea) {
  @apply min-h-32;
}

:deep(input[type="checkbox"]) {
  @apply w-4 h-4 text-purple-600 !w-auto;
}

:deep(.vorm-help) {
  @apply text-red-600 text-sm mt-1;
}

:deep(label) {
  @apply block text-sm font-medium text-slate-700 mb-1.5;
}
</style>
