import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    return req?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: 'JWT_SECRET',
        });
    }

    async validate(payload: any) {
        const { sub, username } = payload;
        return { id: sub, name: username };
    }
}
