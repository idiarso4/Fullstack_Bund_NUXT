<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Meta tags
useHead({
  title: 'SIJA - Membangun Smart City Masa Depan',
  meta: [
    { name: 'description', content: 'SMK Jurusan Sistem Informasi Jaringan dan Aplikasi - Membangun Smart City dengan teknologi IoT, AI, dan infrastruktur digital modern' }
  ]
})

// Interactive state
const selectedTech = ref(null)
const hoveredIcon = ref(null)
const isAnimating = ref(false)
const activeFeature = ref('smart-city')

// Smart City Technologies
const smartCityTechs = [
  {
    id: 'iot',
    name: 'Internet of Things',
    icon: 'i-lucide-wifi',
    description: 'Sensor dan perangkat terhubung untuk monitoring real-time',
    color: 'blue',
    applications: ['Smart Lighting', 'Traffic Management', 'Environmental Monitoring']
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: 'i-lucide-brain',
    description: 'AI untuk analisis data dan pengambilan keputusan otomatis',
    color: 'purple',
    applications: ['Predictive Analytics', 'Smart Automation', 'Decision Support']
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: 'i-lucide-cloud',
    description: 'Infrastruktur cloud untuk skalabilitas dan efisiensi',
    color: 'green',
    applications: ['Data Storage', 'Scalable Services', 'Remote Access']
  },
  {
    id: 'network',
    name: 'Network Infrastructure',
    icon: 'i-lucide-network',
    description: 'Jaringan fiber optik dan 5G untuk konektivitas tinggi',
    color: 'orange',
    applications: ['High-Speed Internet', '5G Networks', 'Fiber Optic']
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: 'i-lucide-shield',
    description: 'Keamanan siber untuk melindungi infrastruktur digital',
    color: 'red',
    applications: ['Data Protection', 'Network Security', 'Identity Management']
  },
  {
    id: 'mobile',
    name: 'Mobile Applications',
    icon: 'i-lucide-smartphone',
    description: 'Aplikasi mobile untuk akses layanan smart city',
    color: 'indigo',
    applications: ['Citizen Apps', 'Service Portal', 'Emergency Response']
  }
]

// Main Features
const mainFeatures = [
  {
    id: 'smart-city',
    title: 'Smart City Solutions',
    description: 'Membangun kota pintar dengan teknologi IoT, AI, dan infrastruktur digital',
    icon: 'i-lucide-building',
    color: 'blue',
    stats: { projects: 15, siswa: 120, technologies: 6 }
  },
  {
    id: 'student-projects',
    title: 'Student Projects',
    description: 'Platform showcase project siswa SMK dengan teknologi terdepan',
    icon: 'i-lucide-code',
    color: 'green',
    stats: { projects: 45, siswa: 200, categories: 8 }
  },
  {
    id: 'lms',
    title: 'Learning Management System',
    description: 'Sistem manajemen pembelajaran digital yang terintegrasi',
    icon: 'i-lucide-graduation-cap',
    color: 'purple',
    stats: { courses: 25, siswa: 300, instructors: 15 }
  },
  {
    id: 'blog',
    title: 'Knowledge Hub',
    description: 'Blog dan artikel teknologi untuk berbagi pengetahuan',
    icon: 'i-lucide-book-open',
    color: 'orange',
    stats: { articles: 50, categories: 5, readers: 1000 }
  }
]

// Functions
const selectTech = (tech) => {
  selectedTech.value = selectedTech.value?.id === tech.id ? null : tech
  isAnimating.value = true
  setTimeout(() => isAnimating.value = false, 300)
}

const setActiveFeature = (featureId) => {
  activeFeature.value = featureId
}

const getFeatureRoute = (featureId) => {
  switch (featureId) {
    case 'blog': return '/blog'
    case 'student-projects': return '/projects'
    case 'lms': return '/lms'
    case 'smart-city': return '/smart-city'
    default: return '/about'
  }
}

// Sample data for demo
const blogConfig = {
  blog_title: "Blog Sistem Informasi Jaringan dan Aplikasi",
  blog_description: "Portal resmi jurusan Sistem Informasi Jaringan dan Aplikasi - Blog, informasi akademik, dan berita terkini"
}

