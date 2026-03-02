import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('promo')
export class PromoController {
    constructor(private readonly promoService: PromoService) { }

    @Get()
    findAll(@Query() query: { tenant_id?: string; is_active?: string; is_featured?: string }) {
        const filters: any = {};

        if (query.tenant_id) {
            filters.tenant_id = query.tenant_id;
        }

        if (query.is_active !== undefined) {
            filters.is_active = query.is_active === 'true';
        }

        if (query.is_featured !== undefined) {
            filters.is_featured = query.is_featured === 'true';
        }

        return this.promoService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.promoService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPromoDto: CreatePromoDto) {
        return this.promoService.create(createPromoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
        return this.promoService.update(id, updatePromoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.promoService.remove(id);
    }
}
