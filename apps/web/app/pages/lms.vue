<script setup lang="ts">
// Meta tags
useHead({
  title: 'Learning Management System - SMK SIJA',
  meta: [
    { name: 'description', content: 'Platform pembelajaran digital terintegrasi untuk siswa SMK Jurusan Sistem Informasi Jaringan dan Aplikasi' }
  ]
})

// Sample courses data
const courses = [
  {
    id: 1,
    title: 'Dasar-Dasar Jaringan Komputer',
    description: 'Memahami konsep fundamental jaringan komputer, topologi, dan protokol',
    instructor: 'Pak Ahmad Wijaya',
    level: 'Beginner',
    duration: '8 weeks',
    students: 45,
    progress: 75,
    category: 'Networking',
    color: 'blue',
    modules: 12,
    assignments: 8
  },
  {
    id: 2,
    title: 'Pemrograman Web dengan HTML, CSS, JavaScript',
    description: 'Belajar membuat website responsif dari dasar hingga mahir',
    instructor: 'Bu Sari Indrawati',
    level: 'Beginner',
    duration: '10 weeks',
    students: 52,
    progress: 60,
    category: 'Web Development',
    color: 'green',
    modules: 15,
    assignments: 10
  },
  {
    id: 3,
    title: 'Administrasi Server Linux',
    description: 'Mengelola server Linux untuk infrastruktur jaringan enterprise',
    instructor: 'Pak Budi Santoso',
    level: 'Intermediate',
    duration: '12 weeks',
    students: 38,
    progress: 40,
    category: 'System Administration',
    color: 'purple',
    modules: 18,
    assignments: 12
  },
  {
    id: 4,
    title: 'Keamanan Jaringan dan Ethical Hacking',
    description: 'Memahami konsep cybersecurity dan teknik ethical hacking',
    instructor: 'Pak Andi Pratama',
    level: 'Advanced',
    duration: '14 weeks',
    students: 28,
    progress: 25,
    category: 'Cybersecurity',
    color: 'red',
    modules: 20,
    assignments: 15
  },
  {
    id: 5,
    title: 'Mobile App Development dengan Flutter',
    description: 'Membuat aplikasi mobile cross-platform menggunakan Flutter',
    instructor: 'Bu Dewi Sartika',
    level: 'Intermediate',
    duration: '16 weeks',
    students: 35,
    progress: 80,
    category: 'Mobile Development',
    color: 'indigo',
    modules: 22,
    assignments: 18
  },
  {
    id: 6,
    title: 'Internet of Things (IoT) Fundamentals',
    description: 'Membangun sistem IoT dengan Arduino dan sensor',
    instructor: 'Pak Rizki Ramadhan',
    level: 'Intermediate',
    duration: '12 weeks',
    students: 42,
    progress: 90,
    category: 'IoT',
    color: 'orange',
    modules: 16,
    assignments: 14
  }
]

const features = [
  {
    icon: 'i-lucide-video',
    title: 'Video Pembelajaran',
    description: 'Akses video pembelajaran berkualitas tinggi kapan saja'
  },
  {
    icon: 'i-lucide-file-text',
    title: 'Materi Digital',
    description: 'E-book, slide, dan materi pembelajaran digital lengkap'
  },
  {
    icon: 'i-lucide-users',
    title: 'Diskusi Online',
    description: 'Forum diskusi dengan guru dan sesama siswa'
  },
  {
    icon: 'i-lucide-clipboard-check',
    title: 'Quiz & Assignment',
    description: 'Sistem penilaian otomatis dan feedback real-time'
  },
  {
    icon: 'i-lucide-bar-chart',
    title: 'Progress Tracking',
    description: 'Monitor kemajuan belajar dengan analytics detail'
  },
  {
    icon: 'i-lucide-certificate',
    title: 'Sertifikat Digital',
    description: 'Dapatkan sertifikat setelah menyelesaikan course'
  }
]

const selectedCategory = ref('All')
const categories = ['All', 'Networking', 'Web Development', 'System Administration', 'Cybersecurity', 'Mobile Development', 'IoT']

