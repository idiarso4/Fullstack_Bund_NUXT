<script setup lang="ts">
const { isAuthenticated, adminUser, logout } = useAuth()

// Sidebar state
const isSidebarOpen = ref(true)
const isMobileMenuOpen = ref(false)

// Navigation items
const navigation = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/admin/dashboard'
  },
  {
    label: 'Content Management',
    icon: 'i-lucide-file-text',
    children: [
      { label: 'Blog Posts', icon: 'i-lucide-newspaper', to: '/admin/posts' },
      { label: 'Categories', icon: 'i-lucide-folder', to: '/admin/categories' },
      { label: 'Student Projects', icon: 'i-lucide-code', to: '/admin/projects' }
    ]
  },
  {
    label: 'User Management',
    icon: 'i-lucide-users',
    to: '/admin/users'
  },
  {
    label: 'Analytics',
    icon: 'i-lucide-bar-chart',
    to: '/admin/analytics'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/admin/settings'
  }
]

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:inset-0'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Icon name="i-lucide-shield-check" class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-900 dark:text-white">SIJA Admin</h1>
          </div>
        </div>
        
        <!-- Close button for mobile -->
        <UButton
          @click="toggleSidebar"
          variant="ghost"
          color="gray"
          size="sm"
          icon="i-lucide-x"
          class="lg:hidden"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <template v-for="item in navigation" :key="item.label">
          <!-- Single item -->
          <NuxtLink
            v-if="!item.children"
            :to="item.to"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="[
              $route.path === item.to 
                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300'
            ]"
          >
            <Icon :name="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </NuxtLink>

          <!-- Group with children -->
          <div v-else class="space-y-1">
            <div class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Icon :name="item.icon" class="w-5 h-5 mr-3" />
              {{ item.label }}
            </div>
            <div class="ml-8 space-y-1">
              <NuxtLink
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="flex items-center px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="[
                  $route.path === child.to
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400'
                ]"
              >
                <Icon :name="child.icon" class="w-4 h-4 mr-3" />
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Icon name="i-lucide-user" class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ adminUser?.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ adminUser?.role }}
            </p>
          </div>
        </div>
        
        <UButton
          @click="handleLogout"
          variant="outline"
          color="red"
          size="sm"
          block
          icon="i-lucide-log-out"
        >
          Logout
        </UButton>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="['lg:ml-64 flex flex-col min-h-screen']">
      <!-- Top Header -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
        <!-- Mobile menu button -->
        <UButton
          @click="toggleSidebar"
          variant="ghost"
          color="gray"
          size="sm"
          icon="i-lucide-menu"
          class="lg:hidden"
        />

        <!-- Breadcrumb -->
        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon name="i-lucide-home" class="w-4 h-4" />
          <span>/</span>
          <span class="text-gray-900 dark:text-white">{{ $route.meta.title || 'Dashboard' }}</span>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <UButton
            variant="ghost"
            color="gray"
            size="sm"
            icon="i-lucide-bell"
          />

          <!-- Quick Actions -->
          <UButton
            to="/admin/posts/create"
            variant="ghost"
            color="gray"
            size="sm"
            icon="i-lucide-plus-circle"
            title="Create New Post"
          />

          <!-- Theme Toggle -->
          <ModeToggle />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
    />
  </div>
</template>
