import { Ncloud, PriceApi, ApiKeyCredentials } from '@cloud-canvas/ncloud-sdk';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NcloudResourcesService {
    constructor(private readonly prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_DAY_AT_3AM, {
        name: 'Insert Ncloud Resource Cron Job',
    })
    async insertNcloudResource() {
        const ncloud = new Ncloud();
        const priceApi = new PriceApi(ncloud.keys() as ApiKeyCredentials);
        const result = await priceApi.getProductPriceList({
            regionCode: 'KR',
            payCurrencyCode: 'KRW',
            productCategoryCode: 'COMPUTE',
        });
        const ncloudServerResourceMap: Map<
            string,
            Record<string, number | string>[]
        > = new Map();
        result.productPriceList.forEach((product) => {
            if (product.serverProductCode) {
                console.log(product);
                if (!ncloudServerResourceMap.has(product.productType.codeName))
                    ncloudServerResourceMap.set(
                        product.productType.codeName,
                        [],
                    );
                const {
                    serverProductCode,
                    priceList: [{ price: monthPrice }, { price: hourPrice }],
                    productName,
                }: {
                    serverProductCode: string;
                    priceList: { price: number }[];
                    productName: string;
                } = product;
                ncloudServerResourceMap.get(product.productType.codeName).push({
                    serverProductCode: serverProductCode.toLowerCase(),
                    monthPrice,
                    hourPrice,
                    productName,
                });
            }
        });
        await this.prisma.$transaction(async (tx) => {
            await tx.ncloudServerResource.deleteMany({});
            await tx.ncloudServerResourceType.deleteMany({});

            const ncloudServerResourceTypes = [
                ...ncloudServerResourceMap.keys(),
            ].map((key) => ({ type: key }));

            await tx.ncloudServerResourceType.createMany({
                data: ncloudServerResourceTypes,
            });

            const ncloudServerResources = await Promise.all(
                [...ncloudServerResourceMap.values()].map(
                    async (ncloudServerResourceList, index) => {
                        const serverResourceTypeId =
                            await tx.ncloudServerResourceType.findFirst({
                                select: { id: true },
                                where: {
                                    type: ncloudServerResourceTypes[index].type,
                                },
                            });
                        return ncloudServerResourceList.map(
                            (ncloudServerResource) => ({
                                serverResourceTypeId: serverResourceTypeId?.id,
                                serverSpecCode:
                                    ncloudServerResource.serverProductCode as string,
                                hourCost: parseFloat(
                                    '' + ncloudServerResource.hourPrice,
                                ),
                                monthCost: parseFloat(
                                    '' + ncloudServerResource.monthPrice,
                                ),
                                productName:
                                    ncloudServerResource.productName as string,
                            }),
                        );
                    },
                ),
            );

            const flattenedResources = ncloudServerResources.flat();
            await tx.ncloudServerResource.createMany({
                data: flattenedResources,
            });
        });
    }

    async onApplicationBootstrap() {
        await this.insertNcloudResource();
    }
}
