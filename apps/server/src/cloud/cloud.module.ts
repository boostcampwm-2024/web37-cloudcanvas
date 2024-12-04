import { Module } from '@nestjs/common';
import { CloudController } from './cloud.controller';
import { CloudService } from './cloud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CloudController],
    providers: [CloudService],
    exports: [CloudService],
})
export class CloudModule {}
