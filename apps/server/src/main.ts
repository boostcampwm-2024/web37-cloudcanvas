import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ApiKeyCredentials, Ncloud, PriceApi } from '@cloud-canvas/ncloud-sdk';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const ncloud = new Ncloud();
    const priceApi = new PriceApi(ncloud.keys() as ApiKeyCredentials);
    const result1 = await priceApi.getProductCategoryList({});
    console.log(result1.productCategoryList);

    // VPC
    // const result = await priceApi.getProductList({
    //     regionCode: 'KR',
    //     productCategoryCode: 'NETWORKING'
    // });
    // result.productList.forEach((product) => {
    //     if(product.productCode === 'VPC.V001' || product.productCode === 'SPNET00000000015')
    //         console.log(product);
    // })

    // SERVER
    // const result = await priceApi.getProductList({
    //     regionCode: 'KR',
    //     productCategoryCode: 'COMPUTE',
    // });
    // result.productList.forEach((product) => {
    //     if(product.productItemKind.codeName === 'Server' && product.serverProductCode){
    //         console.log(product);
    //     }
    // })

    // SERVER PRICE
    const result = await priceApi.getProductPriceList({
        regionCode: 'KR',
        payCurrencyCode: 'KRW',
        productCategoryCode: 'COMPUTE',
    });
    const map: Map<string, Record<string, number | string>[]> = new Map();
    result.productPriceList.forEach((product) => {
        if (
            product.productItemKind.code === 'SVR' &&
            product.serverProductCode &&
            product.serverProductCode.endsWith('50')
        ) {
            if (!map.has(product.productType.codeName))
                map.set(product.productType.codeName, []);
            const {
                serverProductCode,
                priceList: [{ price: monthPrice }, { price: hourPrice }],
            }: {
                serverProductCode: string;
                priceList: { price: number }[];
            } = product;
            map.get(product.productType.codeName).push({
                serverProductCode: serverProductCode.toLowerCase(),
                monthPrice,
                hourPrice,
            });
        }
    });
    console.log(map);

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

    const configService = app.get(ConfigService);
    const environment = configService.get('NODE_ENV');

    if (environment !== 'production') {
        app.enableCors({
            origin: 'http://localhost:3001',
            methods: [
                'GET',
                'HEAD',
                'PUT',
                'PATCH',
                'POST',
                'DELETE',
                'OPTIONS',
            ],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials: true,
        });
    }
    await app.listen(3000);
}
bootstrap();
