import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PublicArchitectureModule } from 'src/public-architecture/public-architecture.module';
import { PrivateArchitectureModule } from 'src/private-architecture/private-architecture.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyModule } from './my/my.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NcloudResourcesService } from './ncloud-resource/ncloud-resource.service.js';
import { CloudModule } from './cloud/cloud.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        }),
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PublicArchitectureModule,
        PrivateArchitectureModule,
        MyModule,
        ScheduleModule.forRoot(),
        CloudModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, NcloudResourcesService],
})
export class AppModule {}
