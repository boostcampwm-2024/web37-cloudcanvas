import { z } from 'zod';
import { commonSchema } from '../base';

export const mysqlRecoverySchema = z
    .object({
        ...commonSchema,
        mysql_instance_no: z.string(),
        recovery_server_name: z
            .string()
            .min(3)
            .max(25)
            .regex(/^[a-z][a-z0-9\-]*[a-zA-Z0-9]$/, {
                message:
                    'recovery server name은 소문자로 시작하고, 소문자, 숫자, 대시(-)만 사용할 수 있으며, 대시로 끝날 수 없습니다',
            }),
        subnet_no: z.string().optional(),
        file_name: z.string().optional(),
        recovery_time: z.string().optional(),
    })
    .refine(
        (data) => {
            return !!(data.file_name || data.recovery_time);
        },
        {
            message:
                'file_name 또는 recovery_time 중 하나는 반드시 입력해야 합니다',
            path: ['recovery_info'],
        },
    );

export type MySQLRecoverySchema = z.infer<typeof mysqlRecoverySchema>;
