# Blog Sistem Informasi Jaringan dan Aplikasi

Aplikasi blog modern dan lengkap untuk jurusan Sistem Informasi Jaringan dan Aplikasi yang dibangun dengan teknologi terdepan menggunakan [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack).

## ✨ Fitur Utama

### 📝 Manajemen Konten
- **Blog System** - Sistem blog lengkap dengan CRUD artikel
- **Categories & Tags** - Organisasi konten yang terstruktur
- **Rich Text Editor** - Editor konten yang powerful
- **SEO Optimized** - Meta tags dan URL yang SEO-friendly

### 👥 User Management
- **Multi-role System** - Admin, Author, dan User roles
- **Author Profiles** - Profil lengkap untuk penulis

### 💬 Interactive Features
- **Comment System** - Komentar bersarang dengan moderasi
- **Real-time Updates** - Data yang selalu up-to-date
- **Search & Filter** - Pencarian dan filter artikel yang canggih
- **Responsive Design** - Tampilan optimal di semua device

### 📊 Admin Dashboard
- **Analytics** - Statistik artikel, komentar, dan pengunjung
- **Content Management** - Interface admin yang intuitif

## 🚀 Teknologi

- **TypeScript** - Type safety dan developer experience yang lebih baik
- **Nuxt.js 4** - Framework Vue.js yang powerful
- **React Native** - Aplikasi mobile dengan React
- **Expo** - Tools untuk React Native development
- **TailwindCSS** - Utility-first CSS framework
- **Nuxt UI** - Komponen UI yang modern
- **Convex** - Backend-as-a-Service dengan real-time database
- **PWA** - Progressive Web App support
- **Turborepo** - Monorepo build system yang optimal

## 🚀 Quick Start

### 1. Setup Project
```bash
# Clone repository
git clone <repository-url>
cd Fullstack_Bund_NUXT

# Install dependencies
bun install
```

### 2. Setup Backend
```bash
# Setup Convex project
bun run dev:setup
```
Ikuti instruksi untuk membuat project Convex baru.

### 3. Initialize Blog Data
```bash
# Start development server
bun run dev
```

Kemudian kunjungi `http://localhost:3001/admin/setup` untuk menginisialisasi data sample blog.

### 4. Access Application
- **Homepage**: `http://localhost:3001`
- **Blog**: `http://localhost:3001/blog`
- **Admin Dashboard**: `http://localhost:3001/admin`



## 📄 Halaman Utama

### Public Pages
- `/` - Homepage dengan overview jurusan
- `/blog` - Daftar artikel blog
- `/blog/[slug]` - Detail artikel dengan komentar
- `/blog/category/[slug]` - Artikel berdasarkan kategori
- `/categories` - Daftar semua kategori
- `/about` - Tentang jurusan SIJA

### Admin Pages
- `/admin` - Dashboard admin dengan statistik
- `/admin/setup` - Setup data awal blog
- `/admin/posts` - Manajemen artikel
- `/admin/categories` - Manajemen kategori
- `/admin/authors` - Manajemen penulis
- `/admin/comments` - Moderasi komentar
- `/admin/settings` - Pengaturan blog

## 🏗️ Project Structure

```
Fullstack_Bund_NUXT/
├── apps/
│   ├── web/                    # Aplikasi web Nuxt.js
│   │   ├── app/
│   │   │   ├── pages/          # Halaman aplikasi
│   │   │   │   ├── blog/       # Halaman blog public
│   │   │   │   ├── admin/      # Dashboard admin
│   │   │   │   └── ...
│   │   │   ├── components/     # Komponen Vue reusable
│   │   │   └── layouts/        # Layout templates
│   │   └── nuxt.config.ts      # Konfigurasi Nuxt
│   └── native/                 # Aplikasi mobile (React Native)
├── packages/
│   └── backend/                # Backend Convex
│       └── convex/
│           ├── schema.ts       # Database schema
│           ├── posts.ts        # API posts
│           ├── categories.ts   # API categories
│           ├── authors.ts      # API authors
│           ├── comments.ts     # API comments
│           ├── settings.ts     # API settings
│           └── seed.ts         # Sample data
└── turbo.json                  # Konfigurasi Turbo
```

## 🛠️ Available Scripts

- `bun dev`: Jalankan semua aplikasi dalam development mode
- `bun build`: Build semua aplikasi untuk production
- `bun dev:web`: Jalankan hanya web application
- `bun dev:setup`: Setup dan konfigurasi Convex project
- `bun check-types`: Check TypeScript types di semua apps
- `bun dev:native`: Jalankan React Native/Expo development server

## 📚 Documentation

Untuk dokumentasi lengkap, lihat [BLOG_DOCUMENTATION.md](./BLOG_DOCUMENTATION.md) yang mencakup:
- Setup detail
- API endpoints
- Customization guide
- Deployment instructions

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📞 Support

Untuk pertanyaan atau bantuan:
- **Email**: admin@sija.ac.id
- **GitHub Issues**: [Create Issue](../../issues)

---

**Dibuat dengan ❤️ untuk Jurusan Sistem Informasi Jaringan dan Aplikasi**

*Powered by [Better-T-Stack](https://better-t-stack.dev)*
