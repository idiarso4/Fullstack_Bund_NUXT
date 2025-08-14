<script setup lang="ts">
// Meta tags
useHead({
  title: 'Admin Login - SMK SIJA',
  meta: [
    { name: 'description', content: 'Login panel administrator untuk SMK Jurusan Sistem Informasi Jaringan dan Aplikasi' }
  ]
})

// Disable layout for login page
definePageMeta({
  layout: false
})

const { login } = useAuth()

// Form state
const form = reactive({
  username: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Handle form submission
const handleLogin = async () => {
  if (!form.username || !form.password) {
    error.value = 'Username dan password harus diisi!'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const result = await login(form.username, form.password)
    
    if (result.success) {
      // Redirect to admin dashboard
      await navigateTo('/admin/dashboard')
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan saat login!'
  } finally {
    isLoading.value = false
  }
}

// Handle Enter key
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    
    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <UCard class="backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl">
        <template #header>
          <div class="text-center space-y-4">
            <!-- Logo/Icon -->
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="i-lucide-shield-check" class="w-10 h-10 text-white" />
            </div>
            
            <!-- Title -->
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">Admin Panel</h1>
              <p class="text-gray-300 text-sm">SMK Jurusan Sistem Informasi Jaringan dan Aplikasi</p>
            </div>
          </div>
        </template>

        <!-- Login Form -->
        <div class="space-y-6">
          <!-- Error Alert -->
          <UAlert
            v-if="error"
            icon="i-lucide-alert-circle"
            color="red"
            variant="soft"
            :title="error"
            :close-button="{ icon: 'i-lucide-x', color: 'gray', variant: 'link' }"
            @close="error = ''"
          />

          <!-- Username Field -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white">Username *</label>
            <UInput
              v-model="form.username"
              placeholder="Masukkan username"
              icon="i-lucide-user"
              size="lg"
              :disabled="isLoading"
              @keypress="handleKeyPress"
              class="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white">Password *</label>
            <UInput
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan password"
              icon="i-lucide-lock"
              size="lg"
              :disabled="isLoading"
              @keypress="handleKeyPress"
              class="bg-white/10 border-white/20 text-white placeholder-gray-400"
            >
              <template #trailing>
                <UButton
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  variant="ghost"
                  color="gray"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <UCheckbox
              v-model="form.remember"
              label="Ingat saya"
              :disabled="isLoading"
              class="text-gray-300"
            />
            <UButton
              variant="link"
              color="gray"
              size="sm"
              class="text-gray-400 hover:text-white"
            >
              Lupa password?
            </UButton>
          </div>

          <!-- Login Button -->
          <UButton
            @click="handleLogin"
            :loading="isLoading"
            :disabled="isLoading"
            size="lg"
            block
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <template #leading>
              <Icon name="i-lucide-log-in" class="w-5 h-5" />
            </template>
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </UButton>

          <!-- Demo Credentials -->
          <div class="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <h3 class="text-sm font-medium text-blue-200 mb-2">Demo Credentials:</h3>
            <div class="text-xs text-blue-300 space-y-1">
              <div>Username: <span class="font-mono bg-blue-500/30 px-1 rounded">admin</span></div>
              <div>Password: <span class="font-mono bg-blue-500/30 px-1 rounded">sija2025</span></div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="text-center">
            <p class="text-xs text-gray-400">
              © 2025 SMK SIJA. All rights reserved.
            </p>
          </div>
        </template>
      </UCard>

      <!-- Back to Website -->
      <div class="mt-6 text-center">
        <UButton
          to="/"
          variant="ghost"
          color="gray"
          size="sm"
          class="text-gray-400 hover:text-white"
        >
          <template #leading>
            <Icon name="i-lucide-arrow-left" class="w-4 h-4" />
          </template>
          Kembali ke Website
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
