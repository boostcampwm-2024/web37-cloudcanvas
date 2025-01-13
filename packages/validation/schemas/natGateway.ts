import { z } from 'zod';
import { commonSchema } from './base';

export const natGatewaySchema = z.object({
    ...commonSchema,
    vpc_no: z.string(),
    zone: z.string(),
    subnet_no: z.string().optional(),
    name: z.string().optional(),
    private_ip: z.string()
        .regex(/^(\d{1,3}\.){3}\d{1,3}$/, {
            message: 'private_ip는 IPv4 형식이어야 합니다',
        })
        .optional(),
    description: z.string().optional(),
}).refine((data) => {
    if (!data.subnet_no) {
        return false;
    }
    return true;
}, {
    message: 'subnet_no는 필수 속성입니다',
    path: ['subnet_no'],
});

export type NatGatewaySchema = z.infer<typeof natGatewaySchema>;