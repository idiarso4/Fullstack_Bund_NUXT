<script setup lang="ts">
// Meta tags
useHead({
  title: 'Smart City Solutions - SMK SIJA',
  meta: [
    { name: 'description', content: 'Solusi Smart City yang dikembangkan oleh siswa SMK Jurusan Sistem Informasi Jaringan dan Aplikasi' }
  ]
})

// Smart City Solutions
const solutions = [
  {
    id: 1,
    title: 'Smart Traffic Management',
    description: 'Sistem manajemen lalu lintas cerdas menggunakan AI dan IoT sensors untuk mengoptimalkan flow traffic',
    category: 'Transportation',
    technologies: ['IoT Sensors', 'AI/ML', 'Real-time Analytics', 'Mobile App'],
    impact: 'Mengurangi kemacetan hingga 30%',
    status: 'Implemented',
    color: 'blue',
    icon: 'i-lucide-traffic-cone'
  },
  {
    id: 2,
    title: 'Smart Lighting System',
    description: 'Sistem pencahayaan jalan otomatis yang adaptif berdasarkan kondisi cuaca dan aktivitas',
    category: 'Infrastructure',
    technologies: ['LED Smart Lights', 'Motion Sensors', 'Weather API', 'Energy Management'],
    impact: 'Hemat energi hingga 40%',
    status: 'Pilot Project',
    color: 'yellow',
    icon: 'i-lucide-lightbulb'
  },
  {
    id: 3,
    title: 'Environmental Monitoring',
    description: 'Monitoring kualitas udara, suhu, dan kelembaban real-time di seluruh area kota',
    category: 'Environment',
    technologies: ['Air Quality Sensors', 'LoRaWAN', 'Data Visualization', 'Alert System'],
    impact: 'Monitoring 24/7 kualitas lingkungan',
    status: 'Implemented',
    color: 'green',
    icon: 'i-lucide-leaf'
  },
  {
    id: 4,
    title: 'Smart Waste Management',
    description: 'Sistem pengelolaan sampah pintar dengan sensor level dan optimasi rute pengangkutan',
    category: 'Waste Management',
    technologies: ['Ultrasonic Sensors', 'GPS Tracking', 'Route Optimization', 'Mobile Dashboard'],
    impact: 'Efisiensi pengangkutan sampah 50%',
    status: 'Development',
    color: 'orange',
    icon: 'i-lucide-trash-2'
  },
  {
    id: 5,
    title: 'Smart Parking System',
    description: 'Sistem parkir pintar dengan deteksi slot kosong dan pembayaran digital',
    category: 'Transportation',
    technologies: ['Computer Vision', 'Mobile Payment', 'Real-time Updates', 'Navigation API'],
    impact: 'Mengurangi waktu cari parkir 60%',
    status: 'Pilot Project',
    color: 'purple',
    icon: 'i-lucide-car'
  },
  {
    id: 6,
    title: 'Emergency Response System',
    description: 'Sistem tanggap darurat terintegrasi dengan notifikasi real-time dan koordinasi tim',
    category: 'Public Safety',
    technologies: ['Emergency Buttons', 'GPS Location', 'Push Notifications', 'Communication Hub'],
    impact: 'Response time lebih cepat 70%',
    status: 'Implemented',
    color: 'red',
    icon: 'i-lucide-siren'
  }
]

const categories = ['All', 'Transportation', 'Infrastructure', 'Environment', 'Waste Management', 'Public Safety']
const selectedCategory = ref('All')

const filteredSolutions = computed(() => {
  if (selectedCategory.value === 'All') {
    return solutions
  }
  return solutions.filter(solution => solution.category === selectedCategory.value)
})

function getStatusColor(status: string) {
  const colors = {
    'Implemented': 'green',
    'Pilot Project': 'yellow',
    'Development': 'blue'
  }
  return colors[status] || 'gray'
}

const cityStats = [
  { label: 'Smart Solutions', value: '15+', icon: 'i-lucide-cpu' },
  { label: 'IoT Devices', value: '500+', icon: 'i-lucide-wifi' },
  { label: 'Data Points', value: '10K+', icon: 'i-lucide-database' },
  { label: 'Citizens Served', value: '50K+', icon: 'i-lucide-users' }
]

