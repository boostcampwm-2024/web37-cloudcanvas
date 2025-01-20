import { z } from 'zod';
import { commonSchema } from '../base';

export const lbSchema = z
    .object({
        ...commonSchema,
        name: z.string().optional(),
        type: z.enum(['APPLICATION', 'NETWORK', 'NETWORK_PROXY']),
        subnet_no_list: z.array(z.string()).min(1),
        network_type: z
            .enum(['PUBLIC', 'PRIVATE'])
            .optional()
            .default('PUBLIC'),
        idle_timeout: z.number().int().optional().default(60),
        throughput_type: z
            .enum(['SMALL', 'MEDIUM', 'LARGE', 'DYNAMIC', 'XLARGE'])
            .optional(),
        description: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.type !== 'NETWORK') {
                return data.throughput_type !== 'DYNAMIC';
            }
            return data.throughput_type === 'DYNAMIC';
        },
        {
            message:
                'NETWORK 타입의 로드밸런서는 throughput_type을 DYNAMIC으로 설정해야 합니다',
        },
    );

export type LoadBalancerSchema = z.infer<typeof lbSchema>;
