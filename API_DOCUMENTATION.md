# API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "tenant_id": "uuid-tenant-id",
  "role": "JAMAAH" // optional: SUPER_ADMIN, ADMIN_CABANG, PEMBIMBING, JAMAAH, KELUARGA
}
```

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "JAMAAH",
  "tenant_id": "uuid-tenant-id",
  "is_active": true,
  "created_at": "2026-03-02T00:00:00.000Z",
  "updated_at": "2026-03-02T00:00:00.000Z"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@alhijrah.com",
  "password": "admin123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@alhijrah.com",
    "name": "Admin Al-Hijrah",
    "role": "SUPER_ADMIN",
    "tenant_id": "uuid-tenant-id"
  }
}
```

## Promo Management

### Get All Promos (Public)
```http
GET /api/promo?tenant_id=xxx&is_active=true&is_featured=true
```

Response:
```json
[
  {
    "id": "uuid",
    "title": "Promo Ramadhan 2026",
    "description": "Diskon spesial...",
    "banner_image": "/images/makkah.jpg",
    "discount_percentage": 25,
    "start_date": "2026-02-01T00:00:00.000Z",
    "end_date": "2026-03-31T00:00:00.000Z",
    "tenant_id": "uuid",
    "is_featured": true,
    "is_active": true,
    "created_at": "2026-01-15T00:00:00.000Z",
    "updated_at": "2026-01-15T00:00:00.000Z"
  }
]
```

### Get Promo by ID
```http
GET /api/promo/:id
```

### Create Promo (Auth Required)
```http
POST /api/promo
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Promo Baru",
  "description": "Deskripsi promo",
  "banner_image": "/images/banner.jpg",
  "discount_percentage": 20,
  "start_date": "2026-04-01",
  "end_date": "2026-05-31",
  "tenant_id": "uuid",
  "is_featured": true,
  "is_active": true
}
```

### Update Promo (Auth Required)
```http
PATCH /api/promo/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "discount_percentage": 30
}
```

### Delete Promo (Auth Required)
```http
DELETE /api/promo/:id
Authorization: Bearer <token>
```

## Jamaah Management

### Get All Jamaah (Auth Required)
```http
GET /api/jamaah?tenant_id=xxx&branch_id=xxx&status=active
Authorization: Bearer <token>
```

Response:
```json
[
  {
    "id": "uuid",
    "tenant_id": "uuid",
    "branch_id": "uuid",
    "full_name": "Ahmad Fauzi",
    "passport_number": "A1234567",
    "phone": "+62812345678",
    "email": "ahmad@example.com",
    "address": "Jakarta",
    "status": "active",
    "created_at": "2026-01-10T00:00:00.000Z",
    "updated_at": "2026-01-10T00:00:00.000Z"
  }
]
```

### Get Jamaah by ID (Auth Required)
```http
GET /api/jamaah/:id
Authorization: Bearer <token>
```

### Create Jamaah (Auth Required)
```http
POST /api/jamaah
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "Ahmad Fauzi",
  "passport_number": "A1234567",
  "phone": "+62812345678",
  "email": "ahmad@example.com",
  "address": "Jakarta",
  "tenant_id": "uuid",
  "branch_id": "uuid" // optional
}
```

### Update Jamaah (Auth Required)
```http
PATCH /api/jamaah/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "+62898765432",
  "status": "inactive"
}
```

### Delete Jamaah (Auth Required)
```http
DELETE /api/jamaah/:id
Authorization: Bearer <token>
```

## Tracking

### Get Tracking Logs (Auth Required)
```http
GET /api/tracking?tenant_id=xxx&jamaah_id=xxx&date=2026-03-02
Authorization: Bearer <token>
```

Response:
```json
[
  {
    "id": "uuid",
    "tenant_id": "uuid",
    "jamaah_id": "uuid",
    "latitude": 21.4225,
    "longitude": 39.8262,
    "status": "active",
    "created_at": "2026-03-02T10:30:00.000Z",
    "jamaah": {
      "id": "uuid",
      "full_name": "Ahmad Fauzi",
      "passport_number": "A1234567"
    }
  }
]
```

### WebSocket Connection

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

// Join tenant room
socket.emit('join', { tenant_id: 'your-tenant-id' });

// Listen for join confirmation
socket.on('joined', (data) => {
  console.log('Joined room:', data);
});

// Send location update
socket.emit('location_update', {
  tenant_id: 'your-tenant-id',
  jamaah_id: 'jamaah-id',
  latitude: 21.4225,
  longitude: 39.8262,
  status: 'active'
});

// Listen for location updates
socket.on('tracking_update', (data) => {
  console.log('New tracking update:', data);
});

// Listen for update confirmation
socket.on('location_updated', (data) => {
  console.log('Location updated:', data);
});
```

## Analytics

### Get Dashboard Stats (Auth Required)
```http
GET /api/analytics/dashboard?tenant_id=xxx
Authorization: Bearer <token>
```

Response:
```json
{
  "total_tenants": 10,
  "total_jamaah": 250,
  "active_promos": 5,
  "tracking_today": 120
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password should not be empty"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Rate Limiting

- 100 requests per minute per IP
- Headers included in response:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets

## CORS

Allowed origins configured in `.env`:
```
CORS_ORIGIN="http://localhost:3000"
```

For multiple origins, modify `main.ts`:
```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
});
```
