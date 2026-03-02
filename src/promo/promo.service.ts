import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';

@Injectable()
export class PromoService {
    constructor(private prisma: PrismaService) { }

    async findAll(query?: { tenant_id?: string; is_active?: boolean; is_featured?: boolean }) {
        return this.prisma.promo.findMany({
            where: {
                ...(query?.tenant_id && { tenant_id: query.tenant_id }),
                ...(query?.is_active !== undefined && { is_active: query.is_active }),
                ...(query?.is_featured !== undefined && { is_featured: query.is_featured }),
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.promo.findUnique({ where: { id } });
    }

    async create(data: CreatePromoDto) {
        const createData: any = { ...data };

        // Convert date strings to Date objects
        if (createData.start_date) {
            createData.start_date = new Date(createData.start_date);
        }
        if (createData.end_date) {
            createData.end_date = new Date(createData.end_date);
        }

        return this.prisma.promo.create({ data: createData });
    }

    async update(id: string, data: UpdatePromoDto) {
        const updateData: any = { ...data };

        // Convert date strings to Date objects
        if (updateData.start_date) {
            updateData.start_date = new Date(updateData.start_date);
        }
        if (updateData.end_date) {
            updateData.end_date = new Date(updateData.end_date);
        }

        return this.prisma.promo.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: string) {
        return this.prisma.promo.delete({ where: { id } });
    }
}
