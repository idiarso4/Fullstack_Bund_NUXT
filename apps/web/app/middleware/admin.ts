export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated as admin
  const isAuthenticated = useCookie('admin-auth', {
    default: () => false,
    serialize: JSON.stringify,
    deserialize: JSON.parse
  })

  // If not authenticated and trying to access admin routes
  if (!isAuthenticated.value && to.path.startsWith('/admin')) {
    // Redirect to admin login
    return navigateTo('/admin/login')
  }

  // If authenticated and trying to access login page
  if (isAuthenticated.value && to.path === '/admin/login') {
    // Redirect to admin dashboard
    return navigateTo('/admin/dashboard')
  }
})
