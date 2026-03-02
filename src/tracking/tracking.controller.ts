import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tracking')
@UseGuards(JwtAuthGuard)
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) { }

    @Get()
    findAll(@Query() query: { tenant_id?: string; jamaah_id?: string; date?: string }) {
        return this.trackingService.findAll(query);
    }
}
