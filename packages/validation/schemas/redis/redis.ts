import { z } from 'zod';
import { commonSchema } from './base';

export const redisSchema = z
    .object({
        ...commonSchema,
        service_name: z
            .string()
            .min(3)
            .max(15)
            .regex(/^[a-zA-Z0-9\-가-힣]+$/, {
                message:
                    'service name은 영문, 숫자, 한글, - 만 가능합니다. (3 ~ 15자)',
            }),
        server_name_prefix: z
            .string()
            .min(3)
            .max(15)
            .regex(/^[a-z][a-z0-9\-]*[a-zA-Z0-9]$/, {
                message:
                    'server name prefix는 소문자로 시작하고, 영문, 숫자, - 만 가능합니다. (3 ~ 15자)',
            }),
        user_name: z
            .string()
            .min(4)
            .max(16)
            .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
                message:
                    'user name은 영문으로 시작하고, 영문, 숫자, _, - 만 가능합니다. (4 ~ 16자)',
            })
            .optional(),
        user_password: z
            .string()
            .min(8)
            .max(20)
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                {
                    message:
                        'user password는 영문, 숫자, 특수문자를 포함해야 합니다. (8 ~ 20자)',
                },
            )
            .refine((val) => !/[`&+"'\/\s]/.test(val), {
                message:
                    'user password는 특수문자(`&+\\"\'/) 공백을 포함할 수 없습니다.',
            })
            .optional(),
        vpc_no: z.string(),
        subnet_no: z.string(),
        config_group_no: z.string(),
        mode: z.enum(['CLUSTER', 'SIMPLE']),
        image_product_code: z.string().optional(),
        product_code: z.string().optional(),
        shard_count: z.number().min(3).max(10).optional().default(3),
        shard_copy_count: z.number().min(0).max(4).optional().default(0),
        is_ha: z.boolean().optional().default(false),
        is_backup: z.boolean().optional().default(false),
        backup_file_retention_period: z.number().min(1).optional().default(1),
        is_automatic_backup: z.boolean().optional().default(true),
        backup_time: z
            .string()
            .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
            .optional(),
        port: z
            .number()
            .refine((val) => val === 6379 || (val >= 10000 && val <= 20000), {
                message:
                    'port는 6379이거나 10000 ~ 20000 사이여야 합니다. (default: 6379)',
            })
            .optional()
            .default(6379),
    })
    .refine(
        (data) => {
            if (
                data.is_backup === true &&
                data.is_automatic_backup === false &&
                !data.backup_time
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                'is automatic backup이 false일 때 backup time은 필수입니다.',
            path: ['backup_time'],
        },
    );
