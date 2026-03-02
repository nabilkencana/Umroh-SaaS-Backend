import { Module } from '@nestjs/common';
import { JamaahService } from './jamaah.service';
import { JamaahController } from './jamaah.controller';

@Module({
    controllers: [JamaahController],
    providers: [JamaahService],
    exports: [JamaahService],
})
export class JamaahModule { }
