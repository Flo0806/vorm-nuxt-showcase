<script setup lang="ts">
import { minLength, maxLength, matchField, useVorm, type VormSchema } from 'vorm-vue'
import { VormProvider, VormSection, VormRepeater, AutoVorm } from 'vorm-vue/components'

const schema: VormSchema = [
  // Personal Information
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: [
      { rule: 'required', message: 'First name is required' },
      { rule: minLength(2), message: 'At least 2 characters' }
    ]
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validation: [
      { rule: 'required', message: 'Last name is required' },
      { rule: minLength(2), message: 'At least 2 characters' }
    ]
  },
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
    name: 'phone',
    label: 'Phone Number',
    type: 'text',
    validation: [
      { rule: 'required', message: 'Phone number is required' }
    ]
  },

  // Position Details
  {
    name: 'position',
    label: 'Desired Position',
    type: 'select',
    validation: [{ rule: 'required', message: 'Please select a position' }]
  },
  {
    name: 'department',
    label: 'Department',
    type: 'select',
    validation: [{ rule: 'required', message: 'Please select a department' }]
  },

  // Availability
  {
    name: 'availableImmediately',
    label: 'Available to start immediately',
    type: 'checkbox'
  },
  {
    name: 'startDate',
    label: 'Desired Start Date',
    type: 'date',
    showIf: { availableImmediately: false }
  },

  // Motivation
  {
    name: 'motivation',
    label: 'Why do you want to join us?',
    type: 'textarea',
    validation: [
      { rule: 'required', message: 'Please tell us about your motivation' },
      { rule: minLength(50), message: 'Please write at least 50 characters' },
      { rule: maxLength(500), message: 'Maximum 500 characters allowed' }
    ]
  },

  // Work Experience (Repeater) - Optional, but fields within are required if added
  {
    name: 'experience',
    label: 'Work Experience',
    type: 'repeater',
    fields: [
      {
        name: 'company',
        label: 'Company Name',
        type: 'text'
      },
      {
        name: 'position',
        label: 'Position',
        type: 'text'
      },
      {
        name: 'duration',
        label: 'Duration',
        type: 'text'
      }
    ]
  },

  // Terms
  {
    name: 'privacy',
    label: 'I accept the privacy policy',
    type: 'checkbox',
    validation: [{ rule: 'required', message: 'You must accept the privacy policy' }]
  },
  {
    name: 'newsletter',
    label: 'Subscribe to our newsletter',
    type: 'checkbox'
  }
]

const {
  formData,
  errors,
  validate,
  resetForm,
  setFormData,
  addRepeaterItem,
  removeRepeaterItem
} = useVorm(schema, {
  validationMode: 'onInput'
})

// Set field options via setFormData (bug fixed in vorm!)
onMounted(() => {
  setFormData(
    {
      position: '',
      department: ''
    },
    {
      fieldOptions: {
        position: [
          { label: 'Select position...', value: '' },
          { label: 'Frontend Developer', value: 'frontend' },
          { label: 'Backend Developer', value: 'backend' },
          { label: 'Full Stack Developer', value: 'fullstack' },
          { label: 'DevOps Engineer', value: 'devops' },
          { label: 'UI/UX Designer', value: 'designer' }
        ],
        department: [
          { label: 'Select department...', value: '' },
          { label: 'Engineering', value: 'engineering' },
          { label: 'Design', value: 'design' },
          { label: 'Product', value: 'product' },
          { label: 'Marketing', value: 'marketing' }
        ]
      }
    }
  )
})

const submitMessage = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  submitMessage.value = ''
  isSubmitting.value = true

  const isValid = await validate()

  console.log('Validation result:', isValid)
  console.log('Form errors:', errors)

  if (isValid) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    submitMessage.value = '✅ Application submitted successfully! We will contact you soon.'
    console.log('Application data:', formData)
    isSubmitting.value = false
  } else {
    submitMessage.value = '❌ Please fix the errors above'
    isSubmitting.value = false
  }
}

function addExperience() {
  addRepeaterItem('experience', { company: '', position: '', duration: '' })
}

