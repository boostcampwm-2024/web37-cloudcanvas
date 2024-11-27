import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login() {
        const user = this.userService.getTestUser();
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        return this.jwtService.sign(payload);
    }
}
