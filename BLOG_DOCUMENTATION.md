# Blog Sistem Informasi Jaringan dan Aplikasi

Aplikasi blog lengkap untuk jurusan Sistem Informasi Jaringan dan Aplikasi yang dibangun dengan teknologi modern.

## 🚀 Teknologi yang Digunakan

### Frontend
- **Nuxt.js 4** - Framework Vue.js untuk aplikasi web modern
- **Vue.js 3** - Framework JavaScript reaktif
- **Nuxt UI** - Komponen UI yang konsisten dan modern
- **Tailwind CSS** - Framework CSS utility-first
- **TypeScript** - Type safety untuk JavaScript

### Backend
- **Convex** - Backend-as-a-Service dengan real-time database
- **Convex Functions** - Serverless functions untuk API
- **Real-time Queries** - Data yang selalu up-to-date

### Tools & Infrastructure
- **Turbo** - Monorepo build system
- **Bun** - Package manager dan runtime yang cepat
- **Git** - Version control

## 📁 Struktur Proyek

```
Fullstack_Bund_NUXT/
├── apps/
│   ├── web/                    # Aplikasi web Nuxt.js
│   │   ├── app/
│   │   │   ├── pages/          # Halaman-halaman aplikasi
│   │   │   │   ├── blog/       # Halaman blog
│   │   │   │   ├── admin/      # Dashboard admin
│   │   │   │   └── ...
│   │   │   ├── components/     # Komponen Vue
│   │   │   └── layouts/        # Layout template
│   │   └── nuxt.config.ts      # Konfigurasi Nuxt
│   └── native/                 # Aplikasi mobile (React Native)
├── packages/
│   └── backend/                # Backend Convex
│       └── convex/
│           ├── schema.ts       # Database schema
│           ├── posts.ts        # API untuk posts
│           ├── categories.ts   # API untuk categories
│           ├── authors.ts      # API untuk authors
│           ├── comments.ts     # API untuk comments
│           ├── settings.ts     # API untuk settings
│           └── seed.ts         # Data sample
└── turbo.json                  # Konfigurasi Turbo
```

## 🎯 Fitur Utama

### 📝 Manajemen Konten
- **Artikel Blog** - CRUD lengkap untuk artikel dengan rich text
- **Kategori** - Organisasi artikel berdasarkan topik
- **Tags** - Sistem tagging untuk artikel
- **Status Artikel** - Draft, Published, Archived
- **Featured Images** - Gambar utama untuk artikel

### 👥 Manajemen User
- **Authors** - Sistem penulis dengan role (admin, author, user)
- **Profile Management** - Bio, avatar, dan informasi penulis

### 💬 Sistem Komentar
- **Nested Comments** - Komentar bersarang (reply)
- **Comment Moderation** - Persetujuan komentar oleh admin
- **Status Komentar** - Pending, Approved, Rejected

### 📊 Dashboard Admin
- **Statistik** - Overview artikel, kategori, penulis, komentar
- **Manajemen Konten** - Interface untuk mengelola semua konten
- **Settings** - Konfigurasi blog

### 🔍 Fitur Pencarian & Navigasi
- **Search** - Pencarian artikel berdasarkan judul, konten, tags
- **Kategori Filter** - Filter artikel berdasarkan kategori
- **Pagination** - Navigasi halaman yang efisien
- **Related Posts** - Artikel terkait

### 📱 Responsive Design
- **Mobile-First** - Desain yang responsif di semua device
- **Dark Mode** - Mode gelap/terang
- **Modern UI** - Interface yang clean dan modern

## 🗄️ Database Schema

### Posts
- `title` - Judul artikel
- `slug` - URL-friendly identifier
- `content` - Konten artikel (markdown/HTML)
- `excerpt` - Ringkasan artikel
- `featuredImage` - URL gambar utama
- `authorId` - Referensi ke author
- `categoryId` - Referensi ke kategori
- `status` - draft/published/archived
- `tags` - Array tags
- `viewCount` - Jumlah views
- `publishedAt` - Tanggal publikasi

### Categories
- `name` - Nama kategori
- `slug` - URL identifier
- `description` - Deskripsi kategori
- `color` - Warna tema kategori

### Authors
- `name` - Nama penulis
- `email` - Email penulis
- `avatar` - URL foto profil
- `bio` - Biografi singkat
- `role` - admin/author/user
- `isActive` - Status aktif

### Comments
- `postId` - Referensi ke artikel
- `authorId` - Referensi ke author (optional)
- `authorName` - Nama komentator
- `authorEmail` - Email komentator
- `content` - Isi komentar
- `parentId` - Referensi ke parent comment (untuk reply)
- `status` - pending/approved/rejected

