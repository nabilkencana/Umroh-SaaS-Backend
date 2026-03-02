# 🚀 Setup dengan Supabase (Tanpa Docker)

Panduan lengkap setup backend menggunakan Supabase sebagai database PostgreSQL.

## Kenapa Supabase?

✅ **Gratis** - Free tier sangat generous  
✅ **Mudah** - Tidak perlu install PostgreSQL atau Docker  
✅ **Cloud** - Database sudah di-host, tidak perlu maintenance  
✅ **GUI** - Dashboard untuk manage database  
✅ **Backup** - Auto backup dan point-in-time recovery  
✅ **Fast** - Server di berbagai region termasuk Singapore  

## 📋 Langkah-langkah Setup

### 1. Buat Akun Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Sign up dengan GitHub atau email
4. Verifikasi email Anda

### 2. Buat Project Baru

1. Di dashboard, klik "New Project"
2. Isi form:
   - **Name**: `umroh-backend` (atau nama lain)
   - **Database Password**: Buat password kuat (SIMPAN INI!)
   - **Region**: Pilih `Southeast Asia (Singapore)` untuk Indonesia
   - **Pricing Plan**: Free (sudah cukup untuk development)
3. Klik "Create new project"
4. Tunggu ~2 menit sampai project ready (ada loading indicator)

### 3. Dapatkan Connection String

1. Di dashboard project, klik icon **⚙️ Settings** (kiri bawah)
2. Pilih menu **Database**
3. Scroll ke bagian **Connection string**
4. Pilih tab **URI**
5. Copy connection string yang muncul
6. Ganti `[YOUR-PASSWORD]` dengan password yang tadi dibuat

**Contoh Connection String:**
```
postgresql://postgres:your-password@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 4. Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Edit file `.env` dan update bagian database:

```env
# Database - Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# JWT Secret - ganti dengan random string
JWT_SECRET="your-very-secure-random-secret-key-change-this"
JWT_EXPIRES_IN="7d"

# Firebase (opsional, bisa dikosongkan dulu)
FIREBASE_PROJECT_ID=""
FIREBASE_PRIVATE_KEY=""
FIREBASE_CLIENT_EMAIL=""

# App
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

**Penting:**
- Ganti `[YOUR-PASSWORD]` dengan password Supabase Anda
- Ganti `xxxxx` dengan project ID Anda (ada di connection string)
- `DATABASE_URL` menggunakan connection pooling (pgbouncer)
- `DIRECT_URL` untuk migrations (direct connection)

### 5. Install Dependencies

```bash
cd backend
npm install
```

### 6. Setup Database

Jalankan command ini untuk setup database:

```bash
npm run db:setup
```

Command ini akan:
1. ✅ Generate Prisma Client
2. ✅ Run migrations (buat tables)
3. ✅ Seed data awal

**Output yang diharapkan:**
```
🌱 Starting seed...
✅ Tenant created: Al-Hijrah Travel
✅ Admin user created: admin@alhijrah.com
✅ Promos created: Promo Ramadhan 2026 - Diskon 25% Paket Umroh Plus Madinah
✅ Jamaah created: Ahmad Fauzi Siti Aminah
🎉 Seed completed successfully!

📝 Login credentials:
Email: admin@alhijrah.com
Password: admin123
```

### 7. Start Development Server

```bash
npm run start:dev
```

Server akan running di `http://localhost:3001`

### 8. Test API

Test dengan browser atau curl:

```bash
# Test public endpoint
curl http://localhost:3001/api/promo

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alhijrah.com","password":"admin123"}'
```

## 🎯 Verifikasi Setup

### Cek di Supabase Dashboard

1. Buka Supabase dashboard
2. Klik **Table Editor** (icon tabel di sidebar)
3. Anda akan melihat tables:
   - tenants
   - users
   - branches
   - jamaah
   - promos
   - tracking_logs
4. Klik table `users` untuk melihat admin user yang sudah dibuat

### Cek dengan Prisma Studio

```bash
npm run prisma:studio
```

Buka browser di `http://localhost:5555` untuk melihat data.

## 📊 Supabase Dashboard Features

### Table Editor
- Lihat dan edit data langsung
- Seperti Excel tapi untuk database
- Bisa filter, sort, search

### SQL Editor
- Jalankan SQL query custom
- Useful untuk debugging atau data analysis

### Database
- Lihat connection strings
- Monitor database usage
- Setup backups

### API Docs
- Auto-generated REST API (opsional, kita pakai NestJS)
- Real-time subscriptions

## 🔧 Troubleshooting

### Error: Can't reach database server

**Penyebab:** Connection string salah atau password salah

**Solusi:**
1. Cek kembali connection string di `.env`
2. Pastikan password benar (tidak ada spasi)
3. Pastikan project Supabase sudah ready (tidak loading)
4. Test connection di Supabase dashboard > Database > Connection pooler

### Error: SSL connection required

**Solusi:** Tambahkan `?sslmode=require` di akhir connection string:
```env
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?sslmode=require"
```

### Error: Too many connections

**Penyebab:** Connection limit tercapai (free tier: 60 connections)

**Solusi:** Sudah diatasi dengan `pgbouncer=true` dan `connection_limit=1` di connection string

### Migration failed

**Solusi:** Reset dan coba lagi:
```bash
# Hapus semua tables (HATI-HATI!)
npx prisma migrate reset

# Atau buat migration baru
npm run prisma:migrate
```

## 💡 Tips & Best Practices

### 1. Jangan Commit `.env`
File `.env` berisi password, jangan di-commit ke Git!

### 2. Backup Password
Simpan password Supabase di password manager (LastPass, 1Password, dll)

### 3. Monitor Usage
Cek usage di Supabase dashboard untuk memastikan tidak over limit

### 4. Use Connection Pooling
Selalu gunakan `pgbouncer=true` untuk production

### 5. Separate Environments
Buat project terpisah untuk:
- Development
- Staging  
- Production

## 🆓 Supabase Free Tier Limits

- **Database**: 500 MB storage
- **Bandwidth**: 5 GB per month
- **API Requests**: Unlimited
- **Auth Users**: 50,000 monthly active users
- **Storage**: 1 GB
- **Edge Functions**: 500,000 invocations

Sangat cukup untuk development dan small-medium apps!

## 🚀 Next Steps

1. ✅ Backend running dengan Supabase
2. 📖 Baca [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. 🔗 Integrasikan dengan frontend - [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)
4. 🧪 Test semua endpoints
5. 🎨 Customize sesuai kebutuhan

## 📞 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)

---

**Selamat! Backend Anda sudah running dengan Supabase! 🎉**

Tidak perlu Docker, tidak perlu install PostgreSQL, semuanya sudah di cloud dan siap dipakai!
