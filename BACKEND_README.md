# Backend - Umroh Management System

Backend API untuk sistem manajemen umroh menggunakan NestJS, Prisma, dan Firebase.

## 🚀 Tech Stack

- **NestJS** - Framework Node.js
- **Prisma** - ORM untuk database
- **PostgreSQL** - Database
- **Firebase Admin** - Authentication & Storage
- **JWT** - Token authentication
- **Socket.IO** - Real-time tracking
- **Passport** - Authentication middleware

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm atau yarn

## 🛠️ Installation

### Quick Start (Pilih salah satu)

#### Option 1: Supabase (Recommended untuk pemula) ⭐
```bash
npm install
# Ikuti panduan: SUPABASE_SETUP.md
npm run db:setup
npm run start:dev
```

#### Option 2: Docker
```bash
npm install
docker-compose up -d
npm run db:setup
npm run start:dev
```

#### Option 3: Local PostgreSQL
```bash
npm install
# Setup PostgreSQL dulu
npm run db:setup
npm run start:dev
```

### Panduan Lengkap

- 📖 **[QUICKSTART.md](./QUICKSTART.md)** - Start dalam 5 menit
- 🗄️ **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Setup dengan Supabase (tanpa Docker)
- 🔥 **[FIREBASE_QUICKSTART.md](./FIREBASE_QUICKSTART.md)** - Setup Firebase dalam 5 menit
- 🔥 **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Panduan Firebase lengkap
- 📚 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Setup detail semua opsi

## 🏃 Running the App

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user

### Promo
- `GET /api/promo` - Get all promos
- `GET /api/promo/:id` - Get promo by ID
- `POST /api/promo` - Create promo (Auth required)
- `PATCH /api/promo/:id` - Update promo (Auth required)
- `DELETE /api/promo/:id` - Delete promo (Auth required)

### Jamaah
- `GET /api/jamaah` - Get all jamaah (Auth required)
- `GET /api/jamaah/:id` - Get jamaah by ID (Auth required)
- `POST /api/jamaah` - Create jamaah (Auth required)
- `PATCH /api/jamaah/:id` - Update jamaah (Auth required)
- `DELETE /api/jamaah/:id` - Delete jamaah (Auth required)

### Tracking
- `GET /api/tracking` - Get tracking logs (Auth required)
- WebSocket: `ws://localhost:3001` - Real-time tracking

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats (Auth required)

## 🔌 WebSocket Events

Connect to WebSocket:
```javascript
const socket = io('http://localhost:3001');

// Join tenant room
socket.emit('join', { tenant_id: 'xxx' });

// Send location update
socket.emit('location_update', {
  tenant_id: 'xxx',
  jamaah_id: 'xxx',
  latitude: 21.4225,
  longitude: 39.8262,
  status: 'active'
});

// Listen for updates
socket.on('tracking_update', (data) => {
  console.log('New tracking update:', data);
});
```

## 🗄️ Database Schema

Lihat `prisma/schema.prisma` untuk detail schema database.

Main entities:
- Tenant
- User
- Jamaah
- Promo
- TrackingLog
- Branch

## 🔐 Authentication

API menggunakan JWT untuk authentication. Setelah login, gunakan token di header:
```
Authorization: Bearer <your-token>
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

## 📦 Project Structure

```
src/
├── auth/           # Authentication module
├── promo/          # Promo management
├── jamaah/         # Jamaah management
├── tracking/       # Real-time tracking
├── analytics/      # Analytics & stats
├── prisma/         # Prisma service
├── firebase/       # Firebase service
├── app.module.ts   # Main app module
└── main.ts         # Entry point
```

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start the server:
```bash
npm run start:prod
```

## 📝 License

UNLICENSED
