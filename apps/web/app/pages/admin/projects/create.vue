<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <UButton
        to="/admin/projects"
        variant="ghost"
        color="gray"
        icon="i-lucide-arrow-left"
        size="sm"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
        <p class="text-gray-600 dark:text-gray-400">Tambah project siswa baru</p>
      </div>
    </div>

    <!-- Form -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Project Information</h2>
          </template>

          <div class="space-y-4">
            <!-- Title -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Title *</label>
              <UInput
                v-model="form.title"
                placeholder="Enter project title"
                size="lg"
              />
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
              <UTextarea
                v-model="form.description"
                placeholder="Describe the project..."
                rows="4"
              />
            </div>

            <!-- Student Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Name *</label>
              <UInput
                v-model="form.student"
                placeholder="Enter student name"
              />
            </div>

            <!-- Technology Stack -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Technology Stack *</label>
              <UInput
                v-model="form.technology"
                placeholder="e.g., Vue.js, Node.js, MongoDB"
              />
            </div>

            <!-- GitHub URL -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Repository</label>
              <UInput
                v-model="form.githubUrl"
                placeholder="https://github.com/username/repo"
                icon="i-lucide-github"
              />
            </div>

            <!-- Demo URL -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Demo URL</label>
              <UInput
                v-model="form.demoUrl"
                placeholder="https://demo.example.com"
                icon="i-lucide-external-link"
              />
            </div>
          </div>
        </UCard>

        <!-- Project Details -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h2>
          </template>

          <div class="space-y-4">
            <!-- Category -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
              <USelect
                v-model="form.category"
                :options="categories"
                placeholder="Select category"
              />
            </div>

            <!-- Status -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status *</label>
              <USelect
                v-model="form.status"
                :options="statusOptions"
                placeholder="Select status"
              />
            </div>

            <!-- Start Date -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <UInput
                v-model="form.startDate"
                type="date"
              />
            </div>

            <!-- End Date -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <UInput
                v-model="form.endDate"
                type="date"
              />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Actions -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Actions</h3>
          </template>

          <div class="space-y-3">
            <UButton
              @click="saveProject"
              :loading="isLoading"
              block
              size="lg"
            >
              Create Project
            </UButton>
            
            <UButton
              @click="saveDraft"
              variant="outline"
              block
            >
              Save as Draft
            </UButton>

            <UButton
              to="/admin/projects"
              variant="ghost"
              color="gray"
              block
            >
              Cancel
            </UButton>
          </div>
        </UCard>

        <!-- Project Preview -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
          </template>

          <div class="space-y-3">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white">{{ form.title || 'Project Title' }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ form.description || 'Project description...' }}</p>
              <div class="flex items-center justify-between mt-3">
                <span class="text-xs text-gray-500">{{ form.student || 'Student Name' }}</span>
                <UBadge
                  :color="form.status === 'completed' ? 'green' : form.status === 'in-progress' ? 'blue' : 'gray'"
                  variant="subtle"
                >
                  {{ form.status || 'Status' }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Tips -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tips</h3>
          </template>

          <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Gunakan judul yang deskriptif dan menarik</p>
            <p>• Sertakan teknologi yang digunakan</p>
            <p>• Tambahkan link GitHub untuk source code</p>
            <p>• Berikan demo URL jika tersedia</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'Create Project - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Buat project siswa baru' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Form state
const isLoading = ref(false)

const form = ref({
  title: '',
  description: '',
  student: '',
  technology: '',
  githubUrl: '',
  demoUrl: '',
  category: '',
  status: 'planning',
  startDate: '',
  endDate: ''
})

// Options
const categories = [
  'Web Development',
  'Mobile Development',
  'IoT',
  'Network Security',
  'Game Development',
  'AI/Machine Learning'
]

const statusOptions = [
  { label: 'Planning', value: 'planning' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' }
]

// Actions
const saveProject = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    console.log('Project created:', form.value)
    
    // Redirect to projects list
    await navigateTo('/admin/projects')
  } catch (error) {
    console.error('Error creating project:', error)
  } finally {
    isLoading.value = false
  }
}

const saveDraft = async () => {
  try {
    // Save as draft logic
    console.log('Saved as draft:', form.value)
  } catch (error) {
    console.error('Error saving draft:', error)
  }
}
</script>