### Settings
- `key` - Kunci setting
- `value` - Nilai setting
- `description` - Deskripsi setting

## 🚀 Cara Menjalankan

### 1. Setup Environment
```bash
# Clone repository
git clone <repository-url>
cd Fullstack_Bund_NUXT

# Install dependencies
bun install
```

### 2. Setup Convex Backend
```bash
# Setup Convex project
bun run dev:setup
```
Ikuti instruksi untuk membuat project Convex baru.

### 3. Inisialisasi Data Blog
1. Jalankan development server:
   ```bash
   bun run dev
   ```

2. Buka browser ke `http://localhost:3001`

3. Kunjungi `/admin/setup` untuk inisialisasi data sample

### 4. Akses Aplikasi
- **Blog Public**: `http://localhost:3001/blog`
- **Admin Dashboard**: `http://localhost:3001/admin`
- **Homepage**: `http://localhost:3001`

## 📄 Halaman Utama

### Public Pages
- `/` - Homepage dengan overview
- `/blog` - Daftar artikel blog
- `/blog/[slug]` - Detail artikel
- `/blog/category/[slug]` - Artikel per kategori
- `/categories` - Daftar semua kategori
- `/about` - Tentang jurusan SIJA

### Admin Pages
- `/admin` - Dashboard admin
- `/admin/setup` - Setup data awal
- `/admin/posts` - Manajemen artikel
- `/admin/categories` - Manajemen kategori
- `/admin/authors` - Manajemen penulis
- `/admin/comments` - Moderasi komentar
- `/admin/settings` - Pengaturan blog

## 🎨 Customization

### Tema dan Styling
- Edit `apps/web/app/app.config.ts` untuk mengubah tema warna
- Modifikasi `apps/web/app/assets/css/main.css` untuk custom CSS
- Gunakan Tailwind classes untuk styling

### Konten Default
- Edit `packages/backend/convex/seed.ts` untuk mengubah data sample
- Modifikasi `packages/backend/convex/settings.ts` untuk default settings

### Layout dan Komponen
- Edit `apps/web/app/layouts/default.vue` untuk layout utama
- Modifikasi `apps/web/app/components/Header.vue` untuk navigasi

## 🔧 API Endpoints (Convex Functions)

### Posts
- `posts.getAll` - Ambil semua artikel
- `posts.getPublished` - Artikel yang dipublikasi
- `posts.getBySlug` - Artikel berdasarkan slug
- `posts.getByCategory` - Artikel per kategori
- `posts.search` - Pencarian artikel
- `posts.create` - Buat artikel baru
- `posts.update` - Update artikel
- `posts.remove` - Hapus artikel

### Categories
- `categories.getAll` - Semua kategori
- `categories.getWithPostCount` - Kategori dengan jumlah post
- `categories.create` - Buat kategori
- `categories.update` - Update kategori
- `categories.remove` - Hapus kategori

### Comments
- `comments.getByPost` - Komentar per artikel
- `comments.create` - Buat komentar
- `comments.approve` - Setujui komentar
- `comments.reject` - Tolak komentar

### Settings
- `settings.getBlogConfig` - Konfigurasi blog
- `settings.set` - Set pengaturan
- `settings.initializeDefaults` - Inisialisasi default

## 📝 Content Management

### Membuat Artikel Baru
1. Masuk ke admin dashboard
2. Klik "Artikel Baru" atau kunjungi `/admin/posts/create`
3. Isi form artikel (judul, konten, kategori, tags)
4. Pilih status (draft/published)
5. Save artikel

### Mengelola Komentar
1. Kunjungi `/admin/comments`
2. Review komentar yang pending
3. Approve atau reject komentar
4. Reply komentar jika diperlukan

### Mengatur Kategori
1. Kunjungi `/admin/categories`
2. Tambah kategori baru dengan nama, slug, deskripsi
3. Pilih warna tema untuk kategori
4. Assign artikel ke kategori

## 🚀 Deployment

### Frontend (Nuxt.js)
- Deploy ke Vercel, Netlify, atau platform hosting lainnya
- Set environment variables untuk Convex URL

### Backend (Convex)
- Convex otomatis ter-deploy saat push ke production
- Configure production environment di Convex dashboard

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: admin@sija.ac.id
- GitHub Issues: [Repository Issues]

---

**Dibuat dengan ❤️ untuk Jurusan Sistem Informasi Jaringan dan Aplikasi**