const benefits = [
  {
    title: 'Efisiensi Energi',
    description: 'Penghematan energi hingga 40% melalui sistem smart lighting dan building automation',
    icon: 'i-lucide-zap',
    color: 'yellow'
  },
  {
    title: 'Kualitas Hidup',
    description: 'Peningkatan kualitas hidup warga melalui layanan publik yang lebih baik',
    icon: 'i-lucide-heart',
    color: 'red'
  },
  {
    title: 'Keamanan Publik',
    description: 'Sistem keamanan terintegrasi dengan response time yang lebih cepat',
    icon: 'i-lucide-shield',
    color: 'blue'
  },
  {
    title: 'Lingkungan Bersih',
    description: 'Monitoring dan pengelolaan lingkungan untuk kota yang lebih hijau',
    icon: 'i-lucide-leaf',
    color: 'green'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
    <!-- Hero Section -->
    <div class="container mx-auto max-w-7xl px-4 py-16">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
          <Icon name="i-lucide-building" class="w-4 h-4 mr-2" />
          Smart City Solutions by SMK SIJA
        </div>
        
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 bg-clip-text text-transparent mb-6">
          Smart City
        </h1>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
          Membangun Kota Pintar Masa Depan
        </h2>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
          Siswa SMK SIJA mengembangkan solusi Smart City inovatif menggunakan teknologi IoT, AI, dan big data 
          untuk menciptakan kota yang lebih efisien, berkelanjutan, dan nyaman untuk semua.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="lg" icon="i-lucide-play-circle" class="bg-gradient-to-r from-blue-600 to-green-600">
            Lihat Demo
          </UButton>
          <UButton variant="outline" size="lg" icon="i-lucide-download">
            Download Proposal
          </UButton>
        </div>
      </div>

      <!-- City Statistics -->
      <div class="mb-20">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in cityStats"
            :key="stat.label"
            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon :name="stat.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 dark:text-gray-300">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Solutions Catalog -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Smart City Solutions
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Solusi teknologi yang dikembangkan siswa SMK SIJA untuk berbagai aspek kehidupan kota
          </p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <UButton
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
            size="sm"
          >
            {{ category }}
          </UButton>
        </div>

        <!-- Solutions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="solution in filteredSolutions"
            :key="solution.id"
            class="hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <!-- Solution Header -->
            <div :class="`h-32 bg-gradient-to-br from-${solution.color}-400 to-${solution.color}-600 rounded-lg mb-6 flex items-center justify-center relative`">
              <Icon :name="solution.icon" class="w-12 h-12 text-white" />
              <div class="absolute top-4 right-4">
                <UBadge
                  :label="solution.status"
                  :color="getStatusColor(solution.status)"
                  variant="solid"
                  size="xs"
                />
              </div>
            </div>

            <!-- Solution Info -->
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ solution.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {{ solution.description }}
                </p>
              </div>

              <!-- Category -->
              <div>
                <UBadge
                  :label="solution.category"
                  :color="solution.color"
                  variant="subtle"
                />
              </div>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tech in solution.technologies.slice(0, 3)"
                  :key="tech"
                  :label="tech"
                  variant="outline"
                  size="xs"
                />
                <UBadge
                  v-if="solution.technologies.length > 3"
                  :label="`+${solution.technologies.length - 3}`"
                  variant="outline"
                  size="xs"
                />
              </div>

              <!-- Impact -->
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">Impact:</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">{{ solution.impact }}</div>
              </div>

              <!-- Action Button -->
              <UButton 
                size="sm" 
                block
                icon="i-lucide-external-link"
                variant="outline"
              >
                Learn More
              </UButton>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Benefits Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Manfaat Smart City
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dampak positif implementasi Smart City untuk kehidupan masyarakat
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div :class="`w-16 h-16 bg-${benefit.color}-100 dark:bg-${benefit.color}-900 rounded-2xl flex items-center justify-center mx-auto mb-6`">
              <Icon :name="benefit.icon" :class="`w-8 h-8 text-${benefit.color}-600 dark:text-${benefit.color}-400`" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ benefit.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
        <h2 class="text-3xl font-bold mb-4">
          Bergabung dalam Membangun Smart City
        </h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
          Siswa SMK SIJA terus berinovasi mengembangkan solusi Smart City. 
          Mari bersama-sama membangun masa depan yang lebih cerdas dan berkelanjutan.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="lg" variant="outline" class="border-white text-white hover:bg-white hover:text-blue-600">
            Join Our Team
          </UButton>
          <UButton to="/projects" size="lg" variant="outline" class="border-white text-white hover:bg-white hover:text-blue-600">
            View All Projects
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
