import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as data from '../../node.json';

@Injectable()
export class CloudService {
    constructor(private readonly prisma: PrismaService) {}

    async findCloudResourcePrices() {
        // console.log(Object.values(data));
        const prices = await this.prisma.ncloudServerResource.findMany({
            select: {
                serverSpecCode: true,
                productName: true,
                hourCost: true,
                monthCost: true,
            },
        });
        const priceMap = new Map<string, Record<string, number | string>>();
        prices.map((price) => {
            const { productName, hourCost, monthCost } = price;
            priceMap.set(price.serverSpecCode, {
                productName,
                hourCost,
                monthCost,
            });
        });
        return Object.fromEntries(priceMap);
    }

    async calculatePrice(nodes?: Record<string, any>) {
        const prices = await this.findCloudResourcePrices();
        const nodeValues = Object.values(data);
        const totalMonthPrice = nodeValues.reduce(
            (price, nodeValue): number => {
                if (nodeValue.properties['server_spec_code']) {
                    price += prices[nodeValue.properties['server_spec_code']]
                        .monthCost as number;
                    return price;
                }
                return price;
            },
            0,
        );
        return { totalMonthPrice };
    }
}
