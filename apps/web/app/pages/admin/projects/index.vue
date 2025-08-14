<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Student Projects</h1>
        <p class="text-gray-600 dark:text-gray-400">Kelola project siswa SMK SIJA</p>
      </div>
      <UButton
        to="/admin/projects/create"
        icon="i-lucide-plus"
        size="sm"
      >
        Add Project
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Icon name="lucide:folder" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">18</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Icon name="lucide:play-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">6</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Icon name="lucide:check-circle" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Icon name="lucide:calendar" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Projects List -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
          <UInput
            v-model="searchQuery"
            placeholder="Search projects..."
            icon="i-lucide-search"
            size="sm"
            class="w-64"
          />
        </div>
      </template>

      <div class="space-y-4">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:code" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">{{ project.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ project.description }}</p>
              <div class="flex items-center space-x-4 mt-1">
                <span class="text-xs text-gray-500">{{ project.student }}</span>
                <span class="text-xs text-gray-500">{{ project.technology }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UBadge
              :color="project.status === 'completed' ? 'green' : project.status === 'in-progress' ? 'blue' : 'gray'"
              variant="subtle"
            >
              {{ project.status }}
            </UBadge>
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-external-link"
              @click="viewProject(project)"
            />
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-edit"
              @click="editProject(project)"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'Student Projects - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Kelola project siswa SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Search functionality
const searchQuery = ref('')

// Sample projects data
const projects = ref([
  {
    id: 1,
    title: 'Smart Home IoT System',
    description: 'Sistem rumah pintar menggunakan Arduino dan sensor IoT',
    student: 'Ahmad Rizki',
    technology: 'Arduino, IoT',
    status: 'completed',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'E-Learning Platform',
    description: 'Platform pembelajaran online untuk SMK',
    student: 'Siti Nurhaliza',
    technology: 'Vue.js, Node.js',
    status: 'in-progress',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Network Monitoring Dashboard',
    description: 'Dashboard monitoring jaringan sekolah',
    student: 'Budi Santoso',
    technology: 'React, Python',
    status: 'in-progress',
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    title: 'Mobile Attendance App',
    description: 'Aplikasi absensi siswa berbasis mobile',
    student: 'Dewi Sartika',
    technology: 'Flutter, Firebase',
    status: 'planning',
    createdAt: '2024-01-05'
  }
])

// Computed filtered projects
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value
  
  return projects.value.filter(project =>
    project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    project.student.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    project.technology.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Actions
const viewProject = (project) => {
  navigateTo(`/projects/${project.id}`)
}

const editProject = (project) => {
  navigateTo(`/admin/projects/${project.id}/edit`)
}
</script>
