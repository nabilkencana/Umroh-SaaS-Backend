# 🕌 Backend - Umroh Management System

Backend API untuk sistem manajemen umroh menggunakan **NestJS**, **Prisma**, dan **Firebase**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup database (pilih salah satu: Supabase/Docker/Local)
# Lihat panduan di bawah

# 3. Setup environment
cp .env.example .env
# Edit .env dengan credentials Anda

# 4. Setup database
npm run db:setup

# 5. Start server
npm run start:dev
```

Server akan running di `http://localhost:3001`

## 📚 Panduan Setup

Pilih panduan sesuai kebutuhan Anda:

### 🎯 Untuk Pemula (Recommended)

1. **[QUICKSTART.md](./QUICKSTART.md)** - Start dalam 5 menit
2. **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Setup database tanpa Docker
3. **[FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)** - Setup Firebase dalam 5 menit

### 📖 Panduan Lengkap

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Setup detail semua opsi (Docker, Local, Supabase)
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase setup lengkap dengan troubleshooting
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference lengkap
- **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - Cara integrasikan dengan frontend
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Struktur project dan architecture

## 🛠️ Tech Stack

- **NestJS** - Framework Node.js yang powerful
- **Prisma** - ORM untuk database (type-safe)
- **PostgreSQL** - Database relational
- **Firebase** - File storage & authentication
- **JWT** - Token-based authentication
- **Socket.IO** - Real-time tracking
- **Supabase** - Alternative database hosting (optional)

## 📋 Prerequisites

- Node.js 18+
- Pilih salah satu untuk database:
  - **Supabase** (Recommended - gratis, mudah, tanpa install) ⭐
  - **Docker** (Jika sudah familiar)
  - **PostgreSQL** (Jika sudah terinstall)

## 🎯 Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (5 roles)
- Password hashing dengan bcrypt

✅ **Promo Management**
- CRUD operations
- Filter by tenant, active, featured
- Public & protected endpoints

✅ **Jamaah Management**
- CRUD operations
- Multi-tenant support
- Branch management

✅ **Real-time Tracking**
- WebSocket dengan Socket.IO
- Location history
- Tenant-based rooms

✅ **Analytics**
- Dashboard statistics
- Tenant-specific metrics

✅ **Firebase Integration**
- File upload (foto, dokumen)
- Authentication (optional)
- Cloud storage

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/login      - Login user
POST   /api/auth/register   - Register user
```

### Promo
```
GET    /api/promo           - Get all promos (public)
GET    /api/promo/:id       - Get promo by ID
POST   /api/promo           - Create promo (auth)
PATCH  /api/promo/:id       - Update promo (auth)
DELETE /api/promo/:id       - Delete promo (auth)
```

### Jamaah
```
GET    /api/jamaah          - Get all jamaah (auth)
GET    /api/jamaah/:id      - Get jamaah by ID (auth)
POST   /api/jamaah          - Create jamaah (auth)
PATCH  /api/jamaah/:id      - Update jamaah (auth)
DELETE /api/jamaah/:id      - Delete jamaah (auth)
```

### Tracking
```
GET    /api/tracking        - Get tracking logs (auth)
WS     ws://localhost:3001  - WebSocket for real-time
```

### Analytics
```
GET    /api/analytics/dashboard - Dashboard stats (auth)
```

## 🔐 Default Login

Setelah seed database:

```
Email: admin@alhijrah.com
Password: admin123
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Useful Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open database GUI
npm run prisma:seed        # Seed database
npm run db:setup           # Generate + Migrate + Seed

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Code Quality
npm run lint               # Check code
npm run format             # Format code
```

## 🗂️ Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── auth/              # Authentication
│   ├── promo/             # Promo management
│   ├── jamaah/            # Jamaah management
│   ├── tracking/          # Real-time tracking
│   ├── analytics/         # Analytics & stats
│   ├── prisma/            # Prisma service
│   ├── firebase/          # Firebase service
│   └── main.ts            # Entry point
├── .env.example           # Environment template
├── docker-compose.yml     # PostgreSQL Docker
└── package.json
```

## 🔧 Environment Variables

```env
# Database (pilih salah satu)
DATABASE_URL="postgresql://..."        # Supabase/Docker/Local
DIRECT_URL="postgresql://..."          # Untuk migrations

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Firebase (optional)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@..."

# App
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Production
```bash
npm run start:prod
```

### Database Migration
```bash
npx prisma migrate deploy
```

## 🆘 Troubleshooting

### Cannot connect to database
- Cek DATABASE_URL di `.env`
- Pastikan PostgreSQL/Supabase running
- Test connection: `npx prisma db pull`

### Prisma Client not generated
```bash
npm run prisma:generate
```

### Port already in use
Edit `PORT` di `.env` atau kill process:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Migration failed
```bash
npx prisma migrate reset  # HATI-HATI: hapus semua data
```

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Supabase setup (no Docker)
- **[FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)** - Firebase quick setup
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase detailed guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference
- **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - Frontend integration
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Project architecture
- **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Implementation status

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

UNLICENSED - Private project

## 🙏 Support

Jika ada pertanyaan atau masalah:

1. Cek dokumentasi di folder `backend/`
2. Lihat troubleshooting di masing-masing panduan
3. Review error logs di terminal
4. Test dengan Prisma Studio atau Postman

---

**Made with ❤️ for Umroh Management System**

🕌 Semoga bermanfaat untuk memudahkan pengelolaan umroh!
