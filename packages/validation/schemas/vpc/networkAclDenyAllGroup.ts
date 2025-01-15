import { z } from 'zod';
import { commonSchema } from '../base';

export const networkAclDenyAllowGroupSchema = z.object({
    ...commonSchema,
    vpc_no: z.string(),
    ip_list: z
        .array(
            z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, {
                message: 'ip_list는 IPv4 형식이어야 합니다',
            }),
        )
        .min(1)
        .max(100)
        .refine((ips) => new Set(ips).size === ips.length, {
            message: 'ip_list는 중복된 값이 없어야 합니다',
        }),
    name: z.string().optional(),
    description: z.string().optional(),
});
export type NetworkAclDenyAllowGroupSchema = z.infer<
    typeof networkAclDenyAllowGroupSchema
>;
