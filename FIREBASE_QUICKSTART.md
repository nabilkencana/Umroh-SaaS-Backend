# 🔥 Firebase Quick Start (5 Menit)

Panduan super cepat untuk setup Firebase.

## 🎯 Yang Anda Butuhkan

3 informasi dari Firebase:
1. **Project ID** - ID project Firebase Anda
2. **Private Key** - Kunci rahasia untuk akses Firebase
3. **Client Email** - Email service account

## 📝 Langkah Cepat

### 1️⃣ Buka Firebase Console

Kunjungi: [console.firebase.google.com](https://console.firebase.google.com)

Login dengan akun Google Anda.

### 2️⃣ Buat Project

1. Klik **"Add project"**
2. Nama: `umroh-management`
3. Klik **Continue** → **Continue** → **Continue**
4. Tunggu sampai selesai

### 3️⃣ Download Credentials

1. Klik icon **⚙️** (Settings) di samping "Project Overview"
2. Pilih **"Project settings"**
3. Tab **"Service accounts"**
4. Klik **"Generate new private key"**
5. Klik **"Generate key"**
6. File JSON akan terdownload ✅

### 4️⃣ Buka File JSON

Buka file yang didownload dengan Notepad atau VS Code.

Cari 3 informasi ini:

```json
{
  "project_id": "umroh-management-xxxxx",           ← Copy ini
  "private_key": "-----BEGIN PRIVATE KEY-----\n...", ← Copy ini (semua)
  "client_email": "firebase-adminsdk-xxxxx@..."     ← Copy ini
}
```

### 5️⃣ Copy ke `.env`

Buka file `backend/.env` dan paste:

```env
FIREBASE_PROJECT_ID="umroh-management-xxxxx"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@umroh-management-xxxxx.iam.gserviceaccount.com"
```

**⚠️ PENTING:** 
- Private key harus dalam **SATU BARIS**
- Jangan hapus `\n` (itu untuk newline)
- Gunakan **double quotes** `"`

### 6️⃣ Restart Server

```bash
npm run start:dev
```

Jika tidak ada error → **Firebase sudah terkoneksi!** ✅

## 🎨 Visual Guide

```
Firebase Console
    ↓
⚙️ Settings
    ↓
Service Accounts
    ↓
Generate new private key
    ↓
Download JSON file
    ↓
Copy 3 values ke .env
    ↓
Restart server
    ↓
✅ Done!
```

## ❓ FAQ

### Q: Apakah Firebase wajib?

**A:** Tidak wajib untuk development awal. Firebase digunakan untuk:
- Upload file (foto promo, dokumen)
- Authentication (opsional, kita sudah pakai JWT)

Anda bisa skip dulu dan setup nanti saat butuh upload file.

### Q: Apakah Firebase gratis?

**A:** Ya! Free tier sangat generous:
- 5 GB storage
- 1 GB download/day
- Unlimited authentication

### Q: Bagaimana cara test Firebase sudah connect?

**A:** Jika server start tanpa error, berarti sudah connect. Atau test dengan:

```bash
# Di terminal backend
node -e "
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'your-project-id',
    privateKey: 'your-private-key'.replace(/\\\\n/g, '\n'),
    clientEmail: 'your-client-email'
  })
});
console.log('✅ Firebase connected!');
"
```

### Q: Error "Failed to parse private key"?

**A:** Format private key salah. Pastikan:
1. Dalam satu baris
2. Ada `\n` untuk newline
3. Pakai double quotes

**Benar:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

**Salah:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQI...
-----END PRIVATE KEY-----"
```

### Q: Bisa pakai Supabase Storage saja?

**A:** Bisa! Supabase juga punya Storage. Tapi Firebase lebih mature dan banyak fitur.

## 🔗 Resources

- **Panduan Lengkap:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Supabase Alternative:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🎯 Next Steps

Setelah Firebase setup:

1. ✅ Test upload file
2. ✅ Integrate dengan frontend
3. ✅ Setup Storage rules untuk security
4. ✅ Monitor usage di Firebase Console

---

**Firebase setup selesai dalam 5 menit! 🔥**

Jika ada masalah, lihat [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) untuk troubleshooting lengkap.
