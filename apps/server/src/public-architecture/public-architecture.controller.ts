import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PublicArchitectureService } from './public-architecture.service';
import { CreatePublicArchitectureDto } from './dto/create-public-architecture.dto';
import { UpdatePublicArchitectureDto } from './dto/update-public-architecture.dto';
import { QueryParamsDto } from 'src/types/query-params.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { OptionalAuthGuard } from 'src/guards/optional-auth.guard';

@Controller('public-architectures')
export class PublicArchitectureController {
    constructor(private readonly service: PublicArchitectureService) {}

    @Get()
    getPublicArchitectures(@Query() queryParams: QueryParamsDto) {
        return this.service.findArchitectures(queryParams);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createPublicArchitecture(
        @User('id') userId: number,
        @Body() createPublicArchitectureDto: CreatePublicArchitectureDto,
    ) {
        return this.service.saveArchitecture({
            userId,
            ...createPublicArchitectureDto,
        });
    }

    @Get(':id')
    @UseGuards(OptionalAuthGuard)
    getPublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.findArchitecture({ id, userId });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    updatePublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePublicArchitectureDto: UpdatePublicArchitectureDto,
    ) {
        return this.service.modifyArchitecture({
            id,
            userId,
            ...updatePublicArchitectureDto,
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.removeArchitecture({ id, userId });
    }

    // @Get(':id/stars')
    // @UseGuards(OptionalAuthGuard)
    // async getStars(
    //     @User('id') userId: number,
    //     @Param('id', ParseIntPipe) id: number,
    // ) {
    //     if (!userId) return { isStarred: false };
    //     const star = await this.service.findStar({ id, userId });
    //     if (!star) return { isStarred: false };
    //     return { isStarred: true };
    // }

    @Post(':id/stars')
    @UseGuards(JwtAuthGuard)
    starPublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.star({ id, userId });
    }

    @Delete(':id/stars')
    @UseGuards(JwtAuthGuard)
    unstarPublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.unstar({ id, userId });
    }

    @Post(':id/imports')
    @UseGuards(JwtAuthGuard)
    importPublicArchitecture(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.import({ id, userId });
    }
}
