import { Module } from '@nestjs/common';
import { CloudController } from './cloud.controller';
import { CloudService } from './cloud.service';

@Module({
    controllers: [CloudController],
    providers: [CloudService],
})
export class CloudModule {}
