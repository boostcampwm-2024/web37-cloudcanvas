import { z } from 'zod';
import { commonSchema } from '../base';

export const subnetSchema = z.object({
    ...commonSchema,
    vpc_no: z.string(),
    subnet: z
        .string()
        .regex(
            /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)\d{1,3}\.\d{1,3}\/([1-2][0-9]|16|28)$/,
            {
                message: 'Cidr Block의 범위는 /16 과 /28 사이여야 합니다.',
            },
        ),
    zone: z.string(),
    network_acl_no: z.string(),
    subnet_type: z.enum(['PUBLIC', 'PRIVATE']),
    name: z.string().optional(),
    usage_type: z
        .enum(['GEN', 'LOADB', 'BM', 'NATGW'])
        .optional()
        .default('GEN'),
});

export type SubnetSchema = z.infer<typeof subnetSchema>;
