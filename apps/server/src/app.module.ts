import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PublicArchitectureModule } from './public-architecture/public-architecture.module';
import { PrivateArchitectureModule } from './private-architecture/private-architecture.module';
import { PrismaService } from './prisma/prisma.service';
import { MyModule } from './my/my.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NcloudResourcesService } from './ncloud-resources/ncloud-resources.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PublicArchitectureModule,
        PrivateArchitectureModule,
        MyModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, NcloudResourcesService],
})
export class AppModule {}
