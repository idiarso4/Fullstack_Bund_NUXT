<script setup lang="ts">
// Meta tags
useHead({
  title: 'Manage Categories - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Kelola kategori artikel blog SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Categories data
const categories = ref([
  {
    id: 1,
    name: 'Tutorial',
    slug: 'tutorial',
    description: 'Panduan dan tutorial teknologi step-by-step',
    color: 'blue',
    postCount: 5,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'Berita Teknologi',
    slug: 'berita-teknologi',
    description: 'Berita terkini seputar dunia teknologi informasi',
    color: 'green',
    postCount: 3,
    isActive: true,
    createdAt: '2024-01-02'
  },
  {
    id: 3,
    name: 'Jaringan Komputer',
    slug: 'jaringan-komputer',
    description: 'Artikel tentang networking, infrastruktur, dan administrasi jaringan',
    color: 'purple',
    postCount: 4,
    isActive: true,
    createdAt: '2024-01-03'
  },
  {
    id: 4,
    name: 'Pengembangan Aplikasi',
    slug: 'pengembangan-aplikasi',
    description: 'Tips dan trik pengembangan aplikasi web dan mobile',
    color: 'orange',
    postCount: 6,
    isActive: true,
    createdAt: '2024-01-04'
  },
  {
    id: 5,
    name: 'Keamanan Siber',
    slug: 'keamanan-siber',
    description: 'Topik keamanan informasi dan cybersecurity',
    color: 'red',
    postCount: 2,
    isActive: true,
    createdAt: '2024-01-05'
  }
])

// Modal state
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const editingCategory = ref(null)

// Form state
const form = reactive({
  name: '',
  slug: '',
  description: '',
  color: 'blue',
  isActive: true
})

// Color options
const colorOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Red', value: 'red' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Pink', value: 'pink' },
  { label: 'Indigo', value: 'indigo' }
]

// Auto-generate slug from name
watch(() => form.name, (newName) => {
  if (newName && (!editingCategory.value || !form.slug)) {
    form.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
})

// Reset form
const resetForm = () => {
  form.name = ''
  form.slug = ''
  form.description = ''
  form.color = 'blue'
  form.isActive = true
}

// Open create modal
const openCreateModal = () => {
  resetForm()
  editingCategory.value = null
  isCreateModalOpen.value = true
}

// Open edit modal
const openEditModal = (category) => {
  editingCategory.value = category
  form.name = category.name
  form.slug = category.slug
  form.description = category.description
  form.color = category.color
  form.isActive = category.isActive
  isEditModalOpen.value = true
}

// Handle create
const handleCreate = async () => {
  if (!form.name || !form.slug) {
    alert('Name and slug are required!')
    return
  }

  // Check if slug already exists
  if (categories.value.some(cat => cat.slug === form.slug)) {
    alert('Slug already exists!')
    return
  }

  // Add new category
  const newCategory = {
    id: Math.max(...categories.value.map(c => c.id)) + 1,
    name: form.name,
    slug: form.slug,
    description: form.description,
    color: form.color,
    postCount: 0,
    isActive: form.isActive,
    createdAt: new Date().toISOString().split('T')[0]
  }

  categories.value.push(newCategory)
  isCreateModalOpen.value = false
  resetForm()
}

// Handle update
const handleUpdate = async () => {
  if (!form.name || !form.slug) {
    alert('Name and slug are required!')
    return
  }

  // Check if slug already exists (excluding current category)
  if (categories.value.some(cat => cat.slug === form.slug && cat.id !== editingCategory.value.id)) {
    alert('Slug already exists!')
    return
  }

  // Update category
  const index = categories.value.findIndex(cat => cat.id === editingCategory.value.id)
  if (index > -1) {
    categories.value[index] = {
      ...categories.value[index],
      name: form.name,
      slug: form.slug,
      description: form.description,
      color: form.color,
      isActive: form.isActive
    }
  }

  isEditModalOpen.value = false
  editingCategory.value = null
  resetForm()
}

// Handle delete
const handleDelete = (category) => {
  if (category.postCount > 0) {
    alert(`Cannot delete category "${category.name}" because it has ${category.postCount} posts. Please move or delete the posts first.`)
    return
  }

  if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
    const index = categories.value.findIndex(cat => cat.id === category.id)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }
}

