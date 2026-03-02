# 🚀 Setup Sekarang - Pilih Database Anda

File `.env` sudah dibuat! Sekarang pilih database yang ingin Anda gunakan.

## ⭐ Option 1: Supabase (RECOMMENDED - Paling Mudah)

### Kenapa Supabase?
- ✅ Tidak perlu install apapun
- ✅ Setup cuma 5 menit
- ✅ Gratis 500MB
- ✅ Sudah production-ready

### Langkah Setup:

1. **Buat akun di [supabase.com](https://supabase.com)**

2. **Buat project baru:**
   - Klik "New Project"
   - Name: `umroh-backend`
   - Database Password: Buat password kuat (SIMPAN!)
   - Region: **Southeast Asia (Singapore)**
   - Klik "Create new project"
   - Tunggu ~2 menit

3. **Dapatkan Connection String:**
   - Klik icon ⚙️ **Settings** (kiri bawah)
   - Pilih **Database**
   - Scroll ke **Connection string**
   - Pilih tab **URI**
   - Copy connection string
   - Ganti `[YOUR-PASSWORD]` dengan password Anda

4. **Update file `.env`:**

Buka file `backend/.env` dan ganti bagian database:

```env
# Comment/hapus yang Docker (tambahkan # di depan)
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/umroh_db?schema=public"
# DIRECT_URL="postgresql://postgres:postgres@localhost:5432/umroh_db?schema=public"

# Uncomment dan isi dengan connection string Supabase
DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**Contoh (ganti dengan punya Anda):**
```env
DATABASE_URL="postgresql://postgres:MySecurePass123@db.abcdefghijk.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:MySecurePass123@db.abcdefghijk.supabase.co:5432/postgres"
```

5. **Setup Database:**
```bash
npm run db:setup
```

6. **Start Server:**
```bash
npm run start:dev
```

✅ **Done! Backend running di http://localhost:3001**

---

## 🐳 Option 2: Docker (Jika Sudah Familiar)

### Prerequisites:
- Docker Desktop terinstall

### Langkah Setup:

1. **Start PostgreSQL dengan Docker:**
```bash
docker-compose up -d
```

2. **File `.env` sudah OK** (default sudah untuk Docker)

3. **Setup Database:**
```bash
npm run db:setup
```

4. **Start Server:**
```bash
npm run start:dev
```

✅ **Done! Backend running di http://localhost:3001**

---

## 💻 Option 3: Local PostgreSQL (Advanced)

### Prerequisites:
- PostgreSQL 14+ terinstall

### Langkah Setup:

1. **Buat Database:**
```bash
# Login ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE umroh_db;

# Exit
\q
```

2. **Update `.env`:**
```env
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/umroh_db?schema=public"
DIRECT_URL="postgresql://postgres:your-password@localhost:5432/umroh_db?schema=public"
```

Ganti `your-password` dengan password PostgreSQL Anda.

3. **Setup Database:**
```bash
npm run db:setup
```

4. **Start Server:**
```bash
npm run start:dev
```

✅ **Done! Backend running di http://localhost:3001**

---

## 🧪 Test Backend

Setelah server running, test dengan:

### 1. Test Public Endpoint
```bash
curl http://localhost:3001/api/promo
```

Atau buka di browser: http://localhost:3001/api/promo

### 2. Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@alhijrah.com\",\"password\":\"admin123\"}"
```

### 3. Buka Prisma Studio (Database GUI)
```bash
npm run prisma:studio
```

Buka browser: http://localhost:5555

---

## 🔥 Setup Firebase (Optional)

Firebase digunakan untuk upload file (foto promo, dokumen jamaah).

Untuk sekarang, bisa **SKIP dulu**. Setup nanti saat butuh upload file.

Jika mau setup sekarang, ikuti: [FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)

---

## ❓ FAQ

### Q: Saya pilih yang mana?

**A:** Untuk pemula, pilih **Supabase** (Option 1). Paling mudah dan cepat.

### Q: Apakah bisa ganti database nanti?

**A:** Bisa! Tinggal export data, ganti connection string, import data.

### Q: Apakah harus setup Firebase sekarang?

**A:** Tidak. Firebase optional untuk upload file. Bisa setup nanti.

### Q: Error saat `npm run db:setup`?

**A:** Cek [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) untuk solusi.

---

## 📚 Next Steps

Setelah backend running:

1. ✅ Test API dengan Postman atau curl
2. ✅ Buka Prisma Studio untuk lihat data
3. ✅ Baca [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
4. ✅ Integrasikan dengan frontend - [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

---

## 🆘 Need Help?

- **Database issues:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **General errors:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Firebase setup:** [FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)
- **All docs:** [DOCS_INDEX.md](./DOCS_INDEX.md)

---

**Selamat! Anda sudah siap untuk development! 🎉**
