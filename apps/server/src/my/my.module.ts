import { Module } from '@nestjs/common';
import { MyService } from './my.service.js';
import { MyController } from './my.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
    imports: [PrismaModule],
    controllers: [MyController],
    providers: [MyService],
})
export class MyModule {}