const recentPosts = [
  {
    _id: "1",
    title: "Pengenalan Jaringan Komputer untuk Pemula",
    slug: "pengenalan-jaringan-komputer-pemula",
    excerpt: "Pelajari dasar-dasar jaringan komputer mulai dari pengertian, komponen, hingga topologi jaringan yang umum digunakan.",
    category: { name: "Tutorial", color: "blue" },
    author: { name: "Dr. Ahmad Wijaya" },
    publishedAt: Date.now() - 86400000 * 7,
    createdAt: Date.now() - 86400000 * 7
  },
  {
    _id: "2",
    title: "Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt",
    slug: "cara-membuat-aplikasi-web-vuejs-nuxt",
    excerpt: "Tutorial lengkap membuat aplikasi web modern menggunakan Vue.js dan Nuxt.js dari setup hingga deployment.",
    category: { name: "Pengembangan Aplikasi", color: "green" },
    author: { name: "Sari Indrawati, M.Kom" },
    publishedAt: Date.now() - 86400000 * 5,
    createdAt: Date.now() - 86400000 * 5
  },
  {
    _id: "3",
    title: "Tren Keamanan Siber 2025: Yang Perlu Diketahui",
    slug: "tren-keamanan-siber-2025",
    excerpt: "Analisis tren keamanan siber terbaru di 2025 dan strategi untuk menghadapi ancaman yang berkembang.",
    category: { name: "Keamanan Siber", color: "red" },
    author: { name: "Budi Santoso, M.T" },
    publishedAt: Date.now() - 86400000 * 3,
    createdAt: Date.now() - 86400000 * 3
  }
]

const categories = [
  { _id: "1", name: "Tutorial", slug: "tutorial", color: "blue", postCount: 5 },
  { _id: "2", name: "Berita Teknologi", slug: "berita-teknologi", color: "green", postCount: 3 },
  { _id: "3", name: "Jaringan Komputer", slug: "jaringan-komputer", color: "purple", postCount: 4 },
  { _id: "4", name: "Pengembangan Aplikasi", slug: "pengembangan-aplikasi", color: "orange", postCount: 6 },
  { _id: "5", name: "Keamanan Siber", slug: "keamanan-siber", color: "red", postCount: 2 }
]

