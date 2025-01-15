import { z } from 'zod';
import { commonSchema } from '../base';

export const redisConfigGroupSchema = z.object({
    ...commonSchema,
    name: z
        .string()
        .min(3)
        .max(15)
        .regex(/^[a-z][a-z0-9\-]*[a-zA-Z0-9]$/, {
            message:
                'name은 소문자로 시작하고, 영문, 숫자, - 만 가능합니다. (3 ~ 15자)',
        }),
    redis_version: z.enum([
        '5.0.14-cluster',
        '5.0.14-simple',
        '7.0.13-cluster',
        '7.0.13-simple',
    ]),
    description: z.string().min(1).max(255).optional(),
});

export type RedisConfigGroupSchema = z.infer<typeof redisConfigGroupSchema>;
