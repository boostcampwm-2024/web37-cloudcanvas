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

@Controller('public-architectures')
export class PublicArchitectureController {
    constructor(private readonly service: PublicArchitectureService) {}

    @Get()
    getMany(@Query() query: QueryParamsDto) {
        return this.service.getMany(query);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createPublicDto: CreatePublicArchitectureDto) {
        const userId = 1;
        return this.service.create(userId, createPublicDto);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.getOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePublicDto: UpdatePublicArchitectureDto,
    ) {
        const userId = 1;
        return this.service.update(id, userId, updatePublicDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id', ParseIntPipe) id: number) {
        const userId = 1;
        return this.service.delete(id, userId);
    }

    @Post(':id/stars')
    @UseGuards(JwtAuthGuard)
    star(@Param('id', ParseIntPipe) id: number) {
        const userId = 1;
        return this.service.star(id, userId);
    }

    @Delete(':id/stars')
    @UseGuards(JwtAuthGuard)
    unstar(@Param('id', ParseIntPipe) id: number) {
        const userId = 1;
        return this.service.unstar(id, userId);
    }

    @Post(':id/imports')
    @UseGuards(JwtAuthGuard)
    import(@Param('id', ParseIntPipe) id: number) {
        const userId = 1;
        return this.service.import(id, userId);
    }
}
