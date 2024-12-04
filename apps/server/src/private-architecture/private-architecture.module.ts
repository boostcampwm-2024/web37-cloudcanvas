import { Module } from '@nestjs/common';
import { PrivateArchitectureService } from './private-architecture.service';
import { PrivateArchitectureController } from './private-architecture.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudModule } from 'src/cloud/cloud.module';

@Module({
    imports: [PrismaModule, CloudModule],
    controllers: [PrivateArchitectureController],
    providers: [PrivateArchitectureService],
})
export class PrivateArchitectureModule {}