const filteredCourses = computed(() => {
  if (selectedCategory.value === 'All') {
    return courses
  }
  return courses.filter(course => course.category === selectedCategory.value)
})

function getLevelColor(level: string) {
  const colors = {
    'Beginner': 'green',
    'Intermediate': 'yellow',
    'Advanced': 'red'
  }
  return colors[level] || 'gray'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
    <!-- Hero Section -->
    <div class="container mx-auto max-w-7xl px-4 py-16">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium mb-8">
          <Icon name="i-lucide-graduation-cap" class="w-4 h-4 mr-2" />
          Learning Management System
        </div>
        
        <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-6">
          SIJA LMS
        </h1>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
          Platform Pembelajaran Digital SMK SIJA
        </h2>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
          Sistem manajemen pembelajaran terintegrasi untuk siswa SMK Jurusan Sistem Informasi Jaringan dan Aplikasi. 
          Belajar dengan metode modern, interaktif, dan fleksibel.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="lg" icon="i-lucide-play-circle" class="bg-gradient-to-r from-purple-600 to-blue-600">
            Mulai Belajar
          </UButton>
          <UButton variant="outline" size="lg" icon="i-lucide-book-open">
            Lihat Katalog Course
          </UButton>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Fitur Platform LMS
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6">
              <Icon :name="feature.icon" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Course Catalog -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Katalog Course
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pilihan course lengkap sesuai kurikulum SMK SIJA dengan materi yang selalu update
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

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="course in filteredCourses"
            :key="course.id"
            class="hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <!-- Course Header -->
            <div :class="`h-32 bg-gradient-to-br from-${course.color}-400 to-${course.color}-600 rounded-lg mb-6 flex items-center justify-center relative`">
              <Icon name="i-lucide-book-open" class="w-12 h-12 text-white opacity-50" />
              <div class="absolute top-4 right-4">
                <UBadge
                  :label="course.level"
                  :color="getLevelColor(course.level)"
                  variant="solid"
                  size="xs"
                />
              </div>
            </div>

            <!-- Course Info -->
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {{ course.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {{ course.description }}
                </p>
              </div>

              <!-- Instructor -->
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="i-lucide-user" class="w-4 h-4" />
                <span>{{ course.instructor }}</span>
              </div>

              <!-- Course Stats -->
              <div class="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ course.modules }}</div>
                  <div class="text-gray-500 dark:text-gray-400">Modules</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ course.students }}</div>
                  <div class="text-gray-500 dark:text-gray-400">Students</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ course.duration }}</div>
                  <div class="text-gray-500 dark:text-gray-400">Duration</div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-600 dark:text-gray-300">Progress</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`bg-${course.color}-500 h-2 rounded-full transition-all duration-300`"
                    :style="`width: ${course.progress}%`"
                  ></div>
                </div>
              </div>

              <!-- Action Button -->
              <UButton 
                :variant="course.progress > 0 ? 'solid' : 'outline'"
                size="sm" 
                block
                :icon="course.progress > 0 ? 'i-lucide-play' : 'i-lucide-book-open'"
              >
                {{ course.progress > 0 ? 'Continue Learning' : 'Start Course' }}
              </UButton>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Statistics -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-4">Platform Statistics</h2>
          <p class="text-purple-100">Pencapaian pembelajaran digital di SMK SIJA</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">{{ courses.length }}+</div>
            <div class="text-purple-100">Active Courses</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">300+</div>
            <div class="text-purple-100">Students Enrolled</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">15+</div>
            <div class="text-purple-100">Expert Instructors</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">95%</div>
            <div class="text-purple-100">Completion Rate</div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Siap Memulai Pembelajaran Digital?
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan siswa SMK SIJA yang sudah merasakan pengalaman belajar digital yang modern dan interaktif.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="lg" icon="i-lucide-user-plus">
            Daftar Sekarang
          </UButton>
          <UButton to="/about" variant="outline" size="lg" icon="i-lucide-info">
            Pelajari Lebih Lanjut
          </UButton>
        </div>
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
