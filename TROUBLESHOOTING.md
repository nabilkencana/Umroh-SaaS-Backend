# 🔧 Troubleshooting Guide

Panduan mengatasi error umum saat setup backend.

## ❌ Error: Environment variable not found: DIRECT_URL

### Penyebab
File `.env` belum dibuat atau `DIRECT_URL` tidak diisi.

### Solusi
```bash
# Copy .env.example ke .env
cp .env.example .env

# Atau di Windows PowerShell
Copy-Item .env.example .env
```

Lalu edit file `.env` dan isi `DATABASE_URL` dan `DIRECT_URL` sesuai database yang Anda pilih.

**Untuk Supabase:**
```env
DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**Untuk Docker:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umroh_db?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/umroh_db?schema=public"
```

**Untuk Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/umroh_db?schema=public"
DIRECT_URL="postgresql://postgres:your-password@localhost:5432/umroh_db?schema=public"
```

📖 **Panduan lengkap:** [SETUP_NOW.md](./SETUP_NOW.md)

---

## ❌ Error: Cannot find module '@prisma/client'

### Penyebab
Prisma Client belum di-generate setelah install dependencies.

### Solusi
```bash
cd backend
npx prisma generate
```

Atau gunakan command all-in-one:
```bash
npm run db:setup
```

---

## ❌ Error: ERESOLVE unable to resolve dependency tree

### Penyebab
Conflict antara versi NestJS dan dependencies lainnya.

### Solusi
Install dengan flag `--legacy-peer-deps`:
```bash
cd backend
npm install --legacy-peer-deps
```

Atau hapus `node_modules` dan install ulang:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## ❌ Error: Property 'user' does not exist on type 'PrismaService'

### Penyebab
Prisma Client belum di-generate atau outdated.

### Solusi
```bash
npx prisma generate
```

Jika masih error, coba:
```bash
rm -rf node_modules/@prisma
npm install --legacy-peer-deps
npx prisma generate
```

---

## ❌ Error: Cannot find module 'bcrypt'

### Penyebab
Dependencies belum terinstall atau install gagal.

### Solusi
```bash
npm install --legacy-peer-deps
```

Khusus untuk bcrypt di Windows, jika masih error:
```bash
npm install --legacy-peer-deps --build-from-source bcrypt
```

Atau gunakan alternatif:
```bash
npm uninstall bcrypt
npm install bcryptjs --legacy-peer-deps
```

Lalu update import di `auth.service.ts`:
```typescript
// Ganti
import * as bcrypt from 'bcrypt';
// Dengan
import * as bcrypt from 'bcryptjs';
```

---

## ❌ Error: Can't reach database server

### Penyebab
Database tidak running atau connection string salah.

### Solusi untuk Supabase
1. Cek connection string di `.env`
2. Pastikan tidak ada typo di password
3. Test connection:
```bash
npx prisma db pull
```

### Solusi untuk Docker
1. Cek Docker container running:
```bash
docker ps
```

2. Jika tidak ada, start container:
```bash
docker-compose up -d
```

3. Cek logs jika ada error:
```bash
docker-compose logs postgres
```

### Solusi untuk Local PostgreSQL
1. Cek PostgreSQL service running:
```bash
# Windows (PowerShell as Admin)
Get-Service postgresql*

# Jika stopped, start:
Start-Service postgresql-x64-15
```

2. Test connection:
```bash
psql -U postgres -d umroh_db
```

---

## ❌ Error: Migration failed

### Penyebab
Database schema conflict atau connection issue.

### Solusi 1: Reset Database (HATI-HATI: Hapus semua data)
```bash
npx prisma migrate reset
```

### Solusi 2: Deploy migrations
```bash
npx prisma migrate deploy
```

### Solusi 3: Create new migration
```bash
npx prisma migrate dev --name fix_schema
```

---

## ❌ Error: Port 3001 already in use

### Penyebab
Port sudah digunakan oleh process lain.

### Solusi 1: Ganti Port
Edit `.env`:
```env
PORT=3002
```

### Solusi 2: Kill Process (Windows)
```bash
# Cari process yang pakai port 3001
netstat -ano | findstr :3001

# Kill process (ganti <PID> dengan process ID)
taskkill /PID <PID> /F
```

### Solusi 3: Kill Process (Mac/Linux)
```bash
lsof -ti:3001 | xargs kill -9
```

---

## ❌ Error: Failed to parse private key (Firebase)

### Penyebab
Format `FIREBASE_PRIVATE_KEY` salah di `.env`.

### Solusi
Pastikan private key dalam **SATU BARIS** dengan `\n`:

**❌ SALAH:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"
```

**✅ BENAR:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

