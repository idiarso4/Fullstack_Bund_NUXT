<script setup lang="ts">
// Meta tags
useHead({
  title: 'Manage Posts - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Kelola artikel blog SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Sample posts data
const posts = ref([
  {
    id: 1,
    title: 'Pengenalan Jaringan Komputer untuk Pemula',
    slug: 'pengenalan-jaringan-komputer-pemula',
    category: 'Jaringan Komputer',
    author: 'Admin SIJA',
    status: 'published',
    views: 245,
    publishedAt: '2024-01-15',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt',
    slug: 'cara-membuat-aplikasi-web-vuejs-nuxt',
    category: 'Pengembangan Aplikasi',
    author: 'Admin SIJA',
    status: 'published',
    views: 189,
    publishedAt: '2024-01-12',
    createdAt: '2024-01-12'
  },
  {
    id: 3,
    title: 'Tren Keamanan Siber 2025: Yang Perlu Diketahui',
    slug: 'tren-keamanan-siber-2025',
    category: 'Keamanan Siber',
    author: 'Admin SIJA',
    status: 'draft',
    views: 0,
    publishedAt: null,
    createdAt: '2024-01-10'
  },
  {
    id: 4,
    title: 'Setup Development Environment untuk Full Stack Developer',
    slug: 'setup-development-environment-fullstack',
    category: 'Tutorial',
    author: 'Admin SIJA',
    status: 'published',
    views: 156,
    publishedAt: '2024-01-08',
    createdAt: '2024-01-08'
  }
])

// Filter and search
const searchQuery = ref('')
const selectedStatus = ref('all')
const selectedCategory = ref('all')

// Status options
const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' }
]

// Category options
const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Tutorial', value: 'tutorial' },
  { label: 'Jaringan Komputer', value: 'jaringan-komputer' },
  { label: 'Pengembangan Aplikasi', value: 'pengembangan-aplikasi' },
  { label: 'Keamanan Siber', value: 'keamanan-siber' },
  { label: 'Berita Teknologi', value: 'berita-teknologi' }
]

// Filtered posts
const filteredPosts = computed(() => {
  let filtered = posts.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Status filter
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(post => post.status === selectedStatus.value)
  }

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(post => 
      post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory.value
    )
  }

  return filtered
})

// Table columns
const columns = [
  { key: 'title', label: 'Title', id: 'title' },
  { key: 'category', label: 'Category', id: 'category' },
  { key: 'status', label: 'Status', id: 'status' },
  { key: 'views', label: 'Views', id: 'views' },
  { key: 'publishedAt', label: 'Published', id: 'publishedAt' },
  { key: 'actions', label: 'Actions', id: 'actions' }
]

// Actions
const editPost = (post) => {
  navigateTo(`/admin/posts/${post.id}/edit`)
}

const deletePost = (post) => {
  if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
    const index = posts.value.findIndex(p => p.id === post.id)
    if (index > -1) {
      posts.value.splice(index, 1)
    }
  }
}

const toggleStatus = (post) => {
  post.status = post.status === 'published' ? 'draft' : 'published'
  if (post.status === 'published' && !post.publishedAt) {
    post.publishedAt = new Date().toISOString().split('T')[0]
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'published': return 'green'
    case 'draft': return 'yellow'
    case 'archived': return 'gray'
    default: return 'gray'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Manage Posts</h1>
        <p class="text-gray-600 dark:text-gray-400">Kelola artikel blog SMK SIJA</p>
      </div>
      <UButton to="/admin/posts/create" icon="i-lucide-plus">
        Create New Post
      </UButton>
    </div>

    <!-- Filters -->
    <UCard>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <UInput
          v-model="searchQuery"
          placeholder="Search posts..."
          icon="i-lucide-search"
        />

        <!-- Status Filter -->
        <USelect
          v-model="selectedStatus"
          :options="statusOptions"
          placeholder="Filter by status"
        />

        <!-- Category Filter -->
        <USelect
          v-model="selectedCategory"
          :options="categoryOptions"
          placeholder="Filter by category"
        />

        <!-- Actions -->
        <div class="flex space-x-2">
          <UButton variant="outline" color="gray" size="sm" icon="i-lucide-download">
            Export
          </UButton>
          <UButton variant="outline" color="gray" size="sm" icon="i-lucide-filter">
            More Filters
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Posts Table -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Posts ({{ filteredPosts.length }})
          </h2>
          <div class="flex items-center space-x-2">
            <UButton variant="ghost" color="gray" size="sm" icon="i-lucide-refresh-cw">
              Refresh
            </UButton>
          </div>
        </div>
      </template>

      <UTable :rows="filteredPosts" :columns="columns">
        <!-- Title Column -->
        <template #title-data="{ row }">
          <div class="flex items-start space-x-3">
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 dark:text-white truncate">
                {{ row.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                /{{ row.slug }}
              </p>
            </div>
          </div>
        </template>

        <!-- Category Column -->
        <template #category-data="{ row }">
          <UBadge variant="subtle" color="blue">
            {{ row.category }}
          </UBadge>
        </template>

        <!-- Status Column -->
        <template #status-data="{ row }">
          <UBadge 
            :color="getStatusColor(row.status)"
            variant="subtle"
            class="capitalize"
          >
            {{ row.status }}
          </UBadge>
        </template>

        <!-- Views Column -->
        <template #views-data="{ row }">
          <div class="flex items-center space-x-1">
            <Icon name="i-lucide-eye" class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ row.views }}</span>
          </div>
        </template>

        <!-- Published Date Column -->
        <template #publishedAt-data="{ row }">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ formatDate(row.publishedAt) }}
          </span>
        </template>

        <!-- Actions Column -->
        <template #actions-data="{ row }">
          <div class="flex items-center space-x-2">
            <UButton
              @click="editPost(row)"
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-edit"
            />
            <UButton
              @click="toggleStatus(row)"
              variant="ghost"
              :color="row.status === 'published' ? 'yellow' : 'green'"
              size="sm"
              :icon="row.status === 'published' ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            />
            <UButton
              @click="deletePost(row)"
              variant="ghost"
              color="red"
              size="sm"
              icon="i-lucide-trash-2"
            />
          </div>
        </template>
      </UTable>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <Icon name="i-lucide-file-text" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all' 
             ? 'Try adjusting your filters' 
             : 'Get started by creating your first post' }}
        </p>
        <UButton v-if="!searchQuery && selectedStatus === 'all' && selectedCategory === 'all'" 
                 to="/admin/posts/create" 
                 icon="i-lucide-plus">
          Create Your First Post
        </UButton>
      </div>
    </UCard>

    <!-- Bulk Actions -->
    <UCard v-if="filteredPosts.length > 0">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <UCheckbox label="Select All" />
          <span class="text-sm text-gray-500 dark:text-gray-400">0 selected</span>
        </div>
        <div class="flex items-center space-x-2">
          <UButton variant="outline" color="gray" size="sm" icon="i-lucide-archive">
            Archive Selected
          </UButton>
          <UButton variant="outline" color="red" size="sm" icon="i-lucide-trash-2">
            Delete Selected
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
