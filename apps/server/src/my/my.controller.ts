import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MyService } from './my.service';
import { QueryParamsDto } from 'src/types/query-params.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('my')
export class MyController {
    constructor(private readonly service: MyService) {}

    @Get('private-architectures')
    @UseGuards(JwtAuthGuard)
    getMyPrivateArchitectures(
        @User('id') userId: number,
        @Query() queryParams: QueryParamsDto,
    ) {
        return this.service.findMyPrivateArchitectures({
            ...queryParams,
            userId,
        });
    }

    @Get('public-architectures')
    @UseGuards(JwtAuthGuard)
    getMyPublicArchitectures(
        @User('id') userId: number,
        @Query() queryParams: QueryParamsDto,
    ) {
        return this.service.findMyPublicArchitectures({
            ...queryParams,
            userId,
        });
    }

    @Get('public-architectures/stars')
    @UseGuards(JwtAuthGuard)
    getMyStars(
        @User('id') userId: number,
        @Query() queryParams: QueryParamsDto,
    ) {
        return this.service.findMyStars({ ...queryParams, userId });
    }
}
