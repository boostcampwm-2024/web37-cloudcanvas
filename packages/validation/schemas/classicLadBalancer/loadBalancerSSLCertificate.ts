import { z } from 'zod';
import { commonSchema } from '../base';

export const loadBalancerSSLCertificateSchema = z
    .object({
        ...commonSchema,
        certificate_name: z.string(),
        privatekey: z.string().min(1, {
            message: 'private key는 필수 입력 항목입니다.',
        }),
        publickey_certificate: z.string().min(1, {
            message: 'public key certificate는 필수 입력 항목입니다.',
        }),
        certificate_chain: z.string().optional(),
    })
    .refine((data) => {
        return true;
    });

export type LoadBalancerSSLCertificateSchema = z.infer<
    typeof loadBalancerSSLCertificateSchema
>;
