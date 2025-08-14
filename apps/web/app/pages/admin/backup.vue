<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Backup Management</h1>
        <p class="text-gray-600 dark:text-gray-400">Kelola backup dan restore data SMK SIJA</p>
      </div>
      <UButton
        @click="createBackup"
        :loading="isCreatingBackup"
        icon="i-lucide-download"
        size="sm"
      >
        Create Backup
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Backups</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">15</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Icon name="lucide:hard-drive" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">2.4 GB</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Icon name="lucide:database" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Last Backup</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">2h ago</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Icon name="lucide:clock" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Auto Backup</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">Enabled</p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Icon name="lucide:check-circle" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Backup Settings -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Backup Settings</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Automatic Backup</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Enable automatic daily backups</p>
            </div>
            <UToggle v-model="settings.autoBackup" />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Backup Frequency</label>
            <USelect
              v-model="settings.frequency"
              :options="frequencyOptions"
              placeholder="Select frequency"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Retention Period (days)</label>
            <UInput
              v-model="settings.retention"
              type="number"
              placeholder="30"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Include Media Files</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Backup uploaded images and files</p>
            </div>
            <UToggle v-model="settings.includeMedia" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Compress Backups</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Reduce backup file size</p>
            </div>
            <UToggle v-model="settings.compress" />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Backup Location</label>
            <USelect
              v-model="settings.location"
              :options="locationOptions"
              placeholder="Select location"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton @click="saveSettings" :loading="isSaving">
            Save Settings
          </UButton>
        </div>
      </template>
    </UCard>

    <!-- Backup History -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Backup History</h2>
          <div class="flex items-center space-x-3">
            <UInput
              v-model="searchQuery"
              placeholder="Search backups..."
              icon="i-lucide-search"
              size="sm"
              class="w-64"
            />
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <div
          v-for="backup in filteredBackups"
          :key="backup.id"
          class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:archive" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">{{ backup.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ backup.description }}</p>
              <div class="flex items-center space-x-4 mt-1">
                <span class="text-xs text-gray-500">{{ backup.date }}</span>
                <span class="text-xs text-gray-500">{{ backup.size }}</span>
                <span class="text-xs text-gray-500">{{ backup.type }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UBadge
              :color="backup.status === 'completed' ? 'green' : backup.status === 'failed' ? 'red' : 'blue'"
              variant="subtle"
            >
              {{ backup.status }}
            </UBadge>
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-download"
              @click="downloadBackup(backup)"
              title="Download"
            />
            <UButton
              variant="ghost"
              color="blue"
              size="sm"
              icon="i-lucide-rotate-ccw"
              @click="restoreBackup(backup)"
              title="Restore"
            />
            <UButton
              variant="ghost"
              color="red"
              size="sm"
              icon="i-lucide-trash"
              @click="deleteBackup(backup)"
              title="Delete"
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
  title: 'Backup Management - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Kelola backup dan restore data SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// State
const searchQuery = ref('')
const isCreatingBackup = ref(false)
const isSaving = ref(false)

// Settings
const settings = ref({
  autoBackup: true,
  frequency: 'daily',
  retention: 30,
  includeMedia: true,
  compress: true,
  location: 'local'
})

// Options
const frequencyOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]

const locationOptions = [
  { label: 'Local Storage', value: 'local' },
  { label: 'Cloud Storage', value: 'cloud' },
  { label: 'External Drive', value: 'external' }
]

// Sample backup data
const backups = ref([
  {
    id: 1,
    name: 'backup-2024-01-15.zip',
    description: 'Automatic daily backup',
    date: '2024-01-15 10:30',
    size: '2.5 MB',
    type: 'Full',
    status: 'completed'
  },
  {
    id: 2,
    name: 'backup-2024-01-14.zip',
    description: 'Automatic daily backup',
    date: '2024-01-14 10:30',
    size: '2.4 MB',
    type: 'Full',
    status: 'completed'
  },
  {
    id: 3,
    name: 'backup-2024-01-13.zip',
    description: 'Manual backup before update',
    date: '2024-01-13 15:45',
    size: '2.6 MB',
    type: 'Manual',
    status: 'completed'
  },
  {
    id: 4,
    name: 'backup-2024-01-12.zip',
    description: 'Automatic daily backup',
    date: '2024-01-12 10:30',
    size: '2.3 MB',
    type: 'Full',
    status: 'failed'
  }
])

// Computed filtered backups
const filteredBackups = computed(() => {
  if (!searchQuery.value) return backups.value
  
  return backups.value.filter(backup =>
    backup.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    backup.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Actions
const createBackup = async () => {
  isCreatingBackup.value = true
  
  try {
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Add new backup to list
    const newBackup = {
      id: backups.value.length + 1,
      name: `backup-${new Date().toISOString().split('T')[0]}.zip`,
      description: 'Manual backup',
      date: new Date().toLocaleString(),
      size: '2.7 MB',
      type: 'Manual',
      status: 'completed'
    }
    
    backups.value.unshift(newBackup)
    console.log('Backup created successfully')
  } catch (error) {
    console.error('Error creating backup:', error)
  } finally {
    isCreatingBackup.value = false
  }
}

const saveSettings = async () => {
  isSaving.value = true
  
  try {
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Settings saved:', settings.value)
  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    isSaving.value = false
  }
}

const downloadBackup = (backup) => {
  console.log('Download backup:', backup)
}

const restoreBackup = (backup) => {
  console.log('Restore backup:', backup)
}

const deleteBackup = (backup) => {
  const index = backups.value.findIndex(b => b.id === backup.id)
  if (index > -1) {
    backups.value.splice(index, 1)
  }
}
</script>
