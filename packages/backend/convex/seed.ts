import { mutation } from "./_generated/server";

export const initializeBlogData = mutation({
  handler: async (ctx) => {
    // Initialize settings first
    await ctx.db.insert("settings", {
      key: "blog_title",
      value: "Blog Sistem Informasi Jaringan dan Aplikasi",
      description: "Judul utama blog",
      updatedAt: Date.now(),
    });

    await ctx.db.insert("settings", {
      key: "blog_description", 
      value: "Blog resmi jurusan Sistem Informasi Jaringan dan Aplikasi - berbagi pengetahuan teknologi, tutorial, dan berita terkini",
      description: "Deskripsi blog",
      updatedAt: Date.now(),
    });

    // Create sample categories
    const categories = [
      {
        name: "Tutorial",
        slug: "tutorial",
        description: "Panduan dan tutorial teknologi step-by-step",
        color: "blue",
      },
      {
        name: "Berita Teknologi",
        slug: "berita-teknologi", 
        description: "Berita terkini seputar dunia teknologi informasi",
        color: "green",
      },
      {
        name: "Jaringan Komputer",
        slug: "jaringan-komputer",
        description: "Artikel tentang networking, infrastruktur, dan administrasi jaringan",
        color: "purple",
      },
      {
        name: "Pengembangan Aplikasi",
        slug: "pengembangan-aplikasi",
        description: "Tips dan trik pengembangan aplikasi web dan mobile",
        color: "orange",
      },
      {
        name: "Keamanan Siber",
        slug: "keamanan-siber",
        description: "Topik keamanan informasi dan cybersecurity",
        color: "red",
      },
    ];

    const categoryIds = [];
    for (const category of categories) {
      const categoryId = await ctx.db.insert("categories", {
        ...category,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      categoryIds.push(categoryId);
    }

    // Create sample authors
    const authors = [
      {
        name: "Dr. Ahmad Wijaya",
        email: "ahmad.wijaya@sija.ac.id",
        bio: "Dosen senior bidang Jaringan Komputer dengan pengalaman 15+ tahun",
        role: "admin" as const,
        isActive: true,
      },
      {
        name: "Sari Indrawati, M.Kom",
        email: "sari.indrawati@sija.ac.id", 
        bio: "Spesialis Pengembangan Aplikasi dan Database Management",
        role: "author" as const,
        isActive: true,
      },
      {
        name: "Budi Santoso, M.T",
        email: "budi.santoso@sija.ac.id",
        bio: "Expert Keamanan Siber dan Ethical Hacking",
        role: "author" as const,
        isActive: true,
      },
    ];

    const authorIds = [];
    for (const author of authors) {
      const authorId = await ctx.db.insert("authors", {
        ...author,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      authorIds.push(authorId);
    }

    // Create sample posts
    const posts = [
      {
        title: "Pengenalan Jaringan Komputer untuk Pemula",
        slug: "pengenalan-jaringan-komputer-pemula",
        content: `Jaringan komputer adalah kumpulan perangkat yang terhubung satu sama lain untuk berbagi data dan sumber daya. Dalam artikel ini, kita akan membahas dasar-dasar jaringan komputer yang perlu dipahami oleh pemula.

**Apa itu Jaringan Komputer?**

Jaringan komputer memungkinkan perangkat seperti komputer, smartphone, dan server untuk berkomunikasi dan berbagi informasi. Jaringan dapat berupa jaringan lokal (LAN) di dalam satu gedung, atau jaringan yang lebih luas seperti internet.

**Komponen Utama Jaringan:**

1. **Perangkat Keras (Hardware)**
   - Router: Menghubungkan jaringan yang berbeda
   - Switch: Menghubungkan perangkat dalam satu jaringan
   - Access Point: Menyediakan koneksi wireless
   - Kabel jaringan: Media transmisi data

2. **Perangkat Lunak (Software)**
   - Protokol jaringan (TCP/IP, HTTP, FTP)
   - Sistem operasi jaringan
   - Aplikasi jaringan

**Topologi Jaringan:**

- **Star**: Semua perangkat terhubung ke satu titik pusat
- **Bus**: Semua perangkat terhubung ke satu kabel utama
- **Ring**: Perangkat terhubung membentuk lingkaran
- **Mesh**: Setiap perangkat terhubung ke beberapa perangkat lain

Memahami konsep dasar ini akan membantu Anda dalam mempelajari jaringan komputer lebih lanjut.`,
        excerpt: "Pelajari dasar-dasar jaringan komputer mulai dari pengertian, komponen, hingga topologi jaringan yang umum digunakan.",
        authorId: authorIds[0],
        categoryId: categoryIds[2], // Jaringan Komputer
        status: "published" as const,
        tags: ["jaringan", "pemula", "tutorial", "networking"],
        viewCount: 245,
        publishedAt: Date.now() - 86400000 * 7, // 7 days ago
        createdAt: Date.now() - 86400000 * 7,
        updatedAt: Date.now() - 86400000 * 7,
      },
      {
        title: "Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt",
        slug: "cara-membuat-aplikasi-web-vuejs-nuxt",
        content: `Vue.js adalah framework JavaScript yang populer untuk membangun user interface, sedangkan Nuxt.js adalah framework yang dibangun di atas Vue.js untuk membuat aplikasi web yang lebih powerful.

**Mengapa Memilih Vue.js dan Nuxt?**

Vue.js menawarkan learning curve yang mudah dan sintaks yang intuitif. Nuxt.js menambahkan fitur-fitur seperti:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Automatic routing
- SEO optimization

**Langkah-langkah Membuat Aplikasi:**

1. **Setup Project**
   \`\`\`bash
   npx nuxi@latest init my-app
   cd my-app
   npm install
   \`\`\`

2. **Struktur Folder**
   - \`pages/\` - Halaman aplikasi
   - \`components/\` - Komponen Vue
   - \`layouts/\` - Layout template
   - \`assets/\` - Asset statis

3. **Membuat Halaman**
   \`\`\`vue
   <template>
     <div>
       <h1>Hello World</h1>
       <p>Selamat datang di aplikasi Vue.js!</p>
     </div>
   </template>
   \`\`\`

4. **Routing Otomatis**
   Nuxt secara otomatis membuat routing berdasarkan struktur folder di \`pages/\`.

Dengan mengikuti tutorial ini, Anda dapat membuat aplikasi web modern dengan Vue.js dan Nuxt.js.`,
        excerpt: "Tutorial lengkap membuat aplikasi web modern menggunakan Vue.js dan Nuxt.js dari setup hingga deployment.",
        authorId: authorIds[1],
        categoryId: categoryIds[3], // Pengembangan Aplikasi
        status: "published" as const,
        tags: ["vue", "nuxt", "javascript", "web development"],
        viewCount: 189,
        publishedAt: Date.now() - 86400000 * 5, // 5 days ago
        createdAt: Date.now() - 86400000 * 5,
        updatedAt: Date.now() - 86400000 * 5,
      },
      {
        title: "Tren Keamanan Siber 2025: Yang Perlu Diketahui",
        slug: "tren-keamanan-siber-2025",
        content: `Dunia keamanan siber terus berkembang dengan munculnya ancaman baru dan teknologi pertahanan yang lebih canggih. Berikut adalah tren keamanan siber yang perlu diperhatikan di tahun 2025.

**1. AI-Powered Cyber Attacks**

Penyerang mulai menggunakan kecerdasan buatan untuk:
- Membuat malware yang lebih sophisticated
- Otomasi serangan phishing
- Bypass sistem keamanan tradisional

**2. Zero Trust Architecture**

Pendekatan "never trust, always verify" menjadi standar:
- Verifikasi identitas untuk setiap akses
- Mikro-segmentasi jaringan
- Continuous monitoring

**3. Cloud Security Challenges**

Dengan migrasi ke cloud, tantangan baru muncul:
- Misconfiguration cloud services
- Shared responsibility model
- Multi-cloud security management

**4. IoT Security**

Internet of Things membawa risiko baru:
- Device dengan keamanan minimal
- Botnet IoT yang massive
- Privacy concerns

**5. Quantum Computing Threat**

Ancaman jangka panjang dari quantum computing:
- Potensi memecahkan enkripsi saat ini
- Perlu quantum-resistant cryptography
- Timeline implementasi yang urgent

**Rekomendasi untuk Organisasi:**

1. Investasi dalam AI-based security tools
2. Implementasi Zero Trust gradually
3. Regular security assessment
4. Employee cybersecurity training
5. Incident response planning

Organisasi yang proaktif dalam mengadopsi tren ini akan lebih siap menghadapi ancaman siber di masa depan.`,
        excerpt: "Analisis tren keamanan siber terbaru di 2025 dan strategi untuk menghadapi ancaman yang berkembang.",
        authorId: authorIds[2],
        categoryId: categoryIds[4], // Keamanan Siber
        status: "published" as const,
        tags: ["cybersecurity", "AI", "zero trust", "cloud security"],
        viewCount: 312,
        publishedAt: Date.now() - 86400000 * 3, // 3 days ago
        createdAt: Date.now() - 86400000 * 3,
        updatedAt: Date.now() - 86400000 * 3,
      },
      {
        title: "Setup Development Environment untuk Full Stack Developer",
        slug: "setup-development-environment-fullstack",
        content: `Sebagai full stack developer, memiliki development environment yang tepat sangat penting untuk produktivitas. Artikel ini akan membahas tools dan setup yang direkomendasikan.

**Essential Tools:**

1. **Code Editor**
   - Visual Studio Code (recommended)
   - Extensions: Prettier, ESLint, GitLens
   - Themes dan customization

2. **Version Control**
   - Git untuk version control
   - GitHub/GitLab untuk repository
   - Git workflow best practices

3. **Terminal/Command Line**
   - Windows: PowerShell atau WSL2
   - macOS: Terminal atau iTerm2
   - Linux: Bash atau Zsh

**Frontend Development:**

- Node.js dan npm/yarn
- Framework: React, Vue, atau Angular
- Build tools: Vite, Webpack
- CSS frameworks: Tailwind, Bootstrap

**Backend Development:**

- Runtime: Node.js, Python, atau Java
- Database: PostgreSQL, MongoDB
- API tools: Postman, Insomnia
- Containerization: Docker

**DevOps Tools:**

- Cloud platforms: AWS, Google Cloud, Azure
- CI/CD: GitHub Actions, Jenkins
- Monitoring: Sentry, LogRocket

**Productivity Tips:**

1. Gunakan dotfiles untuk konsistensi
2. Setup aliases untuk command yang sering digunakan
3. Automated testing dan linting
4. Regular backup dan sync

Dengan setup yang tepat, Anda dapat fokus pada coding tanpa terganggu masalah teknis.`,
        excerpt: "Panduan lengkap setup development environment untuk full stack developer dengan tools dan best practices terbaru.",
        authorId: authorIds[1],
        categoryId: categoryIds[0], // Tutorial
        status: "draft" as const,
        tags: ["development", "tools", "setup", "productivity"],
        viewCount: 0,
        createdAt: Date.now() - 86400000 * 1, // 1 day ago
        updatedAt: Date.now() - 86400000 * 1,
      },
    ];

    const postIds = [];
    for (const post of posts) {
      const postId = await ctx.db.insert("posts", post);
      postIds.push(postId);
    }

    // Create sample comments for published posts
    const publishedPostIds = postIds.slice(0, 3); // First 3 posts are published

    const comments = [
      {
        postId: publishedPostIds[0],
        authorName: "Mahasiswa SIJA",
        authorEmail: "mahasiswa@example.com",
        content: "Artikel yang sangat membantu untuk pemula seperti saya. Penjelasannya mudah dipahami!",
        status: "approved" as const,
        createdAt: Date.now() - 86400000 * 6,
        updatedAt: Date.now() - 86400000 * 6,
      },
      {
        postId: publishedPostIds[0],
        authorName: "Andi Pratama",
        authorEmail: "andi@example.com", 
        content: "Bisa dijelaskan lebih detail tentang perbedaan router dan switch?",
        status: "approved" as const,
        createdAt: Date.now() - 86400000 * 5,
        updatedAt: Date.now() - 86400000 * 5,
      },
      {
        postId: publishedPostIds[1],
        authorName: "Developer Junior",
        authorEmail: "dev@example.com",
        content: "Tutorial Vue.js yang sangat praktis. Sudah saya coba dan berhasil!",
        status: "approved" as const,
        createdAt: Date.now() - 86400000 * 4,
        updatedAt: Date.now() - 86400000 * 4,
      },
      {
        postId: publishedPostIds[2],
        authorName: "IT Manager",
        authorEmail: "manager@example.com",
        content: "Informasi yang sangat valuable untuk planning security strategy perusahaan kami.",
        status: "pending" as const,
        createdAt: Date.now() - 86400000 * 2,
        updatedAt: Date.now() - 86400000 * 2,
      },
    ];

    for (const comment of comments) {
      await ctx.db.insert("comments", comment);
    }

    return {
      message: "Blog data initialized successfully",
      stats: {
        categories: categories.length,
        authors: authors.length,
        posts: posts.length,
        comments: comments.length,
      }
    };
  },
});
