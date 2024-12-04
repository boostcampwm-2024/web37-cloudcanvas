import { Module } from '@nestjs/common';
import { PublicArchitectureService } from './public-architecture.service';
import { PublicArchitectureController } from './public-architecture.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudModule } from 'src/cloud/cloud.module';

@Module({
    imports: [PrismaModule, CloudModule],
    controllers: [PublicArchitectureController],
    providers: [PublicArchitectureService],
})
export class PublicArchitectureModule {}
