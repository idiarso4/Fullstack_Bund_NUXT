<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <p class="text-gray-600 dark:text-gray-400">Kelola pengguna sistem SMK SIJA</p>
      </div>
      <UButton
        icon="i-lucide-user-plus"
        size="sm"
        @click="showCreateModal = true"
      >
        Add User
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">156</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Icon name="lucide:users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">142</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Icon name="lucide:user-check" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Icon name="lucide:shield" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Icon name="lucide:user-plus" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Users Table -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">All Users</h2>
          <div class="flex items-center space-x-3">
            <USelect
              v-model="selectedRole"
              :options="roleOptions"
              placeholder="Filter by role"
              size="sm"
              class="w-40"
            />
            <UInput
              v-model="searchQuery"
              placeholder="Search users..."
              icon="i-lucide-search"
              size="sm"
              class="w-64"
            />
          </div>
        </div>
      </template>

      <UTable
        :rows="filteredUsers"
        :columns="columns"
        class="w-full"
      >
        <template #avatar-data="{ row }">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{{ row.name.charAt(0) }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.name }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ row.email }}</p>
            </div>
          </div>
        </template>

        <template #role-data="{ row }">
          <UBadge
            :color="row.role === 'admin' ? 'red' : row.role === 'teacher' ? 'blue' : 'gray'"
            variant="subtle"
          >
            {{ row.role }}
          </UBadge>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.status === 'active' ? 'green' : 'gray'"
            variant="subtle"
          >
            {{ row.status }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center space-x-2">
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-lucide-edit"
              @click="editUser(row)"
            />
            <UButton
              variant="ghost"
              color="red"
              size="sm"
              icon="i-lucide-trash"
              @click="deleteUser(row)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Create User Modal -->
    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New User</h3>
        </template>

        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
            <UInput
              v-model="newUser.name"
              placeholder="Enter full name"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
            <UInput
              v-model="newUser.email"
              type="email"
              placeholder="Enter email address"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role *</label>
            <USelect
              v-model="newUser.role"
              :options="roleOptions"
              placeholder="Select role"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password *</label>
            <UInput
              v-model="newUser.password"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              variant="ghost"
              color="gray"
              @click="showCreateModal = false"
            >
              Cancel
            </UButton>
            <UButton
              @click="createUser"
              :loading="isCreating"
            >
              Create User
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'User Management - Admin SMK SIJA',
  meta: [
    { name: 'description', content: 'Kelola pengguna sistem SMK SIJA' }
  ]
})

// Set layout and middleware
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// State
const searchQuery = ref('')
const selectedRole = ref('')
const showCreateModal = ref(false)
const isCreating = ref(false)

const newUser = ref({
  name: '',
  email: '',
  role: '',
  password: ''
})

// Table columns
const columns = [
  { key: 'avatar', label: 'User', id: 'avatar' },
  { key: 'role', label: 'Role', id: 'role' },
  { key: 'status', label: 'Status', id: 'status' },
  { key: 'lastLogin', label: 'Last Login', id: 'lastLogin' },
  { key: 'actions', label: 'Actions', id: 'actions' }
]

// Options
const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Student', value: 'student' }
]

// Sample users data
const users = ref([
  {
    id: 1,
    name: 'Admin SMK SIJA',
    email: 'admin@sija.ac.id',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15 10:30'
  },
  {
    id: 2,
    name: 'Pak Budi Santoso',
    email: 'budi@sija.ac.id',
    role: 'teacher',
    status: 'active',
    lastLogin: '2024-01-15 09:15'
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    email: 'ahmad.rizki@student.sija.ac.id',
    role: 'student',
    status: 'active',
    lastLogin: '2024-01-14 16:45'
  },
  {
    id: 4,
    name: 'Siti Nurhaliza',
    email: 'siti.nur@student.sija.ac.id',
    role: 'student',
    status: 'active',
    lastLogin: '2024-01-14 14:20'
  }
])

// Computed filtered users
const filteredUsers = computed(() => {
  let filtered = users.value

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Actions
const editUser = (user) => {
  console.log('Edit user:', user)
}

const deleteUser = (user) => {
  console.log('Delete user:', user)
}

const createUser = async () => {
  isCreating.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add user to list
    users.value.push({
      id: users.value.length + 1,
      ...newUser.value,
      status: 'active',
      lastLogin: 'Never'
    })
    
    // Reset form
    newUser.value = {
      name: '',
      email: '',
      role: '',
      password: ''
    }
    
    showCreateModal.value = false
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    isCreating.value = false
  }
}
</script>
