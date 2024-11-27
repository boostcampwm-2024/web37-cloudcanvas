import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { PublicArchitectureModule } from './public-architecture/public-architecture.module.js';
// import { PrivateArchitectureModule } from 'src/private-architecture/private-architecture.module';
import { PrismaService } from './prisma/prisma.service.js';
// import { routes } from './routes';
import { MyModule } from './my/my.module.js';

@Module({
    imports: [
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
