# 🔥 Firebase Setup Guide

Panduan lengkap cara mendapatkan Firebase credentials untuk backend.

## 🎯 Apa itu Firebase?

Firebase adalah platform dari Google yang menyediakan:
- **Authentication** - Login dengan Google, Facebook, Email, dll
- **Storage** - Upload file (foto, dokumen, dll)
- **Firestore** - NoSQL database (opsional, kita sudah pakai PostgreSQL)
- **Cloud Messaging** - Push notifications

Untuk project ini, Firebase digunakan untuk:
1. **File Upload** - Upload foto promo, dokumen jamaah
2. **Authentication** (opsional) - Bisa pakai JWT atau Firebase Auth

## 📋 Langkah-langkah Setup

### 1. Buat Akun Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com)
2. Login dengan akun Google Anda
3. Jika belum punya akun Google, buat dulu di [google.com](https://accounts.google.com/signup)

### 2. Buat Project Baru

1. Di Firebase Console, klik **"Add project"** atau **"Create a project"**
2. Isi nama project: `umroh-management` (atau nama lain)
3. Klik **Continue**
4. **Google Analytics**: 
   - Bisa diaktifkan atau tidak (optional)
   - Untuk development, bisa di-disable
   - Klik **Continue**
5. Tunggu beberapa detik sampai project dibuat
6. Klik **Continue** untuk masuk ke dashboard

### 3. Dapatkan Service Account Key

Ini adalah credentials yang dibutuhkan backend untuk akses Firebase.

#### Step by Step:

1. **Di Firebase Console**, klik icon **⚙️ (Settings)** di samping "Project Overview"
2. Pilih **"Project settings"**
3. Pilih tab **"Service accounts"** (di bagian atas)
4. Scroll ke bawah, Anda akan melihat:
   - **Firebase Admin SDK**
   - Pilih bahasa: **Node.js**
5. Klik tombol **"Generate new private key"**
6. Akan muncul popup konfirmasi, klik **"Generate key"**
7. File JSON akan otomatis terdownload ke komputer Anda
   - Nama file: `umroh-management-xxxxx-firebase-adminsdk-xxxxx.json`

### 4. Extract Credentials dari JSON

Buka file JSON yang didownload dengan text editor (Notepad, VS Code, dll).

File JSON akan terlihat seperti ini:

```json
{
  "type": "service_account",
  "project_id": "umroh-management-xxxxx",
  "private_key_id": "xxxxxxxxxxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@umroh-management-xxxxx.iam.gserviceaccount.com",
  "client_id": "xxxxxxxxxxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40umroh-management-xxxxx.iam.gserviceaccount.com"
}
```

**Yang Anda butuhkan:**
- `project_id` → untuk `FIREBASE_PROJECT_ID`
- `private_key` → untuk `FIREBASE_PRIVATE_KEY`
- `client_email` → untuk `FIREBASE_CLIENT_EMAIL`

### 5. Update File `.env`

Copy credentials ke file `.env` di folder backend:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID="umroh-management-xxxxx"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@umroh-management-xxxxx.iam.gserviceaccount.com"
```

**⚠️ PENTING:**
- `FIREBASE_PRIVATE_KEY` harus dalam satu baris dengan `\n` untuk newline
- Jangan hapus `-----BEGIN PRIVATE KEY-----` dan `-----END PRIVATE KEY-----`
- Gunakan double quotes `"` untuk wrap value

**Contoh yang BENAR:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Contoh yang SALAH:**
```env
# ❌ Salah - multi-line tidak akan work
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"
```

### 6. Setup Firebase Storage (Opsional)

Jika ingin upload file (foto promo, dokumen jamaah):

1. Di Firebase Console, klik **"Storage"** di sidebar
2. Klik **"Get started"**
3. Pilih mode:
   - **Production mode** (recommended untuk development)
   - Klik **Next**
4. Pilih location: **asia-southeast1 (Singapore)**
5. Klik **Done**

Storage bucket Anda: `umroh-management-xxxxx.appspot.com`

### 7. Setup Firebase Authentication (Opsional)

Jika ingin pakai Firebase Auth (selain JWT):

1. Di Firebase Console, klik **"Authentication"** di sidebar
2. Klik **"Get started"**
3. Pilih **"Sign-in method"** tab
4. Enable provider yang diinginkan:
   - **Email/Password** - Login dengan email
   - **Google** - Login dengan Google
   - **Facebook** - Login dengan Facebook
   - dll

## ✅ Verifikasi Setup

### Test Connection

Restart backend server:
```bash
npm run start:dev
```

Jika tidak ada error, Firebase sudah terkoneksi! ✅

### Test Upload File (Opsional)

Buat endpoint test di `src/app.controller.ts`:

```typescript
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from './firebase/firebase.service';

@Controller()
export class AppController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const bucket = this.firebaseService.getStorage().bucket();
    const fileName = `uploads/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    const [url] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return { url, fileName };
  }
}
```

Test dengan Postman atau curl:
```bash
curl -X POST http://localhost:3001/upload \
  -F "file=@/path/to/image.jpg"
