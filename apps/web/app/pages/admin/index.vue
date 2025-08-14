<script setup lang="ts">
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useConvexQuery } from "convex-vue";

// Meta tags
useHead({
  title: 'Admin Dashboard - Blog SIJA',
  meta: [
    { name: 'description', content: 'Dashboard admin untuk mengelola blog Sistem Informasi Jaringan dan Aplikasi' }
  ]
})

// Queries
const { data: allPosts } = useConvexQuery(api.posts.getAll, { limit: 100 })
const { data: categories } = useConvexQuery(api.categories.getWithPostCount, {})
const { data: authors } = useConvexQuery(api.authors.getWithPostCount, {})
const { data: commentStats } = useConvexQuery(api.comments.getStats, {})
const { data: recentComments } = useConvexQuery(api.comments.getRecent, { limit: 5 })
const { data: recentPosts } = useConvexQuery(api.posts.getAll, { limit: 5 })

// Computed statistics
const stats = computed(() => {
  if (!allPosts || !categories || !authors || !commentStats) return null
  
  return {
    totalPosts: allPosts.total || 0,
    publishedPosts: allPosts.posts?.filter(p => p.status === 'published').length || 0,
    draftPosts: allPosts.posts?.filter(p => p.status === 'draft').length || 0,
    totalCategories: categories.length || 0,
    totalAuthors: authors.length || 0,
    totalComments: commentStats.total || 0,
    pendingComments: commentStats.pending || 0,
    approvedComments: commentStats.approved || 0,
  }
})

// Functions
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getStatusColor(status: string) {
  switch (status) {
    case 'published': return 'green'
    case 'draft': return 'yellow'
    case 'archived': return 'gray'
    case 'approved': return 'green'
    case 'pending': return 'yellow'
    case 'rejected': return 'red'
    default: return 'gray'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'published': return 'Dipublikasi'
    case 'draft': return 'Draft'
    case 'archived': return 'Diarsipkan'
    case 'approved': return 'Disetujui'
    case 'pending': return 'Menunggu'
    case 'rejected': return 'Ditolak'
    default: return status
  }
}
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-1">Kelola blog Sistem Informasi Jaringan dan Aplikasi</p>
      </div>
      <div class="flex space-x-3">
        <UButton to="/admin/posts/create" icon="i-lucide-plus">
          Artikel Baru
        </UButton>
        <UButton to="/admin/categories" variant="outline" icon="i-lucide-folder">
          Kelola Kategori
        </UButton>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Posts -->
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Artikel</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalPosts }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-file-text" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div class="mt-3 flex items-center text-sm">
          <span class="text-green-600 dark:text-green-400">{{ stats.publishedPosts }} dipublikasi</span>
          <span class="text-gray-400 mx-2">•</span>
          <span class="text-yellow-600 dark:text-yellow-400">{{ stats.draftPosts }} draft</span>
        </div>
      </UCard>

      <!-- Categories -->
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalCategories }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-folder" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div class="mt-3">
          <NuxtLink to="/admin/categories" class="text-sm text-primary-600 hover:text-primary-700">
            Kelola kategori →
          </NuxtLink>
        </div>
      </UCard>

      <!-- Authors -->
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Penulis</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalAuthors }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-users" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div class="mt-3">
          <NuxtLink to="/admin/authors" class="text-sm text-primary-600 hover:text-primary-700">
            Kelola penulis →
          </NuxtLink>
        </div>
      </UCard>

      <!-- Comments -->
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Komentar</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalComments }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-message-circle" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div class="mt-3 flex items-center text-sm">
          <span class="text-yellow-600 dark:text-yellow-400">{{ stats.pendingComments }} menunggu</span>
          <span class="text-gray-400 mx-2">•</span>
          <span class="text-green-600 dark:text-green-400">{{ stats.approvedComments }} disetujui</span>
        </div>
      </UCard>
    </div>

    <!-- Loading State -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <USkeleton v-for="i in 4" :key="i" class="h-24 w-full" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Posts -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Artikel Terbaru</h2>
            <UButton to="/admin/posts" variant="ghost" size="sm">
              Lihat Semua
            </UButton>
          </div>
        </template>

        <div v-if="recentPosts?.posts?.length" class="space-y-4">
          <div
            v-for="post in recentPosts.posts"
            :key="post._id"
            class="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 dark:text-white truncate">
                <NuxtLink :to="`/admin/posts/${post._id}`" class="hover:text-primary-600">
                  {{ post.title }}
                </NuxtLink>
              </h3>
              <div class="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ post.author?.name }}</span>
                <span>•</span>
                <span>{{ formatDate(post.createdAt) }}</span>
              </div>
            </div>
            <div class="ml-3 flex-shrink-0">
              <UBadge
                :label="getStatusLabel(post.status)"
                :color="getStatusColor(post.status)"
                variant="subtle"
                size="xs"
              />
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <Icon name="i-lucide-file-text" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p class="text-gray-500 dark:text-gray-400">Belum ada artikel</p>
        </div>
      </UCard>

      <!-- Recent Comments -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Komentar Terbaru</h2>
            <UButton to="/admin/comments" variant="ghost" size="sm">
              Lihat Semua
            </UButton>
          </div>
        </template>

        <div v-if="recentComments?.length" class="space-y-4">
          <div
            v-for="comment in recentComments"
            :key="comment._id"
            class="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-900 dark:text-white text-sm">{{ comment.authorName }}</span>
                <UBadge
                  :label="getStatusLabel(comment.status)"
                  :color="getStatusColor(comment.status)"
                  variant="subtle"
                  size="xs"
                />
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
              {{ comment.content }}
            </p>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Pada: <NuxtLink :to="`/blog/${comment.post?.slug}`" class="hover:text-primary-600">{{ comment.post?.title }}</NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <Icon name="i-lucide-message-circle" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p class="text-gray-500 dark:text-gray-400">Belum ada komentar</p>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UButton to="/admin/posts/create" variant="outline" block icon="i-lucide-plus">
          Buat Artikel
        </UButton>
        <UButton to="/admin/categories/create" variant="outline" block icon="i-lucide-folder-plus">
          Tambah Kategori
        </UButton>
        <UButton to="/admin/authors/create" variant="outline" block icon="i-lucide-user-plus">
          Tambah Penulis
        </UButton>
        <UButton to="/admin/settings" variant="outline" block icon="i-lucide-settings">
          Pengaturan
        </UButton>
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
</style>
