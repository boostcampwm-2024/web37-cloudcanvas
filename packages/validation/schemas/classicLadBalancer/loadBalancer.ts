import { z } from 'zod';
import { commonSchema } from '../base';

const lbRuleSchema = z
    .object({
        protocol_type: z.enum(['HTTP', 'HTTPS', 'TCP', 'SSL']),
        load_balancer_port: z.number().int().min(1).max(65535),
        server_port: z.number().int().min(1).max(65535),
        l7_health_check_path: z.string().optional(),
        certificate_name: z.string().optional(),
        proxy_protocol_use_yn: z.enum(['Y', 'N']).optional(),
    })
    .refine(
        (data) => {
            if (
                ['HTTP', 'HTTPS'].includes(data.protocol_type) &&
                !data.l7_health_check_path
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                '17 health check path는 HTTP, HTTPS 프로토콜에서 필수입니다.',
            path: ['l7_health_check_path'],
        },
    )
    .refine(
        (data) => {
            if (
                ['SSL', 'HTTPS'].includes(data.protocol_type) &&
                !data.certificate_name
            ) {
                return false;
            }
            return true;
        },
        {
            message: 'Certificate name은 SSL, HTTPS 프로토콜에서 필수입니다',
            path: ['certificate_name'],
        },
    );

export const loadBalancerSchema = z.object({
    ...commonSchema,
    rule_list: z.array(lbRuleSchema).min(1),
    name: z.string().optional(),
    algorithm_type: z.enum(['RR', 'LC']).optional().default('RR'),
    description: z.string().optional(),
    server_instance_no_list: z.array(z.string()).optional(),
    network_usage_type: z.enum(['PBLIP', 'PRVT']).optional().default('PBLIP'),
    region: z.string().optional().default('KR'),
    zone: z.string().optional(),
});

export type LoadBalancerSchema = z.infer<typeof loadBalancerSchema>;