function removeExperience(index: number) {
  removeRepeaterItem('experience', index)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 group"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </NuxtLink>

        <div class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-3xl mb-6">
          <div class="bg-white rounded-3xl px-8 py-4">
            <div class="text-6xl mb-2">💼</div>
          </div>
        </div>

        <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Job Application
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">
          Advanced demo featuring custom components, repeaters, conditional fields, and beautiful UI
        </p>
      </div>

      <!-- Main Form -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <VormProvider v-model="formData" :schema="schema">
          <div class="space-y-8">
            <!-- Personal Information Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                    👤
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Personal Information</h2>
                </div>
              </template>

              <div class="mt-6">
                <AutoVorm :only="['firstName', 'lastName', 'email', 'phone']" layout="grid" :columns="2" />
              </div>
            </VormSection>

            <!-- Position Details Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                    🎯
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Position Details</h2>
                </div>
              </template>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <AutoVorm :only="['position', 'department']" />
              </div>
            </VormSection>

            <!-- Availability Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                    📅
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Availability</h2>
                </div>
              </template>

              <div class="mt-6 space-y-4">
                <AutoVorm :only="['availableImmediately']" />

                <transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <div v-if="!formData.availableImmediately" class="pl-7">
                    <AutoVorm :only="['startDate']" />
                  </div>
                </transition>
              </div>
            </VormSection>

            <!-- Motivation Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl">
                    ✨
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Motivation</h2>
                </div>
              </template>

              <div class="mt-6">
                <AutoVorm :only="['motivation']" />
                <div class="text-right text-sm text-slate-500 mt-2">
                  {{ formData.motivation?.length || 0 }} / 500 characters
                </div>
              </div>
            </VormSection>

            <!-- Work Experience Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                    💼
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Work Experience</h2>
                </div>
              </template>

              <div class="mt-6 space-y-4">
                <VormRepeater name="experience">
                  <template #default="{ index, fullName }">
                    <div class="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200">
                      <div class="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {{ index + 1 }}
                      </div>

                      <button
                        type="button"
                        @click="removeExperience(index)"
                        class="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
                      >
                        ×
                      </button>

                      <AutoVorm :only="[fullName]" layout="grid" :columns="3" />
                    </div>
                  </template>
                </VormRepeater>

                <button
                  type="button"
                  @click="addExperience"
                  class="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium group"
                >
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Work Experience
                </button>
              </div>
            </VormSection>

            <!-- Terms Section -->
            <VormSection>
              <template #title>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                    ✅
                  </div>
                  <h2 class="text-2xl font-bold text-slate-900">Terms & Conditions</h2>
                </div>
              </template>

              <div class="mt-6 space-y-3">
                <AutoVorm :only="['privacy', 'newsletter']" />
              </div>
            </VormSection>

            <!-- Submit Message -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="submitMessage"
                :class="[
                  'p-6 rounded-2xl text-center font-medium text-lg',
                  submitMessage.includes('✅')
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200'
                    : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200'
                ]"
              >
                {{ submitMessage }}
              </div>
            </transition>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6">
              <button
                @click="handleSubmit"
                :disabled="isSubmitting"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
                <span v-else>Submit Application</span>
              </button>

              <button
                @click="resetForm"
                class="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all font-bold hover:scale-[1.02] active:scale-[0.98]"
              >
                Reset
              </button>
            </div>
          </div>
        </VormProvider>
      </div>

      <!-- Form Data Preview -->
      <div class="mt-8 bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Live Form Data</h3>
        </div>
        <pre class="bg-slate-800 p-4 rounded-xl text-xs overflow-x-auto text-cyan-300 font-mono border border-slate-700">{{ formData }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(input), :deep(select), :deep(textarea) {
  @apply w-full px-4 py-3 border-2 border-slate-300 rounded-xl
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         transition-all bg-white;
}

:deep(input[type="checkbox"]) {
  @apply w-5 h-5 text-blue-600 !w-auto rounded;
}

:deep(.vorm-help) {
  @apply text-red-600 text-sm mt-2 font-medium;
}

:deep(label) {
  @apply block text-sm font-bold text-slate-700 mb-2;
}

:deep(textarea) {
  @apply min-h-32 resize-y;
}
</style>
