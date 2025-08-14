export const useAuth = () => {
  // Admin credentials (in production, this should be from database)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'sija2025',
    role: 'admin',
    name: 'Administrator SMK SIJA'
  }

  // Authentication state
  const isAuthenticated = useCookie('admin-auth', {
    default: () => false,
    serialize: JSON.stringify,
    deserialize: JSON.parse
  })

  const adminUser = useCookie('admin-user', {
    default: () => null,
    serialize: JSON.stringify,
    deserialize: JSON.parse
  })

  // Login function
  const login = async (username: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check credentials
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set authentication state
        isAuthenticated.value = true
        adminUser.value = {
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role,
          name: ADMIN_CREDENTIALS.name,
          loginTime: new Date().toISOString()
        }

        return { success: true, message: 'Login berhasil!' }
      } else {
        return { success: false, message: 'Username atau password salah!' }
      }
    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan saat login!' }
    }
  }

  // Logout function
  const logout = () => {
    isAuthenticated.value = false
    adminUser.value = null
    
    // Redirect to login page
    return navigateTo('/admin/login')
  }

  // Check if user has specific role
  const hasRole = (role: string) => {
    return adminUser.value?.role === role
  }

  // Check if user is admin
  const isAdmin = computed(() => {
    return hasRole('admin')
  })

  return {
    isAuthenticated: readonly(isAuthenticated),
    adminUser: readonly(adminUser),
    isAdmin,
    login,
    logout,
    hasRole
  }
}
