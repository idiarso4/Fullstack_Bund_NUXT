<script setup lang="ts">

// Meta tags
useHead({
  title: 'Kategori - Blog SIJA',
  meta: [
    { name: 'description', content: 'Jelajahi artikel berdasarkan kategori di Blog Sistem Informasi Jaringan dan Aplikasi' }
  ]
})

// Sample data
const categories = [
  { _id: "1", name: "Tutorial", slug: "tutorial", color: "blue", postCount: 5, description: "Panduan dan tutorial teknologi step-by-step" },
  { _id: "2", name: "Berita Teknologi", slug: "berita-teknologi", color: "green", postCount: 3, description: "Berita terkini seputar dunia teknologi informasi" },
  { _id: "3", name: "Jaringan Komputer", slug: "jaringan-komputer", color: "purple", postCount: 4, description: "Artikel tentang networking, infrastruktur, dan administrasi jaringan" },
  { _id: "4", name: "Pengembangan Aplikasi", slug: "pengembangan-aplikasi", color: "orange", postCount: 6, description: "Tips dan trik pengembangan aplikasi web dan mobile" },
  { _id: "5", name: "Keamanan Siber", slug: "keamanan-siber", color: "red", postCount: 2, description: "Topik keamanan informasi dan cybersecurity" }
]

const recentPosts = [
  {
    _id: "1",
    title: "Pengenalan Jaringan Komputer untuk Pemula",
    slug: "pengenalan-jaringan-komputer-pemula",
    category: { name: "Jaringan Komputer", color: "purple" },
    publishedAt: Date.now() - 86400000 * 7,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    _id: "2",
    title: "Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt",
    slug: "cara-membuat-aplikasi-web-vuejs-nuxt",
    category: { name: "Pengembangan Aplikasi", color: "orange" },
    publishedAt: Date.now() - 86400000 * 5,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    _id: "3",
    title: "Tren Keamanan Siber 2025: Yang Perlu Diketahui",
    slug: "tren-keamanan-siber-2025",
    category: { name: "Keamanan Siber", color: "red" },
    publishedAt: Date.now() - 86400000 * 3,
    createdAt: Date.now() - 86400000 * 3
  }
]

const isLoadingCategories = false

// Functions
function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase()
  if (name.includes('tutorial') || name.includes('panduan')) return 'i-lucide-book-open'
  if (name.includes('berita') || name.includes('news')) return 'i-lucide-newspaper'
  if (name.includes('teknologi') || name.includes('tech')) return 'i-lucide-cpu'
  if (name.includes('jaringan') || name.includes('network')) return 'i-lucide-network'
  if (name.includes('aplikasi') || name.includes('app')) return 'i-lucide-smartphone'
  if (name.includes('web') || name.includes('website')) return 'i-lucide-globe'
  if (name.includes('database') || name.includes('data')) return 'i-lucide-database'
  if (name.includes('keamanan') || name.includes('security')) return 'i-lucide-shield'
  if (name.includes('tips') || name.includes('trick')) return 'i-lucide-lightbulb'
  return 'i-lucide-folder'
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Kategori Artikel
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Jelajahi artikel berdasarkan kategori yang tersedia di Blog Sistem Informasi Jaringan dan Aplikasi
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-3">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm text-gray-500">
            <li><NuxtLink to="/blog" class="hover:text-primary-600">Blog</NuxtLink></li>
            <li><Icon name="i-lucide-chevron-right" class="w-4 h-4" /></li>
            <li class="text-gray-900 dark:text-white">Kategori</li>
          </ol>
        </nav>

        <!-- Categories Grid -->
        <div v-if="isLoadingCategories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <USkeleton v-for="i in 6" :key="i" class="h-40 w-full" />
        </div>

        <div v-else-if="categories.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="category in categories"
            :key="category._id"
            class="hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <NuxtLink :to="`/blog/category/${category.slug}`" class="block">
              <!-- Category Icon -->
              <div class="text-center mb-4">
                <div 
                  :class="[
                    'w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3',
                    category.color ? `bg-${category.color}-100 dark:bg-${category.color}-900` : 'bg-gray-100 dark:bg-gray-800'
                  ]"
                >
                  <Icon 
                    :name="getCategoryIcon(category.name)" 
                    :class="[
                      'w-8 h-8',
                      category.color ? `text-${category.color}-600 dark:text-${category.color}-400` : 'text-gray-600 dark:text-gray-400'
                    ]"
                  />
                </div>
                
                <!-- Category Badge -->
                <UBadge
                  :label="category.name"
                  :color="category.color || 'gray'"
                  variant="subtle"
                  size="lg"
                />
              </div>

              <!-- Category Info -->
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ category.name }}
                </h3>
                
                <p v-if="category.description" class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {{ category.description }}
                </p>

                <!-- Post Count -->
                <div class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icon name="i-lucide-file-text" class="w-4 h-4" />
                  <span>{{ category.postCount || 0 }} artikel</span>
                </div>
              </div>
            </NuxtLink>
          </UCard>
        </div>

        <!-- No Categories Found -->
        <div v-else class="text-center py-12">
          <Icon name="i-lucide-folder" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Belum ada kategori
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Kategori akan segera ditambahkan
          </p>
        </div>

        <!-- Statistics -->
        <div v-if="categories.length" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Statistik Kategori</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Total Categories -->
            <UCard>
              <div class="text-center">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="i-lucide-folder" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ categories.length }}</h3>
                <p class="text-gray-600 dark:text-gray-300">Total Kategori</p>
              </div>
            </UCard>

            <!-- Total Posts -->
            <UCard>
              <div class="text-center">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="i-lucide-file-text" class="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ categories.reduce((total, cat) => total + (cat.postCount || 0), 0) }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">Total Artikel</p>
              </div>
            </UCard>

            <!-- Most Popular Category -->
            <UCard>
              <div class="text-center">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="i-lucide-trending-up" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                  {{ categories.sort((a, b) => (b.postCount || 0) - (a.postCount || 0))[0]?.name || '-' }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">Kategori Terpopuler</p>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Recent Posts -->
        <UCard class="mb-6">
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
              <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                <UBadge
                  :label="post.category?.name"
                  :color="post.category?.color || 'gray'"
                  variant="subtle"
                  size="xs"
                />
              </div>
            </div>
          </div>
        </UCard>

        <!-- Back to Blog -->
        <UCard>
          <div class="text-center">
            <Icon name="i-lucide-arrow-left" class="w-8 h-8 mx-auto text-gray-400 mb-3" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Kembali ke Blog
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Lihat semua artikel terbaru
            </p>
            <UButton
              to="/blog"
              variant="outline"
              icon="i-lucide-arrow-left"
              block
            >
              Semua Artikel
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
