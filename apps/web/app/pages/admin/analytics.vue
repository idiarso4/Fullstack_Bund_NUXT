<script setup lang="ts">
// Meta tags
useHead({
  title: 'Analytics - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Dashboard analytics untuk melihat statistik website SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Time period filter
const timePeriod = ref('7d')
const timePeriodOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last year', value: '1y' }
]

// Analytics data
const analytics = reactive({
  overview: {
    totalViews: 12847,
    uniqueVisitors: 8234,
    pageViews: 15632,
    bounceRate: 42.3,
    avgSessionDuration: '2m 34s',
    newUsers: 1847
  },
  growth: {
    views: 23.5,
    visitors: 18.2,
    pageViews: 15.8,
    bounceRate: -5.2
  },
  topPages: [
    { path: '/blog/pengenalan-jaringan-komputer-pemula', title: 'Pengenalan Jaringan Komputer untuk Pemula', views: 1247, percentage: 15.2 },
    { path: '/projects', title: 'Student Projects', views: 987, percentage: 12.1 },
    { path: '/smart-city', title: 'Smart City Solutions', views: 856, percentage: 10.5 },
    { path: '/lms', title: 'Learning Management System', views: 743, percentage: 9.1 },
    { path: '/blog/cara-membuat-aplikasi-web-vuejs-nuxt', title: 'Cara Membuat Aplikasi Web dengan Vue.js', views: 654, percentage: 8.0 }
  ],
  topReferrers: [
    { source: 'Google', visits: 4521, percentage: 45.2 },
    { source: 'Direct', visits: 2847, percentage: 28.5 },
    { source: 'Facebook', visits: 1234, percentage: 12.3 },
    { source: 'Twitter', visits: 876, percentage: 8.8 },
    { source: 'LinkedIn', visits: 523, percentage: 5.2 }
  ],
  devices: [
    { type: 'Desktop', users: 5234, percentage: 52.3 },
    { type: 'Mobile', users: 3847, percentage: 38.5 },
    { type: 'Tablet', users: 923, percentage: 9.2 }
  ],
  browsers: [
    { name: 'Chrome', users: 6234, percentage: 62.3 },
    { name: 'Firefox', users: 1847, percentage: 18.5 },
    { name: 'Safari', users: 1234, percentage: 12.3 },
    { name: 'Edge', users: 523, percentage: 5.2 },
    { name: 'Others', users: 162, percentage: 1.7 }
  ]
})

// Chart data for page views
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Page Views',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    },
    {
      label: 'Unique Visitors',
      data: [800, 1200, 2000, 3200, 1400, 2100, 3000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    }
  ]
}

// Get growth indicator
const getGrowthIndicator = (value) => {
  if (value > 0) return { color: 'green', icon: 'i-lucide-trending-up' }
  if (value < 0) return { color: 'red', icon: 'i-lucide-trending-down' }
  return { color: 'gray', icon: 'i-lucide-minus' }
}

