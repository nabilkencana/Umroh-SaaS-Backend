import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackingService {
    constructor(private prisma: PrismaService) { }

    async findAll(query?: { tenant_id?: string; jamaah_id?: string; date?: string }) {
        const where: any = {};

        if (query?.tenant_id) {
            where.tenant_id = query.tenant_id;
        }

        if (query?.jamaah_id) {
            where.jamaah_id = query.jamaah_id;
        }

        if (query?.date) {
            const startDate = new Date(query.date);
            const endDate = new Date(query.date);
            endDate.setDate(endDate.getDate() + 1);

            where.created_at = {
                gte: startDate,
                lt: endDate,
            };
        }

        return this.prisma.trackingLog.findMany({
            where,
            include: {
                jamaah: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async create(data: {
        tenant_id: string;
        jamaah_id: string;
        latitude: number;
        longitude: number;
        status: string;
    }) {
        return this.prisma.trackingLog.create({
            data,
            include: {
                jamaah: true,
            },
        });
    }
}
