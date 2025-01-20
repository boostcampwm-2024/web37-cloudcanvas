import { z } from 'zod';
import { commonSchema } from '../base';

export const lbListenerSchema = z
    .object({
        ...commonSchema,
        load_balancer_no: z.string(),
        target_group_no: z.string(),
        port: z.number().int().min(1).max(65534),
        protocol: z.enum(['HTTP', 'HTTPS', 'TCP', 'UDP', 'TLS']),
        tls_min_version_type: z
            .enum(['TLSV10', 'TLSV11', 'TLSV12'])
            .optional()
            .default('TLSV10'),
        use_http2: z.boolean().optional().default(false),
        ssl_certificate_no: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.protocol === 'HTTPS' || data.protocol === 'TLS') {
                return !!data.ssl_certificate_no;
            }
            return true;
        },
        {
            message:
                'HTTPS 또는 TLS 프로토콜을 사용하는 경우 SSL 인증서 번호는 필수입니다',
        },
    );

export type LoadBalancerListenerSchema = z.infer<typeof lbListenerSchema>;
