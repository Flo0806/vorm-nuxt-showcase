<script setup lang="ts">
const schema: VormSchema = [
  {
    name: 'userType',
    label: 'User Type',
    type: 'select',
    validation: [{ rule: 'required' }]
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    showIf: { userType: 'business' },
    validation: [{ rule: 'required' }]
  },
  {
    name: 'vatNumber',
    label: 'VAT Number',
    type: 'text',
    showIf: { userType: 'business' }
  },
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    validation: [{ rule: 'required' }]
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: [
      { rule: 'required' },
      { rule: 'email' }
    ]
  }
]

const { formData, validate, resetForm, updateField } = useVorm(schema)

onMounted(() => {
  updateField('userType', '', {
    fieldOptions: [
      { label: 'Select type...', value: '' },
      { label: 'Individual', value: 'individual' },
      { label: 'Business', value: 'business' }
    ]
  })
})

const submitMessage = ref('')

async function handleSubmit() {
  const isValid = await validate()
  if (isValid) {
    submitMessage.value = '✅ Form submitted!'
    console.log('Advanced form data:', formData)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
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
        <div class="text-5xl mb-4">🚀</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">
          Advanced Features
        </h1>
        <p class="text-slate-600">
          Conditional fields with showIf
        </p>
      </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Main Form with Conditional Fields -->
          <VormSection title="User Information" titleClasses="text-2xl font-bold mb-4">
            <AutoVorm :columns="2" layout="grid" />

            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p class="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Select "Business" to see conditional fields appear!
              </p>
            </div>
          </VormSection>

          <div v-if="submitMessage" class="p-4 rounded-lg bg-green-50 text-green-800">
            {{ submitMessage }}
          </div>

          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Submi
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

      <!-- Code Examples -->
      <div class="mt-8 space-y-4">
        <details>
          <summary class="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
            View Conditional Field Code
          </summary>
          <pre class="mt-4 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">{
  name: 'companyName',
  label: 'Company Name',
  type: 'text',
  showIf: { userType: 'business' }, // Shows only when userType is 'business'
  validation: [{ rule: 'required' }]
}</pre>
        </details>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-sm font-semibold text-slate-700 mb-3">Form Data (Live)</h3>
      <pre class="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
:deep(input), :deep(select), :deep(textarea) {
  @apply w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all;
}

:deep(.vorm-help) {
  @apply text-red-600 text-sm mt-1;
}

:deep(label) {
  @apply block text-sm font-medium text-slate-700 mb-1.5;
} 
</style>