// Functions
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div class="container mx-auto max-w-7xl px-4 py-16 relative">
        <div class="text-center mb-16">
          <!-- Animated Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 animate-pulse">
            <Icon name="i-lucide-zap" class="w-4 h-4 mr-2" />
            Membangun Masa Depan Digital Indonesia
          </div>

          <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Smart City
          </h1>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            SMK Jurusan Sistem Informasi Jaringan dan Aplikasi
          </h2>

          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Membangun kota pintar masa depan dengan teknologi IoT, AI, dan infrastruktur digital.
            Bergabunglah dengan siswa SMK SIJA dalam menciptakan solusi inovatif untuk Indonesia yang lebih maju.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <UButton
              @click="setActiveFeature('smart-city')"
              size="lg"
              icon="i-lucide-building"
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Explore Smart City
            </UButton>
            <UButton
              to="/blog"
              variant="outline"
              size="lg"
              icon="i-lucide-book-open"
            >
              Knowledge Hub
            </UButton>
            <UButton
              @click="setActiveFeature('student-projects')"
              variant="outline"
              size="lg"
              icon="i-lucide-code"
            >
              Student Projects
            </UButton>
          </div>
        </div>

        <!-- Interactive Smart City Technologies -->
        <div class="mb-20">
          <h3 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Smart City Technologies
          </h3>
          <p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Klik pada teknologi di bawah untuk melihat aplikasi dan implementasinya dalam Smart City
          </p>

          <!-- Technology Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <div
              v-for="tech in smartCityTechs"
              :key="tech.id"
              @click="selectTech(tech)"
              @mouseenter="hoveredIcon = tech.id"
              @mouseleave="hoveredIcon = null"
              :class="[
                'group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform',
                selectedTech?.id === tech.id
                  ? `border-${tech.color}-500 bg-${tech.color}-50 dark:bg-${tech.color}-900/20 scale-105 shadow-lg`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105',
                hoveredIcon === tech.id ? 'shadow-lg' : ''
              ]"
            >
              <div class="text-center">
                <div
                  :class="[
                    'w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 transition-all duration-300',
                    selectedTech?.id === tech.id
                      ? `bg-${tech.color}-500 text-white`
                      : `bg-${tech.color}-100 dark:bg-${tech.color}-900 text-${tech.color}-600 dark:text-${tech.color}-400 group-hover:bg-${tech.color}-200 dark:group-hover:bg-${tech.color}-800`
                  ]"
                >
                  <Icon :name="tech.icon" class="w-6 h-6" />
                </div>
                <h4 class="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {{ tech.name }}
                </h4>
              </div>
            </div>
          </div>

          <!-- Selected Technology Details -->
          <div
            v-if="selectedTech"
            :class="[
              'bg-white dark:bg-gray-800 rounded-2xl p-8 border transition-all duration-300',
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            ]"
          >
            <div class="flex items-start space-x-6">
              <div
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center',
                  `bg-${selectedTech.color}-500 text-white`
                ]"
              >
                <Icon :name="selectedTech.icon" class="w-8 h-8" />
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ selectedTech.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  {{ selectedTech.description }}
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    v-for="app in selectedTech.applications"
                    :key="app"
                    class="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <Icon name="i-lucide-check-circle" :class="`text-${selectedTech.color}-500 w-5 h-5`" />
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ app }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Features Section -->
    <div class="container mx-auto max-w-7xl px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Terintegrasi SIJA
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Ekosistem digital lengkap untuk pembelajaran, penelitian, dan pengembangan Smart City
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div
          v-for="feature in mainFeatures"
          :key="feature.id"
          @click="setActiveFeature(feature.id)"
          :class="[
            'group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105',
            activeFeature === feature.id
              ? `border-${feature.color}-500 bg-${feature.color}-50 dark:bg-${feature.color}-900/20 shadow-xl scale-105`
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg'
          ]"
        >
          <div class="text-center">
            <!-- Icon -->
            <div
              :class="[
                'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-300',
                activeFeature === feature.id
                  ? `bg-${feature.color}-500 text-white`
                  : `bg-${feature.color}-100 dark:bg-${feature.color}-900 text-${feature.color}-600 dark:text-${feature.color}-400 group-hover:bg-${feature.color}-200 dark:group-hover:bg-${feature.color}-800`
              ]"
            >
              <Icon :name="feature.icon" class="w-8 h-8" />
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-2 text-xs">
              <div class="text-center">
                <div :class="`text-lg font-bold text-${feature.color}-600 dark:text-${feature.color}-400`">
                  {{ Object.values(feature.stats)[0] }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {{ Object.keys(feature.stats)[0] }}
                </div>
              </div>
              <div class="text-center">
                <div :class="`text-lg font-bold text-${feature.color}-600 dark:text-${feature.color}-400`">
                  {{ Object.values(feature.stats)[1] }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {{ Object.keys(feature.stats)[1] }}
                </div>
              </div>
              <div class="text-center">
                <div :class="`text-lg font-bold text-${feature.color}-600 dark:text-${feature.color}-400`">
                  {{ Object.values(feature.stats)[2] }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {{ Object.keys(feature.stats)[2] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Feature Detail -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div v-if="activeFeature === 'smart-city'" class="text-center">
          <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="i-lucide-building" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Smart City Solutions</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Mengembangkan solusi kota pintar dengan teknologi IoT, AI, dan big data untuk meningkatkan kualitas hidup masyarakat urban.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Icon name="i-lucide-traffic-cone" class="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Smart Traffic</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Sistem manajemen lalu lintas cerdas</p>
            </div>
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Icon name="i-lucide-lightbulb" class="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Smart Lighting</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Pencahayaan kota yang adaptif</p>
            </div>
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Icon name="i-lucide-leaf" class="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Environment</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Monitoring lingkungan real-time</p>
            </div>
          </div>
          <div class="mt-8">
            <UButton to="/smart-city" size="lg" icon="i-lucide-arrow-right" trailing>
              Explore Smart City Projects
            </UButton>
          </div>
        </div>

        <div v-else-if="activeFeature === 'student-projects'" class="text-center">
          <div class="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="i-lucide-code" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Student Projects</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Platform showcase project siswa SMK dengan teknologi terdepan. Dari web development hingga AI dan IoT.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Icon name="i-lucide-globe" class="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Web Development</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Aplikasi web modern dan responsive</p>
            </div>
            <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Icon name="i-lucide-smartphone" class="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Mobile Apps</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Aplikasi mobile native dan hybrid</p>
            </div>
            <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Icon name="i-lucide-cpu" class="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">IoT & AI</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Project IoT dan machine learning</p>
            </div>
          </div>
          <div class="mt-8">
            <UButton to="/projects" size="lg" icon="i-lucide-arrow-right" trailing>
              Browse Student Projects
            </UButton>
          </div>
        </div>

        <div v-else-if="activeFeature === 'lms'" class="text-center">
          <div class="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="i-lucide-graduation-cap" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Learning Management System</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Platform pembelajaran digital terintegrasi dengan fitur lengkap untuk mendukung proses belajar mengajar modern.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Icon name="i-lucide-video" class="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Online Classes</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Kelas virtual dan video conference</p>
            </div>
            <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Icon name="i-lucide-file-text" class="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Assignments</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Sistem tugas dan penilaian otomatis</p>
            </div>
            <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Icon name="i-lucide-bar-chart" class="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Analytics</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Tracking progress dan performance</p>
            </div>
          </div>
          <div class="mt-8">
            <UButton to="/lms" size="lg" icon="i-lucide-arrow-right" trailing>
              Access Learning Platform
            </UButton>
          </div>
        </div>

        <div v-else-if="activeFeature === 'blog'" class="text-center">
          <div class="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="i-lucide-book-open" class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Knowledge Hub</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Pusat pengetahuan dengan artikel, tutorial, dan berita teknologi terkini untuk mendukung pembelajaran dan penelitian.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Icon name="i-lucide-book" class="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Tutorials</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Tutorial step-by-step teknologi</p>
            </div>
            <div class="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Icon name="i-lucide-newspaper" class="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Tech News</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Berita teknologi terkini</p>
            </div>
            <div class="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Icon name="i-lucide-users" class="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Community</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Diskusi dan sharing knowledge</p>
            </div>
          </div>
          <div class="mt-8">
            <UButton to="/blog" size="lg" icon="i-lucide-arrow-right" trailing>
              Explore Knowledge Hub
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievement Stats -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Pencapaian SIJA</h2>
          <p class="text-blue-100 max-w-2xl mx-auto">
            Membanggakan prestasi dan kontribusi dalam pengembangan teknologi Smart City
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">300+</div>
            <div class="text-blue-100">Siswa Aktif</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">50+</div>
            <div class="text-blue-100">Project Completed</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">15+</div>
            <div class="text-blue-100">Smart City Solutions</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">25+</div>
            <div class="text-blue-100">Industry Partners</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Knowledge & Insights -->
    <div class="container mx-auto max-w-7xl px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Knowledge & Insights
        </h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Artikel terbaru, tutorial, dan insights dari dunia teknologi Smart City
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          v-for="post in recentPosts"
          :key="post._id"
          class="group cursor-pointer"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="block">
            <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <!-- Featured Image Placeholder -->
              <div :class="`h-48 bg-gradient-to-br from-${post.category?.color || 'blue'}-400 to-${post.category?.color || 'blue'}-600 flex items-center justify-center`">
                <Icon :name="post.category?.color === 'purple' ? 'i-lucide-network' : post.category?.color === 'orange' ? 'i-lucide-smartphone' : 'i-lucide-shield'" class="w-16 h-16 text-white opacity-50" />
              </div>

              <div class="p-6">
                <div class="mb-3">
                  <UBadge
                    :label="post.category?.name"
                    :color="post.category?.color || 'primary'"
                    variant="subtle"
                  />
                </div>

                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>

                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {{ post.excerpt }}
                </p>

                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-medium">{{ post.author?.name }}</span>
                  <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="text-center">
        <UButton to="/blog" size="lg" variant="outline" icon="i-lucide-arrow-right" trailing>
          Explore All Articles
        </UButton>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gray-50 dark:bg-gray-900 py-16">
      <div class="container mx-auto max-w-7xl px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Build the Future?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan siswa SMK SIJA dalam membangun Smart City masa depan.
          Mulai journey Anda di dunia teknologi bersama SMK SIJA.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <UButton
            to="/about"
            size="lg"
            icon="i-lucide-info"
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Learn More About SIJA
          </UButton>
          <UButton
            to="/blog"
            variant="outline"
            size="lg"
            icon="i-lucide-book-open"
          >
            Start Learning
          </UButton>
        </div>

        <!-- Quick Links -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <NuxtLink
            to="/blog/category/tutorial"
            class="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <Icon name="i-lucide-book" class="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2 mx-auto" />
            <div class="font-semibold text-gray-900 dark:text-white text-sm">Tutorials</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Step-by-step guides</div>
          </NuxtLink>

          <NuxtLink
            to="/blog/category/jaringan-komputer"
            class="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <Icon name="i-lucide-network" class="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2 mx-auto" />
            <div class="font-semibold text-gray-900 dark:text-white text-sm">Networking</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Network infrastructure</div>
          </NuxtLink>

          <NuxtLink
            to="/blog/category/pengembangan-aplikasi"
            class="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <Icon name="i-lucide-smartphone" class="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2 mx-auto" />
            <div class="font-semibold text-gray-900 dark:text-white text-sm">App Development</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Mobile & web apps</div>
          </NuxtLink>

          <NuxtLink
            to="/blog/category/keamanan-siber"
            class="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <Icon name="i-lucide-shield" class="w-8 h-8 text-red-600 dark:text-red-400 mb-2 mx-auto" />
            <div class="font-semibold text-gray-900 dark:text-white text-sm">Cybersecurity</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Security & protection</div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">SMK SIJA</h3>
            <p class="text-gray-300 text-sm mb-4">
              SMK Jurusan Sistem Informasi Jaringan dan Aplikasi - Membangun Smart City masa depan dengan teknologi terdepan.
            </p>
            <div class="flex space-x-4">
              <Icon name="i-lucide-facebook" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Icon name="i-lucide-twitter" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Icon name="i-lucide-instagram" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Icon name="i-lucide-youtube" class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Platform</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><NuxtLink to="/smart-city" class="hover:text-white">Smart City</NuxtLink></li>
              <li><NuxtLink to="/projects" class="hover:text-white">Student Projects</NuxtLink></li>
              <li><NuxtLink to="/lms" class="hover:text-white">LMS</NuxtLink></li>
              <li><NuxtLink to="/blog" class="hover:text-white">Knowledge Hub</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Resources</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><NuxtLink to="/about" class="hover:text-white">About SIJA</NuxtLink></li>
              <li><NuxtLink to="/categories" class="hover:text-white">Categories</NuxtLink></li>
              <li><NuxtLink to="/blog/category/tutorial" class="hover:text-white">Tutorials</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">Contact</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-center">
                <Icon name="i-lucide-mail" class="w-4 h-4 mr-2" />
                info@sija.ac.id
              </li>
              <li class="flex items-center">
                <Icon name="i-lucide-phone" class="w-4 h-4 mr-2" />
                (021) 1234-5678
              </li>
              <li class="flex items-center">
                <Icon name="i-lucide-map-pin" class="w-4 h-4 mr-2" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <div class="flex items-center justify-center space-x-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-sm text-gray-400">All systems operational</span>
          </div>
          <p class="text-sm text-gray-400">
            © 2025 SMK Jurusan Sistem Informasi Jaringan dan Aplikasi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Smooth transitions for interactive elements */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover {
  animation: float 2s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Pulse animation for badge */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
