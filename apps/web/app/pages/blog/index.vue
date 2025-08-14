<script setup lang="ts">
import { ref, computed } from 'vue'

// Meta tags
useHead({
  title: 'Blog - Sistem Informasi Jaringan dan Aplikasi',
  meta: [
    { name: 'description', content: 'Blog resmi jurusan Sistem Informasi Jaringan dan Aplikasi - berbagi pengetahuan teknologi, tutorial, dan berita terkini' }
  ]
})

// State
const currentPage = ref(0)
const postsPerPage = 6
const searchQuery = ref('')

// Computed
const offset = computed(() => currentPage.value * postsPerPage)

// Sample data
const blogConfig = {
  blog_title: "Blog Sistem Informasi Jaringan dan Aplikasi",
  blog_description: "Blog resmi jurusan Sistem Informasi Jaringan dan Aplikasi - berbagi pengetahuan teknologi, tutorial, dan berita terkini"
}

const categories = [
  { _id: "1", name: "Tutorial", slug: "tutorial", color: "blue", postCount: 5 },
  { _id: "2", name: "Berita Teknologi", slug: "berita-teknologi", color: "green", postCount: 3 },
  { _id: "3", name: "Jaringan Komputer", slug: "jaringan-komputer", color: "purple", postCount: 4 },
  { _id: "4", name: "Pengembangan Aplikasi", slug: "pengembangan-aplikasi", color: "orange", postCount: 6 },
  { _id: "5", name: "Keamanan Siber", slug: "keamanan-siber", color: "red", postCount: 2 }
]

const samplePosts = [
  {
    _id: "1",
    title: "Pengenalan Jaringan Komputer untuk Pemula",
    slug: "pengenalan-jaringan-komputer-pemula",
    content: "Jaringan komputer adalah kumpulan perangkat yang terhubung satu sama lain untuk berbagi data dan sumber daya...",
    excerpt: "Pelajari dasar-dasar jaringan komputer mulai dari pengertian, komponen, hingga topologi jaringan yang umum digunakan.",
    category: { name: "Jaringan Komputer", color: "purple" },
    author: { name: "Dr. Ahmad Wijaya" },
    status: "published",
    tags: ["jaringan", "pemula", "tutorial", "networking"],
    viewCount: 245,
    publishedAt: Date.now() - 86400000 * 7,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    _id: "2",
    title: "Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt",
    slug: "cara-membuat-aplikasi-web-vuejs-nuxt",
    content: "Vue.js adalah framework JavaScript yang populer untuk membangun user interface...",
    excerpt: "Tutorial lengkap membuat aplikasi web modern menggunakan Vue.js dan Nuxt.js dari setup hingga deployment.",
    category: { name: "Pengembangan Aplikasi", color: "orange" },
    author: { name: "Sari Indrawati, M.Kom" },
    status: "published",
    tags: ["vue", "nuxt", "javascript", "web development"],
    viewCount: 189,
    publishedAt: Date.now() - 86400000 * 5,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    _id: "3",
    title: "Tren Keamanan Siber 2025: Yang Perlu Diketahui",
    slug: "tren-keamanan-siber-2025",
    content: "Dunia keamanan siber terus berkembang dengan munculnya ancaman baru...",
    excerpt: "Analisis tren keamanan siber terbaru di 2025 dan strategi untuk menghadapi ancaman yang berkembang.",
    category: { name: "Keamanan Siber", color: "red" },
    author: { name: "Budi Santoso, M.T" },
    status: "published",
    tags: ["cybersecurity", "AI", "zero trust", "cloud security"],
    viewCount: 312,
    publishedAt: Date.now() - 86400000 * 3,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    _id: "4",
    title: "Setup Development Environment untuk Full Stack Developer",
    slug: "setup-development-environment-fullstack",
    content: "Sebagai full stack developer, memiliki development environment yang tepat sangat penting...",
    excerpt: "Panduan lengkap setup development environment untuk full stack developer dengan tools dan best practices terbaru.",
    category: { name: "Tutorial", color: "blue" },
    author: { name: "Sari Indrawati, M.Kom" },
    status: "published",
    tags: ["development", "tools", "setup", "productivity"],
    viewCount: 156,
    publishedAt: Date.now() - 86400000 * 1,
    createdAt: Date.now() - 86400000 * 1
  }
]

const postsData = computed(() => ({
  posts: samplePosts,
  total: samplePosts.length,
  hasMore: false
}))

const popularPosts = computed(() =>
  [...samplePosts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5)
)

const recentPosts = computed(() =>
  [...samplePosts].sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 5)
)

const isLoadingPosts = ref(false)
const isSearching = ref(false)

// Computed posts with search functionality
const displayPosts = computed(() => {
  if (searchQuery.value) {
    const filtered = samplePosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
    return {
      posts: filtered,
      total: filtered.length,
      hasMore: false
    }
  }
  return postsData.value
})

// Functions
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function truncateText(text: string, maxLength: number = 150) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

