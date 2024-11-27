import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { swaggerConfig } from './swagger/swagger.config.js';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter.js';
import { ApiKeyCredentials, Ncloud, PriceApi } from '@cloud-canvas/ncloud-sdk';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const ncloud = new Ncloud();
    const priceApi = new PriceApi(ncloud.keys() as ApiKeyCredentials);
    console.log(priceApi);
    const result = await priceApi.getProductCategoryList({});
    console.log(result.getProductCategoryListResponse.productCategoryList);
    swaggerConfig(app);

    app.use(helmet());
    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
            validateCustomDecorators: true,
            disableErrorMessages: false,
        }),
    );

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

    await app.listen(3000);
}
bootstrap();
