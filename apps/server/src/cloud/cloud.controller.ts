import { Controller, Get } from '@nestjs/common';
import { CloudService } from './cloud.service';

@Controller('cloud')
export class CloudController {
    constructor(private readonly service: CloudService) {}

    @Get('/prices')
    getCloudResorucePrices() {
        return this.service.findCloudResourcePrices();
    }

    // @Get('/test')
    // getTestPrices() {
    //     return this.service.calculatePrice();
    // }
}
