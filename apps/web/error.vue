<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <Icon name="lucide:alert-triangle" class="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <!-- Error Message -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ error.statusCode || 'Error' }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {{ error.statusMessage || 'Something went wrong' }}
        </p>
        <p class="text-gray-500 dark:text-gray-500">
          {{ error.message || 'An unexpected error occurred' }}
        </p>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <UButton
          @click="handleError"
          size="lg"
          class="w-full"
        >
          Try Again
        </UButton>
        
        <UButton
          to="/"
          variant="outline"
          size="lg"
          class="w-full"
        >
          Go Home
        </UButton>
      </div>

      <!-- Debug Info (only in development) -->
      <div v-if="isDev" class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Debug Info:</h3>
        <pre class="text-xs text-gray-600 dark:text-gray-400 overflow-auto">{{ JSON.stringify(error, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  error: Object
})

// Check if in development mode
const isDev = process.dev

// Handle error action
const handleError = async () => {
  try {
    await clearError({ redirect: '/' })
  } catch (err) {
    // Fallback to page reload
    window.location.reload()
  }
}

// Set page meta
useHead({
  title: `Error ${props.error?.statusCode || ''} - SMK SIJA`,
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