// Toggle active status
const toggleActive = (category) => {
  category.isActive = !category.isActive
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Manage Categories</h1>
        <p class="text-gray-600 dark:text-gray-400">Kelola kategori artikel blog SMK SIJA</p>
      </div>
      <UButton @click="openCreateModal" icon="i-lucide-plus">
        Create Category
      </UButton>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="category in categories"
        :key="category.id"
        class="hover:shadow-lg transition-shadow duration-300"
      >
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div 
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  `bg-${category.color}-100 dark:bg-${category.color}-900`
                ]"
              >
                <Icon 
                  name="i-lucide-folder" 
                  :class="[
                    'w-5 h-5',
                    `text-${category.color}-600 dark:text-${category.color}-400`
                  ]"
                />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ category.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">/{{ category.slug }}</p>
              </div>
            </div>
            
            <!-- Status Badge -->
            <UBadge 
              :color="category.isActive ? 'green' : 'gray'"
              variant="subtle"
              size="xs"
            >
              {{ category.isActive ? 'Active' : 'Inactive' }}
            </UBadge>
          </div>

          <!-- Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ category.description }}
          </p>

          <!-- Stats -->
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <Icon name="i-lucide-file-text" class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600 dark:text-gray-400">{{ category.postCount }} posts</span>
              </div>
            </div>
            <span class="text-gray-500 dark:text-gray-500">{{ formatDate(category.createdAt) }}</span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-2">
              <UButton
                @click="openEditModal(category)"
                variant="ghost"
                color="gray"
                size="sm"
                icon="i-lucide-edit"
              />
              <UButton
                @click="toggleActive(category)"
                variant="ghost"
                :color="category.isActive ? 'yellow' : 'green'"
                size="sm"
                :icon="category.isActive ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              />
              <UButton
                @click="handleDelete(category)"
                variant="ghost"
                color="red"
                size="sm"
                icon="i-lucide-trash-2"
                :disabled="category.postCount > 0"
              />
            </div>
            
            <UButton
              :to="`/blog/category/${category.slug}`"
              external
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-external-link"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Create Modal -->
    <UModal v-model="isCreateModalOpen">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Create New Category</h2>
        </template>

        <div class="space-y-4">
          <!-- Name -->
          <UFormGroup label="Name" required>
            <UInput
              v-model="form.name"
              placeholder="Category name"
            />
          </UFormGroup>

          <!-- Slug -->
          <UFormGroup label="Slug" required>
            <UInput
              v-model="form.slug"
              placeholder="category-slug"
            />
          </UFormGroup>

          <!-- Description -->
          <UFormGroup label="Description">
            <UTextarea
              v-model="form.description"
              placeholder="Category description"
              :rows="3"
            />
          </UFormGroup>

          <!-- Color -->
          <UFormGroup label="Color">
            <USelect
              v-model="form.color"
              :options="colorOptions"
            />
          </UFormGroup>

          <!-- Active Status -->
          <UFormGroup label="Status">
            <UCheckbox
              v-model="form.isActive"
              label="Active"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <UButton
              @click="isCreateModalOpen = false"
              variant="outline"
              color="gray"
            >
              Cancel
            </UButton>
            <UButton
              @click="handleCreate"
              icon="i-lucide-plus"
            >
              Create Category
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Edit Modal -->
    <UModal v-model="isEditModalOpen">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Category</h2>
        </template>

        <div class="space-y-4">
          <!-- Name -->
          <UFormGroup label="Name" required>
            <UInput
              v-model="form.name"
              placeholder="Category name"
            />
          </UFormGroup>

          <!-- Slug -->
          <UFormGroup label="Slug" required>
            <UInput
              v-model="form.slug"
              placeholder="category-slug"
            />
          </UFormGroup>

          <!-- Description -->
          <UFormGroup label="Description">
            <UTextarea
              v-model="form.description"
              placeholder="Category description"
              :rows="3"
            />
          </UFormGroup>

          <!-- Color -->
          <UFormGroup label="Color">
            <USelect
              v-model="form.color"
              :options="colorOptions"
            />
          </UFormGroup>

          <!-- Active Status -->
          <UFormGroup label="Status">
            <UCheckbox
              v-model="form.isActive"
              label="Active"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex items-center justify-end space-x-3">
            <UButton
              @click="isEditModalOpen = false"
              variant="outline"
              color="gray"
            >
              Cancel
            </UButton>
            <UButton
              @click="handleUpdate"
              icon="i-lucide-save"
            >
              Update Category
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
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
