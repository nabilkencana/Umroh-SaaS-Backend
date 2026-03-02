import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJamaahDto, UpdateJamaahDto } from './dto/jamaah.dto';

@Injectable()
export class JamaahService {
    constructor(private prisma: PrismaService) { }

    async findAll(query?: { tenant_id?: string; branch_id?: string; status?: string }) {
        return this.prisma.jamaah.findMany({
            where: {
                ...(query?.tenant_id && { tenant_id: query.tenant_id }),
                ...(query?.branch_id && { branch_id: query.branch_id }),
                ...(query?.status && { status: query.status }),
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.jamaah.findUnique({ where: { id } });
    }

    async create(data: CreateJamaahDto) {
        return this.prisma.jamaah.create({ data });
    }

    async update(id: string, data: UpdateJamaahDto) {
        return this.prisma.jamaah.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.jamaah.delete({ where: { id } });
    }
}
