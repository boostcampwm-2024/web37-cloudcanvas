import { Module } from '@nestjs/common';
import { MyService } from './my.service';
import { MyController } from './my.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MyController],
    providers: [MyService],
})
export class MyModule {}
