import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as data from '../../node.json';

@Injectable()
export class CloudService {
    constructor(private readonly prisma: PrismaService) {}

    async findCloudResourcePrices() {
        return Object.fromEntries(await this.getCloudResourcesMap());
    }

    async calculatePrice(nodes: Record<string, any>) {
        if (nodes && !Object.keys(nodes).length) throw new NotFoundException();
        const cloudResourcesPriceMap = await this.getCloudResourcesMap();
        const nodeValues = Object.values(nodes);
        const totalMonthPrice = nodeValues.reduce(
            (price, nodeValue): number => {
                if (nodeValue.properties['server_spec_code']) {
                    if (
                        !cloudResourcesPriceMap.has(
                            nodeValue.properties['server_spec_code'],
                        )
                    )
                        throw new NotFoundException();
                    price += cloudResourcesPriceMap.get(
                        nodeValue.properties['server_spec_code'],
                    ).monthCost as number;
                    return price;
                }
                return price;
            },
            0,
        );
        return { totalMonthPrice };
    }

    private async getCloudResourcesMap() {
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
        return priceMap;
    }
}
