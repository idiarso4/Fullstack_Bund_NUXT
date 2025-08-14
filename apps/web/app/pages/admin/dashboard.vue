<script setup lang="ts">
// Meta tags
useHead({
  title: 'Dashboard - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Dashboard administrator untuk mengelola konten SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { adminUser } = useAuth()

// Dashboard stats
const stats = [
  {
    label: 'Total Posts',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: 'i-lucide-file-text',
    color: 'blue'
  },
  {
    label: 'Student Projects',
    value: '18',
    change: '+8%',
    changeType: 'positive',
    icon: 'i-lucide-code',
    color: 'green'
  },
  {
    label: 'Total Views',
    value: '2,847',
    change: '+23%',
    changeType: 'positive',
    icon: 'i-lucide-eye',
    color: 'purple'
  },
  {
    label: 'Active Users',
    value: '156',
    change: '-2%',
    changeType: 'negative',
    icon: 'i-lucide-users',
    color: 'orange'
  }
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    type: 'post',
    title: 'New blog post published',
    description: 'Tutorial Jaringan Komputer untuk Pemula',
    time: '2 hours ago',
    icon: 'i-lucide-file-plus',
    color: 'blue'
  },
  {
    id: 2,
    type: 'project',
    title: 'Student project submitted',
    description: 'Smart Home IoT System by Ahmad Rizki',
    time: '4 hours ago',
    icon: 'i-lucide-upload',
    color: 'green'
  },
  {
    id: 3,
    type: 'user',
    title: 'New user registered',
    description: 'Siti Nurhaliza joined the platform',
    time: '6 hours ago',
    icon: 'i-lucide-user-plus',
    color: 'purple'
  },
  {
    id: 4,
    type: 'comment',
    title: 'New comment received',
    description: 'Comment on "Network Security Best Practices"',
    time: '8 hours ago',
    icon: 'i-lucide-message-circle',
    color: 'orange'
  }
]

// Quick actions
const quickActions = [
  {
    label: 'Create New Post',
    description: 'Write a new blog article',
    icon: 'i-lucide-plus-circle',
    color: 'blue',
    to: '/admin/posts/create'
  },
  {
    label: 'Add Student Project',
    description: 'Showcase student work',
    icon: 'i-lucide-code-2',
    color: 'green',
    to: '/admin/projects/create'
  },
  {
    label: 'Manage Categories',
    description: 'Organize content categories',
    icon: 'i-lucide-folder-plus',
    color: 'purple',
    to: '/admin/categories'
  },
  {
    label: 'View Analytics',
    description: 'Check website statistics',
    icon: 'i-lucide-bar-chart-3',
    color: 'orange',
    to: '/admin/analytics'
  }
]

// Chart data (mock)
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Page Views',
      data: [450, 520, 480, 650, 720, 850],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }
  ]
}

// Get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">
            {{ getGreeting() }}, {{ adminUser?.name }}! 👋
          </h1>
          <p class="text-blue-100 text-lg">
            Selamat datang di dashboard admin SMK SIJA. Mari kelola konten website dengan mudah.
          </p>
        </div>
        <div class="hidden md:block">
          <div class="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
            <Icon name="i-lucide-layout-dashboard" class="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard
        v-for="stat in stats"
        :key="stat.label"
        class="hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
            <div class="flex items-center mt-2">
              <span 
                :class="[
                  'text-sm font-medium',
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ stat.change }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
          <div 
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center',
              `bg-${stat.color}-100 dark:bg-${stat.color}-900`
            ]"
          >
            <Icon 
              :name="stat.icon" 
              :class="[
                'w-6 h-6',
                `text-${stat.color}-600 dark:text-${stat.color}-400`
              ]"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="lg:col-span-1">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          </template>
          
          <div class="space-y-3">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center mr-4',
                  `bg-${action.color}-100 dark:bg-${action.color}-900 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800`
                ]"
              >
                <Icon 
                  :name="action.icon" 
                  :class="[
                    'w-5 h-5',
                    `text-${action.color}-600 dark:text-${action.color}-400`
                  ]"
                />
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ action.label }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ action.description }}</p>
              </div>
              <Icon name="i-lucide-chevron-right" class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            </NuxtLink>
          </div>
        </UCard>
      </div>

      <!-- Recent Activities -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
              <UButton variant="ghost" color="gray" size="sm" to="/admin/activities">
                View All
              </UButton>
            </div>
          </template>
          
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  `bg-${activity.color}-100 dark:bg-${activity.color}-900`
                ]"
              >
                <Icon 
                  :name="activity.icon" 
                  :class="[
                    'w-5 h-5',
                    `text-${activity.color}-600 dark:text-${activity.color}-400`
                  ]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ activity.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- System Status -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">System Status</h3>
        </template>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Website</span>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-green-600">Online</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Database</span>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-green-600">Connected</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Storage</span>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span class="text-sm text-yellow-600">75% Used</span>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Stats</h3>
        </template>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Today's Views</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">1,247</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">New Comments</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">23</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">5</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
        </template>
        <div class="space-y-2">
          <UButton to="/" external variant="ghost" color="gray" size="sm" block class="justify-start">
            <template #leading>
              <Icon name="i-lucide-external-link" class="w-4 h-4" />
            </template>
            View Website
          </UButton>
          <UButton to="/admin/settings" variant="ghost" color="gray" size="sm" block class="justify-start">
            <template #leading>
              <Icon name="i-lucide-settings" class="w-4 h-4" />
            </template>
            Settings
          </UButton>
          <UButton to="/admin/backup" variant="ghost" color="gray" size="sm" block class="justify-start">
            <template #leading>
              <Icon name="i-lucide-download" class="w-4 h-4" />
            </template>
            Backup Data
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
