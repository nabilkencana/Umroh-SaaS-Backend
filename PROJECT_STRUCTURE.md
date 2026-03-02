# Backend Project Structure

## 📁 Struktur Folder

```
backend/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── auth/               # Authentication module
│   │   ├── guards/         # Auth guards (JWT, Local)
│   │   ├── strategies/     # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── promo/              # Promo management
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── promo.controller.ts
│   │   ├── promo.service.ts
│   │   └── promo.module.ts
│   ├── jamaah/             # Jamaah management
│   │   ├── dto/
│   │   ├── jamaah.controller.ts
│   │   ├── jamaah.service.ts
│   │   └── jamaah.module.ts
│   ├── tracking/           # Real-time tracking
│   │   ├── tracking.gateway.ts    # WebSocket gateway
│   │   ├── tracking.controller.ts
│   │   ├── tracking.service.ts
│   │   └── tracking.module.ts
│   ├── analytics/          # Analytics & statistics
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.module.ts
│   ├── prisma/             # Prisma service
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── firebase/           # Firebase service
│   │   ├── firebase.service.ts
│   │   └── firebase.module.ts
│   ├── app.module.ts       # Main application module
│   └── main.ts             # Application entry point
├── test/                   # E2E tests
├── .env.example            # Environment variables template
├── .gitignore
├── docker-compose.yml      # PostgreSQL Docker setup
├── nest-cli.json
├── package.json
├── tsconfig.json
├── API_DOCUMENTATION.md    # API documentation
├── BACKEND_README.md       # Backend README
├── FRONTEND_INTEGRATION.md # Frontend integration guide
├── QUICKSTART.md           # Quick start guide
├── SETUP_GUIDE.md          # Detailed setup guide
└── PROJECT_STRUCTURE.md    # This file
```

## 🏗️ Architecture

### Modules

#### 1. Auth Module
- **Purpose**: User authentication & authorization
- **Features**:
  - JWT-based authentication
  - Local strategy (email/password)
  - Password hashing with bcrypt
  - Role-based access control
- **Endpoints**:
  - `POST /api/auth/login`
  - `POST /api/auth/register`

#### 2. Promo Module
- **Purpose**: Promo/campaign management
- **Features**:
  - CRUD operations for promos
  - Filter by tenant, active status, featured
  - Public access for GET, auth required for CUD
- **Endpoints**:
  - `GET /api/promo`
  - `GET /api/promo/:id`
  - `POST /api/promo` (Auth)
  - `PATCH /api/promo/:id` (Auth)
  - `DELETE /api/promo/:id` (Auth)

#### 3. Jamaah Module
- **Purpose**: Jamaah (pilgrim) management
- **Features**:
  - CRUD operations for jamaah
  - Filter by tenant, branch, status
  - All endpoints require authentication
- **Endpoints**:
  - `GET /api/jamaah` (Auth)
  - `GET /api/jamaah/:id` (Auth)
  - `POST /api/jamaah` (Auth)
  - `PATCH /api/jamaah/:id` (Auth)
  - `DELETE /api/jamaah/:id` (Auth)

#### 4. Tracking Module
- **Purpose**: Real-time location tracking
- **Features**:
  - WebSocket for real-time updates
  - Location history
  - Tenant-based rooms
- **Endpoints**:
  - `GET /api/tracking` (Auth)
  - WebSocket: `ws://localhost:3001`
- **Events**:
  - `join` - Join tenant room
  - `location_update` - Send location
  - `tracking_update` - Receive updates

#### 5. Analytics Module
- **Purpose**: Dashboard statistics
- **Features**:
  - Total tenants, jamaah, promos
  - Daily tracking count
  - Tenant-specific stats
- **Endpoints**:
  - `GET /api/analytics/dashboard` (Auth)

#### 6. Prisma Module
- **Purpose**: Database ORM
- **Features**:
  - PostgreSQL connection
  - Type-safe queries
  - Auto-generated client

#### 7. Firebase Module
- **Purpose**: Firebase integration
- **Features**:
  - Firebase Admin SDK
  - Authentication
  - Storage
  - Firestore

