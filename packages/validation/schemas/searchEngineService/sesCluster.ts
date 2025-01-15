import { z } from 'zod';
import { commonSchema } from '../base';

const searchEngineSchema = z.object({
    version_code: z.string(),
    user_name: z.string().regex(/^[a-z][a-z0-9-]*[a-zA-Z0-9]$/, {
        message:
            'user name은 소문자로 시작하고, 영어 알파벳 또는 숫자여야 합니다.',
    }),
    user_password: z
        .string()
        .min(8)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/, {
            message:
                'user password는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
        }),
    dashboard_port: z.string(),
});

const nodeConfigSchema = z.object({
    product_code: z.string(),
    subnet_no: z.string(),
});

const managerNodeSchema = nodeConfigSchema.extend({
    is_dual_manager: z.boolean().optional(),
});

const dataNodeSchema = nodeConfigSchema.extend({
    count: z.number().int().min(3),
    storage_size: z
        .number()
        .min(100)
        .max(2000)
        .refine((size) => size % 10 === 0, {
            message: 'storage size는 10의 배수여야 합니다',
        }),
});

const masterNodeSchema = nodeConfigSchema.extend({
    count: z.number().refine((count) => count === 3 || count === 5, {
        message: 'master node count는 3 또는 5만 가능합니다',
    }),
});

export const sesClusterSchema = z.object({
    ...commonSchema,
    cluster_name: z.string(),
    os_image_code: z.string(),
    vpc_no: z.string(),
    search_engine: searchEngineSchema,
    manager_node: managerNodeSchema,
    data_node: dataNodeSchema,
    master_node: masterNodeSchema.optional(),
    login_key_name: z.string(),
});

export type SesClusterSchema = z.infer<typeof sesClusterSchema>;