// Format number
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400">Monitor website performance dan engagement</p>
      </div>
      <div class="flex items-center space-x-3">
        <USelect
          v-model="timePeriod"
          :options="timePeriodOptions"
          size="sm"
        />
        <UButton variant="outline" color="gray" size="sm" icon="i-lucide-download">
          Export Report
        </UButton>
        <UButton variant="outline" color="gray" size="sm" icon="i-lucide-refresh-cw">
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Overview Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <!-- Total Views -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Views</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(analytics.overview.totalViews) }}</p>
            <div class="flex items-center mt-2">
              <Icon :name="getGrowthIndicator(analytics.growth.views).icon" :class="`w-4 h-4 text-${getGrowthIndicator(analytics.growth.views).color}-500`" />
              <span :class="`text-sm font-medium text-${getGrowthIndicator(analytics.growth.views).color}-600 ml-1`">
                {{ Math.abs(analytics.growth.views) }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-eye" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>

      <!-- Unique Visitors -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Unique Visitors</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(analytics.overview.uniqueVisitors) }}</p>
            <div class="flex items-center mt-2">
              <Icon :name="getGrowthIndicator(analytics.growth.visitors).icon" :class="`w-4 h-4 text-${getGrowthIndicator(analytics.growth.visitors).color}-500`" />
              <span :class="`text-sm font-medium text-${getGrowthIndicator(analytics.growth.visitors).color}-600 ml-1`">
                {{ Math.abs(analytics.growth.visitors) }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-users" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <!-- Page Views -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Page Views</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(analytics.overview.pageViews) }}</p>
            <div class="flex items-center mt-2">
              <Icon :name="getGrowthIndicator(analytics.growth.pageViews).icon" :class="`w-4 h-4 text-${getGrowthIndicator(analytics.growth.pageViews).color}-500`" />
              <span :class="`text-sm font-medium text-${getGrowthIndicator(analytics.growth.pageViews).color}-600 ml-1`">
                {{ Math.abs(analytics.growth.pageViews) }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-file-text" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </UCard>

      <!-- Bounce Rate -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Bounce Rate</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.overview.bounceRate }}%</p>
            <div class="flex items-center mt-2">
              <Icon :name="getGrowthIndicator(analytics.growth.bounceRate).icon" :class="`w-4 h-4 text-${getGrowthIndicator(analytics.growth.bounceRate).color}-500`" />
              <span :class="`text-sm font-medium text-${getGrowthIndicator(analytics.growth.bounceRate).color}-600 ml-1`">
                {{ Math.abs(analytics.growth.bounceRate) }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-activity" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </UCard>

      <!-- Avg Session Duration -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Session</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.overview.avgSessionDuration }}</p>
            <div class="flex items-center mt-2">
              <Icon name="i-lucide-clock" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-500 ml-1">Duration</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-timer" class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </UCard>

      <!-- New Users -->
      <UCard class="hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">New Users</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatNumber(analytics.overview.newUsers) }}</p>
            <div class="flex items-center mt-2">
              <Icon name="i-lucide-user-plus" class="w-4 h-4 text-green-500" />
              <span class="text-sm text-green-600 ml-1">This period</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center">
            <Icon name="i-lucide-user-plus" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Pages -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Top Pages</h2>
        </template>
        
        <div class="space-y-4">
          <div
            v-for="page in analytics.topPages"
            :key="page.path"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-900 dark:text-white truncate">{{ page.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ page.path }}</p>
            </div>
            <div class="text-right ml-4">
              <p class="font-medium text-gray-900 dark:text-white">{{ formatNumber(page.views) }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ page.percentage }}%</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Traffic Sources -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h2>
        </template>
        
        <div class="space-y-4">
          <div
            v-for="referrer in analytics.topReferrers"
            :key="referrer.source"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Icon name="i-lucide-globe" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">{{ referrer.source }}</span>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{{ formatNumber(referrer.visits) }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ referrer.percentage }}%</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Device Types -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Device Types</h2>
        </template>
        
        <div class="space-y-4">
          <div
            v-for="device in analytics.devices"
            :key="device.type"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <Icon 
                :name="device.type === 'Desktop' ? 'i-lucide-monitor' : device.type === 'Mobile' ? 'i-lucide-smartphone' : 'i-lucide-tablet'" 
                class="w-5 h-5 text-gray-600 dark:text-gray-400" 
              />
              <span class="font-medium text-gray-900 dark:text-white">{{ device.type }}</span>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{{ formatNumber(device.users) }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ device.percentage }}%</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Browsers -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Browsers</h2>
        </template>
        
        <div class="space-y-4">
          <div
            v-for="browser in analytics.browsers"
            :key="browser.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <Icon name="i-lucide-globe" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span class="font-medium text-gray-900 dark:text-white">{{ browser.name }}</span>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{{ formatNumber(browser.users) }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ browser.percentage }}%</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Real-time Activity -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Real-time Activity</h2>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Live</span>
          </div>
        </div>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">23</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">156</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Page Views (1h)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">12</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">New Sessions</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">89%</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
