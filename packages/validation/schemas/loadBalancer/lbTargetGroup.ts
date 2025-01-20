import { z } from 'zod';
import { commonSchema } from '../base';

const healthCheckSchema = z
    .object({
        cycle: z.number().int().min(5).max(300).optional().default(30),
        down_threshold: z.number().int().min(2).max(10).optional().default(2),
        up_threshold: z.number().int().min(2).max(10).optional().default(2),
        http_method: z.enum(['HEAD', 'GET']).optional(),
        port: z.number().int().min(1).max(65534).optional().default(80),
        protocol: z.enum(['TCP', 'HTTP', 'HTTPS']),
        url_path: z.string().regex(/^\/.*/).optional(),
    })
    .refine(
        (data) => {
            if (data.protocol === 'HTTP' || data.protocol === 'HTTPS') {
                return !!(data.http_method && data.url_path);
            }
            return true;
        },
        {
            message:
                'HTTP method와 URL path는 HTTP 또는 HTTPS 프로토콜에서만 사용 가능합니다',
        },
    );

export const lbTargetGroupSchema = z
    .object({
        ...commonSchema,
        name: z.string().optional(),
        port: z.number().int().min(1).max(65534).optional().default(80),
        protocol: z.enum(['TCP', 'UDP', 'PROXY_TCP', 'HTTP', 'HTTPS']),
        description: z.string().optional(),
        health_check: healthCheckSchema.optional(),
        target_type: z.string().optional(),
        vpc_no: z.string(),
        use_sticky_session: z.boolean().optional(),
        use_proxy_protocol: z.boolean().optional(),
        algorithm_type: z.enum(['RR', 'SIPHS', 'LC', 'MH']).optional(),
    })
    .refine(
        (data) => {
            if (data.protocol === 'TCP') {
                return (
                    data.algorithm_type === 'MH' || data.algorithm_type === 'RR'
                );
            }
            if (['PROXY_TCP', 'HTTP', 'HTTPS'].includes(data.protocol)) {
                return ['RR', 'SIPHS', 'LC'].includes(
                    data.algorithm_type || 'RR',
                );
            }
            return true;
        },
        {
            message:
                'algorithm type은 TCP 프로토콜에서는 MH 또는 RR만 사용 가능하고, PROXY_TCP, HTTP, HTTPS 프로토콜에서는 RR, SIPHS, LC만 사용 가능합니다',
        },
    )
    .refine(
        (data) => {
            if (data.use_proxy_protocol) {
                return ['TCP', 'HTTP', 'HTTPS'].includes(data.protocol);
            }
            return true;
        },
        {
            message:
                'Proxy Protocol은 TCP, HTTP, HTTPS 프로토콜에서만 사용 가능합니다',
        },
    );

export type LoadBalancerTargetGroupSchema = z.infer<typeof lbTargetGroupSchema>;
