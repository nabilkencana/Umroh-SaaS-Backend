import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JamaahService } from './jamaah.service';
import { CreateJamaahDto, UpdateJamaahDto } from './dto/jamaah.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('jamaah')
@UseGuards(JwtAuthGuard)
export class JamaahController {
    constructor(private readonly jamaahService: JamaahService) { }

    @Get()
    findAll(@Query() query: { tenant_id?: string; branch_id?: string; status?: string }) {
        return this.jamaahService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jamaahService.findOne(id);
    }

    @Post()
    create(@Body() createJamaahDto: CreateJamaahDto) {
        return this.jamaahService.create(createJamaahDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJamaahDto: UpdateJamaahDto) {
        return this.jamaahService.update(id, updateJamaahDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jamaahService.remove(id);
    }
}
