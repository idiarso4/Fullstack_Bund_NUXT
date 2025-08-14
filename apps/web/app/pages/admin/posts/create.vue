<script setup lang="ts">
// Meta tags
useHead({
  title: 'Create Post - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Buat artikel blog baru untuk SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Form state
const form = reactive({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category: '',
  tags: [],
  status: 'draft',
  featuredImage: '',
  seoTitle: '',
  seoDescription: '',
  publishedAt: ''
})

const isLoading = ref(false)
const isSaving = ref(false)

// Category options
const categoryOptions = [
  { label: 'Tutorial', value: 'tutorial' },
  { label: 'Jaringan Komputer', value: 'jaringan-komputer' },
  { label: 'Pengembangan Aplikasi', value: 'pengembangan-aplikasi' },
  { label: 'Keamanan Siber', value: 'keamanan-siber' },
  { label: 'Berita Teknologi', value: 'berita-teknologi' }
]

// Status options
const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Scheduled', value: 'scheduled' }
]

// Auto-generate slug from title
watch(() => form.title, (newTitle) => {
  if (newTitle && !form.slug) {
    form.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
})

// Auto-generate SEO title from title
watch(() => form.title, (newTitle) => {
  if (newTitle && !form.seoTitle) {
    form.seoTitle = newTitle
  }
})

// Handle form submission
const handleSubmit = async (status = 'draft') => {
  if (!form.title || !form.content) {
    alert('Title and content are required!')
    return
  }

  isSaving.value = true
  
  try {
    // Set status
    form.status = status
    
    // Set published date if publishing
    if (status === 'published' && !form.publishedAt) {
      form.publishedAt = new Date().toISOString().split('T')[0]
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to posts list
    await navigateTo('/admin/posts')
  } catch (error) {
    alert('Error saving post!')
  } finally {
    isSaving.value = false
  }
}

// Handle preview
const handlePreview = () => {
  // Open preview in new tab
  window.open(`/blog/${form.slug}?preview=true`, '_blank')
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In real app, upload to server and get URL
    form.featuredImage = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
        <p class="text-gray-600 dark:text-gray-400">Buat artikel blog baru untuk SMK SIJA</p>
      </div>
      <div class="flex items-center space-x-3">
        <UButton 
          @click="handlePreview"
          variant="outline" 
          color="gray"
          icon="i-lucide-eye"
          :disabled="!form.title || !form.content"
        >
          Preview
        </UButton>
        <UButton 
          @click="() => handleSubmit('draft')"
          variant="outline"
          :loading="isSaving"
          icon="i-lucide-save"
        >
          Save Draft
        </UButton>
        <UButton 
          @click="() => handleSubmit('published')"
          :loading="isSaving"
          icon="i-lucide-send"
        >
          Publish
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
          </template>

          <div class="space-y-6">
            <!-- Title -->
            <UFormGroup label="Title" required>
              <UInput
                v-model="form.title"
                placeholder="Enter post title..."
                size="lg"
              />
            </UFormGroup>

            <!-- Slug -->
            <UFormGroup label="Slug" description="URL-friendly version of the title">
              <UInput
                v-model="form.slug"
                placeholder="post-slug"
              />
            </UFormGroup>

            <!-- Content -->
            <UFormGroup label="Content" required>
              <UTextarea
                v-model="form.content"
                placeholder="Write your post content here..."
                :rows="15"
                resize
              />
            </UFormGroup>

            <!-- Excerpt -->
            <UFormGroup label="Excerpt" description="Short description for previews">
              <UTextarea
                v-model="form.excerpt"
                placeholder="Brief summary of the post..."
                :rows="3"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- SEO Settings -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">SEO Settings</h2>
          </template>

          <div class="space-y-4">
            <!-- SEO Title -->
            <UFormGroup label="SEO Title" description="Title for search engines">
              <UInput
                v-model="form.seoTitle"
                placeholder="SEO optimized title..."
              />
              <template #help>
                <span class="text-xs text-gray-500">
                  {{ form.seoTitle.length }}/60 characters
                </span>
              </template>
            </UFormGroup>

            <!-- SEO Description -->
            <UFormGroup label="SEO Description" description="Description for search engines">
              <UTextarea
                v-model="form.seoDescription"
                placeholder="SEO meta description..."
                :rows="3"
              />
              <template #help>
                <span class="text-xs text-gray-500">
                  {{ form.seoDescription.length }}/160 characters
                </span>
              </template>
            </UFormGroup>
          </div>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Publish Settings -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Publish Settings</h2>
          </template>

          <div class="space-y-4">
            <!-- Status -->
            <UFormGroup label="Status">
              <USelect
                v-model="form.status"
                :options="statusOptions"
              />
            </UFormGroup>

            <!-- Publish Date -->
            <UFormGroup label="Publish Date" v-if="form.status === 'scheduled'">
              <UInput
                v-model="form.publishedAt"
                type="datetime-local"
              />
            </UFormGroup>

            <!-- Category -->
            <UFormGroup label="Category" required>
              <USelect
                v-model="form.category"
                :options="categoryOptions"
                placeholder="Select category"
              />
            </UFormGroup>

            <!-- Tags -->
            <UFormGroup label="Tags">
              <UInput
                v-model="form.tags"
                placeholder="Enter tags separated by commas"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- Featured Image -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Featured Image</h2>
          </template>

          <div class="space-y-4">
            <!-- Image Preview -->
            <div v-if="form.featuredImage" class="relative">
              <img 
                :src="form.featuredImage" 
                alt="Featured image preview"
                class="w-full h-32 object-cover rounded-lg"
              />
              <UButton
                @click="form.featuredImage = ''"
                variant="ghost"
                color="red"
                size="sm"
                icon="i-lucide-x"
                class="absolute top-2 right-2"
              />
            </div>

            <!-- Upload Button -->
            <div v-else class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Icon name="i-lucide-image" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Upload featured image</p>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
                id="image-upload"
              />
              <UButton
                for="image-upload"
                variant="outline"
                color="gray"
                size="sm"
                icon="i-lucide-upload"
                @click="() => document.getElementById('image-upload').click()"
              >
                Choose Image
              </UButton>
            </div>

            <!-- Image URL -->
            <UFormGroup label="Or enter image URL">
              <UInput
                v-model="form.featuredImage"
                placeholder="https://example.com/image.jpg"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- Post Statistics -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h2>
          </template>

          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Word Count</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ form.content.split(' ').filter(word => word.length > 0).length }}
              </span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Character Count</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ form.content.length }}
              </span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Reading Time</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ Math.ceil(form.content.split(' ').filter(word => word.length > 0).length / 200) }} min
              </span>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
