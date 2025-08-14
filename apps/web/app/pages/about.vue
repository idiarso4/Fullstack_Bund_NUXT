<script setup lang="ts">
// Meta tags
useHead({
  title: 'Tentang Kami - SMK Jurusan Sistem Informasi Jaringan dan Aplikasi',
  meta: [
    { name: 'description', content: 'Mengenal lebih dekat SMK Jurusan Sistem Informasi Jaringan dan Aplikasi - visi, misi, program keahlian, dan fasilitas yang tersedia' }
  ]
})

// Data
const features = [
  {
    icon: 'i-lucide-network',
    title: 'Jaringan Komputer',
    description: 'Mempelajari desain, implementasi, dan manajemen infrastruktur jaringan komputer modern'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Pengembangan Aplikasi',
    description: 'Mengembangkan aplikasi web, mobile, dan desktop dengan teknologi terkini'
  },
  {
    icon: 'i-lucide-database',
    title: 'Manajemen Database',
    description: 'Merancang dan mengelola sistem basis data untuk berbagai kebutuhan organisasi'
  },
  {
    icon: 'i-lucide-shield',
    title: 'Keamanan Sistem',
    description: 'Implementasi keamanan siber dan perlindungan data dalam sistem informasi'
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Cloud Computing',
    description: 'Teknologi komputasi awan dan virtualisasi untuk infrastruktur IT modern'
  },
  {
    icon: 'i-lucide-code',
    title: 'Pemrograman',
    description: 'Menguasai berbagai bahasa pemrograman dan framework pengembangan aplikasi'
  }
]

const facilities = [
  {
    name: 'Laboratorium Jaringan',
    description: 'Lab dengan peralatan jaringan lengkap untuk praktik konfigurasi dan troubleshooting'
  },
  {
    name: 'Lab Pengembangan Software',
    description: 'Ruang dengan komputer spesifikasi tinggi untuk pengembangan aplikasi'
  },
  {
    name: 'Lab Keamanan Siber',
    description: 'Fasilitas khusus untuk mempelajari ethical hacking dan cybersecurity'
  },
  {
    name: 'Server Room',
    description: 'Ruang server untuk praktik administrasi sistem dan cloud computing'
  }
]

const achievements = [
  {
    year: '2024',
    title: 'Juara 1 LKS SMK Bidang IT Network Systems Administration',
    description: 'Tim siswa SMK SIJA meraih juara pertama dalam Lomba Kompetensi Siswa tingkat nasional'
  },
  {
    year: '2024',
    title: 'Sertifikasi Cisco Academy',
    description: 'SMK SIJA mendapat pengakuan sebagai Cisco Networking Academy untuk siswa SMK'
  },
  {
    year: '2023',
    title: 'Akreditasi A',
    description: 'Jurusan SIJA meraih akreditasi A dari Badan Akreditasi Nasional'
  },
  {
    year: '2023',
    title: 'Kerjasama Industri',
    description: 'MoU dengan 20+ perusahaan teknologi untuk program prakerin dan rekrutmen siswa SMK'
  }
]
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        SMK Jurusan Sistem Informasi Jaringan dan Aplikasi
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Mempersiapkan siswa SMK yang kompeten di bidang teknologi informasi dalam merancang,
        mengembangkan, dan mengelola sistem informasi berbasis jaringan dan aplikasi modern.
      </p>
    </div>

    <!-- Vision & Mission -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <UCard>
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-eye" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Visi</h2>
          </div>
        </template>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          Menjadi jurusan unggulan dalam bidang sistem informasi jaringan dan aplikasi
          yang menghasilkan lulusan SMK berkualitas, inovatif, dan berdaya saing global pada tahun 2030.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-target" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Misi</h2>
          </div>
        </template>
        <ul class="text-gray-700 dark:text-gray-300 space-y-2">
          <li class="flex items-start space-x-2">
            <Icon name="i-lucide-check" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Menyelenggarakan pendidikan SMK berkualitas di bidang sistem informasi jaringan dan aplikasi</span>
          </li>
          <li class="flex items-start space-x-2">
            <Icon name="i-lucide-check" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Mengembangkan project dan inovasi teknologi informasi untuk siswa SMK</span>
          </li>
          <li class="flex items-start space-x-2">
            <Icon name="i-lucide-check" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Melaksanakan pengabdian kepada masyarakat melalui teknologi Smart City</span>
          </li>
          <li class="flex items-start space-x-2">
            <Icon name="i-lucide-check" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Membangun kerjasama dengan industri dan dunia usaha untuk siswa SMK</span>
          </li>
        </ul>
      </UCard>
    </div>

    <!-- Program Features -->
    <div class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bidang Keahlian
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Jurusan SMK kami mencakup berbagai bidang keahlian teknologi informasi yang relevan dengan kebutuhan industri dan dunia kerja
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="feature in features"
          :key="feature.title"
          class="hover:shadow-lg transition-shadow duration-300"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon :name="feature.icon" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Facilities -->
    <div class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Fasilitas
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Fasilitas modern dan lengkap untuk mendukung proses pembelajaran dan praktik
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard
          v-for="facility in facilities"
          :key="facility.name"
          class="hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="i-lucide-building" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ facility.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ facility.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Achievements -->
    <div class="mb-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Prestasi & Pencapaian
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Berbagai prestasi yang telah diraih oleh jurusan dan siswa SMK SIJA
        </p>
      </div>

      <div class="space-y-6">
        <UCard
          v-for="achievement in achievements"
          :key="achievement.title"
          class="hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-start space-x-6">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span class="text-purple-600 dark:text-purple-400 font-bold">{{ achievement.year }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ achievement.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ achievement.description }}
              </p>
            </div>
            <div class="flex-shrink-0">
              <Icon name="i-lucide-award" class="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Hubungi Kami
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Tertarik bergabung atau ingin mengetahui lebih lanjut? Hubungi kami!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="i-lucide-mail" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
          <p class="text-gray-600 dark:text-gray-300">info@sija.ac.id</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="i-lucide-phone" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Telepon</h3>
          <p class="text-gray-600 dark:text-gray-300">(021) 1234-5678</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="i-lucide-map-pin" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Alamat</h3>
          <p class="text-gray-600 dark:text-gray-300">Jakarta, Indonesia</p>
        </div>
      </div>

      <div class="text-center mt-8">
        <UButton
          to="/blog"
          size="lg"
          icon="i-lucide-arrow-right"
          trailing
        >
          Kunjungi Blog Kami
        </UButton>
      </div>
    </div>
  </div>
</template>
