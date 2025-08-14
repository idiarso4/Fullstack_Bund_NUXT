<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
        <p class="text-gray-600 dark:text-gray-400">Monitor sistem aktivitas dan log SMK SIJA</p>
      </div>
      <div class="flex items-center space-x-3">
        <USelect
          v-model="selectedFilter"
          :options="filterOptions"
          placeholder="Filter activities"
          size="sm"
          class="w-40"
        />
        <UButton
          @click="refreshActivities"
          variant="outline"
          icon="i-lucide-refresh-cw"
          size="sm"
        >
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Activities</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">47</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Icon name="lucide:activity" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">User Logins</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">23</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Icon name="lucide:log-in" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Content Updates</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Icon name="lucide:edit" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">System Events</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">8</p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Icon name="lucide:server" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Activity Timeline -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
          <UInput
            v-model="searchQuery"
            placeholder="Search activities..."
            icon="i-lucide-search"
            size="sm"
            class="w-64"
          />
        </div>
      </template>

      <div class="space-y-4">
        <div
          v-for="activity in filteredActivities"
          :key="activity.id"
          class="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <!-- Activity Icon -->
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            getActivityColor(activity.type)
          ]">
            <Icon :name="getActivityIcon(activity.type)" class="w-5 h-5 text-white" />
          </div>

          <!-- Activity Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ activity.title }}
              </h3>
              <span class="text-xs text-gray-500">{{ activity.timestamp }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ activity.description }}
            </p>
            <div class="flex items-center space-x-4 mt-2">
              <span class="text-xs text-gray-500">
                <Icon name="lucide:user" class="w-3 h-3 inline mr-1" />
                {{ activity.user }}
              </span>
              <span class="text-xs text-gray-500">
                <Icon name="lucide:map-pin" class="w-3 h-3 inline mr-1" />
                {{ activity.ip }}
              </span>
              <UBadge
                :color="getActivityBadgeColor(activity.type)"
                variant="subtle"
                size="xs"
              >
                {{ activity.type }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <template #footer>
        <div class="text-center">
          <UButton
            @click="loadMoreActivities"
            variant="ghost"
            color="gray"
            :loading="isLoading"
          >
            Load More Activities
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'Activity Log - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Monitor aktivitas sistem SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// State
const searchQuery = ref('')
const selectedFilter = ref('')
const isLoading = ref(false)

// Filter options
const filterOptions = [
  { label: 'All Activities', value: '' },
  { label: 'User Login', value: 'login' },
  { label: 'Content Update', value: 'content' },
  { label: 'System Event', value: 'system' },
  { label: 'Security', value: 'security' }
]

// Sample activities data
const activities = ref([
  {
    id: 1,
    type: 'login',
    title: 'User Login',
    description: 'Admin user logged into the system',
    user: 'admin@sija.ac.id',
    ip: '192.168.1.100',
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'content',
    title: 'Post Created',
    description: 'New blog post "Pengenalan Jaringan Komputer" was created',
    user: 'admin@sija.ac.id',
    ip: '192.168.1.100',
    timestamp: '15 minutes ago'
  },
  {
    id: 3,
    type: 'system',
    title: 'Backup Completed',
    description: 'Automatic daily backup completed successfully',
    user: 'System',
    ip: 'localhost',
    timestamp: '1 hour ago'
  },
  {
    id: 4,
    type: 'content',
    title: 'Category Updated',
    description: 'Category "Jaringan Komputer" was modified',
    user: 'admin@sija.ac.id',
    ip: '192.168.1.100',
    timestamp: '2 hours ago'
  },
  {
    id: 5,
    type: 'security',
    title: 'Failed Login Attempt',
    description: 'Multiple failed login attempts detected',
    user: 'unknown',
    ip: '203.0.113.1',
    timestamp: '3 hours ago'
  },
  {
    id: 6,
    type: 'login',
    title: 'User Logout',
    description: 'User logged out from the system',
    user: 'teacher@sija.ac.id',
    ip: '192.168.1.105',
    timestamp: '4 hours ago'
  }
])

// Computed filtered activities
const filteredActivities = computed(() => {
  let filtered = activities.value

  if (selectedFilter.value) {
    filtered = filtered.filter(activity => activity.type === selectedFilter.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(activity =>
      activity.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Helper functions
const getActivityIcon = (type) => {
  const icons = {
    login: 'lucide:log-in',
    content: 'lucide:edit',
    system: 'lucide:server',
    security: 'lucide:shield-alert'
  }
  return icons[type] || 'lucide:activity'
}

const getActivityColor = (type) => {
  const colors = {
    login: 'bg-green-500',
    content: 'bg-blue-500',
    system: 'bg-purple-500',
    security: 'bg-red-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getActivityBadgeColor = (type) => {
  const colors = {
    login: 'green',
    content: 'blue',
    system: 'purple',
    security: 'red'
  }
  return colors[type] || 'gray'
}

// Actions
const refreshActivities = () => {
  console.log('Refreshing activities...')
  // Simulate refresh
}

const loadMoreActivities = async () => {
  isLoading.value = true
  
  try {
    // Simulate loading more activities
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Loading more activities...')
  } catch (error) {
    console.error('Error loading activities:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
