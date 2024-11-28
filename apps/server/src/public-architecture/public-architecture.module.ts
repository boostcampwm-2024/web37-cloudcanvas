import { Module } from '@nestjs/common';
import { PublicArchitectureService } from './public-architecture.service.js';
import { PublicArchitectureController } from './public-architecture.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
    imports: [PrismaModule],
    controllers: [PublicArchitectureController],
    providers: [PublicArchitectureService],
})
export class PublicArchitectureModule {}
