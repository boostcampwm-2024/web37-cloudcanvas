import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Body,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { PrivateArchitectureService } from './private-architecture.service.js';
import { CreatePrivateArchiectureDto } from './dto/create-private-architecture.dto.js';
import { UpdatePrivateArchiectureDto } from './dto/update-private-architecture.dto.js';
import { CreateVersionDto } from './dto/create-version.dto.js';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard.js';
import { User } from 'src/decorators/user.decorator.js';

@Controller('private-architectures')
export class PrivateArchitectureController {
    constructor(private readonly service: PrivateArchitectureService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    postPrivateArchitecture(
        @User('id') userId: number,
        @Body() createPrivateArchitectureDto: CreatePrivateArchiectureDto,
    ) {
        return this.service.saveArchitecture({
            userId,
            ...createPrivateArchitectureDto,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getPrivateArchitecture(
        @User('id') userId: number,
        @Param('id') id: number,
    ) {
        return this.service.findArchitecture({ userId, id });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    patchPrivateArchitecture(
        @User('id') userId: number,
        @Param('id') id: number,
        @Body() updatePrivateArchiectureDto: UpdatePrivateArchiectureDto,
    ) {
        return this.service.modifyArchitecture({
            userId,
            id,
            ...updatePrivateArchiectureDto,
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePrivateArchitecture(
        @User('id') userId: number,
        @Param('id') id: number,
    ) {
        return this.service.removeArchitecture({ userId, id });
    }

    @Get(':id/versions')
    @UseGuards(JwtAuthGuard)
    getVersions(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.findVersions({ userId, id });
    }

    @Post(':id/versions')
    @UseGuards(JwtAuthGuard)
    postVersion(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() createVersionDto: CreateVersionDto,
    ) {
        return this.service.saveVersion({ userId, id, ...createVersionDto });
    }

    @Delete(':id/versions/:versionId')
    @UseGuards(JwtAuthGuard)
    deleteVersion(
        @User('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Param('versionId', ParseIntPipe) versionId: number,
    ) {
        return this.service.removeVersion({ userId, id, versionId });
    }

    @Get(':id/versions/:versionId')
    @UseGuards(JwtAuthGuard)
    getVersion(
        @User('id') userId: number,
        @Param('id') id: number,
        @Param('versionid') versionId: number,
    ) {
        return this.service.findVersion({ userId, id, versionId });
    }
}
