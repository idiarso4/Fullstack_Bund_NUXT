<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-6xl font-bold mb-8">
        SMK <span class="text-blue-400">SIJA</span>
      </h1>
      <p class="text-2xl mb-8">Smart City Solutions</p>
      <p class="text-lg mb-12">
        SMK Jurusan Sistem Informasi Jaringan dan Aplikasi
      </p>

      <div class="space-y-4">
        <div>
          <a href="/blog" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block mr-4">
            Knowledge Hub
          </a>
          <a href="/projects" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block mr-4">
            Student Projects
          </a>
        </div>
        <div>
          <a href="/lms" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block mr-4">
            LMS Platform
          </a>
          <a href="/admin/login" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-block">
            Admin Panel
          </a>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'SMK SIJA - Smart City Solutions',
  meta: [
    { name: 'description', content: 'SMK Jurusan Sistem Informasi Jaringan dan Aplikasi - Membangun Smart City dengan teknologi IoT, AI, dan infrastruktur digital modern' }
  ]
})
</script>
