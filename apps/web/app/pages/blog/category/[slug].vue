<script setup lang="ts">
import { ref, computed } from 'vue'
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useConvexQuery } from "convex-vue";

// Get route params
const route = useRoute()
const slug = route.params.slug as string

// State
const currentPage = ref(0)
const postsPerPage = 6

// Computed
const offset = computed(() => currentPage.value * postsPerPage)

// Queries
const { data: category, isPending: isLoadingCategory } = useConvexQuery(
  api.categories.getBySlug, 
  { slug }
)
const { data: postsData, isPending: isLoadingPosts } = useConvexQuery(
  api.posts.getByCategory,
  category ? { categoryId: category._id, limit: postsPerPage, offset: offset.value } : "skip"
)
const { data: allCategories } = useConvexQuery(api.categories.getWithPostCount, {})

// Meta tags
watchEffect(() => {
  if (category) {
    useHead({
      title: `${category.name} - Blog SIJA`,
      meta: [
        { name: 'description', content: category.description || `Artikel dalam kategori ${category.name}` }
      ]
    })
  }
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
  if (postsData?.hasMore) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

// 404 handling
if (!isLoadingCategory && !category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Kategori tidak ditemukan'
  })
}
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Loading State -->
    <div v-if="isLoadingCategory" class="space-y-6">
      <USkeleton class="h-12 w-1/2" />
      <USkeleton class="h-4 w-3/4" />
    </div>

    <!-- Category Header -->
    <div v-else-if="category" class="text-center mb-12">
      <div class="mb-4">
        <UBadge
          :label="category.name"
          :color="category.color || 'primary'"
          variant="subtle"
          size="lg"
        />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ category.name }}
      </h1>
      <p v-if="category.description" class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {{ category.description }}
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
            <li><NuxtLink to="/categories" class="hover:text-primary-600">Kategori</NuxtLink></li>
            <li><Icon name="i-lucide-chevron-right" class="w-4 h-4" /></li>
            <li class="text-gray-900 dark:text-white">{{ category?.name }}</li>
          </ol>
        </nav>

        <!-- Posts Count -->
        <div v-if="postsData" class="mb-6">
          <p class="text-gray-600 dark:text-gray-300">
            Ditemukan {{ postsData.total }} artikel dalam kategori ini
          </p>
        </div>

        <!-- Posts Grid -->
        <div v-if="isLoadingPosts" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <USkeleton v-for="i in 6" :key="i" class="h-80 w-full" />
        </div>

        <div v-else-if="postsData?.posts?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="post in postsData.posts"
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
            Belum ada artikel dalam kategori ini
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Artikel akan segera ditambahkan
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="postsData?.posts?.length" class="mt-8 flex justify-center space-x-4">
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
            :disabled="!postsData?.hasMore"
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
        <!-- All Categories -->
        <UCard class="mb-6">
          <template #header>
            <h3 class="text-lg font-semibold">Semua Kategori</h3>
          </template>
          <div v-if="allCategories?.length" class="space-y-2">
            <NuxtLink
              v-for="cat in allCategories"
              :key="cat._id"
              :to="`/blog/category/${cat.slug}`"
              :class="[
                'flex items-center justify-between p-2 rounded transition-colors',
                cat.slug === slug 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >
              <span>{{ cat.name }}</span>
              <UBadge :color="cat.color || 'gray'" variant="subtle">
                {{ cat.postCount || 0 }}
              </UBadge>
            </NuxtLink>
          </div>
        </UCard>

        <!-- Back to Blog -->
        <UCard>
          <div class="text-center">
            <Icon name="i-lucide-arrow-left" class="w-8 h-8 mx-auto text-gray-400 mb-3" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Jelajahi Semua Artikel
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Lihat semua artikel dari berbagai kategori
            </p>
            <UButton
              to="/blog"
              variant="outline"
              icon="i-lucide-arrow-left"
              block
            >
              Kembali ke Blog
            </UButton>
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
