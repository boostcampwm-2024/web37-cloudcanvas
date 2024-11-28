import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext): UserEntity => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);
