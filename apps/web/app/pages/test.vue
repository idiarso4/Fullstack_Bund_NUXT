<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">SMK SIJA Test Page</h1>
      <p class="text-xl mb-8">Server is working!</p>
      <UButton to="/" size="lg">
        Go to Homepage
      </UButton>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Test Page - SMK SIJA'
})
</script>
