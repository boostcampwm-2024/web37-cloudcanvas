import { z } from 'zod';
import { commonSchema } from '../base';

export const mysqlSchema = z
    .object({
        ...commonSchema,
        service_name: z
            .string()
            .min(3)
            .max(30)
            .regex(/^[a-zA-Z0-9\-가-힣]+$/, {
                message:
                    'service name은 영문, 숫자, 대시(-), 한글만 입력 가능합니다. (3 ~ 30 글자)',
            }),
        server_name_prefix: z
            .string()
            .min(3)
            .max(20)
            .regex(/^[a-z][a-z0-9\-]*[a-z0-9]$/, {
                message:
                    'server name prefix는 소문자로 시작하고, 영어 알파벳 또는 숫자여야 합니다.(3 ~ 20 글자)',
            }),
        user_name: z
            .string()
            .min(4)
            .max(16)
            .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
                message:
                    'user name은 영문, 숫자 및 특수 문자(_,-)만 입력 가능하고, 영문으로 시작해야 합니다.(4 ~ 16 글자)',
            }),
        user_password: z
            .string()
            .min(8)
            .max(20)
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                {
                    message:
                        'user password는 영문, 숫자, 특수 문자를 최소 1개 이상 포함해야 합니다.(8 ~ 20 글자)',
                },
            )
            .refine((val) => !/[`&+"'\/\s]/.test(val), {
                message:
                    'user password는 특정 특수 문자(`&+\\"\'/공백)를 사용할 수 없습니다.',
            }),
        host_ip: z.string(),
        database_name: z
            .string()
            .min(1)
            .max(30)
            .regex(/^[a-zA-Z][a-zA-Z0-9\_\-]*$/, {
                message:
                    'database name은 영문, 숫자 및 특수 문자(_,-)만 입력 가능하고, 영문으로 시작해야 합니다.(1 ~ 30 글자)',
            }),
        subnet_no: z.string(),
        image_product_code: z.string().optional(),
        product_code: z.string().optional(),
        data_storage_type: z.enum(['SSD', 'HDD', 'CB1']).optional(),
        is_ha: z.boolean().optional().default(true),
        is_multi_zone: z.boolean().optional().default(false),
        is_storage_encryption: z.boolean().optional().default(false),
        is_backup: z.boolean().optional(),
        backup_file_retention_period: z
            .number()
            .min(1)
            .max(30)
            .optional()
            .default(1),
        backup_time: z.string().optional(),
        is_automatic_backup: z.boolean().optional().default(true),
        port: z.number().min(10000).max(20000).optional().default(3306),
        standby_master_subnet_no: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.is_multi_zone === true && !data.standby_master_subnet_no) {
                return false;
            }
            return true;
        },
        {
            message:
                'is multi zone이 true일 때 standby_master_subnet_no는 필수입니다.',
            path: ['standby_master_subnet_no'],
        },
    )
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
                'is backup이 true이고 is automatic backup이 false일 때 backup time은 필수입니다.',
            path: ['backup_time'],
        },
    );

export type MySQLSchema = z.infer<typeof mysqlSchema>;
