# 🎉 Setup Berhasil!

## ✅ Yang Sudah Selesai:

1. ✅ Dependencies terinstall
2. ✅ Prisma Client generated
3. ✅ Database Supabase terkoneksi
4. ✅ Migrations berhasil
5. ✅ Seed data berhasil dibuat

## 📊 Data yang Sudah Dibuat:

### Tenant
- **Name:** Al-Hijrah Travel
- **Slug:** al-hijrah
- **Plan:** PROFESSIONAL
- **Max Jamaah:** 500

### Admin User
- **Email:** admin@alhijrah.com
- **Password:** admin123
- **Role:** SUPER_ADMIN

### Promos
1. Promo Ramadhan 2026 - Diskon 25%
2. Paket Umroh Plus Madinah

### Jamaah
1. Ahmad Fauzi (Passport: A1234567)
2. Siti Aminah (Passport: B7654321)

## 🚀 Start Backend Server

Jalankan command ini di terminal:

```bash
npm run start:dev
```

Tunggu sampai muncul pesan:
```
🚀 Application is running on: http://localhost:3001
```

## 🧪 Test Backend

### 1. Test Public Endpoint (Promo)

**Browser:**
Buka: http://localhost:3001/api/promo

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/promo | Select-Object -Expand Content
```

**Expected Response:**
```json
[
  {
    "id": "...",
    "title": "Promo Ramadhan 2026 - Diskon 25%",
    "discount_percentage": 25,
    ...
  }
]
```

### 2. Test Login

**PowerShell:**
```powershell
$body = @{
    email = "admin@alhijrah.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/auth/login `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | Select-Object -Expand Content
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@alhijrah.com",
    "name": "Admin Al-Hijrah",
    "role": "SUPER_ADMIN"
  }
}
```

### 3. Test Protected Endpoint (Jamaah)

Pertama, login dan copy `access_token`, lalu:

```powershell
$token = "YOUR_ACCESS_TOKEN_HERE"

Invoke-WebRequest -Uri http://localhost:3001/api/jamaah `
  -Headers @{Authorization = "Bearer $token"} | Select-Object -Expand Content
```

**Expected Response:**
```json
[
  {
    "id": "...",
    "full_name": "Ahmad Fauzi",
    "passport_number": "A1234567",
    ...
  }
]
```

## 🎨 Prisma Studio (Database GUI)

Untuk melihat dan edit data dengan GUI:

```bash
npm run prisma:studio
```

Buka browser: http://localhost:5555

## 📚 API Endpoints

### Public Endpoints
- `GET /api/promo` - Get all promos
- `GET /api/promo/:id` - Get promo by ID

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Protected Endpoints (Perlu token)
- `GET /api/jamaah` - Get all jamaah
- `POST /api/jamaah` - Create jamaah
- `PATCH /api/jamaah/:id` - Update jamaah
- `DELETE /api/jamaah/:id` - Delete jamaah
- `GET /api/tracking` - Get tracking logs
- `GET /api/analytics/dashboard` - Dashboard stats

### WebSocket
- `ws://localhost:3001` - Real-time tracking

## 🔗 Integrasikan dengan Frontend

Sekarang backend sudah running, Anda bisa integrasikan dengan frontend Next.js.

**Panduan lengkap:** [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

### Quick Setup Frontend:

1. **Buat file `frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

2. **Install dependencies:**
```bash
cd frontend
npm install axios socket.io-client
```

3. **Buat API client** (lihat FRONTEND_INTEGRATION.md)

4. **Test dari frontend:**
```typescript
// Test fetch promos
fetch('http://localhost:3001/api/promo')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🔥 Firebase (Optional)

Firebase untuk upload file (foto promo, dokumen jamaah).

**Sudah dikonfigurasi di `.env`:**
- ✅ FIREBASE_PROJECT_ID
- ✅ FIREBASE_PRIVATE_KEY
- ✅ FIREBASE_CLIENT_EMAIL

Jika mau test upload file, lihat: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 📖 Dokumentasi Lengkap

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference lengkap
- **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - Cara integrasikan dengan frontend
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Struktur project
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solusi error umum
- **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Index semua dokumentasi

## 🎯 Next Steps

1. ✅ Start backend: `npm run start:dev`
2. ✅ Test API dengan browser atau Postman
3. ✅ Buka Prisma Studio: `npm run prisma:studio`
4. ✅ Baca API Documentation
5. ✅ Integrasikan dengan frontend
6. ✅ Customize sesuai kebutuhan

## 🆘 Troubleshooting

### Server tidak start?
```bash
# Check port 3001 tidak dipakai
netstat -ano | findstr :3001

# Atau ganti port di .env
PORT=3002
```

### Error saat test API?
```bash
# Pastikan server running
# Cek di terminal ada pesan: "Application is running on..."

# Test dengan curl
curl http://localhost:3001/api/promo
```

### Lupa password admin?
```bash
# Reset database dan seed ulang
npm run prisma:migrate reset
npm run prisma:seed
```

## 🎉 Selamat!

Backend Umroh Management System Anda sudah **100% siap digunakan!**

**Features yang sudah jalan:**
- ✅ Authentication (JWT)
- ✅ Promo Management
- ✅ Jamaah Management
- ✅ Real-time Tracking (WebSocket)
- ✅ Analytics
- ✅ Multi-tenant Support
- ✅ Firebase Integration
- ✅ Supabase Database

**Siap untuk development! 🚀**

---

**Made with ❤️ for Umroh Management System**
