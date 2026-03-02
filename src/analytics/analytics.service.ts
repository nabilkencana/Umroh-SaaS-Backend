import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getDashboardStats(tenant_id?: string) {
        const where = tenant_id ? { tenant_id } : {};

        const [total_tenants, total_jamaah, active_promos, tracking_today] = await Promise.all([
            this.prisma.tenant.count({ where: { is_active: true } }),
            this.prisma.jamaah.count({ where }),
            this.prisma.promo.count({ where: { ...where, is_active: true } }),
            this.prisma.trackingLog.count({
                where: {
                    ...where,
                    created_at: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),
        ]);

        return {
            total_tenants,
            total_jamaah,
            active_promos,
            tracking_today,
        };
    }
}
