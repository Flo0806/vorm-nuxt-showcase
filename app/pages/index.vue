<script setup lang="ts">
const demos = [
  {
    title: 'Job Application',
    description: 'Full-featured application with custom components, repeaters & beautiful UI',
    icon: '💼',
    link: '/job-application',
    features: ['Custom VormInput with slots', 'VormRepeater', 'Conditional fields', 'Animations & transitions'],
    featured: true
  },
  {
    title: 'Login Form',
    description: 'Simple login form with email and password validation',
    icon: '🔐',
    link: '/login',
    features: ['Required validation', 'Email validation', 'Min length', 'Real-time feedback']
  },
  {
    title: 'Registration',
    description: 'Multi-step registration with password confirmation',
    icon: '📝',
    link: '/register',
    features: ['Password match', 'Custom validation', 'Multiple fields', 'Age validation']
  },
  {
    title: 'Contact Form',
    description: 'Contact form with select dropdown and textarea',
    icon: '✉️',
    link: '/contact',
    features: ['Textarea field', 'Select dropdown', 'Optional fields', 'Success feedback']
  },
  {
    title: 'Advanced Features',
    description: 'Repeater fields, conditional logic, and nested forms',
    icon: '🚀',
    link: '/advanced',
    features: ['VormRepeater', 'Conditional fields (showIf)', 'Nested sections', 'Dynamic forms']
  }
]
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-slate-900 mb-4">
        vorm-nuxt Showcase
      </h1>
      <p class="text-xl text-slate-600 mb-6">
        The intuitive form engine for Nuxt 3
      </p>
      <div class="flex gap-4 justify-center">
        <a
          href="https://github.com/Flo0806/vorm"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>GitHub</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://npmjs.com/package/vorm-nuxt"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <span>npm</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0v24h24V0H0zm6.168 3.429h12.664v9.714H12.25v2.857H6.168V3.429z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 gap-6 mb-16">
      <div
        v-for="demo in demos"
        :key="demo.link"
        :class="[
          'rounded-xl shadow-lg hover:shadow-xl transition-all p-8',
          demo.featured
            ? 'md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200'
            : 'bg-white'
        ]"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="text-6xl">{{ demo.icon }}</div>
          <span
            v-if="demo.featured"
            class="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full"
          >
            ✨ FEATURED
          </span>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-2">
          {{ demo.title }}
        </h2>
        <p class="text-slate-600 mb-4">
          {{ demo.description }}
        </p>
        <ul class="space-y-2 mb-6">
          <li
            v-for="feature in demo.features"
            :key="feature"
            class="flex items-center gap-2 text-sm text-slate-700"
          >
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ feature }}
          </li>
        </ul>
        <NuxtLink
          :to="demo.link"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Try Demo
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Installation -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">
        Quick Start
      </h2>
      <div class="space-y-4">
        <div>
          <p class="text-slate-600 mb-2">1. Install packages:</p>
          <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">pnpm add vorm-nuxt vorm-vue</pre>
        </div>
        <div>
          <p class="text-slate-600 mb-2">2. Add to nuxt.config.ts:</p>
          <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">export default defineNuxtConfig({
  modules: ['vorm-nuxt']
})</pre>
        </div>
        <div>
          <p class="text-slate-600 mb-2">3. Use in your components (no imports needed!):</p>
          <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">const schema: VormSchema = [
  { name: 'email', type: 'email', validation: [{ rule: 'email' }] }
]
const { formData, validate } = useVorm(schema)</pre>
        </div>
      </div>
    </div>
  </div>
</template>
