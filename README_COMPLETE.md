# 🏫 SMK SIJA - Smart City Blog Platform

Platform blog lengkap untuk **SMK Jurusan Sistem Informasi Jaringan dan Aplikasi** dengan fokus pada Smart City solutions, student projects, dan learning management system.

## 🎯 Overview

Aplikasi ini dirancang khusus untuk mendukung pembelajaran dan showcase project siswa SMK SIJA. Platform ini menggabungkan blog, portfolio project siswa, LMS, dan solusi Smart City dalam satu ekosistem digital yang terintegrasi.

## 🚀 Tech Stack

- **Frontend Framework**: Nuxt.js 4.0.2
- **UI Framework**: Vue 3 dengan Composition API  
- **UI Components**: Nuxt UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **TypeScript**: Full type safety
- **Theme**: Dark mode default
- **Development**: Hot Module Replacement (HMR)

## ✨ Fitur Utama

### 🏠 Landing Page Smart City
- **Interactive Hero Section** dengan gradient modern
- **Smart City Technologies** - 6 teknologi yang dapat diklik (IoT, AI, Cloud, Network, Security, Mobile)
- **Platform Features** - 4 platform terintegrasi dengan detail interaktif
- **Achievement Stats** dengan growth indicators
- **Latest Articles** showcase
- **Call to Action** dan quick links

### 📚 Knowledge Hub (Blog)
- **Article Management** dengan kategori dan tags
- **Search Functionality** yang responsif
- **Category-based Organization**
- **Responsive Card Layout**
- **Reading Time Estimation**

### 💻 Student Projects Showcase
- **Project Portfolio** dengan 6+ project sample
- **Technology Stack Display**
- **Category Filtering** (IoT, Web Dev, Mobile, Network, Game, AI/ML)
- **GitHub & Demo Links**
- **Project Status Tracking**

### 🎓 Learning Management System (LMS)
- **Course Catalog** dengan 6 course SMK SIJA
- **Progress Tracking** untuk setiap course
- **Feature Grid** (Video, Materi, Diskusi, Quiz, Analytics, Sertifikat)
- **Level Indicators** (Beginner, Intermediate, Advanced)

### 🏙️ Smart City Solutions
- **Solutions Catalog** dengan 6 solusi Smart City
- **Implementation Status** tracking
- **Technology Stack** untuk setiap solusi
- **Impact Metrics** dan benefits
- **City Statistics** dashboard

### 🔐 Admin Panel
- **Authentication System** dengan session management
- **Dashboard Overview** dengan statistics
- **Content Management** (Posts, Categories, Projects)
- **Analytics Dashboard** dengan comprehensive metrics
- **User Management** interface

## 📱 Halaman & Routes

### Public Pages
- `/` - Homepage Smart City
- `/blog` - Knowledge Hub
- `/blog/[slug]` - Individual articles
- `/blog/category/[slug]` - Category pages
- `/projects` - Student Projects showcase
- `/lms` - Learning Management System
- `/smart-city` - Smart City solutions
- `/categories` - Content categories
- `/about` - About SMK SIJA

### Admin Panel
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Main dashboard
- `/admin/posts` - Posts management
- `/admin/posts/create` - Create new post
- `/admin/categories` - Categories management
- `/admin/analytics` - Analytics dashboard

## 🎨 Design Features

### Modern UI/UX
- **Dark Mode Default** dengan toggle functionality
- **Gradient Backgrounds** yang menarik
- **Interactive Hover Effects** dan smooth animations
- **Color-coded Categories** untuk organisasi yang baik
- **Responsive Design** untuk semua device
- **Card-based Layout** seperti modern web apps

### Interactive Elements
- **Clickable Technology Icons** dengan detail popup
- **Feature Cards** dengan interactive states
- **Progress Bars** dan statistics
- **Smooth Transitions** dan micro-animations
- **Loading States** untuk better UX

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

### Development Setup
```bash
# Clone repository
git clone [repository-url]
cd apps/web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```env
NUXT_PUBLIC_CONVEX_URL=your_convex_url
NUXT_PUBLIC_SERVER_URL=http://localhost:3001
```

## 🎯 Admin Panel Usage

### Login Credentials
- **Username**: `admin`
- **Password**: `sija2025`

### Admin Features
1. **Dashboard**: Overview statistics dan quick actions
2. **Posts Management**: Create, edit, delete articles
3. **Categories**: Manage content categories dengan color coding
4. **Analytics**: Comprehensive website analytics
5. **Content Creation**: Rich text editor dengan SEO settings

## 📊 Sample Data

### Blog Articles (4 articles)
1. "Pengenalan Jaringan Komputer untuk Pemula"
2. "Cara Membuat Aplikasi Web dengan Vue.js dan Nuxt"
3. "Tren Keamanan Siber 2025: Yang Perlu Diketahui"
4. "Setup Development Environment untuk Full Stack Developer"

### Categories (5 categories)
- 🔵 Tutorial (5 artikel)
- 🟢 Berita Teknologi (3 artikel)  
- 🟣 Jaringan Komputer (4 artikel)
- 🟠 Pengembangan Aplikasi (6 artikel)
- 🔴 Keamanan Siber (2 artikel)

### Student Projects (6 projects)
1. Smart Home IoT System
2. E-Learning Platform
3. Network Monitoring Dashboard
4. Mobile Attendance App
5. Cybersecurity Awareness Game
6. Smart City Traffic Simulation

### LMS Courses (6 courses)
1. Dasar-Dasar Jaringan Komputer
2. Pemrograman Web (HTML, CSS, JS)
3. Administrasi Server Linux
4. Keamanan Jaringan & Ethical Hacking
5. Mobile App Development (Flutter)
6. Internet of Things (IoT) Fundamentals

## 🌟 Key Highlights

### Educational Focus
- **SMK-specific Content** sesuai kurikulum SIJA
- **Industry-relevant Projects** dari siswa
- **Practical Learning** dengan hands-on approach
- **Career Preparation** untuk dunia kerja

### Technology Integration
- **Smart City Concepts** dalam pembelajaran
- **Modern Web Technologies** implementation
- **Best Practices** dalam development
- **Industry Standards** compliance

### User Experience
- **Intuitive Navigation** untuk semua user level
- **Fast Loading** dengan optimized performance
- **Mobile-first Design** untuk accessibility
- **Dark Mode** untuk comfortable reading

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview
```

### Environment Setup
- Configure production environment variables
- Setup domain dan SSL certificate
- Configure CDN untuk static assets
- Setup monitoring dan analytics

## 📈 Future Enhancements

### Planned Features
- **Real Database Integration** (Convex/Supabase)
- **User Registration** untuk siswa
- **Comment System** untuk articles
- **File Upload** untuk student projects
- **Email Notifications** untuk admin
- **SEO Optimization** advanced
- **PWA Support** untuk mobile experience

### Technical Improvements
- **API Integration** untuk dynamic content
- **Image Optimization** dengan Nuxt Image
- **Performance Monitoring** dengan analytics
- **Security Enhancements** untuk production
- **Backup System** untuk data protection

## 📞 Support & Contact

Untuk pertanyaan atau dukungan teknis:
- **Email**: info@sija.ac.id
- **Phone**: (021) 1234-5678
- **Address**: Jakarta, Indonesia

---

**© 2025 SMK Jurusan Sistem Informasi Jaringan dan Aplikasi. All rights reserved.**
