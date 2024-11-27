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
    result.productPriceList.forEach((product) => {
        if (
            product.productItemKind.code === 'SVR' &&
            product.serverProductCode &&
            product.serverProductCode.endsWith('50')
        ) {
            console.log(product.serverProductCode);
            console.log('월');
            console.log(product.priceList[0].price);
            console.log('시간');
            console.log(product.priceList[1].price);
            console.log('gksk');
        }
    });

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
