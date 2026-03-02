# 🚀 Quick Reference Guide

## Start Backend

```bash
cd backend
npm run start:dev
```

Server: `http://localhost:3001`

## Default Login

```
Email: admin@alhijrah.com
Password: admin123
```

## Quick Test Commands

### Test Promo (Public)
```powershell
curl http://localhost:3001/api/promo
```

### Test Login
```powershell
$body = @{ email = "admin@alhijrah.com"; password = "admin123" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

### Test WebSocket
```bash
node test-websocket.js
```

## Database Commands

```bash
# Open Prisma Studio (GUI)
npm run prisma:studio

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# All-in-one setup
npm run db:setup
```

## Useful URLs

- **API Base:** http://localhost:3001/api
- **Prisma Studio:** http://localhost:5555
- **Supabase Dashboard:** https://supabase.com/dashboard

## Environment Variables

Located in: `backend/.env`

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="your-secret"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

## Documentation Files

- **QUICKSTART.md** - Start in 5 minutes
- **API_DOCUMENTATION.md** - Complete API reference
- **FRONTEND_INTEGRATION.md** - Frontend integration
- **FINAL_TEST_SUMMARY.md** - All test results
- **TROUBLESHOOTING.md** - Common issues

## Quick Troubleshooting

### Server not starting?
```bash
# Check port
netstat -ano | findstr :3001

# Restart server
# Ctrl+C then npm run start:dev
```

### Database connection error?
```bash
# Test connection
npx prisma db pull

# Check .env file
cat .env
```

### Prisma Client error?
```bash
npm run prisma:generate
```

---

**Need help? Check TROUBLESHOOTING.md or DOCS_INDEX.md**