function nextPage() {
  if (displayPosts.value?.hasMore) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

function clearSearch() {
  searchQuery.value = ''
  currentPage.value = 0
}
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ blogConfig?.blog_title || 'Blog SIJA' }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {{ blogConfig?.blog_description || 'Blog resmi jurusan Sistem Informasi Jaringan dan Aplikasi' }}
      </p>
    </div>

    <!-- Search Bar -->
    <div class="max-w-md mx-auto mb-8">
      <div class="relative">
        <UInput
          v-model="searchQuery"
          placeholder="Cari artikel..."
          icon="i-lucide-search"
          size="lg"
          class="w-full"
        />
        <UButton
          v-if="searchQuery"
          @click="clearSearch"
          variant="ghost"
          size="sm"
          icon="i-lucide-x"
          class="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-3">
        <!-- Search Results Info -->
        <div v-if="searchQuery" class="mb-6">
          <p class="text-gray-600 dark:text-gray-300">
            Ditemukan {{ displayPosts.total }} artikel untuk "{{ searchQuery }}"
          </p>
        </div>

        <!-- Posts Grid -->
        <div v-if="isLoadingPosts || isSearching" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <USkeleton v-for="i in 6" :key="i" class="h-80 w-full" />
        </div>

        <div v-else-if="displayPosts.posts?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="post in displayPosts.posts"
            :key="post._id"
            class="hover:shadow-lg transition-shadow duration-300"
          >
            <!-- Featured Image -->
            <div v-if="post.featuredImage" class="mb-4">
              <img
                :src="post.featuredImage"
                :alt="post.title"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <!-- Category Badge -->
            <div class="mb-3">
              <UBadge
                :label="post.category?.name"
                :color="post.category?.color || 'primary'"
                variant="subtle"
              />
            </div>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-3 line-clamp-2">
              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="hover:text-primary-600 transition-colors"
              >
                {{ post.title }}
              </NuxtLink>
            </h2>

            <!-- Excerpt -->
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ post.excerpt || truncateText(post.content) }}
            </p>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <Icon name="i-lucide-user" class="w-4 h-4 mr-1" />
                  {{ post.author?.name }}
                </span>
                <span class="flex items-center">
                  <Icon name="i-lucide-calendar" class="w-4 h-4 mr-1" />
                  {{ formatDate(post.publishedAt || post.createdAt) }}
                </span>
              </div>
              <span class="flex items-center">
                <Icon name="i-lucide-eye" class="w-4 h-4 mr-1" />
                {{ post.viewCount }}
              </span>
            </div>

            <!-- Tags -->
            <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-1">
              <UBadge
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                :label="tag"
                variant="outline"
                size="xs"
              />
            </div>
          </UCard>
        </div>

        <!-- No Posts Found -->
        <div v-else class="text-center py-12">
          <Icon name="i-lucide-file-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            {{ searchQuery ? 'Tidak ada artikel yang ditemukan' : 'Belum ada artikel' }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ searchQuery ? 'Coba kata kunci yang berbeda' : 'Artikel akan segera ditambahkan' }}
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="displayPosts.posts?.length" class="mt-8 flex justify-center space-x-4">
          <UButton
            @click="prevPage"
            :disabled="currentPage === 0"
            variant="outline"
            icon="i-lucide-chevron-left"
          >
            Sebelumnya
          </UButton>
          <UButton
            @click="nextPage"
            :disabled="!displayPosts.hasMore"
            variant="outline"
            icon="i-lucide-chevron-right"
            trailing
          >
            Selanjutnya
          </UButton>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Categories -->
        <UCard class="mb-6">
          <template #header>
            <h3 class="text-lg font-semibold">Kategori</h3>
          </template>
          <div v-if="categories.length" class="space-y-2">
            <NuxtLink
              v-for="category in categories"
              :key="category._id"
              :to="`/blog/category/${category.slug}`"
              class="flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span>{{ category.name }}</span>
              <UBadge :color="category.color || 'gray'" variant="subtle">
                {{ category.postCount || 0 }}
              </UBadge>
            </NuxtLink>
          </div>
        </UCard>

        <!-- Popular Posts -->
        <UCard class="mb-6">
          <template #header>
            <h3 class="text-lg font-semibold">Artikel Populer</h3>
          </template>
          <div v-if="popularPosts.length" class="space-y-4">
            <div
              v-for="post in popularPosts"
              :key="post._id"
              class="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
            >
              <h4 class="font-medium mb-1 line-clamp-2">
                <NuxtLink
                  :to="`/blog/${post.slug}`"
                  class="hover:text-primary-600 transition-colors"
                >
                  {{ post.title }}
                </NuxtLink>
              </h4>
              <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                <span class="flex items-center">
                  <Icon name="i-lucide-eye" class="w-3 h-3 mr-1" />
                  {{ post.viewCount }}
                </span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Recent Posts -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Artikel Terbaru</h3>
          </template>
          <div v-if="recentPosts.length" class="space-y-4">
            <div
              v-for="post in recentPosts"
              :key="post._id"
              class="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
            >
              <h4 class="font-medium mb-1 line-clamp-2">
                <NuxtLink
                  :to="`/blog/${post.slug}`"
                  class="hover:text-primary-600 transition-colors"
                >
                  {{ post.title }}
                </NuxtLink>
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(post.publishedAt || post.createdAt) }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
