# Frontend Integration Guide

Panduan untuk mengintegrasikan backend dengan frontend Next.js.

## Setup Environment Variables

Buat file `.env.local` di folder frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

## Install Dependencies

```bash
cd frontend
npm install axios socket.io-client
```

## Create API Client

Buat file `frontend/lib/api-client.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/dashboard/login';
    }
    return Promise.reject(error);
  }
);
```

## Create Services

### Auth Service

Buat file `frontend/services/auth.service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';

export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    tenant_id: string;
  }) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    window.location.href = '/dashboard/login';
  },
};
```

### Promo Service

Buat file `frontend/services/promo.service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';
import { Promo } from '@/lib/types';

export const promoService = {
  async getAll(params?: { tenant_id?: string; is_active?: boolean }) {
    const response = await apiClient.get<Promo[]>('/promo', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<Promo>(`/promo/${id}`);
    return response.data;
  },

  async create(data: Partial<Promo>) {
    const response = await apiClient.post<Promo>('/promo', data);
    return response.data;
  },

  async update(id: string, data: Partial<Promo>) {
    const response = await apiClient.patch<Promo>(`/promo/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/promo/${id}`);
  },
};
```

### Jamaah Service

Buat file `frontend/services/jamaah.service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';
import { Jamaah } from '@/lib/types';

export const jamaahService = {
  async getAll(params?: { tenant_id?: string; status?: string }) {
    const response = await apiClient.get<Jamaah[]>('/jamaah', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<Jamaah>(`/jamaah/${id}`);
    return response.data;
  },

  async create(data: Partial<Jamaah>) {
    const response = await apiClient.post<Jamaah>('/jamaah', data);
    return response.data;
  },

  async update(id: string, data: Partial<Jamaah>) {
    const response = await apiClient.patch<Jamaah>(`/jamaah/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/jamaah/${id}`);
  },
};
```

## Create Hooks

### useAuth Hook

Buat file `frontend/hooks/useAuth.ts`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    // Verify token here if needed
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      router.push('/dashboard');
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

### useTracking Hook

Buat file `frontend/hooks/useTracking.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';

export function useTracking(tenantId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(WS_URL);

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      setConnected(true);
      newSocket.emit('join', { tenant_id: tenantId });
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    });

    newSocket.on('tracking_update', (data) => {
      setTrackingData((prev) => [data, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [tenantId]);

  const sendLocation = (
    jamaahId: string,
    latitude: number,
    longitude: number,
    status: string = 'active'
  ) => {
    if (socket && connected) {
      socket.emit('location_update', {
        tenant_id: tenantId,
        jamaah_id: jamaahId,
        latitude,
        longitude,
        status,
      });
    }
  };

  return { trackingData, sendLocation, connected };
}
```

## Update Pages

### Login Page

Update `frontend/app/dashboard/login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="surface-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-[#0F5132] text-white p-3 rounded hover:bg-[#1B5E20]"
        >
          Login
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          Default: admin@alhijrah.com / admin123
        </p>
      </form>
    </div>
  );
}
```

### Promo Admin Page

Update `frontend/app/dashboard/promo-admin/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { promoService } from '@/services/promo.service';
import { Promo } from '@/lib/types';

export default function PromoAdminPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      const data = await promoService.getAll();
      setPromos(data);
    } catch (error) {
      console.error('Failed to load promos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus promo ini?')) {
      try {
        await promoService.delete(id);
        loadPromos();
      } catch (error) {
        console.error('Failed to delete promo:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      {/* Your existing UI with real data */}
    </DashboardLayout>
  );
}
```

## Testing

1. Start backend:
```bash
cd backend
npm run start:dev
```

2. Start frontend:
```bash
cd frontend
npm run dev
```

3. Test login dengan:
   - Email: admin@alhijrah.com
   - Password: admin123

4. Test API endpoints di browser console atau Postman

## Troubleshooting

### CORS Error
Pastikan `CORS_ORIGIN` di backend `.env` sesuai dengan URL frontend.

### 401 Unauthorized
Token mungkin expired atau tidak valid. Logout dan login kembali.

### Connection Refused
Pastikan backend sudah running di port 3001.
