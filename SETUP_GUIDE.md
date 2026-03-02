# Setup Guide - Backend Umroh Management System

## Langkah-langkah Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup PostgreSQL Database

Install PostgreSQL jika belum ada, kemudian buat database:

```sql
CREATE DATABASE umroh_db;
```

### 3. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Anda:

```env
# Database - sesuaikan dengan PostgreSQL Anda
DATABASE_URL="postgresql://postgres:password@localhost:5432/umroh_db?schema=public"

# JWT Secret - ganti dengan random string yang aman
JWT_SECRET="your-very-secure-secret-key-change-this"
JWT_EXPIRES_IN="7d"

# Firebase Configuration
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-project.iam.gserviceaccount.com"

# App Configuration
PORT=3001
NODE_ENV=development

# CORS - URL frontend Anda
CORS_ORIGIN="http://localhost:3000"
```

### 4. Setup Firebase (Opsional)

Jika ingin menggunakan Firebase:

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau pilih existing project
3. Pergi ke Project Settings > Service Accounts
4. Generate new private key
5. Copy credentials ke `.env` file

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run Database Migrations

```bash
npm run prisma:migrate
```

Beri nama migration, misalnya: `init`

### 7. (Opsional) Seed Database

Buat file `prisma/seed.ts` untuk data awal:

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Al-Hijrah Travel',
      slug: 'al-hijrah',
      subscription_plan: 'PROFESSIONAL',
      max_jamaah: 500,
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@alhijrah.com',
      password: hashedPassword,
      name: 'Admin Al-Hijrah',
      role: 'SUPER_ADMIN',
      tenant_id: tenant.id,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Jalankan seed:
```bash
npx ts-node prisma/seed.ts
```

### 8. Start Development Server

```bash
npm run start:dev
```

Server akan berjalan di `http://localhost:3001`

### 9. Test API

Test dengan curl atau Postman:

```bash
# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "tenant_id": "your-tenant-id"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get promos (public)
curl http://localhost:3001/api/promo
```

### 10. Prisma Studio (Database GUI)

Untuk melihat dan mengedit data dengan GUI:

```bash
npm run prisma:studio
```

Buka browser di `http://localhost:5555`

## Troubleshooting

### Error: Cannot connect to database

- Pastikan PostgreSQL sudah running
- Cek DATABASE_URL di `.env` sudah benar
- Test koneksi: `psql -U postgres -d umroh_db`

### Error: Prisma Client not generated

```bash
npm run prisma:generate
```

### Error: Migration failed

```bash
# Reset database (HATI-HATI: akan hapus semua data)
npx prisma migrate reset

# Atau buat migration baru
npm run prisma:migrate
```

### Port 3001 already in use

Ubah PORT di `.env` atau kill process yang menggunakan port:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

## Next Steps

1. Integrasikan dengan frontend
2. Setup Firebase untuk file upload
3. Tambahkan unit tests
4. Setup CI/CD
5. Deploy ke production

## Useful Commands

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Prisma
npm run prisma:generate    # Generate client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open GUI

# Testing
npm run test              # Unit tests
npm run test:e2e          # E2E tests
npm run test:cov          # Coverage

# Linting
npm run lint              # Check code
npm run format            # Format code
```