```

## 🔐 Security Best Practices

### 1. Jangan Commit Credentials

**JANGAN** commit file berikut ke Git:
- `.env` file
- Firebase service account JSON file

Pastikan ada di `.gitignore`:
```
.env
.env.local
*.json
firebase-adminsdk-*.json
```

### 2. Gunakan Environment Variables

Untuk production, gunakan environment variables dari hosting provider:
- Vercel: Environment Variables
- Heroku: Config Vars
- AWS: Parameter Store
- Google Cloud: Secret Manager

### 3. Rotate Keys Regularly

Jika credentials bocor:
1. Buka Firebase Console
2. Project Settings > Service Accounts
3. Manage service account permissions
4. Delete old key
5. Generate new key

### 4. Set Storage Rules

Edit Firebase Storage rules untuk security:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{allPaths=**} {
      // Only authenticated users can upload
      allow write: if request.auth != null;
      // Anyone can read
      allow read: if true;
    }
  }
}
```

## 🎯 Use Cases

### 1. Upload Foto Promo

```typescript
// promo.service.ts
async uploadPromoBanner(file: Express.Multer.File) {
  const bucket = this.firebaseService.getStorage().bucket();
  const fileName = `promos/${Date.now()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  const [url] = await fileUpload.getSignedUrl({
    action: 'read',
    expires: '03-01-2500',
  });

  return url;
}
```

### 2. Upload Dokumen Jamaah

```typescript
// jamaah.service.ts
async uploadPassport(jamaahId: string, file: Express.Multer.File) {
  const bucket = this.firebaseService.getStorage().bucket();
  const fileName = `jamaah/${jamaahId}/passport_${Date.now()}.pdf`;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  return fileName;
}
```

### 3. Firebase Auth Integration

```typescript
// auth.service.ts
async verifyFirebaseToken(token: string) {
  try {
    const decodedToken = await this.firebaseService.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException('Invalid Firebase token');
  }
}
```

## 🆓 Firebase Free Tier (Spark Plan)

- **Storage**: 5 GB
- **Downloads**: 1 GB/day
- **Uploads**: 20,000/day
- **Authentication**: Unlimited users
- **Firestore**: 1 GB storage, 50K reads/day

Sangat cukup untuk development dan small apps!

## 📊 Monitor Usage

1. Firebase Console > Usage and billing
2. Lihat usage untuk:
   - Storage
   - Authentication
   - Bandwidth
3. Set budget alerts jika perlu

## 🔄 Alternative: Supabase Storage

Jika tidak mau pakai Firebase, Supabase juga punya Storage:

```typescript
// Dengan Supabase Storage
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Upload file
const { data, error } = await supabase.storage
  .from('uploads')
  .upload('file.jpg', file);
```

## 🆘 Troubleshooting

### Error: "Failed to parse private key"

**Penyebab:** Format `FIREBASE_PRIVATE_KEY` salah

**Solusi:**
1. Pastikan private key dalam satu baris
2. Gunakan `\n` untuk newline
3. Wrap dengan double quotes

### Error: "Project not found"

**Penyebab:** `FIREBASE_PROJECT_ID` salah

**Solusi:** Cek kembali project ID di Firebase Console

### Error: "Permission denied"

**Penyebab:** Service account tidak punya permission

**Solusi:**
1. Firebase Console > IAM & Admin
2. Pastikan service account punya role "Firebase Admin"

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Storage Guide](https://firebase.google.com/docs/storage)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)

---

## 🎉 Summary

Untuk mendapatkan Firebase credentials:

1. ✅ Buat project di [Firebase Console](https://console.firebase.google.com)
2. ✅ Generate Service Account Key (JSON file)
3. ✅ Extract `project_id`, `private_key`, `client_email`
4. ✅ Copy ke `.env` file
5. ✅ Restart backend server

**Firebase siap digunakan untuk upload file dan authentication!** 🔥
