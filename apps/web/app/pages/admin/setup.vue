<script setup lang="ts">
import { ref } from 'vue'
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "convex-vue";

// Meta tags
useHead({
  title: 'Setup Blog - Admin Dashboard',
  meta: [
    { name: 'description', content: 'Inisialisasi data blog dengan sample content' }
  ]
})

// State
const isInitializing = ref(false)
const initResult = ref(null)
const error = ref(null)

// Mutations
const { mutate: initializeBlogData } = useConvexMutation(api.seed.initializeBlogData)
const { mutate: initializeSettings } = useConvexMutation(api.settings.initializeDefaults)

// Queries to check existing data
const { data: existingPosts } = useConvexQuery(api.posts.getAll, { limit: 1 })
const { data: existingCategories } = useConvexQuery(api.categories.getAll, {})
const { data: existingAuthors } = useConvexQuery(api.authors.getAll, {})

// Computed
const hasExistingData = computed(() => {
  return (existingPosts?.total > 0) || 
         (existingCategories?.length > 0) || 
         (existingAuthors?.length > 0)
})

// Functions
async function initializeBlog() {
  if (isInitializing.value) return
  
  isInitializing.value = true
  error.value = null
  
  try {
    // Initialize settings first
    await initializeSettings()
    
    // Then initialize blog data
    const result = await initializeBlogData()
    initResult.value = result
    
    // Refresh page data
    await refreshCookie()
    
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan saat inisialisasi'
    console.error('Initialization error:', err)
  } finally {
    isInitializing.value = false
  }
}

function resetSetup() {
  initResult.value = null
  error.value = null
}
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Setup Blog SIJA
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Inisialisasi blog dengan data sample untuk memulai
      </p>
    </div>

    <!-- Existing Data Warning -->
    <UAlert
      v-if="hasExistingData"
      icon="i-lucide-alert-triangle"
      color="yellow"
      variant="soft"
      title="Data Sudah Ada"
      description="Sistem mendeteksi sudah ada data di blog. Inisialisasi akan menambahkan data sample baru."
      class="mb-6"
    />

    <!-- Setup Card -->
    <UCard class="mb-8">
      <template #header>
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-database" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Inisialisasi Data Blog</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">Setup data awal untuk blog SIJA</p>
          </div>
        </div>
      </template>

      <!-- Success Result -->
      <div v-if="initResult" class="mb-6">
        <UAlert
          icon="i-lucide-check-circle"
          color="green"
          variant="soft"
          title="Inisialisasi Berhasil!"
          class="mb-4"
        />
        
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 dark:text-green-200 mb-3">Data yang berhasil dibuat:</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ initResult.stats.categories }}</div>
              <div class="text-green-700 dark:text-green-300">Kategori</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ initResult.stats.authors }}</div>
              <div class="text-green-700 dark:text-green-300">Penulis</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ initResult.stats.posts }}</div>
              <div class="text-green-700 dark:text-green-300">Artikel</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ initResult.stats.comments }}</div>
              <div class="text-green-700 dark:text-green-300">Komentar</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center space-x-4 mt-6">
          <UButton to="/admin" icon="i-lucide-layout-dashboard">
            Ke Dashboard
          </UButton>
          <UButton to="/blog" variant="outline" icon="i-lucide-external-link">
            Lihat Blog
          </UButton>
          <UButton @click="resetSetup" variant="ghost" icon="i-lucide-refresh-cw">
            Setup Lagi
          </UButton>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="mb-6">
        <UAlert
          icon="i-lucide-alert-circle"
          color="red"
          variant="soft"
          :title="error"
          class="mb-4"
        />
        <div class="flex justify-center">
          <UButton @click="resetSetup" variant="outline" icon="i-lucide-refresh-cw">
            Coba Lagi
          </UButton>
        </div>
      </div>

      <!-- Setup Form -->
      <div v-else>
        <div class="space-y-6">
          <!-- What will be created -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Yang akan dibuat:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Icon name="i-lucide-folder" class="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">5 Kategori</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">Tutorial, Berita, Jaringan, Aplikasi, Keamanan</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Icon name="i-lucide-users" class="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">3 Penulis</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">Dosen dan staff jurusan SIJA</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Icon name="i-lucide-file-text" class="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">4 Artikel Sample</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">Artikel tentang jaringan, web dev, dan keamanan</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Icon name="i-lucide-message-circle" class="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">4 Komentar</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">Komentar sample dari pembaca</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pengaturan Blog:</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li class="flex items-center space-x-2">
                  <Icon name="i-lucide-check" class="w-4 h-4" />
                  <span>Judul: "Blog Sistem Informasi Jaringan dan Aplikasi"</span>
                </li>
                <li class="flex items-center space-x-2">
                  <Icon name="i-lucide-check" class="w-4 h-4" />
                  <span>Deskripsi blog dan meta information</span>
                </li>
                <li class="flex items-center space-x-2">
                  <Icon name="i-lucide-check" class="w-4 h-4" />
                  <span>Pengaturan komentar dan moderasi</span>
                </li>
                <li class="flex items-center space-x-2">
                  <Icon name="i-lucide-check" class="w-4 h-4" />
                  <span>Konfigurasi social media dan kontak</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Action Button -->
          <div class="text-center pt-4">
            <UButton
              @click="initializeBlog"
              :loading="isInitializing"
              size="lg"
              icon="i-lucide-play"
              :disabled="isInitializing"
            >
              {{ isInitializing ? 'Menginisialisasi...' : 'Mulai Inisialisasi' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Current Data Status -->
    <UCard v-if="!initResult">
      <template #header>
        <h3 class="text-lg font-semibold">Status Data Saat Ini</h3>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ existingPosts?.total || 0 }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Artikel</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ existingCategories?.length || 0 }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Kategori</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ existingAuthors?.length || 0 }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Penulis</div>
        </div>
      </div>
    </UCard>
  </div>
</template>
