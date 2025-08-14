<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-gray-400">Kelola pengaturan sistem SMK SIJA</p>
    </div>

    <!-- Settings Tabs -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <UCard>
          <div class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                activeTab === tab.id
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >
              <div class="flex items-center space-x-3">
                <Icon :name="tab.icon" class="w-4 h-4" />
                <span class="text-sm font-medium">{{ tab.label }}</span>
              </div>
            </button>
          </div>
        </UCard>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-3">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h2>
            </template>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
                <UInput
                  v-model="settings.siteName"
                  placeholder="SMK SIJA"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
                <UTextarea
                  v-model="settings.siteDescription"
                  placeholder="Sekolah Menengah Kejuruan Sistem Informasi Jaringan dan Aplikasi"
                  rows="3"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                <UInput
                  v-model="settings.contactEmail"
                  type="email"
                  placeholder="info@sija.ac.id"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <UInput
                  v-model="settings.phoneNumber"
                  placeholder="(021) 1234-5678"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end">
                <UButton @click="saveSettings" :loading="isSaving">
                  Save Changes
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- SEO Settings -->
        <div v-if="activeTab === 'seo'" class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">SEO Settings</h2>
            </template>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <UInput
                  v-model="settings.metaTitle"
                  placeholder="SMK SIJA - Smart City Solutions"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <UTextarea
                  v-model="settings.metaDescription"
                  placeholder="Sekolah terdepan dalam teknologi Smart City dan Sistem Informasi"
                  rows="3"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                <UInput
                  v-model="settings.keywords"
                  placeholder="SMK, SIJA, Smart City, Teknologi, Pendidikan"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end">
                <UButton @click="saveSettings" :loading="isSaving">
                  Save SEO Settings
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h2>
            </template>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Enable 2FA for admin accounts</p>
                </div>
                <UToggle v-model="settings.twoFactorAuth" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Login Attempts Limit</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Limit failed login attempts</p>
                </div>
                <UToggle v-model="settings.loginLimit" />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeout (minutes)</label>
                <UInput
                  v-model="settings.sessionTimeout"
                  type="number"
                  placeholder="30"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end">
                <UButton @click="saveSettings" :loading="isSaving">
                  Save Security Settings
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- Backup Settings -->
        <div v-if="activeTab === 'backup'" class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Backup & Restore</h2>
            </template>

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
                  v-model="settings.backupFrequency"
                  :options="backupOptions"
                  placeholder="Select frequency"
                />
              </div>

              <div class="space-y-3">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Manual Backup</h3>
                <div class="flex space-x-3">
                  <UButton
                    @click="createBackup"
                    :loading="isBackingUp"
                    icon="i-lucide-download"
                  >
                    Create Backup
                  </UButton>
                  <UButton
                    variant="outline"
                    icon="i-lucide-upload"
                    @click="restoreBackup"
                  >
                    Restore Backup
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Recent Backups -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Backups</h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="backup in recentBackups"
                :key="backup.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ backup.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ backup.date }} • {{ backup.size }}</p>
                </div>
                <div class="flex space-x-2">
                  <UButton
                    variant="ghost"
                    color="gray"
                    size="sm"
                    icon="i-lucide-download"
                    @click="downloadBackup(backup)"
                  />
                  <UButton
                    variant="ghost"
                    color="red"
                    size="sm"
                    icon="i-lucide-trash"
                    @click="deleteBackup(backup)"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'Settings - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Pengaturan sistem SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// State
const activeTab = ref('general')
const isSaving = ref(false)
const isBackingUp = ref(false)

// Tabs configuration
const tabs = [
  { id: 'general', label: 'General', icon: 'lucide:settings' },
  { id: 'seo', label: 'SEO', icon: 'lucide:search' },
  { id: 'security', label: 'Security', icon: 'lucide:shield' },
  { id: 'backup', label: 'Backup', icon: 'lucide:hard-drive' }
]

// Settings data
const settings = ref({
  siteName: 'SMK SIJA',
  siteDescription: 'Sekolah Menengah Kejuruan Sistem Informasi Jaringan dan Aplikasi',
  contactEmail: 'info@sija.ac.id',
  phoneNumber: '(021) 1234-5678',
  metaTitle: 'SMK SIJA - Smart City Solutions',
  metaDescription: 'Sekolah terdepan dalam teknologi Smart City dan Sistem Informasi',
  keywords: 'SMK, SIJA, Smart City, Teknologi, Pendidikan',
  twoFactorAuth: false,
  loginLimit: true,
  sessionTimeout: 30,
  autoBackup: true,
  backupFrequency: 'daily'
})

// Options
const backupOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]

// Recent backups data
const recentBackups = ref([
  {
    id: 1,
    name: 'backup-2024-01-15.zip',
    date: '2024-01-15 10:30',
    size: '2.5 MB'
  },
  {
    id: 2,
    name: 'backup-2024-01-14.zip',
    date: '2024-01-14 10:30',
    size: '2.4 MB'
  },
  {
    id: 3,
    name: 'backup-2024-01-13.zip',
    date: '2024-01-13 10:30',
    size: '2.3 MB'
  }
])

// Actions
const saveSettings = async () => {
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Settings saved:', settings.value)
  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    isSaving.value = false
  }
}

const createBackup = async () => {
  isBackingUp.value = true
  
  try {
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add new backup to list
    const newBackup = {
      id: recentBackups.value.length + 1,
      name: `backup-${new Date().toISOString().split('T')[0]}.zip`,
      date: new Date().toLocaleString(),
      size: '2.6 MB'
    }
    
    recentBackups.value.unshift(newBackup)
    console.log('Backup created successfully')
  } catch (error) {
    console.error('Error creating backup:', error)
  } finally {
    isBackingUp.value = false
  }
}

const restoreBackup = () => {
  console.log('Restore backup functionality')
}

const downloadBackup = (backup) => {
  console.log('Download backup:', backup)
}

const deleteBackup = (backup) => {
  const index = recentBackups.value.findIndex(b => b.id === backup.id)
  if (index > -1) {
    recentBackups.value.splice(index, 1)
  }
}
</script>
