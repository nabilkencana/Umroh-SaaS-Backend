import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create tenant
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'al-hijrah' },
        update: {},
        create: {
            name: 'Al-Hijrah Travel',
            slug: 'al-hijrah',
            subscription_plan: 'PROFESSIONAL',
            max_jamaah: 500,
            is_active: true,
        },
    });
    console.log('✅ Tenant created:', tenant.name);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@alhijrah.com' },
        update: {},
        create: {
            email: 'admin@alhijrah.com',
            password: hashedPassword,
            name: 'Admin Al-Hijrah',
            role: 'SUPER_ADMIN',
            tenant_id: tenant.id,
            is_active: true,
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Create promos
    const promo1 = await prisma.promo.create({
        data: {
            title: 'Promo Ramadhan 2026 - Diskon 25%',
            description: 'Dapatkan diskon spesial untuk paket umroh Ramadhan. Fasilitas lengkap dengan hotel bintang 5 dekat Masjid al-Haram.',
            banner_image: '/images/makkah-hero.jpg',
            discount_percentage: 25,
            start_date: new Date('2026-02-01'),
            end_date: new Date('2026-03-31'),
            is_featured: true,
            is_active: true,
            tenant_id: tenant.id,
        },
    });

    const promo2 = await prisma.promo.create({
        data: {
            title: 'Paket Umroh Plus Madinah',
            description: 'Nikmati perjalanan spiritual ke Makkah dan Madinah dengan bimbingan ustadz berpengalaman.',
            banner_image: '/images/madinah.jpg',
            discount_percentage: 15,
            start_date: new Date('2026-03-01'),
            end_date: new Date('2026-06-30'),
            is_featured: true,
            is_active: true,
            tenant_id: tenant.id,
        },
    });

    console.log('✅ Promos created:', promo1.title, promo2.title);

    // Create jamaah
    const jamaah1 = await prisma.jamaah.create({
        data: {
            full_name: 'Ahmad Fauzi',
            passport_number: 'A1234567',
            phone: '+62812345678',
            email: 'ahmad@example.com',
            status: 'active',
            tenant_id: tenant.id,
        },
    });

    const jamaah2 = await prisma.jamaah.create({
        data: {
            full_name: 'Siti Aminah',
            passport_number: 'B7654321',
            phone: '+62823456789',
            email: 'siti@example.com',
            status: 'active',
            tenant_id: tenant.id,
        },
    });

    console.log('✅ Jamaah created:', jamaah1.full_name, jamaah2.full_name);

    console.log('🎉 Seed completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Email: admin@alhijrah.com');
    console.log('Password: admin123');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