Tips: Copy langsung dari JSON file yang didownload dari Firebase.

---

## ❌ Error: Module not found (TypeScript)

### Penyebab
TypeScript tidak bisa resolve module path.

### Solusi
```bash
# Clean build
rm -rf dist
npm run build

# Atau restart dev server
npm run start:dev
```

---

## ❌ Error: Nest can't resolve dependencies

### Penyebab
Module tidak di-import dengan benar di `app.module.ts`.

### Solusi
Pastikan semua module sudah di-import:
```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FirebaseModule,
    AuthModule,
    PromoModule,
    JamaahModule,
    TrackingModule,
    AnalyticsModule,
  ],
})
```

---

## ❌ Error: 401 Unauthorized saat test API

### Penyebab
Token JWT tidak valid atau expired.

### Solusi
1. Login ulang untuk dapat token baru:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alhijrah.com","password":"admin123"}'
```

2. Copy `access_token` dari response

3. Gunakan di header:
```bash
curl http://localhost:3001/api/jamaah \
  -H "Authorization: Bearer <your-token>"
```

---

## ❌ Error: CORS policy blocked

### Penyebab
Frontend URL tidak di-allow di CORS settings.

### Solusi
Update `.env`:
```env
CORS_ORIGIN="http://localhost:3000"
```

Untuk multiple origins, edit `main.ts`:
```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
});
```

---

## ❌ Error: WebSocket connection failed

### Penyebab
WebSocket server tidak running atau URL salah.

### Solusi
1. Pastikan backend running:
```bash
npm run start:dev
```

2. Test WebSocket connection:
```javascript
const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Connected!'));
socket.on('connect_error', (err) => console.error('Error:', err));
```

3. Cek firewall tidak block port 3001

---

## 🔄 General Troubleshooting Steps

Jika mengalami error yang tidak jelas:

### 1. Clean Install
```bash
# Hapus node_modules dan cache
rm -rf node_modules package-lock.json
npm cache clean --force

# Install ulang
npm install --legacy-peer-deps

# Generate Prisma Client
npx prisma generate
```

### 2. Check Environment Variables
```bash
# Pastikan .env file ada
ls -la .env

# Cek isi .env (jangan share ke public!)
cat .env
```

### 3. Check Database Connection
```bash
# Test dengan Prisma
npx prisma db pull

# Atau buka Prisma Studio
npm run prisma:studio
```

### 4. Check Logs
```bash
# Lihat error logs di terminal
npm run start:dev

# Atau check dengan debug mode
npm run start:debug
```

### 5. Restart Everything
```bash
# Stop server (Ctrl+C)

# Restart database (jika pakai Docker)
docker-compose restart

# Start server
npm run start:dev
```

---

## 📊 Diagnostic Commands

Gunakan commands ini untuk diagnose masalah:

```bash
# Check Node version (harus 18+)
node --version

# Check npm version
npm --version

# Check Prisma version
npx prisma --version

# Check database connection
npx prisma db pull

# Check Prisma Client generated
ls node_modules/@prisma/client

# Check environment variables loaded
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"

# Test TypeScript compilation
npx tsc --noEmit

# Check for outdated packages
npm outdated
```

---

## 🆘 Still Having Issues?

1. **Check Documentation:**
   - [QUICKSTART.md](./QUICKSTART.md)
   - [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

2. **Review Error Message:**
   - Read error carefully
   - Google the exact error message
   - Check Stack Overflow

3. **Check Common Mistakes:**
   - ✅ Dependencies installed?
   - ✅ Prisma Client generated?
   - ✅ Database running?
   - ✅ .env file configured?
   - ✅ Correct Node version?

4. **Ask for Help:**
   - Provide full error message
   - Share relevant code
   - Mention what you've tried
   - Include environment info (OS, Node version, etc)

---

## 📝 Prevention Tips

Untuk menghindari error di masa depan:

1. **Always run after git pull:**
```bash
npm install --legacy-peer-deps
npx prisma generate
```

2. **Before starting development:**
```bash
# Check everything is ready
npm run build
npm run prisma:studio  # Test database
```

3. **Use consistent Node version:**
```bash
# Install nvm (Node Version Manager)
# Then use specific version
nvm use 18
```

4. **Keep dependencies updated:**
```bash
npm update --legacy-peer-deps
```

5. **Backup before major changes:**
```bash
# Backup database
npx prisma db pull > backup.prisma

# Or export data
npm run prisma:studio  # Export manually
```

---

**Semoga troubleshooting guide ini membantu! 🎉**

Jika masih ada masalah, cek [DOCS_INDEX.md](./DOCS_INDEX.md) untuk dokumentasi lengkap.
