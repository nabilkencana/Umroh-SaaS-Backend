# 📚 Documentation Index

Panduan lengkap untuk backend Umroh Management System.

## 🚀 Getting Started (Mulai di sini!)

Baru pertama kali? Mulai dari sini:

1. **[README.md](./README.md)** - Overview project
2. **[QUICKSTART.md](./QUICKSTART.md)** - Start dalam 5 menit
3. **[DATABASE_OPTIONS.md](./DATABASE_OPTIONS.md)** - Pilih database yang cocok

## 🗄️ Database Setup

Pilih salah satu sesuai kebutuhan:

### Untuk Pemula (Recommended)
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** ⭐ - Setup tanpa Docker (5 menit)

### Untuk yang Sudah Familiar
- **[QUICKSTART.md](./QUICKSTART.md)** - Docker setup (10 menit)
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Local PostgreSQL (15-30 menit)

### Perbandingan
- **[DATABASE_OPTIONS.md](./DATABASE_OPTIONS.md)** - Comparison & recommendations

## 🔥 Firebase Setup

Untuk file upload dan authentication:

- **[FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)** ⭐ - Quick setup (5 menit)
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Detailed guide dengan troubleshooting

## 📖 API Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
  - Authentication endpoints
  - Promo management
  - Jamaah management
  - Tracking (WebSocket)
  - Analytics
  - Error responses
  - Rate limiting

## 🔗 Frontend Integration

- **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - Cara integrasikan dengan Next.js
  - API client setup
  - Service layer
  - Custom hooks
  - Example implementations

## 🏗️ Architecture & Structure

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Project architecture
  - Folder structure
  - Module descriptions
  - Database schema
  - Dependencies
  - Best practices

## ✅ Implementation Status

- **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - What's done & what's next
  - Completed features
  - Optional enhancements
  - Production readiness
  - Integration checklist

## 📋 Quick Reference

### Setup Commands

```bash
# Install
npm install

# Database setup (all-in-one)
npm run db:setup

# Development
npm run start:dev

# Database management
npm run prisma:studio      # GUI
npm run prisma:migrate     # Migrations
npm run prisma:seed        # Seed data
```

### Environment Variables

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Firebase (optional)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@..."

# App
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### Default Login

```
Email: admin@alhijrah.com
Password: admin123
```

## 🎯 Use Case Guides

### Scenario 1: Pemula Baru Belajar Backend

1. Baca [README.md](./README.md) untuk overview
2. Ikuti [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) untuk database
3. Skip Firebase dulu (optional)
4. Test API dengan [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
5. Integrasikan dengan frontend via [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

### Scenario 2: Developer Berpengalaman

1. Skim [README.md](./README.md)
2. Pilih database di [DATABASE_OPTIONS.md](./DATABASE_OPTIONS.md)
3. Quick setup via [QUICKSTART.md](./QUICKSTART.md)
4. Setup Firebase via [FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)
5. Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
6. Start coding!

### Scenario 3: Production Deployment

1. Review [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)
2. Setup production database (Supabase/AWS RDS)
3. Setup Firebase production project
4. Configure environment variables
5. Run migrations: `npx prisma migrate deploy`
6. Deploy to hosting (Vercel, Railway, etc)

### Scenario 4: Troubleshooting

1. Check specific guide untuk error Anda:
   - Database: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) atau [SETUP_GUIDE.md](./SETUP_GUIDE.md)
   - Firebase: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - API: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. Review error logs di terminal
3. Test dengan Prisma Studio: `npm run prisma:studio`
4. Test API dengan Postman/curl

## 📊 Documentation Map

```
📚 DOCS_INDEX.md (You are here)
│
├─ 🚀 Getting Started
│  ├─ README.md
│  ├─ QUICKSTART.md
│  └─ DATABASE_OPTIONS.md
│
├─ 🗄️ Database Setup
│  ├─ SUPABASE_SETUP.md (Recommended)
│  ├─ SETUP_GUIDE.md (All options)
│  └─ docker-compose.yml
│
├─ 🔥 Firebase Setup
│  ├─ FIREBASE_QUICKSTART.md
│  └─ FIREBASE_SETUP.md
│
├─ 📖 API & Integration
│  ├─ API_DOCUMENTATION.md
│  └─ FRONTEND_INTEGRATION.md
│
├─ 🏗️ Architecture
│  ├─ PROJECT_STRUCTURE.md
│  └─ IMPLEMENTATION_CHECKLIST.md
│
└─ 📝 Configuration
   ├─ .env.example
   ├─ prisma/schema.prisma
   └─ package.json
```

## 🔍 Find What You Need

### "Saya mau setup database"
→ [DATABASE_OPTIONS.md](./DATABASE_OPTIONS.md) → Pilih yang cocok

### "Saya mau setup Firebase"
→ [FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)

### "Saya mau lihat API endpoints"
→ [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### "Saya mau integrasikan dengan frontend"
→ [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

### "Saya mau tahu struktur project"
→ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### "Saya ada error"
→ Cek troubleshooting di guide yang relevan

### "Saya mau deploy ke production"
→ [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) - Production Readiness

## 💡 Tips

### Untuk Pemula
1. Jangan overwhelmed dengan banyaknya docs
2. Mulai dari [QUICKSTART.md](./QUICKSTART.md)
3. Pakai Supabase untuk database (paling mudah)
4. Skip Firebase dulu kalau belum butuh upload file
5. Test API satu-satu dengan Postman

### Untuk Developer Berpengalaman
1. Skim semua docs untuk overview
2. Fokus ke [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
4. Customize sesuai kebutuhan

### Best Practices
1. Selalu baca error messages dengan teliti
2. Test di Prisma Studio untuk debug database
3. Gunakan Postman untuk test API
4. Commit `.env.example`, jangan commit `.env`
5. Backup database sebelum migration

## 🆘 Need Help?

1. **Cek dokumentasi** yang relevan di atas
2. **Review error logs** di terminal
3. **Test dengan tools:**
   - Prisma Studio: `npm run prisma:studio`
   - Postman/curl untuk API
4. **Check common issues:**
   - Connection string salah
   - Environment variables tidak di-load
   - Port sudah dipakai
   - Prisma Client belum di-generate

## 🎓 Learning Path

### Week 1: Setup & Basics
- [ ] Setup database (Supabase)
- [ ] Run backend
- [ ] Test authentication
- [ ] Test CRUD operations

### Week 2: Integration
- [ ] Setup Firebase
- [ ] Integrate dengan frontend
- [ ] Test real-time tracking
- [ ] Test file upload

### Week 3: Advanced
- [ ] Customize untuk kebutuhan
- [ ] Add new features
- [ ] Optimize performance
- [ ] Prepare for production

### Week 4: Production
- [ ] Security audit
- [ ] Setup monitoring
- [ ] Deploy to production
- [ ] Setup CI/CD

## 📞 Support

Jika masih ada pertanyaan setelah membaca docs:

1. Review docs sekali lagi (mungkin terlewat)
2. Check GitHub issues (jika ada)
3. Ask di community forum
4. Contact maintainer

---

## 🎉 Ready to Start?

Pilih starting point Anda:

- **Pemula:** [QUICKSTART.md](./QUICKSTART.md) + [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Experienced:** [README.md](./README.md) + [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Production:** [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)

**Happy Coding! 🚀**
