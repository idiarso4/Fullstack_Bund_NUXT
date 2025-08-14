export default defineNuxtPlugin(() => {
  // Set dark mode as default on client side
  if (typeof window !== 'undefined') {
    try {
      // Check if there's a stored preference
      const stored = localStorage.getItem('color-mode')

      if (!stored) {
        // If no stored preference, set dark mode as default
        localStorage.setItem('color-mode', 'dark')
        document.documentElement.classList.add('dark')
      } else if (stored === 'dark') {
        // If stored preference is dark, apply it
        document.documentElement.classList.add('dark')
      } else {
        // If stored preference is light, apply it
        document.documentElement.classList.remove('dark')
      }
    } catch (error) {
      // Fallback to dark mode if localStorage is not available
      document.documentElement.classList.add('dark')
    }
  }
})
