<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// Simple dark mode toggle with dark as default
const isDarkMode = ref(true) // Default to dark mode

const isDark = computed({
  get () {
    return isDarkMode.value
  },
  set (value) {
    isDarkMode.value = value
    // Toggle dark class on document
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})

// Initialize from localStorage or default to dark mode
onMounted(() => {
  const stored = localStorage.getItem('color-mode')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    // Default to dark mode instead of system preference
    isDark.value = true
    localStorage.setItem('color-mode', 'dark')
  }
})

// Watch for changes and save to localStorage
watch(isDark, (newValue) => {
  localStorage.setItem('color-mode', newValue ? 'dark' : 'light')
})
</script>

<template>
  <div class="flex items-center">
    <UButton
      @click="isDark = !isDark"
      variant="ghost"
      size="sm"
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      class="mr-2"
    />
  </div>
</template>
