<script setup lang="ts">
// Meta tags
useHead({
  title: 'Student Projects - SMK SIJA',
  meta: [
    { name: 'description', content: 'Showcase project siswa SMK Jurusan Sistem Informasi Jaringan dan Aplikasi dengan teknologi terdepan' }
  ]
})

// Sample student projects
const projects = [
  {
    id: 1,
    title: 'Smart Home IoT System',
    description: 'Sistem rumah pintar menggunakan Arduino dan sensor IoT untuk monitoring suhu, kelembaban, dan keamanan',
    category: 'IoT',
    technologies: ['Arduino', 'ESP32', 'Firebase', 'Flutter'],
    author: 'Ahmad Rizki - XII SIJA 1',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/smart-home',
    demo: 'https://smart-home-demo.vercel.app',
    status: 'completed'
  },
  {
    id: 2,
    title: 'E-Learning Platform',
    description: 'Platform pembelajaran online untuk SMK dengan fitur video conference, quiz, dan assignment',
    category: 'Web Development',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
    author: 'Siti Nurhaliza - XII SIJA 2',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/e-learning',
    demo: 'https://elearning-smk.netlify.app',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Network Monitoring Dashboard',
    description: 'Dashboard monitoring jaringan real-time untuk lab komputer SMK dengan alert system',
    category: 'Network Administration',
    technologies: ['Python', 'Flask', 'SNMP', 'Chart.js'],
    author: 'Budi Santoso - XII SIJA 1',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/network-monitor',
    demo: 'https://netmon-dashboard.herokuapp.com',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Mobile Attendance App',
    description: 'Aplikasi absensi siswa menggunakan QR Code dan GPS location untuk SMK',
    category: 'Mobile Development',
    technologies: ['React Native', 'Firebase', 'QR Code', 'Maps API'],
    author: 'Dewi Sartika - XI SIJA 2',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/attendance-app',
    demo: 'https://expo.dev/@student/attendance',
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Cybersecurity Awareness Game',
    description: 'Game edukasi keamanan siber untuk meningkatkan awareness siswa tentang cyber threats',
    category: 'Game Development',
    technologies: ['Unity', 'C#', 'Firebase', 'Analytics'],
    author: 'Andi Pratama - XI SIJA 1',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/cyber-game',
    demo: 'https://cyber-awareness-game.itch.io',
    status: 'in-progress'
  },
  {
    id: 6,
    title: 'Smart City Traffic Simulation',
    description: 'Simulasi traffic management untuk smart city menggunakan AI dan machine learning',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit'],
    author: 'Rina Maharani - XII SIJA 2',
    image: '/api/placeholder/400/250',
    github: 'https://github.com/student/traffic-sim',
    demo: 'https://traffic-simulation.streamlit.app',
    status: 'completed'
  }
]

const categories = ['All', 'IoT', 'Web Development', 'Mobile Development', 'Network Administration', 'Game Development', 'AI/ML']
const selectedCategory = ref('All')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === selectedCategory.value)
})

function getCategoryColor(category: string) {
  const colors = {
    'IoT': 'blue',
    'Web Development': 'green',
    'Mobile Development': 'purple',
    'Network Administration': 'orange',
    'Game Development': 'red',
    'AI/ML': 'indigo'
  }
  return colors[category] || 'gray'
}

function getStatusColor(status: string) {
  return status === 'completed' ? 'green' : 'yellow'
}

function getStatusLabel(status: string) {
  return status === 'completed' ? 'Completed' : 'In Progress'
}
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Student Projects
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Showcase project siswa SMK SIJA dengan teknologi terdepan. Dari IoT hingga AI, siswa kami menciptakan solusi inovatif untuk masa depan.
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

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard
        v-for="project in filteredProjects"
        :key="project.id"
        class="hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <!-- Project Image Placeholder -->
        <div :class="`h-48 bg-gradient-to-br from-${getCategoryColor(project.category)}-400 to-${getCategoryColor(project.category)}-600 rounded-lg mb-4 flex items-center justify-center`">
          <Icon name="i-lucide-code" class="w-16 h-16 text-white opacity-50" />
        </div>

        <!-- Project Info -->
        <div class="space-y-4">
          <!-- Title and Status -->
          <div class="flex items-start justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {{ project.title }}
            </h3>
            <UBadge
              :label="getStatusLabel(project.status)"
              :color="getStatusColor(project.status)"
              variant="subtle"
              size="xs"
            />
          </div>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {{ project.description }}
          </p>

          <!-- Category -->
          <div>
            <UBadge
              :label="project.category"
              :color="getCategoryColor(project.category)"
              variant="subtle"
            />
          </div>

          <!-- Technologies -->
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="tech in project.technologies.slice(0, 3)"
              :key="tech"
              :label="tech"
              variant="outline"
              size="xs"
            />
            <UBadge
              v-if="project.technologies.length > 3"
              :label="`+${project.technologies.length - 3}`"
              variant="outline"
              size="xs"
            />
          </div>

          <!-- Author -->
          <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Icon name="i-lucide-user" class="w-4 h-4" />
            <span>{{ project.author }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-2 pt-2">
            <UButton
              :to="project.github"
              external
              variant="outline"
              size="sm"
              icon="i-lucide-github"
              class="flex-1"
            >
              Code
            </UButton>
            <UButton
              :to="project.demo"
              external
              size="sm"
              icon="i-lucide-external-link"
              class="flex-1"
            >
              Demo
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Stats Section -->
    <div class="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Project Statistics</h2>
        <p class="text-blue-100">Pencapaian siswa SMK SIJA dalam mengembangkan project teknologi</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">{{ projects.length }}+</div>
          <div class="text-blue-100">Total Projects</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">{{ projects.filter(p => p.status === 'completed').length }}</div>
          <div class="text-blue-100">Completed</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">{{ categories.length - 1 }}</div>
          <div class="text-blue-100">Categories</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold mb-2">50+</div>
          <div class="text-blue-100">Students Involved</div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-16 text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Punya Project Menarik?
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Siswa SMK SIJA yang memiliki project menarik dapat mengirimkan untuk ditampilkan di showcase ini.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton size="lg" icon="i-lucide-plus">
          Submit Project
        </UButton>
        <UButton to="/about" variant="outline" size="lg" icon="i-lucide-info">
          Learn More About SIJA
        </UButton>
      </div>
    </div>
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
</style>
