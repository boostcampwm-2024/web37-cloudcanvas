import { z } from 'zod';

export const mysqlUserSchema = z.object({
    name: z
        .string()
        .min(4)
        .max(16)
        .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
            message:
                'name은 영문자로 시작하고, 영문자, 숫자, 밑줄, 대시만 사용 가능합니다.',
        }),
    password: z
        .string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
            message:
                'password는 영문자, 숫자, 특수문자(@$!%*#?&)를 모두 포함해야 합니다.',
        })
        .refine((val) => !/[`&+"'\/\s]/.test(val), {
            message: 'password는 특수문자(`&+"\'/\\s)를 포함할 수 없습니다.',
        }),
    host_ip: z.string().regex(/^(%|\d{1,3}\.\d{1,3}\.\d{1,3}\.(%|\d{1,3}))$/, {
        message: 'host_ip는 % 또는 IPv4 형식으로 입력해야 합니다.',
    }),
    authority: z.enum(['READ', 'CRUD', 'DDL']),
    is_system_table_access: z.boolean().optional().default(true),
});
