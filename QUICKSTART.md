# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan backend dalam 5 menit!

## Prerequisites

- Node.js 18+ installed
- Pilih salah satu:
  - **Supabase** (Recommended untuk pemula) ⭐
  - **Docker** (Jika sudah familiar)
  - **PostgreSQL** (Jika sudah terinstall)

## Option 1: Menggunakan Supabase (Recommended) ⭐

### Kenapa Supabase?
- ✅ Gratis dan mudah
- ✅ Tidak perlu install apapun
- ✅ Database sudah di cloud
- ✅ Dashboard GUI built-in

### Setup Steps

1. **Buat akun di [supabase.com](https://supabase.com)**

2. **Buat project baru:**
   - Name: `umroh-backend`
   - Password: Buat password kuat (SIMPAN!)
   - Region: Singapore

3. **Dapatkan connection string:**
   - Settings > Database > Connection string (URI)
   - Copy dan ganti `[YOUR-PASSWORD]`

4. **Install dependencies:**
```bash
cd backend
npm install --legacy-peer-deps
```

5. **Setup environment:**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"
JWT_SECRET="change-this-to-random-secret"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

6. **Setup database:**
```bash
npm run db:setup
```

7. **Start server:**
```bash
npm run start:dev
```

✅ Backend running di `http://localhost:3001`

📖 **Panduan lengkap:** Lihat [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

## Option 2: Menggunakan Docker

### 1. Start PostgreSQL dengan Docker

```bash
cd backend
docker-compose up -d
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
```

File `.env` sudah dikonfigurasi untuk Docker PostgreSQL. Jika perlu, edit:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umroh_db?schema=public"
JWT_SECRET="change-this-to-random-secret"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### 4. Setup Database

```bash
npm run db:setup
```

Command ini akan:
- Generate Prisma Client
- Run migrations
- Seed data awal

### 5. Start Server

```bash
npm run start:dev
```

✅ Backend running di `http://localhost:3001`

### 6. Test API

```bash
# Test public endpoint
curl http://localhost:3001/api/promo

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alhijrah.com","password":"admin123"}'
```

## Option 2: Tanpa Docker

### 1. Install PostgreSQL

Download dan install dari [postgresql.org](https://www.postgresql.org/download/)

### 2. Create Database

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE umroh_db;

# Exit
\q
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` sesuai PostgreSQL Anda:
```env
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/umroh_db?schema=public"
JWT_SECRET="change-this-to-random-secret"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### 5. Setup Database

```bash
npm run db:setup
```

### 6. Start Server

```bash
npm run start:dev
```

## Default Login Credentials

Setelah seed, gunakan credentials ini:

```
Email: admin@alhijrah.com
Password: admin123
```

## API Endpoints

- `GET /api/promo` - Get all promos (public)
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/jamaah` - Get jamaah (auth required)
- `GET /api/tracking` - Get tracking logs (auth required)
- `GET /api/analytics/dashboard` - Dashboard stats (auth required)

## Useful Commands

```bash
# Development
npm run start:dev          # Start with hot reload

# Database
npm run prisma:studio      # Open database GUI
npm run prisma:migrate     # Create new migration
npm run prisma:seed        # Seed database

# Testing
npm run test               # Run tests
npm run lint               # Check code quality
```

## Prisma Studio

Untuk melihat dan edit data dengan GUI:

```bash
npm run prisma:studio
```

Buka browser di `http://localhost:5555`

## Troubleshooting

### Port 3001 sudah digunakan

Edit `PORT` di `.env` file:
```env
PORT=3002
```

### Cannot connect to database

1. Cek PostgreSQL sudah running:
```bash
# Docker
docker ps

# Native
# Windows: Check Services
# Mac/Linux: 
sudo service postgresql status
```

2. Cek DATABASE_URL di `.env` sudah benar

3. Test koneksi:
```bash
psql -U postgres -d umroh_db
```

### Prisma Client not generated

```bash
npm run prisma:generate
```

### Migration failed

Reset database (HATI-HATI: akan hapus semua data):
```bash
npx prisma migrate reset
```

## Next Steps

1. ✅ Backend running
2. 📖 Baca [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. 🔗 Integrasikan dengan frontend - lihat [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)
4. 🔥 Setup Firebase - lihat [SETUP_GUIDE.md](./SETUP_GUIDE.md)
5. 🚀 Deploy ke production

## Need Help?

- API Documentation: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Setup Guide: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Frontend Integration: [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)
- Backend README: [BACKEND_README.md](./BACKEND_README.md)

---

**Happy Coding! 🎉**
