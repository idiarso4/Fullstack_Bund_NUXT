<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0b0f19;color:#fff;">
    <div style="max-width:560px;width:100%;text-align:center;">
      <h1 style="font-size:40px;font-weight:800;margin:0 0 12px;">{{ error?.statusCode || 'Error' }}</h1>
      <p style="font-size:18px;opacity:.85;margin:0 0 8px;">{{ error?.statusMessage || 'Something went wrong' }}</p>
      <p style="font-size:14px;opacity:.7;white-space:pre-wrap;">{{ (error && (error.message || error.toString())) || 'An unexpected error occurred' }}</p>

      <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button @click="handleError" style="padding:10px 16px;border-radius:8px;background:#2563eb;color:white;border:none;cursor:pointer;">Try Again</button>
        <a href="/" style="padding:10px 16px;border-radius:8px;border:1px solid #94a3b8;color:#e2e8f0;text-decoration:none;">Go Home</a>
      </div>

      <div v-if="isDev" style="margin-top:16px;padding:12px;border-radius:8px;background:#111827;text-align:left;font-size:12px;white-space:pre;overflow:auto;max-height:240px;">
        {{ JSON.stringify(error, null, 2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps<{ error?: any }>()
const isDev = process.dev

const handleError = async () => {
  try {
    await clearError({ redirect: '/' })
  } catch (err) {
    location.reload()
  }
}

useHead({
  title: `Error ${props?.error?.statusCode || ''} - SMK SIJA`,
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>
