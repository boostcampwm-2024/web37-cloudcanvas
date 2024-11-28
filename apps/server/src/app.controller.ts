import {
    Controller,
    Get,
    HttpException,
    NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service.js';

class CustomError extends Error {}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        try {
            return this.appService.getHello();
        } catch (error) {}
    }
}
