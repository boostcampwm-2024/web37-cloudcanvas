import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PublicModule } from './architecture/public/public.module';
import { PrivateModule } from './architecture/private/private.module';
import { PublicStarModule } from './architecture/public-star/public-star.module';
import { PublicImportModule } from './architecture/public-import/public-import.module';
import { PrivateVersionModule } from './architecture/private-version/private-version.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            url: 'redis://localhost:6379'
        }),
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PublicModule,
        PrivateModule,
        PublicStarModule,
        PublicImportModule,
        PrivateVersionModule,
        RouterModule.register([
            {
                path: 'architectures',
                children: [
                    {
                        path: 'public',
                        module: PublicModule,
                    },
                    {
                        path: 'public/:architectureId/star',
                        module: PublicStarModule,
                    },
                    {
                        path: 'public/:architectureId/import',
                        module: PublicImportModule,
                    },
                    {
                        path: 'private',
                        module: PrivateModule,
                    },
                    {
                        path: 'private/:architectureId/version',
                        module: PrivateVersionModule,
                    },
                ],
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
