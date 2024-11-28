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
        console.log(await this.prisma.star.findMany({}));
    }

    onApplicationBootstrap() {
        this.insertNcloudResource();
    }
}
