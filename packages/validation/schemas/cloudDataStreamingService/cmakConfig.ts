import { z } from 'zod';

export const cmakConfigSchema = z.object({
    user_name: z.string().regex(/^[a-z][a-z0-9-]*[a-zA-Z0-9]$/, {
        message:
            'user name은 소문자로 시작하고, 영어 알파벳 또는 숫자여야 합니다.',
    }),
    user_password: z
        .string()
        .min(8)
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
            {
                message:
                    'user password는 영문 대문자, 소문자, 숫자, 특수 문자를 최소 1개 이상 포함해야 합니다.',
            },
        ),
});
