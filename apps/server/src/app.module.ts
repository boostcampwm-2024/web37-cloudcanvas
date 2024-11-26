import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PublicArchitectureModule } from 'src/public-architecture/public-architecture.module';
// import { PrivateArchitectureModule } from 'src/private-architecture/private-architecture.module';
import { PrismaService } from 'src/prisma/prisma.service';
// import { routes } from './routes';
import { MyModule } from './my/my.module';

@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            url: 'redis://localhost:6379'
        }),
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PublicArchitectureModule,
        // PrivateArchitectureModule,
        MyModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