## 🗄️ Database Schema

### Tables

1. **tenants**
   - Multi-tenant support
   - Subscription plans
   - Max jamaah limits

2. **users**
   - Authentication
   - Role-based access
   - Tenant association

3. **branches**
   - Branch management
   - Tenant association

4. **jamaah**
   - Pilgrim information
   - Passport details
   - Status tracking

5. **promos**
   - Campaign management
   - Discount information
   - Featured promos

6. **tracking_logs**
   - Location history
   - Real-time tracking
   - Jamaah association

### Relationships

```
Tenant (1) ─── (N) User
Tenant (1) ─── (N) Branch
Tenant (1) ─── (N) Jamaah
Tenant (1) ─── (N) Promo
Tenant (1) ─── (N) TrackingLog

Branch (1) ─── (N) User
Branch (1) ─── (N) Jamaah

Jamaah (1) ─── (N) TrackingLog
```

## 🔐 Security

### Authentication
- JWT tokens with configurable expiration
- Bcrypt password hashing (10 rounds)
- Passport.js strategies

### Authorization
- Role-based access control (RBAC)
- Roles: SUPER_ADMIN, ADMIN_CABANG, PEMBIMBING, JAMAAH, KELUARGA
- Guard-protected endpoints

### Rate Limiting
- 100 requests per minute per IP
- Configurable via ThrottlerModule

### CORS
- Configurable allowed origins
- Credentials support

## 🔌 WebSocket

### Connection
```javascript
const socket = io('http://localhost:3001');
```

### Events
- **Client → Server**:
  - `join` - Join tenant room
  - `location_update` - Send location

- **Server → Client**:
  - `joined` - Join confirmation
  - `tracking_update` - Location update
  - `location_updated` - Update confirmation

## 📦 Dependencies

### Core
- `@nestjs/core` - NestJS framework
- `@nestjs/common` - Common utilities
- `@nestjs/platform-express` - Express adapter

### Database
- `@prisma/client` - Prisma ORM
- `prisma` - Prisma CLI

### Authentication
- `@nestjs/jwt` - JWT support
- `@nestjs/passport` - Passport integration
- `passport-jwt` - JWT strategy
- `passport-local` - Local strategy
- `bcrypt` - Password hashing

### WebSocket
- `@nestjs/websockets` - WebSocket support
- `@nestjs/platform-socket.io` - Socket.IO adapter
- `socket.io` - Socket.IO library

### Firebase
- `firebase-admin` - Firebase Admin SDK

### Validation
- `class-validator` - DTO validation
- `class-transformer` - Object transformation

### Configuration
- `@nestjs/config` - Configuration module
- `@nestjs/throttler` - Rate limiting

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:cov
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

### Environment Variables
- Set all required env vars
- Use secure JWT_SECRET
- Configure CORS properly
- Set NODE_ENV=production

### Database
```bash
npx prisma migrate deploy
```

## 📝 Best Practices

1. **Always use DTOs** for request validation
2. **Use guards** for authentication/authorization
3. **Use services** for business logic
4. **Use controllers** only for routing
5. **Use Prisma** for all database operations
6. **Handle errors** properly with try-catch
7. **Log important events** for debugging
8. **Test your code** before deployment
9. **Use environment variables** for configuration
10. **Document your APIs** clearly

## 🔄 Development Workflow

1. Create feature branch
2. Implement feature
3. Write tests
4. Run linter
5. Test locally
6. Create PR
7. Review & merge
8. Deploy

## 📚 Documentation Files

- **QUICKSTART.md** - Quick start in 5 minutes
- **SETUP_GUIDE.md** - Detailed setup instructions
- **API_DOCUMENTATION.md** - Complete API reference
- **FRONTEND_INTEGRATION.md** - Frontend integration guide
- **BACKEND_README.md** - Backend overview
- **PROJECT_STRUCTURE.md** - This file

## 🆘 Support

For issues or questions:
1. Check documentation files
2. Review error logs
3. Check Prisma Studio for data
4. Test with Postman/curl
5. Review NestJS documentation
