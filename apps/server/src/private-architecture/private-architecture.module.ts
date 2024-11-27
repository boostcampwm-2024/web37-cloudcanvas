import { Module } from '@nestjs/common';
import { PrivateArchitectureService } from './private-architecture.service.js';
import { PrivateArchitectureController } from './private-architecture.controller.js';
import { PrismaModule } from 'src/prisma/prisma.module.js';

@Module({
    imports: [PrismaModule],
    controllers: [PrivateArchitectureController],
    providers: [PrivateArchitectureService],
})
export class PrivateArchitectureModule {}
