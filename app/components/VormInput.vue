<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  icon?: string
  helpText?: string
  error?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="vorm-input-wrapper">
    <!-- Label Slot -->
    <label v-if="label || $slots.label" class="vorm-label">
      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <!-- Input Container with Icon Support -->
    <div class="relative">
      <!-- Icon Slot (prepend) -->
      <div v-if="icon || $slots.icon" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <slot name="icon">
          <span class="text-base">{{ icon }}</span>
        </slot>
      </div>

      <!-- Input Field -->
      <input
        :type="type || 'text'"
        :value="modelValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :class="[
          'vorm-input',
          { 'pl-12': icon || $slots.icon },
          { 'vorm-input-error': error }
        ]"
      />

      <!-- Suffix Slot (append) -->
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2">
        <slot name="suffix" />
      </div>
    </div>

    <!-- Error Message -->
    <transition name="error-slide">
      <div v-if="error" class="vorm-error">
        <slot name="error" :error="error">
          {{ error }}
        </slot>
      </div>
    </transition>

    <!-- Help Text Slot -->
    <div v-if="helpText || $slots.help" class="vorm-help-text">
      <slot name="help">
        {{ helpText }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.vorm-input-wrapper {
  @apply mb-4;
}

.vorm-label {
  @apply block text-sm font-semibold text-slate-700 mb-2;
}

.vorm-input {
  @apply w-full px-4 py-3 border-2 border-slate-300 rounded-xl
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         transition-all duration-200 outline-none
         bg-white text-slate-900 placeholder-slate-400
         text-base leading-normal;
}

.vorm-input-error {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.vorm-error {
  @apply text-red-600 text-sm mt-2 flex items-center gap-1 font-medium;
}

.vorm-help-text {
  @apply text-slate-500 text-xs mt-1;
}

/* Error animation */
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
