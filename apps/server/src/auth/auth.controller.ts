import {
    Controller,
    Get,
    HttpCode,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthenticatedUser } from 'src/types/authenticated-user.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login();
        res.cookie('Authentication', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        return { message: 'Success' };
    }

    @Post('logout')
    @HttpCode(200)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('Authentication');
        return { message: 'Success' };
    }

    @Get('check')
    @UseGuards(JwtAuthGuard)
    check(@User() user: AuthenticatedUser) {
        return user;
    }
}
